import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkBuild, documentLinks } from './check-links.mjs';
const origin = 'https://doneat.app';
function fixture(fn) {
  const dist = mkdtempSync(join(tmpdir(), 'doneat-links-'));
  const put = (path, html) => { mkdirSync(join(dist, path, '..'), { recursive: true }); writeFileSync(join(dist, path), html); };
  try { put('sitemap-0.xml', '<urlset></urlset>'); fn(dist, put); }
  finally { rmSync(dist, { recursive: true, force: true }); }
}
test('HTML parser decodes query strings and ignores commented links', () => {
  const doc = documentLinks('<a href="/en?q=a&amp;b=c">ok</a><!-- <a href="/missing"> -->');
  assert.deepEqual(doc.links, ['/en?q=a&b=c']);
});
test('shared broken targets and missing fragments fail offline', () => fixture((dist, put) => {
  put('en/index.html', '<a href="/cdn-cgi/l/email-protection#abc">contact</a>');
  assert.throws(() => checkBuild(dist, origin), /missing link/);
  put('en/index.html', '<a href="/en#missing">anchor</a>');
  assert.throws(() => checkBuild(dist, origin), /missing anchor/);
}));
test('alternates require a canonical page and reciprocal return link', () => fixture((dist, put) => {
  put('en/index.html', '<link rel="canonical" href="https://doneat.app/en"><link rel="alternate" hreflang="ja" href="https://doneat.app/ja">');
  put('ja/index.html', '<link rel="canonical" href="https://doneat.app/ja">');
  assert.throws(() => checkBuild(dist, origin), /missing reciprocal/);
  put('ja/index.html', '<link rel="canonical" href="https://doneat.app/en"><link rel="alternate" hreflang="en" href="https://doneat.app/en">');
  assert.throws(() => checkBuild(dist, origin), /not canonical/);
}));
test('only the hall x-default root is exempt; public mailto needs literal boundaries', () => fixture((dist, put) => {
  put('en/index.html', '<link rel="alternate" hreflang="x-default" href="https://doneat.app/"><a href="mailto:hello@doneat.app">Contact</a>');
  assert.throws(() => checkBuild(dist, origin), /mailto outside/);
  put('en/index.html', '<link rel="alternate" hreflang="x-default" href="https://doneat.app/"><!--email_off--><a href="mailto:hello@doneat.app">Contact</a><!--/email_off-->');
  checkBuild(dist, origin);
  put('en/index.html', '<link rel="alternate" hreflang="en" href="https://doneat.app/">');
  assert.throws(() => checkBuild(dist, origin), /missing alternate/);
}));
test('sitemap alternates must match HTML', () => fixture((dist, put) => {
  put('en/index.html', '<link rel="canonical" href="https://doneat.app/en">');
  put('sitemap-0.xml', '<urlset><url><loc>https://doneat.app/en</loc><xhtml:link hreflang="ja" href="https://doneat.app/ja"/></url></urlset>');
  assert.throws(() => checkBuild(dist, origin), /sitemap\/HTML alternates differ/);
}));
