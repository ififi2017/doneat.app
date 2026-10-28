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
assert.deepEqual((await readdir(out)).sort(), ['_astro','android','brand','favicon.ico','favicon.svg','fonts','icons'].sort(), 'Only Android routes and shared assets may be packaged.');
for (const [route, html] of files) {
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${route}: exactly one h1`);
  assert.match(html, /<html lang="zh-CN" dir="ltr">/);
  assert.ok(html.includes(`rel="canonical" href="https://doneat.com.cn${route}"`), `${route}: own canonical`);
  assert.match(html, /name="robots" content="noindex, follow"/, 'Keep the existing search-index policy; changing it is separate from APK delivery.');
  assert.ok(!/<form\b|<iframe\b|localStorage|serviceWorker|_vercel\/insights|data-track-page=/i.test(html), `${route}: no trackers or fake payment forms`);
  assert.ok(html.includes('https://xhslink.cn/o/27s6TlLN00p'), `${route}: actual contact link`);
  assert.ok(html.includes('hello@doneat.app'), `${route}: support email`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, `${route}: no duplicate IDs`);
  for (const match of html.matchAll(/<[^>]+\b(?:href|src)="([^"]*)"[^>]*>/g)) {
    const [tag, href] = match;
    assert.ok(href && href !== '#', `${route}: no empty links`);
    if (href.startsWith('https://')) {
      if (tag.includes('target="_blank"')) assert.match(tag, /rel="[^"]*noopener noreferrer[^"]*"/, `${route}: outbound link protection`);
      continue;
    }
    if (href.startsWith('mailto:')) continue;
    const url = new URL(href, `https://doneat.com.cn${route}`);
    const target = files.get(url.pathname);
    if (target) {
      if (url.hash) assert.ok(target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${route}: anchor ${href}`);
    } else if (!url.pathname.startsWith('/zh-CN')) await access(path.join(out, url.pathname));
    linksChecked++;
  }
}
assert.ok([...files.values()].every(html => html.includes('site-header') && html.includes('site-footer') && html.includes('Powered by Astro')), 'Shared Astro shell');
const landing = files.get('/android');
for (const value of [release.apkUrl, release.sourceUrl, release.apkSha256, release.certificateSha256, release.sourceCommit, `${release.versionName}（${release.versionCode}）`]) assert.ok(landing.includes(value), `Published landing must include ${value}`);
assert.equal([...landing.matchAll(/href="([^"]+\.apk)"/g)].filter(m => m[1] === release.apkUrl).length, 2, 'Hero and details must link to the same immutable APK');
for (const html of files.values()) assert.ok(!/正在测试|试用功能正在接入|功能开放后|试用开放后|暂不提供公开 APK|计划中的 APK 分发尚未启用/.test(html), 'No stale pre-release copy');
assert.ok(files.get('/android/privacy').includes('国内授权 API 通过 HTTPS 直连成都服务器'));
assert.ok(files.get('/android/privacy').includes('APK 和公开版本信息通过 Cloudflare 分发'));
console.log(`PASS: ${routes.length} pages, ${linksChecked} local links/assets, immutable release/source metadata, contact links, unique anchors, no analytics/forms; shared Astro shell.`);

const repoDist = path.resolve(here, '../dist');
const allLocales = JSON.parse(await readFile(path.resolve(here, '../locales/hall.json'), 'utf8')).locales;
const locales = process.env.SITE_REGION === 'cn' ? ['zh-CN'] : allLocales;
for (const locale of locales) {
  const download = await readFile(path.join(repoDist, locale, 'download/index.html'), 'utf8');
  const china = process.env.SITE_REGION === 'cn';
  assert.equal(download.includes('mainland-android-heading'), !china && locale === 'zh-CN', `${locale}: only global Simplified Chinese shows the mainland hint`);
  assert.equal(/<a\b[^>]*class="[^"]*android-download-badge/.test(download), china, `${locale}: domestic Android badge`);
  if (china) {
    assert.ok(download.includes('href="/android"'), 'Domestic badge opens the dedicated Android page');
    assert.match(download, /class="police-filing"[^>]*>[\s\S]*?<img[^>]+police-filing/, 'Police filing includes the official icon');
  }
  if (!china && locale !== 'zh-CN') assert.ok(!download.includes('href="https://doneat.com.cn/android"'), `${locale}: no mainland download prompt`);
}
const sitemap = await readFile(path.join(repoDist, 'sitemap-0.xml'), 'utf8');
assert.ok(!sitemap.includes('https://doneat.app/android'), 'Domestic canonical routes stay out of international sitemap');
console.log(`PASS: ${locales.length} download entries and domestic sitemap separation.`);

assert.ok(files.get('/android/privacy').includes('不发送设备标识、激活码、会员凭据、薪资或工作记录'));
assert.ok(files.get('/android').includes('设置 → 关于 → 检查更新'));

assert.ok(files.get('/android').includes('id="changelog"'));
assert.ok(files.get('/android/privacy').includes('每 24 小时最多请求一次'));
