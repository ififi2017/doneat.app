#!/usr/bin/env python3
"""Bounded log scan -> numeric aggregates only. No raw paths or client labels."""
import argparse
import gzip
import json
import re
import sqlite3
from collections import Counter
from datetime import datetime, timedelta
from pathlib import Path
from collector import CST, EVENTS

# Ignore client address, referrer and user agent completely.
LOG = re.compile(r'^\S+ \S+ \S+ \[([^]]+)\] "[^" ]+ ([^" ]*) [^"]+" (\d{3}) (\d+|-) ')
PAGES = frozenset(['/zh-CN'] + ['/zh-CN/' + p for p in ['download', 'faq', 'about', 'privacy', 'how-it-works']] + ['/android'] + ['/android/' + p for p in ['buy', 'faq', 'privacy', 'refunds']])
SCAN = re.compile(r'(?:^|/)(?:\.env|\.git|wp-admin|wp-login|xmlrpc|phpmyadmin|cgi-bin|vendor|actuator)(?:/|\.|$)|\.(?:php|asp|aspx)$', re.I)

def parse(line):
    m = LOG.match(line)
    if not m:
        return None
    try:
        dt = datetime.strptime(m[1], '%d/%b/%Y:%H:%M:%S %z').astimezone(CST)
    except ValueError:
        return None
    path = m[2].split('?', 1)[0].rstrip('/') or '/'
    if path == '/api/cn-events':
        return None
    kind = 'page' if path in PAGES else 'suspected_scan' if SCAN.search(path) else 'asset' if path.startswith(('/_astro/', '/device/', '/fonts/', '/icons/', '/brand/', '/badges/', '/desktop-demo/')) else 'other'
    return dt, kind, m[3][0] + 'xx', int(m[4]) if m[4] != '-' else 0

def snapshot(logdir, db, now):
    daily, recent = Counter(), Counter()
    oldest = now.timestamp()
    matched = 0
    budget = 128 * 1024 * 1024
    for path in sorted(Path(logdir).glob('doneat-cn.access.log*')):
        opener = gzip.open if path.suffix == '.gz' else open
        with opener(path, 'rt', errors='replace') as stream:
            for line in stream:
                budget -= len(line)
                if budget < 0:
                    raise RuntimeError('log scan exceeds 128 MiB budget')
                item = parse(line)
                if not item:
                    continue
                dt, kind, status, size = item
                if dt > now or (now.date() - dt.date()).days >= 30:
                    continue
                oldest = min(oldest, dt.timestamp())
                matched += 1
                daily[(dt.date().isoformat(), kind, status)] += 1
                if 0 <= (now - dt).total_seconds() <= 300:
                    recent[(kind, status)] += 1
                    recent[('bytes', 'all')] += size
    events = Counter()
    if Path(db).exists():
        with sqlite3.connect('file:' + str(db) + '?mode=ro', uri=True, timeout=2) as conn:
            exists = conn.execute("SELECT 1 FROM sqlite_master WHERE type='table' AND name='events'").fetchone()
            if exists:
                for day, event, count in conn.execute('SELECT day,event,count FROM events'):
                    if event in EVENTS:
                        events[(day, event)] = count
    return daily, recent, events, oldest, matched

def render(logdir, db, now):
    daily, recent, events, oldest, matched = snapshot(logdir, db, now)
    lines = []
    def metric(name, value, **labels):
        suffix = '{' + ','.join(k + '=' + json.dumps(str(v)) for k,v in labels.items()) + '}' if labels else ''
        lines.append('doneat_cn_web_' + name + suffix + ' ' + str(value))
    metric('export_timestamp_seconds', now.timestamp())
    metric('oldest_log_timestamp_seconds', oldest)
    metric('parsed_log_entries', matched)
    for kind in ['page', 'asset', 'suspected_scan', 'other']:
        for status in ['2xx', '3xx', '4xx', '5xx']:
            metric('origin_requests_5m', recent[(kind, status)], category=kind, status=status)
    metric('origin_bytes_5m', recent[('bytes', 'all')])
    for window in [1, 7, 14, 30]:
        first = (now.date() - timedelta(days=window-1)).isoformat()
        for kind in ['page', 'asset', 'suspected_scan', 'other']:
            for status in ['2xx', '3xx', '4xx', '5xx']:
                metric('origin_requests_window', sum(v for (d,k,s),v in daily.items() if d >= first and k == kind and s == status), days=window, category=kind, status=status)
        for event in sorted(EVENTS):
            metric('events_window', sum(v for (d,e),v in events.items() if d >= first and e == event), days=window, event=event)
    for offset in range(30):
        day = (now.date() - timedelta(days=offset)).isoformat()
        if day >= datetime.fromtimestamp(oldest, CST).date().isoformat():
            metric('origin_requests_day', sum(v for (d,k,s),v in daily.items() if d == day), date=day)
        metric('events_day', sum(v for (d,e),v in events.items() if d == day and e.endswith('_view')), date=day)
    return '\n'.join(lines) + '\n'

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--logdir', default='/var/log/nginx')
    parser.add_argument('--db', default='/var/lib/doneat-cn-analytics/events.sqlite')
    parser.add_argument('--output', default='/var/lib/node_exporter/textfile_collector/doneat-cn-web.prom')
    args = parser.parse_args()
    output = Path(args.output)
    temporary = output.with_suffix('.tmp')
    temporary.write_text(render(args.logdir, args.db, datetime.now(CST)))
    temporary.chmod(0o644)
    temporary.replace(output)
