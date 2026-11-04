#!/usr/bin/env python3
"""Fixed-name, daily anonymous counters. Never log requests or store visitors."""
import os
import sqlite3
import time
from datetime import datetime, timedelta, timezone
from http.server import BaseHTTPRequestHandler, HTTPServer

CST = timezone(timedelta(hours=8))
DB = os.environ.get('DONEAT_ANALYTICS_DB', '/var/lib/doneat-cn-analytics/events.sqlite')
EVENTS = frozenset('hall_view download_view faq_view about_view how_it_works_view privacy_view android_view android_buy_view android_faq_view android_privacy_view android_refunds_view android_page_open apk_download_open buy_page_open contact_xhs_open contact_email_open download_page_open web_timer_open app_store_open microsoft_store_open github_source_open github_releases_open chrome_extension_open'.split())

def record(event, db=DB, now=None):
    if event not in EVENTS:
        return False
    today = (now or datetime.now(CST)).astimezone(CST).date()
    with sqlite3.connect(db, timeout=2) as conn:
        conn.execute('CREATE TABLE IF NOT EXISTS events (day TEXT NOT NULL, event TEXT NOT NULL, count INTEGER NOT NULL, PRIMARY KEY(day,event))')
        conn.execute('INSERT INTO events VALUES (?,?,1) ON CONFLICT(day,event) DO UPDATE SET count=count+1', (today.isoformat(), event))
        conn.execute('DELETE FROM events WHERE day < ?', ((today - timedelta(days=89)).isoformat(),))
    return True

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def reply(self, status):
        self.send_response(status)
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', '0')
        self.end_headers()

    def do_GET(self):
        self.reply(204 if self.path == '/health' else 404)

    def do_POST(self):
        if self.path != '/api/cn-events':
            return self.reply(404)
        if self.headers.get('Origin') != 'https://doneat.com.cn':
            return self.reply(403)
        if self.headers.get('Transfer-Encoding'):
            return self.reply(400)
        try:
            length = int(self.headers.get('Content-Length', '0'))
        except ValueError:
            return self.reply(400)
        if not 0 < length <= 64:
            return self.reply(413)
        try:
            event = self.rfile.read(length).decode('ascii')
            if not record(event):
                return self.reply(400)
        except (UnicodeError, sqlite3.Error):
            return self.reply(503)
        self.reply(204)

class Server(HTTPServer):
    def get_request(self):
        conn, addr = super().get_request()
        conn.settimeout(3)
        return conn, addr

def prune(db=DB):
    with sqlite3.connect(db, timeout=2) as conn:
        conn.execute('CREATE TABLE IF NOT EXISTS events (day TEXT NOT NULL, event TEXT NOT NULL, count INTEGER NOT NULL, PRIMARY KEY(day,event))')
        cutoff = (datetime.now(CST).date() - timedelta(days=89)).isoformat()
        conn.execute('DELETE FROM events WHERE day < ?', (cutoff,))

if __name__ == '__main__':
    prune()
    server = Server(('127.0.0.1', 18092), Handler)
    server.timeout = 3600
    last_prune = time.monotonic()
    while True:
        server.handle_request()
        if time.monotonic() - last_prune >= 3600:
            prune()
            last_prune = time.monotonic()
