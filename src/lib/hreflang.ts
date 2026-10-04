import {
  canonicalUrl,
  HALL_LOCALES,
  hasPublishedContent,
  isContentPage,
  isHallLocale,
  publishedLocalesFor,
  siteConfig,
  type ContentPage,
} from "./config";

export type HreflangLink = {
  lang: string;
  href: string;
};

/**
 * Hall pages exist in all 19 locales. x-default is the site root, which
 * middleware 302s to the hall matching Accept-Language: Google's documented
 * x-default use for an auto-redirecting home page. Pointing it at `/en`
 * left the root indexed as a separate English page on the timer domain.
 */
export function hallHreflangLinks(): HreflangLink[] {
  return [
    ...HALL_LOCALES.map((code) => ({
      lang: code,
      href: canonicalUrl(`/${code}`),
    })),
    // Trailing slash matches what @astrojs/sitemap writes for the same URL.
    { lang: "x-default", href: `${siteConfig.officialSiteUrl}/` },
  ];
}

/**
 * Content alternates are only locales that have the page on disk.
 * A hall language without a translation is not advertised.
 */
export function contentHreflangLinks(page: ContentPage): HreflangLink[] {
  return [
    ...publishedLocalesFor(page).map((code) => ({
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
    isHallLocale(segments[0]) &&
    isContentPage(segments[1]) &&
    hasPublishedContent(segments[0], segments[1])
  ) {
    return contentHreflangLinks(segments[1]).map((link) => ({
      lang: link.lang,
      url: link.href,
    }));
  }
  return undefined;
}
