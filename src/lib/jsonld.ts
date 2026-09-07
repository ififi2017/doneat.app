import { sameAsUrls, siteConfig } from "./config";

export const ORGANIZATION_ID = `${siteConfig.officialSiteUrl}/#organization`;
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
    logo: `${siteConfig.officialSiteUrl}/icons/icon-512.png`,
    email: siteConfig.supportEmail,
    sameAs: sameAsUrls(),
  };
}

/**
 * Native apps plus the browser timer. No aggregateRating, download count,
 * or store price: Plus is paid on iOS, and store terms vary.
 */
export function softwareApplicationJsonLd(options: {
  url: string;
  description: string;
}): Record<string, unknown> {
  return {
    "@type": "SoftwareApplication",
    "@id": SOFTWARE_ID,
    name: siteConfig.brandName,
    alternateName: "Off Work Countdown",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "iOS, iPadOS, macOS, Windows, Web",
    url: options.url,
    image: `${siteConfig.officialSiteUrl}/icons/og-1200x630.png`,
    description: options.description,
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function webTimerJsonLd(locale: string): Record<string, unknown> {
  return {
    "@type": "WebApplication",
    "@id": `${siteConfig.webAppUrl}/${locale}#timer`,
    name: siteConfig.brandName,
    alternateName: "Off Work Countdown",
    url: `${siteConfig.webAppUrl}/${locale}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function homeJsonLd(options: {
  locale: string;
  description: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      softwareApplicationJsonLd({
        url: siteConfig.officialSiteUrl,
        description: options.description,
      }),
      webTimerJsonLd(options.locale),
    ],
  };
}

export function downloadJsonLd(options: {
  path: string;
  title: string;
  description: string;
}): Record<string, unknown> {
  const pageUrl = `${siteConfig.officialSiteUrl}${options.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      softwareApplicationJsonLd({
        url: siteConfig.officialSiteUrl,
        description: options.description,
      }),
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: options.title,
        description: options.description,
        about: { "@id": SOFTWARE_ID },
      },
    ],
  };
}
