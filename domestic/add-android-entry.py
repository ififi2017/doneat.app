#!/usr/bin/env python3
"""Patch only the published domestic static snapshot; never the international build.
Pass a NEW release directory copied from the current domestic root. Caller switches
its symlink only after validating the new snapshot. The existing snapshot is untouched.
"""
from pathlib import Path
import argparse,re
p=argparse.ArgumentParser();p.add_argument('root',type=Path);args=p.parse_args()
files=[args.root/'zh-CN'/name/'index.html' for name in ['','download','faq','about','privacy','how-it-works']]
for f in files:
 s=f.read_text()
 if 'data-cn-android-entry' in s:raise SystemExit('Snapshot already contains Android entry; review before reapplying')
 n=0
 def nav(m):
  global n
  text=m.group()
  pat=r'(<a\b[^>]*href="/zh-CN/download"[^>]*>)下载</a>'
  def link(x):
   global n
   n+=1
   new=x.group(1).replace('href="/zh-CN/download"','href="/android" data-cn-android-entry')
   return x.group()+new+'Android</a>'
  return re.sub(pat,link,text)
 s=re.sub(r'<nav\b.*?</nav>',nav,s,flags=re.S)
 if n!=2:raise SystemExit(f'Expected desktop/mobile download nav in {f}; got {n}')
 # Unlink to avoid modifying prior release if caller used hard links.
 mode=f.stat().st_mode & 0o777;f.unlink();f.write_text(s);f.chmod(mode)
 print(f.relative_to(args.root),n)
