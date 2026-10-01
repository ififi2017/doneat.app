import type { HallLocale } from "./config";

// Conservative native-sans em widths, including tracking and 8% font fallback room.
// CSS uses the real hero content width; the client guard handles wider substituted fonts.
const lineWidths: Record<HallLocale, number> = {
  en: 7.0,
  "zh-CN": 5.6,
  "zh-TW": 5.6,
  "zh-HK": 5.6,
  ja: 9.6,
  ko: 7.8,
  fr: 8.3,
  de: 7.7,
  es: 8.5,
  it: 8.9,
  pt: 8.3,
  ru: 8.4,
  "hi-IN": 10.0,
  "mr-IN": 7.7,
  tr: 8.9,
  ar: 5.0,
  th: 8.4,
  id: 7.4,
  vi: 7.8,
};

export function heroLineWidth(locale: HallLocale): number {
  return lineWidths[locale];
}
