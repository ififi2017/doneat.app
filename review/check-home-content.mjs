// Generated HTML and compiled CSS checks only. No rendered/browser claim.
// Run after build: node --experimental-strip-types review/check-home-content.mjs
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";
import * as cssSelect from "css-select";
import * as cssTree from "css-tree";
import { homeStory } from "../src/lib/home-story.ts";
import { mediaCopy } from "../src/lib/media-copy.ts";
import { homeDemo } from "../src/lib/home-demo.ts";
const hallCopy = JSON.parse(readFileSync(new URL("../locales/hall.json", import.meta.url), "utf8"));

const repo = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const documents = JSON.parse(execFileSync("python3", [resolve(repo, "review/parse-built-home.py"), repo], { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 }));
const text = (node) => node?.type === "text" ? node.data : (node?.children ?? []).map(text).join("");
const clean = (node) => text(node).replace(/\s+/g, " ").trim();
const one = (selector, doc) => { const node = cssSelect.selectOne(selector, doc); assert(node, `missing ${selector}`); return node; };
const all = (selector, doc) => cssSelect.selectAll(selector, doc);
function connect(node, parent = null) {
  node.parent = parent;
  (node.children ?? []).forEach((child, i, siblings) => {
    child.prev = siblings[i - 1] ?? null;
    child.next = siblings[i + 1] ?? null;
    connect(child, node);
  });
}

