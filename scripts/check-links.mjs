#!/usr/bin/env node
/** Offline graph validation. No network or deployment configuration changes. */
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, walkSync, ELEMENT_NODE } from 'ultrahtml';
import { unescape } from 'html-escaper';

export function documentLinks(html) {
  const links = [], alternates = [], ids = new Set();
  let canonical;
  walkSync(parse(html), node => {
    if (node.type !== ELEMENT_NODE) return;
    const a = Object.fromEntries(Object.entries(node.attributes).map(([k, v]) => [k, unescape(v)]));
    if (a.id) ids.add(a.id);
    if (node.name === 'a' && a.name) ids.add(a.name);
    if (node.name === 'a' && a.href) links.push(a.href);
    if (node.name === 'link' && a.rel === 'canonical') canonical = a.href;
    if (node.name === 'link' && a.rel === 'alternate' && a.hreflang) alternates.push({ lang: a.hreflang, href: a.href });
  });
  return { links, alternates, ids, canonical };
}

export function checkBuild(dist, origin) {
  const documents = new Map();
  function visit(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const file = join(dir, entry.name);
      if (entry.isDirectory()) visit(file);
      else if (entry.name.endsWith('.html')) {
        const rel = file.slice(dist.length).replaceAll('\\', '/');
        const path = rel.replace(/\/index\.html$/, '') || '/';
        const html = readFileSync(file, 'utf8');
        documents.set(path, { ...documentLinks(html), html, file });
      }
    }
  }
  visit(dist);
  const failures = [];
  function fail(message) { failures.push(message); }
  function localTarget(href, source, kind) {
    let url;
    try { url = new URL(href, origin + source); }
    catch { fail(`${source}: invalid ${kind} ${href}`); return; }
    if (url.origin !== origin) return;
    const pathname = decodeURIComponent(url.pathname);
    const doc = documents.get(pathname);
    const asset = resolve(dist, `.${pathname}`);
    const exists = doc || (asset.startsWith(dist + '/') && existsSync(asset) && statSync(asset).isFile());
    if (!exists) fail(`${source}: missing ${kind} ${href}`);
    if (url.hash && doc && !doc.ids.has(decodeURIComponent(url.hash.slice(1)))) fail(`${source}: missing anchor ${href}`);
    return { url, doc };
  }
  let alternateCount = 0;
  for (const [source, doc] of documents) {
    for (const href of doc.links) {
      if (/^(mailto:|tel:)/i.test(href)) continue;
      localTarget(href, source, 'link');
    }
    // Every public mailto (footer AND rendered Markdown) must survive the edge.
    const start = doc.html.indexOf('<!--email_off-->');
    const end = doc.html.indexOf('<!--/email_off-->');
    for (const match of doc.html.matchAll(/<a\b[^>]*href="mailto:[^"]*"[^>]*>/g)) {
      if (!(start >= 0 && start < match.index && end > match.index)) fail(`${source}: mailto outside email_off boundary`);
    }
    if (doc.html.includes('/cdn-cgi/l/email-protection')) fail(`${source}: edge email URL in build`);
    const langs = new Set();
    for (const alt of doc.alternates) {
      alternateCount++;
      if (langs.has(alt.lang)) fail(`${source}: duplicate alternate ${alt.lang}`);
      langs.add(alt.lang);
      // The ONLY intentional redirect alternate: hall x-default language picker.
      if (alt.lang === 'x-default' && alt.href === origin + '/' && /^\/[^/]+$/.test(source)) continue;
      const target = localTarget(alt.href, source, 'alternate');
      if (target && !target.doc) fail(`${source}: alternate is not a document ${alt.href}`);
      if (target?.doc && target.doc.canonical !== alt.href) fail(`${source}: alternate is not canonical ${alt.href}`);
      if (target?.doc && !target.doc.alternates.some(back => back.href === doc.canonical)) fail(`${source}: missing reciprocal alternate ${alt.href}`);
    }
  }
  const sitemap = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8');
  for (const row of sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = unescape(row[1].match(/<loc>(.*?)<\/loc>/)[1]);
    const target = localTarget(loc, '/', 'sitemap URL');
    const xmlAlternates = [...row[1].matchAll(/<xhtml:link\b[^>]*hreflang="([^"]+)"[^>]*href="([^"]+)"/g)].map(m => ({ lang: unescape(m[1]), href: unescape(m[2]) }));
    if (target?.doc) {
      if (target.doc.canonical !== loc) fail(`sitemap: noncanonical URL ${loc}`);
      const sort = links => links.map(a => `${a.lang} ${a.href}`).sort();
      if (JSON.stringify(sort(xmlAlternates)) !== JSON.stringify(sort(target.doc.alternates))) fail(`sitemap/HTML alternates differ: ${loc}`);
    }
  }
  assert.equal(failures.length, 0, failures.join('\n'));
  console.log(`Link graph passed: ${documents.size} HTML files, ${alternateCount} alternates; links, anchors, reciprocity, sitemap and public email boundaries`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const dist = fileURLToPath(new URL('../dist', import.meta.url));
  const origin = process.env.SITE_REGION === 'cn' ? (process.env.SITE_ORIGIN || 'https://doneat.com.cn').replace(/\/$/, '') : 'https://doneat.app';
  checkBuild(dist, origin);
}
