import hall from "../../locales/hall.json";
import {
  contentLocaleFor,
  isContentPage,
  isHallLocale,
  type HallLocale,
} from "./config";

const HALL_CODES = hall.locales as HallLocale[];

/** Lowercase BCP 47 tags that are not themselves hall locales. */
const LANGUAGE_MAPPING: Record<string, HallLocale> = {
  zh: "zh-CN",
  "zh-hans": "zh-CN",
  "zh-hans-cn": "zh-CN",
  "zh-hans-sg": "zh-CN",
  "zh-hans-hk": "zh-CN",
  "zh-hans-mo": "zh-CN",
  "zh-sg": "zh-CN",
  "zh-hant": "zh-TW",
  "zh-hant-tw": "zh-TW",
  "zh-hant-hk": "zh-HK",
  "zh-hant-mo": "zh-HK",
  "zh-mo": "zh-HK",
  yue: "zh-HK",
  hi: "hi-IN",
  mr: "mr-IN",
};

function canonicalHallLocale(code: string): HallLocale | null {
  const lower = code.toLowerCase();
  return HALL_CODES.find((locale) => locale.toLowerCase() === lower) ?? null;
}

export function mapLanguageTag(tag: string): HallLocale | null {
  const normalized = tag.trim().replace(/_/g, "-");
  if (!normalized) return null;
  const lower = normalized.toLowerCase();

  const exact = canonicalHallLocale(lower);
  if (exact) return exact;

  const mapped = LANGUAGE_MAPPING[lower];
  if (mapped) return mapped;

  const parts = lower.split("-");
  for (let i = parts.length - 1; i > 0; i -= 1) {
    const prefix = parts.slice(0, i).join("-");
    const prefixExact = canonicalHallLocale(prefix);
    if (prefixExact) return prefixExact;
    if (LANGUAGE_MAPPING[prefix]) return LANGUAGE_MAPPING[prefix];
  }

  return LANGUAGE_MAPPING[parts[0]] ?? null;
}

export function parseAcceptLanguage(header: string | null | undefined): string[] {
  if (!header) return [];
  return header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      let q = 1;
      for (const param of params) {
        const [key, value] = param.trim().split("=");
        if (key === "q" && value) q = Number(value);
      }
      return { tag: tag.trim(), q: Number.isFinite(q) ? q : 0 };
    })
    .filter((row) => row.tag.length > 0 && row.tag !== "*" && row.q > 0)
    .sort((a, b) => b.q - a.q)
    .map((row) => row.tag);
}

export function negotiateHallLocale(tags: readonly string[]): HallLocale {
  for (const tag of tags) {
    const mapped = mapLanguageTag(tag);
    if (mapped) return mapped;
  }
  return "en";
}

export function localeFromAcceptLanguage(header: string | null | undefined): HallLocale {
  return negotiateHallLocale(parseAcceptLanguage(header));
}

export function localeFromPathname(pathname: string): HallLocale | null {
  const segment = pathname.split("/").filter(Boolean)[0];
  if (!segment) return null;
  return canonicalHallLocale(segment);
}

function pickerRuntimeJs(): string {
  return `var locales=${JSON.stringify(HALL_CODES)};
  var mapping=${JSON.stringify(LANGUAGE_MAPPING)};
  function canonical(code){
    var lower=String(code).toLowerCase();
    for (var i=0;i<locales.length;i++) if (locales[i].toLowerCase()===lower) return locales[i];
    return null;
  }
  function mapTag(tag){
    var normalized=String(tag||"").trim().replace(/_/g,"-");
    if (!normalized) return null;
    var lower=normalized.toLowerCase();
    var exact=canonical(lower);
    if (exact) return exact;
    if (mapping[lower]) return mapping[lower];
    var parts=lower.split("-");
    for (var i=parts.length-1;i>0;i--) {
      var prefix=parts.slice(0,i).join("-");
      var prefixExact=canonical(prefix);
      if (prefixExact) return prefixExact;
      if (mapping[prefix]) return mapping[prefix];
    }
    return mapping[parts[0]]||null;
  }
  function fromPath(path){
    var parts=String(path||"").split("/");
    for (var i=0;i<parts.length;i++) if (parts[i]) return canonical(parts[i]);
    return null;
  }
  function fromBrowser(){
    var tags=(navigator.languages&&navigator.languages.length)
      ? [].slice.call(navigator.languages)
      : [navigator.language||""];
    for (var i=0;i<tags.length;i++) {
      var mapped=mapTag(tags[i]);
      if (mapped) return mapped;
    }
    return "en";
  }
  function contentLocale(hall){
    return hall==="zh-CN"||hall==="zh-TW"||hall==="zh-HK"?"zh-CN":"en";
  }`;
}

export function normalizePathname(pathname: string): string {
  if (!pathname) return "/";
  const withSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (withSlash.length > 1 && withSlash.endsWith("/")) {
    return withSlash.slice(0, -1);
  }
  return withSlash;
}

/** New pathname when a short or hall-prefixed URL should open a real page; otherwise null. */
export function resolveLocaleRedirectPath(
  pathname: string,
  acceptLanguage: string | null | undefined,
): string | null {
  const path = normalizePathname(pathname);
  const segments = path.split("/").filter(Boolean);
  const hall = localeFromAcceptLanguage(acceptLanguage);

  if (segments.length === 0) {
    return `/${hall}`;
  }

  if (segments.length === 1 && isContentPage(segments[0])) {
    return `/${contentLocaleFor(hall)}/${segments[0]}`;
  }

  if (
    segments.length === 2 &&
    isHallLocale(segments[0]) &&
    isContentPage(segments[1])
  ) {
    const dest = contentLocaleFor(segments[0]);
    if (segments[0] !== dest) {
      return `/${dest}/${segments[1]}`;
    }
  }

  return null;
}

export function localeRedirectInlineScript(): string {
  return `(function(){
  ${pickerRuntimeJs()}
  var locale=fromBrowser();
  location.replace("/"+locale+location.search+location.hash);
})();`;
}

export function contentPageRedirectInlineScript(page: string): string {
  return `(function(){
  ${pickerRuntimeJs()}
  var locale=contentLocale(fromBrowser());
  location.replace("/"+locale+"/"+${JSON.stringify(page)}+location.search+location.hash);
})();`;
}

export type NotFoundCopy = {
  title: string;
  heading: string;
  body: string;
  home: string;
  timer: string;
};

export function notFoundApplyInlineScript(
  copy: Record<string, NotFoundCopy>,
  webAppOrigin: string,
): string {
  return `(function(){
  ${pickerRuntimeJs()}
  var copy=${JSON.stringify(copy)};
  var web=${JSON.stringify(webAppOrigin)};
  var locale=fromPath(location.pathname)||fromBrowser();
  var c=copy[locale]||copy.en;
  document.documentElement.lang=locale;
  document.documentElement.dir=locale==="ar"?"rtl":"ltr";
  document.title=c.title;
  var heading=document.getElementById("nf-heading");
  var body=document.getElementById("nf-body");
  var home=document.getElementById("nf-home");
  var timer=document.getElementById("nf-timer");
  var logo=document.getElementById("nf-logo");
  if (heading) heading.textContent=c.heading;
  if (body) body.textContent=c.body;
  if (home) { home.textContent=c.home; home.setAttribute("href","/"+locale); }
  if (timer) {
    timer.textContent=c.timer;
    timer.setAttribute("href",web+"/"+locale);
    timer.setAttribute("target","_blank");
    timer.setAttribute("rel","noopener noreferrer");
  }
  if (logo) logo.setAttribute("href","/"+locale);
})();`;
}

