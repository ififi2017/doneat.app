import type { HallLocale } from "./config";

const labels: Record<HallLocale, readonly [pause: string, play: string, brand: string]> = {
  en: ["Pause demos", "Play demos", "Light up your clock-out moment"],
  "zh-CN": ["暂停演示", "播放演示", "点亮下班时刻"],
  "zh-TW": ["暫停示範", "播放示範", "點亮下班時刻"],
  "zh-HK": ["暫停示範", "播放示範", "點亮放工時刻"],
  ja: ["デモを一時停止", "デモを再生", "退勤の瞬間を照らす"],
  ko: ["데모 일시 정지", "데모 재생", "퇴근의 순간을 밝히기"],
  fr: [
    "Mettre les démos en pause",
    "Lire les démos",
    "Illuminer la fin de votre journée",
  ],
  de: [
    "Demos pausieren",
    "Demos abspielen",
    "Deinen Feierabend aufleuchten lassen",
  ],
  es: ["Pausar demos", "Reproducir demos", "Iluminar tu salida del trabajo"],
  it: ["Pausa demo", "Riproduci demo", "Illumina la fine del tuo turno"],
  pt: ["Pausar demos", "Reproduzir demos", "Iluminar o fim do seu turno"],
  ru: [
    "Приостановить демо",
    "Воспроизвести демо",
    "Подсветить конец рабочего дня",
  ],
  "hi-IN": ["डेमो रोकें", "डेमो चलाएँ", "काम खत्म होने के पल को रोशन करें"],
  "mr-IN": ["डेमो थांबवा", "डेमो चालवा", "काम संपण्याचा क्षण उजळवा"],
  tr: ["Demoları duraklat", "Demoları oynat", "Mesai bitişini aydınlat"],
  ar: ["إيقاف العروض مؤقتًا", "تشغيل العروض", "أضئ لحظة نهاية دوامك"],
  th: ["พักการสาธิต", "เล่นการสาธิต", "จุดแสงให้ช่วงเวลาเลิกงาน"],
  id: ["Jeda demo", "Putar demo", "Terangi momen pulang kerja"],
  vi: ["Tạm dừng demo", "Phát demo", "Thắp sáng khoảnh khắc tan làm"],
};

export function mediaCopy(locale: HallLocale) {
  const [pause, play, brand] = labels[locale];
  return { pause, play, brand };
}
