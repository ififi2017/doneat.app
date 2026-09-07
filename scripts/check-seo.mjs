#!/usr/bin/env node
/**
 * Post-build SEO checks against dist/. Run: npm run build && node scripts/check-seo.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "..", "dist");

function read(rel) {
  const path = join(dist, rel);
  if (!existsSync(path)) {
    throw new Error(`missing ${rel}`);
  }
  return readFileSync(path, "utf8");
}

function assert(cond, message) {
  if (!cond) throw new Error(message);
}

function count(haystack, needle) {
  return haystack.split(needle).length - 1;
}

const robots = read("robots.txt");
assert(robots.includes("Sitemap: https://doneat.app/sitemap-index.xml"), "robots sitemap URL");
assert(robots.includes("Allow: /"), "robots Allow");

const indexXml = read("sitemap-index.xml");
assert(indexXml.includes("https://doneat.app/sitemap-0.xml"), "sitemap index lists sitemap-0");

const sitemap0 = read("sitemap-0.xml");
assert(sitemap0.includes('hreflang="x-default"'), "sitemap hall/content x-default");
assert(sitemap0.includes('hreflang="x-default" href="https://doneat.app/en"'), "hall x-default points at /en");
assert(sitemap0.includes("https://doneat.app/en/faq"), "faq in sitemap");
assert(sitemap0.includes("https://doneat.app/zh-CN/faq"), "zh-CN faq in sitemap");
assert(!sitemap0.includes("https://doneat.app/ja/faq"), "do not list bounce faq URLs");

const enHall = read("en/index.html");
assert(enHall.includes('hreflang="x-default"'), "hall HTML x-default");
assert(enHall.includes('href="https://doneat.app/en"'), "hall self URL");
assert(enHall.includes('"@type":"Organization"') || enHall.includes('"@type": "Organization"'), "Organization JSON-LD");
assert(
  enHall.includes('"@type":"SoftwareApplication"') || enHall.includes('"@type": "SoftwareApplication"'),
  "SoftwareApplication JSON-LD",
);
assert(enHall.includes('rel="canonical" href="https://doneat.app/en"'), "en canonical");

const zhHall = read("zh-CN/index.html");
assert(zhHall.includes('rel="canonical" href="https://doneat.app/zh-CN"'), "zh-CN canonical");
assert(zhHall.includes('hreflang="x-default"'), "zh-CN hall x-default");

const jaHall = read("ja/index.html");
assert(jaHall.includes('rel="canonical" href="https://doneat.app/ja"'), "ja canonical");
assert(jaHall.includes('hreflang="x-default"'), "ja hall x-default");

const enFaq = read("en/faq/index.html");
const zhFaq = read("zh-CN/faq/index.html");
const enFaqMd = readFileSync(join(root, "../src/content/pages/en/faq.md"), "utf8");
const zhFaqMd = readFileSync(join(root, "../src/content/pages/zh-CN/faq.md"), "utf8");
const enQuestions = count(enFaqMd, "\n## ");
const zhQuestions = count(zhFaqMd, "\n## ");
assert(enQuestions >= 8, "en FAQ has visible questions");
assert(count(enFaq, '"@type":"Question"') === enQuestions, "en FAQPage question count matches markdown");
assert(count(zhFaq, '"@type":"Question"') === zhQuestions, "zh-CN FAQPage question count matches markdown");
assert(enFaq.includes("FAQPage"), "en FAQPage");
assert(enFaq.includes("What is DoneAt?"), "en FAQ question in JSON-LD");
assert(enFaq.includes('rel="canonical" href="https://doneat.app/en/faq"'), "en faq canonical");
assert(!enFaq.includes('hreflang="ja"'), "faq must not claim ja");
assert(zhFaq.includes("FAQPage"), "zh-CN FAQPage");
assert(zhFaq.includes("DoneAt 是什么？"), "zh-CN FAQ question in JSON-LD");
assert(zhFaq.includes('rel="canonical" href="https://doneat.app/zh-CN/faq"'), "zh-CN faq canonical");

const enDownload = read("en/download/index.html");
assert(
  enDownload.includes("SoftwareApplication") || enDownload.includes("softwareApplication"),
  "download SoftwareApplication",
);

const notFound = read("404.html");
assert(notFound.includes("noindex, nofollow") || notFound.includes("noindex,nofollow"), "404 noindex");
assert(!notFound.includes('property="og:url"'), "404 must omit og:url");

const sitemapXml = join(dist, "sitemap.xml");
const sitemapRedirect =
  existsSync(sitemapXml) ||
  existsSync(join(dist, "sitemap.xml.html")) ||
  existsSync(join(dist, "sitemap.xml/index.html"));
if (!sitemapRedirect) {
  console.warn("note: no sitemap.xml artifact in dist; Vercel 301 in vercel.json still applies on deploy");
}

assert(count(sitemap0, 'hreflang="x-default"') >= 19, "x-default on hall (and content) sitemap rows");

console.log("seo checks passed");
