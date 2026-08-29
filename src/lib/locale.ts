import hall from "../../locales/hall.json";

const HALL_CODES = hall.locales;

type HallLocale = (typeof HALL_CODES)[number];

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

export function localeRedirectInlineScript(): string {
  return `(function(){
  var locales=${JSON.stringify(HALL_CODES)};
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
  var tags=(navigator.languages&&navigator.languages.length)
    ? [].slice.call(navigator.languages)
    : [navigator.language||""];
  var locale="en";
  for (var i=0;i<tags.length;i++) {
    var mapped=mapTag(tags[i]);
    if (mapped) { locale=mapped; break; }
  }
  location.replace("/"+locale+location.search+location.hash);
})();`;
}
