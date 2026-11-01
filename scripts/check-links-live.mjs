#!/usr/bin/env node
/** Explicit HTTP audit; uses curl so environment proxy/CA settings are retained.
 * npm run links:live -- --origin https://doneat.app --report /tmp/links.json
 * Does not follow redirects, crawl external sites, or change remote state.
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { writeFileSync } from 'node:fs';
import { documentLinks } from './check-links.mjs';
import { unescape } from 'html-escaper';
const exec = promisify(execFile);
const option = name => { const i = process.argv.indexOf(name); return i < 0 ? undefined : process.argv[i + 1]; };
const origin = new URL(option('--origin') || 'https://doneat.app').origin;
const reportPath = option('--report');
async function get(url) {
  try {
    const { stdout } = await exec('curl', ['-sS', '--max-time', '25', '-H', 'Accept-Language: en', '-w', '\n%{http_code}\t%{redirect_url}', url], { maxBuffer: 8 * 1024 * 1024 });
    const boundary = stdout.lastIndexOf('\n');
    const [status, location] = stdout.slice(boundary + 1).split('\t');
    return { url, status: Number(status), location, body: stdout.slice(0, boundary) };
  } catch (error) { return { url, status: 0, error: error.message, body: '' }; }
}
async function pool(items, fn) {
  let index = 0;
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (index < items.length) await fn(items[index++]);
  }));
}
const sitemap = await get(origin + '/sitemap-0.xml');
if (sitemap.status !== 200) throw new Error(`Cannot fetch sitemap: ${sitemap.status} ${sitemap.error || ''}`);
const pages = [...sitemap.body.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => unescape(m[1]));
if (!pages.length || pages.some(url => new URL(url).origin !== origin)) throw new Error('Empty or cross-origin sitemap; audit stopped');
const results = new Map(), references = new Map();
function reference(href, source, kind, lang) {
  const url = new URL(href, source);
  if (url.origin !== origin) return;
  url.hash = ''; // HTTP status applies to the shared target, not its fragment.
  const key = url.href;
  if (!references.has(key)) references.set(key, []);
  references.get(key).push({ source, kind, ...(lang ? { lang } : {}) });
}
await pool(pages, async url => {
  const result = await get(url);
  results.set(url, result);
  if (result.status !== 200) return;
  const doc = documentLinks(result.body);
  result.canonical = doc.canonical;
  for (const href of doc.links) reference(href, url, 'link');
  for (const alt of doc.alternates) reference(alt.href, url, 'alternate', alt.lang);
});
await pool([...references.keys()].filter(url => !results.has(url)), async url => results.set(url, await get(url)));
const expectedRedirects = [], failures = [];
for (const result of results.values()) {
  const refs = references.get(result.url) || [];
  if (result.status === 200) {
    if (pages.includes(result.url) && result.canonical !== result.url) failures.push({ url: result.url, issue: 'non-self canonical', canonical: result.canonical });
    continue;
  }
  const isHall = source => new URL(source).pathname.split('/').filter(Boolean).length === 1;
  const intentional = result.url === origin + '/' && result.status === 302 && result.location === origin + '/en' && refs.filter(r => r.kind === 'alternate').every(r => r.lang === 'x-default' && isHall(r.source));
  const item = { url: result.url, status: result.status, location: result.location, error: result.error, referringPages: [...new Set(refs.map(r => r.source))], references: refs };
  (intentional ? expectedRedirects : failures).push(item);
}
const report = { origin, checkedAt: new Date().toISOString(), sitemapPages: pages.length, checkedTargets: results.size, failures, expectedRedirects, pages: pages.map(url => ({ url, status: results.get(url).status })) };
if (reportPath) writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ ...report, pages: undefined }, null, 2));
if (failures.length) process.exitCode = 1;
