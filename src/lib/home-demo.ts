import type { HallLocale } from "./config";

// Chapter 02 widget caption.
const widgetCaptions: Record<HallLocale, string> = {
  en: "A glance is enough.",
  "zh-CN": "抬眼，就有数。",
  "zh-TW": "抬眼，就有數。",
  "zh-HK": "望一眼，就有數。",
  ja: "ひと目で、わかる。",
  ko: "한눈에 알 수 있어요.",
  fr: "Un coup d’œil suffit.",
  de: "Ein Blick genügt.",
  es: "Basta una mirada.",
  it: "Basta uno sguardo.",
  pt: "Um olhar basta.",
  ru: "Достаточно одного взгляда.",
  "hi-IN": "एक नज़र काफी है।",
  "mr-IN": "एक नजर पुरेशी आहे.",
  tr: "Bir bakış yeter.",
  ar: "نظرة واحدة تكفي.",
  th: "แค่มองก็รู้",
  id: "Cukup sekilas.",
  vi: "Chỉ cần nhìn qua.",
};

export function homeDemo(locale: HallLocale) {
  return { widgets: widgetCaptions[locale] };
}
