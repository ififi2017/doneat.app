import {
  appleStoreUrl,
  isChina,
  sameAsUrls,
  showGooglePlay,
  siteConfig,
  type ContentPage,
  type HallLocale,
} from "./config";
import type { FaqItem } from "./faq-jsonld";

export const ORGANIZATION_ID = `${siteConfig.officialSiteUrl}/#organization`;
export const WEBSITE_ID = `${siteConfig.officialSiteUrl}/#website`;
export const SOFTWARE_ID = `${siteConfig.officialSiteUrl}/#app`;

export function jsonLdMarkup(
  data: Record<string, unknown> | Record<string, unknown>[] | undefined,
): string {
  if (!data) return "";
  const blocks = Array.isArray(data) ? data : [data];
  const open = "<script type=\"application/ld+json\">";
  const close = "</scr" + "ipt>";
  return blocks
    .map((block) => `${open}${JSON.stringify(block).replace(/</g, "\\u003c")}${close}`)
    .join("");
}

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: siteConfig.brandName,
    url: siteConfig.officialSiteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.officialSiteUrl}/icons/icon-512.png`,
      width: 512,
      height: 512,
    },
    email: siteConfig.supportEmail,
    sameAs: sameAsUrls(),
  };
}

/**
 * Native apps plus the browser timer. Free to download, so `offers` says
 * price 0 (Google's software app rich result requires `offers.price`); Plus
 * is an in-app purchase and is not listed. No aggregateRating or download
 * count: Google does not allow ratings copied from the app stores.
 */
export function softwareApplicationJsonLd(options: {
  url: string;
  description: string;
  locale?: HallLocale;
  installUrls?: string[];
  softwareRequirements?: string[];
}): Record<string, unknown> {
  const node: Record<string, unknown> = {
    "@type": "SoftwareApplication",
    "@id": SOFTWARE_ID,
    name: siteConfig.brandName,
    alternateName: "Off Work Countdown",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "iOS, iPadOS, Android, macOS, Windows, Web",
    url: options.url,
    image: `${siteConfig.officialSiteUrl}/icons/og-1200x630.png`,
    description: options.description,
    offers: freeOffer(),
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    sameAs: storeListingUrls(),
  };
  if (options.locale) node.inLanguage = options.locale;
  if (options.installUrls?.length) node.installUrl = options.installUrls;
  if (options.softwareRequirements?.length) {
    node.softwareRequirements = options.softwareRequirements;
  }
  return node;
}

/** Free download or free use; paid upgrades are in-app and not listed here. */
export function freeOffer(): Record<string, unknown> {
  return {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  };
}

/** Official store listings of the same app, so engines can join them to one entity. */
export function storeListingUrls(): string[] {
  return [
    siteConfig.appStoreUrlTemplate.replace("{storefront}", isChina ? "cn" : "us"),
    ...(showGooglePlay ? [siteConfig.googlePlayUrl] : []),
    siteConfig.microsoftStoreUrl,
  ];
}

export function storeInstallUrls(locale: HallLocale): string[] {
  return [
    appleStoreUrl(locale),
    ...(showGooglePlay ? [siteConfig.googlePlayUrl] : []),
    siteConfig.microsoftStoreUrl,
  ];
}

export function webTimerJsonLd(locale: string): Record<string, unknown> {
  return {
    "@type": "WebApplication",
    "@id": `${siteConfig.webAppUrl}/${locale}#timer`,
    name: siteConfig.brandName,
    alternateName: "Off Work Countdown",
    url: `${siteConfig.webAppUrl}/${locale}`,
    inLanguage: locale,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires a modern web browser",
    isAccessibleForFree: true,
    offers: freeOffer(),
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/** Site name in search results: DoneAt, formerly Off Work Countdown. */
export function webSiteJsonLd(locale: string): Record<string, unknown> {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.brandName,
    alternateName: ["Off Work Countdown"],
    url: `${siteConfig.officialSiteUrl}/`,
    inLanguage: locale,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function breadcrumbJsonLd(options: {
  locale: HallLocale;
  path: string;
  pageName: string;
}): Record<string, unknown> {
  const pageUrl = `${siteConfig.officialSiteUrl}${options.path}`;
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: siteConfig.brandName,
        item: `${siteConfig.officialSiteUrl}/${options.locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: options.pageName,
        item: pageUrl,
      },
    ],
  };
}

export function homeJsonLd(options: {
  locale: HallLocale;
  description: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      webSiteJsonLd(options.locale),
      organizationJsonLd(),
      softwareApplicationJsonLd({
        url: siteConfig.officialSiteUrl,
        description: options.description,
        locale: options.locale,
        installUrls: storeInstallUrls(options.locale),
      }),
      webTimerJsonLd(options.locale),
    ],
  };
}

export function downloadJsonLd(options: {
  locale: HallLocale;
  path: string;
  title: string;
  description: string;
  breadcrumbName: string;
  requirements?: string[];
}): Record<string, unknown> {
  const pageUrl = `${siteConfig.officialSiteUrl}${options.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      softwareApplicationJsonLd({
        url: siteConfig.officialSiteUrl,
        description: options.description,
        locale: options.locale,
        installUrls: storeInstallUrls(options.locale),
        softwareRequirements: options.requirements,
      }),
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: options.title,
        description: options.description,
        inLanguage: options.locale,
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        about: { "@id": SOFTWARE_ID },
      },
      breadcrumbJsonLd({
        locale: options.locale,
        path: options.path,
        pageName: options.breadcrumbName,
      }),
    ],
  };
}

