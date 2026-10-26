import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const origin = (process.env.SITE_ORIGIN || 'https://doneat.com.cn').replace(/\/$/, '');
const pages = ['download', 'privacy', 'about', 'faq', 'how-it-works'];
const allLocales = JSON.parse(readFileSync(new URL('../locales/hall.json', import.meta.url))).locales;
const read = path => readFileSync(join(dist, path), 'utf8');
for (const locale of allLocales.filter(locale => locale !== 'zh-CN')) {
  assert(!existsSync(join(dist, locale)), `Domestic build must omit ${locale}`);
}
for (const page of ['', ...pages]) {
  const path = page ? `zh-CN/${page}/index.html` : 'zh-CN/index.html';
  const html = read(path);
  assert(html.includes('<html lang="zh-CN"'), `${path}: Simplified Chinese`);
  assert(html.includes(`rel="canonical" href="${origin}/zh-CN${page ? `/${page}` : ''}"`), `${path}: domestic canonical`);
  assert(!/https?:\/\/(?:www\.)?(?:x|twitter)\.com\//.test(html), `${path}: no X links/structured data`);
  assert(!html.includes('name="twitter:'), `${path}: no X metadata`);
  assert(!html.includes('locale-switch-summary'), `${path}: no language switcher`);
  assert(html.includes('site-footer-filing'), `${path}: filing space reserved`);
  assert(html.includes('href="https://beian.mps.gov.cn/#/query/webSearch?code=31011202023803"'), `${path}: police filing query link`);
  assert(html.includes('沪公网安备31011202023803号'), `${path}: police filing number visible`);
  assert(!html.includes('/_vercel/insights') && !html.includes('navigator.sendBeacon'), `${path}: no Vercel or unserved beacon`);
  const alternates = [...html.matchAll(/hreflang="([^"]+)"/g)].map(match => match[1]);
  assert(alternates.length === 2 && alternates.every(locale => ['zh-CN', 'x-default'].includes(locale)), `${path}: real locale alternates only`);
  for (const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)/g)) {
    const target = match[1];
    if (target === '/') continue;
    assert(existsSync(join(dist, target)) || existsSync(join(dist, target, 'index.html')), `${path}: local asset/link ${target} exists`);
  }
}
const faq = read('zh-CN/faq/index.html');
const md = readFileSync(new URL('../src/content/pages/zh-CN/faq.md', import.meta.url), 'utf8');
assert.equal((faq.match(/"@type":"Question"/g) || []).length, (md.match(/\n## /g) || []).length);
assert(read('zh-CN/download/index.html').includes('SoftwareApplication'));
const sitemap = read('sitemap-0.xml');
assert.equal((sitemap.match(/<loc>/g) || []).length, 6, 'Only six real Chinese pages in sitemap');
assert(!sitemap.includes('doneat.app/') && sitemap.includes(`${origin}/zh-CN`));
assert(sitemap.includes(`hreflang="x-default" href="${origin}/zh-CN/faq"`));
assert(read('sitemap-index.xml').includes(`${origin}/sitemap-0.xml`));
assert.equal(read('robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap-index.xml\n`);
const nf = read('404.html');
assert(nf.includes('<html lang="zh-CN"') && nf.includes('noindex, nofollow') && !nf.includes('property="og:url"'));
for (const path of ['index.html', ...pages.map(page => `${page}/index.html`)]) {
  const html = read(path);
  assert(!html.includes('href="/en'), `${path}: alias only offers Chinese`);
}
const filing = (process.env.ICP_FILING_NUMBER || '').trim();
if (filing) {
  assert(read('zh-CN/index.html').includes('https://beian.miit.gov.cn/'), 'Real filing links to MIIT');
  assert(read('zh-CN/index.html').includes(filing), 'Real filing number is visible');
}
console.log('China build checks passed: routes, local links/assets, SEO, X removal, filing and analytics isolation');