// Specificity is measured on the actual compiler-expanded selectors.
function specificity(selector) {
  const score = [0, 0, 0];
  cssTree.walk(cssTree.parse(selector, { context: "selector" }), (n) => {
    if (n.type === "IdSelector") score[0]++;
    if (["ClassSelector", "AttributeSelector", "PseudoClassSelector"].includes(n.type)) score[1]++;
    if (n.type === "TypeSelector" && n.name !== "*") score[2]++;
    if (n.type === "PseudoElementSelector") score[2]++;
  });
  return score;
}
function stylesheetRules(doc) {
  const rules = [];
  for (const link of all('link[rel="stylesheet"]', doc)) {
    const href = link.attribs.href;
    if (!href.startsWith("/")) continue;
    const css = postcss.parse(readFileSync(resolve(repo, "dist", href.slice(1)), "utf8"));
    css.walkRules((rule) => {
      const media = [], layers = [];
      for (let p = rule.parent; p; p = p.parent) {
        if (p.type === "atrule" && p.name === "media") media.push(p.params);
        if (p.type === "atrule" && p.name === "layer") layers.push(p.params);
      }
      rule.walkDecls((decl) => {
        if (decl.prop !== "color" && !decl.prop.startsWith("--")) return;
        for (const selector of rule.selectors) rules.push({ selector, property: decl.prop, value: decl.value, important: decl.important, media, layered: layers.length > 0, source: href, order: rules.length });
      });
    });
  }
  return rules;
}
function winner(node, property, rules, dark, hover) {
  const candidates = rules.filter((r) => {
    if (r.property !== property) return false;
    if (r.media.some((m) => /prefers-color-scheme\s*:\s*dark/.test(m) && !dark)) return false;
    if (r.media.some((m) => /prefers-color-scheme\s*:\s*light/.test(m) && dark)) return false;
    if (/:(focus|active|visited|disabled)/.test(r.selector)) return false;
    if (r.selector.includes(":hover") && !hover) return false;
    try { return cssSelect.is(node, r.selector.replace(/:hover/g, "")); } catch { return false; }
  }).map((r) => ({ ...r, specificity: specificity(r.selector) }));
  candidates.sort((a, b) => {
    if (Boolean(a.important) !== Boolean(b.important)) return Number(Boolean(a.important)) - Number(Boolean(b.important));
    if (a.layered !== b.layered) return Number(!a.layered) - Number(!b.layered);
    for (let i = 0; i < 3; i++) if (a.specificity[i] !== b.specificity[i]) return a.specificity[i] - b.specificity[i];
    return a.order - b.order;
  });
  return candidates.at(-1);
}
function inheritedToken(node, name, rules, dark, hover) {
  for (let element = node; element; element = element.parent) {
    if (element.type !== "tag") continue;
    const rule = winner(element, name, rules, dark, hover);
    if (rule) return rule;
  }
}
function footerColor(node, rules, dark, hover) {
  const rule = winner(node, "color", rules, dark, hover);
  if (!rule || rule.value === "inherit") return footerColor(node.parent, rules, dark, hover);
  const variable = /^var\(\s*(--[\w-]+)/.exec(rule.value)?.[1];
  if (!variable) return { color: rule.value, rule };
  const token = inheritedToken(node, variable, rules, dark, hover);
  assert(token, `missing inherited footer token ${variable}`);
  let color = token.value;
  const chain = [variable];
  while (/^var\(/.test(color)) {
    const name = /^var\(\s*(--[\w-]+)/.exec(color)?.[1];
    assert(name && !chain.includes(name), `invalid footer token chain ${chain}`);
    chain.push(name);
    const next = inheritedToken(node, name, rules, dark, hover);
    assert(next, `missing footer token ${name}`);
    color = next.value;
  }
  return { color, rule, token };
}

const results = [], cascade = [];
for (const { locale, document: doc } of documents) {
  connect(doc);
  const copy = homeStory(locale), media = mediaCopy(locale), demo = homeDemo(locale);
  assert(Object.values(copy).every((s) => typeof s === "string" && s.trim()), `${locale}: missing story`);
  assert(Object.values(media).every((s) => typeof s === "string" && s.trim()), `${locale}: missing control`);
  assert.equal(one("html", doc).attribs.lang, locale);
  assert.equal(one("html", doc).attribs.dir, locale === "ar" ? "rtl" : "ltr");
  assert.equal(all("h1", doc).length, 1);
  const headings = all("#shift-title>span", doc).map(clean);
  assert.deepEqual(headings, [copy.headlineWork, copy.headlineLife]);
  for (const [selector, value] of [["#proof-title", copy.proofTitle], [".proof-copy>p", copy.proofBody], ["#carry-title", copy.carryTitle], [".carry-heading>p", copy.carryBody], ["#get-title", copy.getTitle], [".get-layout>div>p", copy.getBody], [".proof-device>figcaption", `${hallCopy.functionalSubtitle[locale]} · iPhone`]]) assert.equal(clean(one(selector, doc)), value, `${locale}: ${selector}`);
  if (locale !== "en") {
    for (const key of ["headlineWork", "headlineLife", "proofBody", "carryBody", "getBody", "recording"]) assert.notEqual(copy[key], homeStory("en")[key], `${locale}: English fallback ${key}`);
    for (const key of ["pause", "play", "brand"]) assert.notEqual(media[key], mediaCopy("en")[key], `${locale}: English control fallback ${key}`);
  }
  const control = one("[data-media-control]", doc);
  assert.equal(control.attribs["data-pause"], media.pause);
  assert.equal(control.attribs["data-play"], media.play);
  assert.equal(control.attribs["aria-pressed"], "false");
  assert(Object.hasOwn(control.attribs, "hidden"), `${locale}: NoJS control must be hidden`);
  assert.equal(clean(one("[data-media-control]>span", doc)), media.pause);
  assert.equal(one("[data-brand-dot]", doc).attribs["aria-label"], media.brand);
  assert.equal(one("[data-brand-dot]", doc).attribs["aria-hidden"], "true");
  const alts = [one('.carry-widgets[role="img"]', doc).attribs["aria-label"], one(".watch-screen img", doc).attribs.alt];
  assert.deepEqual(alts, [copy.widgetsAlt, copy.watchAlt]);
  assert.equal(all(".carry-gallery figure img", doc).length, 5);
  assert(all(".carry-widgets img, .watch-frame img", doc).every((image) => image.attribs.alt === ""));
  assert.equal(all(".shift-cut, .carry-divider", doc).length, 0);
  assert.notEqual(alts[0], alts[1]);
  assert(!alts.includes(copy.carryBody));
  assert.equal(one(".shift-ticket", doc).attribs["aria-label"], demo.day);
  assert.equal(one("[data-shift-now]", doc).attribs.dir, "ltr");
  assert.equal(clean(one("[data-shift-now]", doc)), "13:00");
  assert.equal(clean(one("[data-shift-left]", doc)), "04:00");
  assert.equal(clean(one("[data-shift-replay]", doc)), `${demo.replay}↺`);
  assert(Object.hasOwn(one("[data-shift-replay]", doc).attribs, "hidden"));
  assert.deepEqual(all(".ticket-label>span", doc).map(clean), [`${copy.clockIn} 09:00`, `${copy.clockOut} 17:00`]);
  const expectedDownload = `/${locale.startsWith("zh") ? "zh-CN" : "en"}/download`;
  for (const link of all('[data-track="download_page_open"]', doc)) assert.equal(link.attribs.href, expectedDownload);
  assert(all('[data-track="download_page_open"]', doc).length >= 2);
  for (const link of all('[data-track="web_timer_open"]', doc)) assert.equal(new URL(link.attribs.href).pathname, `/${locale}`);
  assert.equal(one('link[rel="canonical"]', doc).attribs.href, `https://doneat.app/${locale}`);
  assert.equal(one('link[hreflang="x-default"]', doc).attribs.href, "https://doneat.app/");
  assert.equal(all('.shift-hero [data-device-hero]', doc).length, 0);
  assert.equal(all('.proof-device [data-device-hero]', doc).length, 1);
  assert.equal(all('video source', doc).length, 0);
  const stem = locale.startsWith("zh") ? "zh" : "en";
  const sources = all('video[data-src]', doc).map((n) => n.attribs["data-src"]);
  assert(sources.every((s) => s.startsWith(`/device/web/${stem}-`)));
  for (const s of sources) assert(existsSync(resolve(repo, "dist", s.slice(1))));
  const languageLinks = all('.locale-switch-menu a', doc);
  assert.equal(languageLinks.length, 19, `${locale}: language menu coverage`);
  for (const link of languageLinks) {
    const target = link.attribs.href.split("?")[0].replace(/^\//, "");
    assert(existsSync(resolve(repo, "dist", target, "index.html")), `${locale}: missing language target ${target}`);
  }
  const rules = stylesheetRules(doc);
  for (const dark of [false, true]) for (const hover of [false, true]) for (const selector of [".site-footer-nav a", ".site-social"]) {
    const trace = footerColor(one(selector, doc), rules, dark, hover);
    assert.equal(trace.color.toLowerCase(), hover ? "#ff9a45" : "#fff1d8", `${locale}: footer ${dark}/${hover}/${selector}`);
    cascade.push({ locale, mode: dark ? "dark" : "light", state: hover ? "hover" : "normal", target: selector, color: trace.color, winningSelector: trace.rule.selector, specificity: trace.rule.specificity, tokenSelector: trace.token?.selector, tokenValue: trace.token?.value, source: trace.rule.source });
  }
  results.push({ locale, dir: locale === "ar" ? "rtl" : "ltr", storyFields: Object.keys(copy).length, controlFields: Object.keys(media).length, headlines: headings, pause: media.pause, play: media.play, widgetsAlt: alts[0], watchAlt: alts[1], canonical: `https://doneat.app/${locale}`, download: expectedDownload, recordingStem: stem, status: "static checks passed" });
}
assert.equal(results.length, 19);
writeFileSync(resolve(repo, "review/home-v2-localization-results.json"), JSON.stringify({ kind: "generated HTML/source checks; no browser execution", locales: results }, null, 2) + "\n");
writeFileSync(resolve(repo, "review/home-v2-footer-cascade.json"), JSON.stringify({ kind: "compiled selector matching, specificity and inherited-token analysis; no browser computed style", cases: cascade }, null, 2) + "\n");
console.log(`19 locale HTML checks passed; ${cascade.length} compiled footer color cases passed`);