export function faqGraphJsonLd(
  items: readonly FaqItem[],
  options: {
    locale: HallLocale;
    path: string;
    title: string;
    description: string;
    breadcrumbName: string;
  },
): Record<string, unknown> | undefined {
  if (items.length === 0) return undefined;
  const pageUrl = `${siteConfig.officialSiteUrl}${options.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: options.title,
        description: options.description,
        inLanguage: options.locale,
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      breadcrumbJsonLd({
        locale: options.locale,
        path: options.path,
        pageName: options.breadcrumbName,
      }),
    ],
  };
}

const ENGLISH_MONTHS: Record<string, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
};

/** Parse common frontmatter updated date formats into ISO YYYY-MM-DD when unambiguous. */
export function isoDateFromUpdated(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const s = raw.trim();
  const iso = /^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/.exec(s);
  if (iso) {
    return `${iso[1]}-${iso[2].padStart(2, "0")}-${iso[3].padStart(2, "0")}`;
  }
  const cjk = /^(\d{4})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日?$/.exec(s);
  if (cjk) {
    return `${cjk[1]}-${cjk[2].padStart(2, "0")}-${cjk[3].padStart(2, "0")}`;
  }
  const dmy = /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/.exec(s);
  if (dmy) {
    const month = ENGLISH_MONTHS[dmy[2].toLowerCase()];
    if (month) return `${dmy[3]}-${month}-${dmy[1].padStart(2, "0")}`;
  }
  const mdy = /^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/.exec(s);
  if (mdy) {
    const month = ENGLISH_MONTHS[mdy[1].toLowerCase()];
    if (month) return `${mdy[3]}-${month}-${mdy[2].padStart(2, "0")}`;
  }
  return undefined;
}

export function contentPageJsonLd(options: {
  locale: HallLocale;
  path: string;
  page: Exclude<ContentPage, "download" | "faq">;
  title: string;
  description: string;
  breadcrumbName: string;
  updated?: string;
}): Record<string, unknown> {
  const pageUrl = `${siteConfig.officialSiteUrl}${options.path}`;
  const webPage: Record<string, unknown> = {
    "@type": options.page === "about" ? "AboutPage" : "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: options.title,
    description: options.description,
    inLanguage: options.locale,
    isPartOf: { "@id": WEBSITE_ID },
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    publisher: { "@id": ORGANIZATION_ID },
  };
  if (options.page === "about" || options.page === "how-it-works") {
    webPage.about = { "@id": SOFTWARE_ID };
  }
  const isoUpdated = isoDateFromUpdated(options.updated);
  if (isoUpdated) {
    webPage.dateModified = isoUpdated;
  }
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      webPage,
      breadcrumbJsonLd({
        locale: options.locale,
        path: options.path,
        pageName: options.breadcrumbName,
      }),
    ],
  };
}
