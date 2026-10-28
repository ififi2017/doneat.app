import { readFile, access, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
import { loadRelease } from './release.mjs';
const release = await loadRelease();

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, 'dist');
const routes = ['/android', '/android/buy', '/android/faq', '/android/privacy', '/android/refunds'];
const files = new Map();
let linksChecked = 0;
for (const route of routes) files.set(route, await readFile(path.join(out, route, 'index.html'), 'utf8'));
assert.deepEqual(await readdir(out), ['android'], 'Build must not replace domestic root files.');
for (const [route, html] of files) {
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${route}: exactly one h1`);
  assert.match(html, /<html lang="zh-CN">/);
  assert.ok(html.includes(`rel="canonical" href="https://doneat.com.cn${route}"`), `${route}: own canonical`);
  assert.match(html, /name="robots" content="noindex,follow"/, 'Keep the existing search-index policy; changing it is separate from APK delivery.');
  assert.ok(!/<script\b|<form\b|<iframe\b|localStorage|serviceWorker/i.test(html), `${route}: no trackers or fake payment forms`);
  assert.ok(html.includes('https://xhslink.cn/o/27s6TlLN00p'), `${route}: actual contact link`);
  assert.ok(html.includes('hello@doneat.app'), `${route}: support email`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, `${route}: no duplicate IDs`);
  for (const match of html.matchAll(/<[^>]+\b(?:href|src)="([^"]*)"[^>]*>/g)) {
    const [tag, href] = match;
    assert.ok(href && href !== '#', `${route}: no empty links`);
    if (href.startsWith('https://')) {
      if (tag.startsWith('<a ')) assert.match(tag, /rel="noopener noreferrer"/, `${route}: outbound link protection`);
      continue;
    }
    if (href.startsWith('mailto:')) continue;
    const url = new URL(href, `https://doneat.com.cn${route}`);
    const target = files.get(url.pathname);
    if (target) {
      if (url.hash) assert.ok(target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${route}: anchor ${href}`);
    } else await access(path.join(out, url.pathname));
    linksChecked++;
  }
}
const css = await readFile(path.join(out, 'android/assets/styles.css'), 'utf8');
assert.match(css, /prefers-color-scheme: dark/);
assert.match(css, /@media \(max-width: 639px\)/);
for (const match of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) await access(path.join(out, match[1]));
const landing = files.get('/android');
for (const value of [release.apkUrl, release.sourceUrl, release.apkSha256, release.certificateSha256, release.sourceCommit, `${release.versionName}（${release.versionCode}）`]) assert.ok(landing.includes(value), `Published landing must include ${value}`);
assert.equal([...landing.matchAll(/href="([^"]+\.apk)"/g)].filter(m => m[1] === release.apkUrl).length, 2, 'Hero and details must link to the same immutable APK');
for (const html of files.values()) assert.ok(!/正在测试|试用功能正在接入|功能开放后|试用开放后|暂不提供公开 APK|计划中的 APK 分发尚未启用/.test(html), 'No stale pre-release copy');
assert.ok(files.get('/android/privacy').includes('国内授权 API 通过 HTTPS 直连成都服务器'));
assert.ok(files.get('/android/privacy').includes('APK 通过 Cloudflare 分发'));
console.log(`PASS: ${routes.length} pages, ${linksChecked} local links/assets, immutable release/source metadata, contact links, unique anchors, no scripts/forms.`);
