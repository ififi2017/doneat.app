import gzip
import sqlite3
import tempfile
import unittest
from datetime import datetime, timedelta
from pathlib import Path
from collector import record, CST
from export import parse, render

class AnalyticsTests(unittest.TestCase):
    def test_aggregate_only_and_retention(self):
        with tempfile.TemporaryDirectory() as tmp:
            db = str(Path(tmp)/'events.sqlite')
            now = datetime(2026,11,4,12,tzinfo=CST)
            self.assertFalse(record('private?token=abc', db, now))
            self.assertFalse(Path(db).exists())
            record('hall_view', db, now-timedelta(days=90))
            record('hall_view', db, now)
            record('hall_view', db, now)
            with sqlite3.connect(db) as conn:
                self.assertEqual(conn.execute('SELECT * FROM events').fetchall(), [('2026-11-04','hall_view',2)])
                self.assertEqual([r[1] for r in conn.execute('PRAGMA table_info(events)')], ['day','event','count'])

    def test_logs_rotation_status_and_privacy(self):
        with tempfile.TemporaryDirectory() as tmp:
            line = '192.0.2.1 - - [04/Nov/2026:12:00:00 +0800] "GET /zh-CN?private=value HTTP/1.1" 200 123 "secret-referrer" "secret-ua"\n'
            Path(tmp,'doneat-cn.access.log').write_text(line)
            with gzip.open(Path(tmp,'doneat-cn.access.log.2.gz'), 'wt') as f:
                f.write(line.replace('/zh-CN?private=value','/.env').replace('200 123','404 2'))
            data=render(tmp, str(Path(tmp,'missing.sqlite')), datetime(2026,11,4,12,1,tzinfo=CST))
            self.assertIn('category="suspected_scan",status="4xx"} 1',data)
            self.assertIn('origin_bytes_5m 125',data)
            for secret in ['192.0.2.1','private','secret-referrer','secret-ua','/.env']:
                self.assertNotIn(secret,data)
            self.assertIsNone(parse(line.replace('/zh-CN?private=value','/api/cn-events')))
            self.assertIsNone(parse('garbage'))

    def test_cst_day_boundary(self):
        line = 'x - - [03/Nov/2026:16:01:00 +0000] "GET /android HTTP/1.1" 200 1 "-" "-"'
        self.assertEqual(parse(line)[0].date().isoformat(), '2026-11-04')

if __name__ == '__main__': unittest.main()
