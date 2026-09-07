import {
  canonicalUrl,
  CONTENT_LOCALES,
  HALL_LOCALES,
  isContentLocale,
  isContentPage,
  isHallLocale,
  type ContentPage,
} from "./config";

export type HreflangLink = {
  lang: string;
  href: string;
};

/** Hall pages exist in all 19 locales. x-default is the English hall. */
export function hallHreflangLinks(): HreflangLink[] {
  return [
    ...HALL_LOCALES.map((code) => ({
      lang: code,
      href: canonicalUrl(`/${code}`),
    })),
    { lang: "x-default", href: canonicalUrl("/en") },
  ];
}

/**
 * Support pages ship only in en and zh-CN. Do not advertise hall locales
 * that bounce or 404.
 */
export function contentHreflangLinks(page: ContentPage): HreflangLink[] {
  return [
    ...CONTENT_LOCALES.map((code) => ({
      lang: code,
      href: canonicalUrl(`/${code}/${page}`),
    })),
    { lang: "x-default", href: canonicalUrl(`/en/${page}`) },
  ];
}

export function hreflangLinksFor(
  kind: "hall" | "content",
  path: string,
): HreflangLink[] {
  if (kind === "hall") return hallHreflangLinks();
  const page = path.split("/").filter(Boolean)[1];
  if (!isContentPage(page)) {
    throw new Error(`Missing content slug in path: ${path}`);
  }
  return contentHreflangLinks(page);
}

/** Shape expected by `@astrojs/sitemap` `serialize()`. */
export type SitemapAlternate = {
  url: string;
  lang: string;
};

export function sitemapLinksForUrl(pageUrl: string): SitemapAlternate[] | undefined {
  let pathname: string;
  try {
    pathname = new URL(pageUrl).pathname;
  } catch {
    return undefined;
  }
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 1 && isHallLocale(segments[0])) {
    return hallHreflangLinks().map((link) => ({
      lang: link.lang,
      url: link.href,
    }));
  }
  if (
    segments.length === 2 &&
    isContentLocale(segments[0]) &&
    isContentPage(segments[1])
  ) {
    return contentHreflangLinks(segments[1]).map((link) => ({
      lang: link.lang,
      url: link.href,
    }));
  }
  return undefined;
}
