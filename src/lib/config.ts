import chrome from "../../locales/chrome.json";
import hall from "../../locales/hall.json";
import site from "../../site.json";

export const siteConfig = site;

export type HallLocale = keyof typeof hall.functionalSubtitle;
export const HALL_LOCALES = hall.locales as HallLocale[];

export type ContentLocale = "en" | "zh-CN";
export const CONTENT_LOCALES = hall.notes.contentLanguages as ContentLocale[];

export const CONTENT_PAGES = [
  "download",
  "privacy",
  "about",
  "faq",
  "how-it-works",
] as const;
export type ContentPage = (typeof CONTENT_PAGES)[number];

export const CHINESE_HALL_LOCALES = ["zh-CN", "zh-TW", "zh-HK"] as const;

export const localeNames: Record<HallLocale, string> = chrome.localeNames;

const chromeUi = chrome.ui as Record<HallLocale, typeof chrome.ui.en>;

export function isHallLocale(value: string | undefined): value is HallLocale {
  return !!value && HALL_LOCALES.includes(value as HallLocale);
}

export function isContentLocale(value: string | undefined): value is ContentLocale {
  return value === "en" || value === "zh-CN";
}

export function isContentPage(value: string | undefined): value is ContentPage {
  return !!value && (CONTENT_PAGES as readonly string[]).includes(value);
}

export function isRtl(locale: HallLocale): boolean {
  return locale === "ar";
}

export function isChineseHall(locale: HallLocale): boolean {
  return (CHINESE_HALL_LOCALES as readonly string[]).includes(locale);
}

export function contentLocaleFor(locale: HallLocale): ContentLocale {
  return isChineseHall(locale) ? "zh-CN" : "en";
}

export function functionalSubtitle(locale: HallLocale): string {
  return hall.functionalSubtitle[locale];
}

export function brandSentence(locale: HallLocale): string | null {
  const value = hall.brandSentence[locale];
  return value.length > 0 ? value : null;
}

export function appleBadgeLocale(locale: HallLocale): string {
  return hall.appleBadgeLocale[locale];
}

export function appleStorefront(locale: HallLocale): string {
  return hall.appleStorefront[locale];
}

export function microsoftBadgeLocale(locale: HallLocale): string {
  return hall.microsoftBadgeLocale[locale];
}

export function deviceStem(locale: HallLocale): "zh" | "en" {
  return isChineseHall(locale) ? "zh" : "en";
}

export type ChromeKey = keyof typeof chrome.ui.en;

export function t(locale: HallLocale, key: ChromeKey): string {
  return chromeUi[locale][key];
}

export function htmlLang(locale: HallLocale): string {
  return locale;
}

export function homeTitle(locale: HallLocale): string {
  const sentence = brandSentence(locale);
  return `${site.brandName} — ${sentence ?? functionalSubtitle(locale)}`;
}

export function appleStoreUrl(locale: HallLocale): string {
  const storefront = appleStorefront(locale);
  const url = new URL(
    site.appStoreUrlTemplate.replace("{storefront}", storefront),
  );
  url.searchParams.set("itscg", "30200");
  url.searchParams.set("itsct", "apps_box_badge");
  url.searchParams.set("mttnsubad", site.appStoreId);
  return url.toString();
}

export function webAppUrl(locale: HallLocale): string {
  return `${site.webAppUrl}/${locale}`;
}

export function sitePath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return "/";
  return normalized.endsWith("/") ? normalized.slice(0, -1) : normalized;
}

export function canonicalUrl(path: string): string {
  if (path === "/" || path === "") return site.officialSiteUrl;
  return `${site.officialSiteUrl}${sitePath(path)}`;
}
