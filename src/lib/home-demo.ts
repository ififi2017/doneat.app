import type { HallLocale } from "./config";

// Visitor-facing labels for the fixed, accelerated 09:00–17:00 illustration.
const labels: Record<
  HallLocale,
  readonly [
    day: string,
    now: string,
    left: string,
    replay: string,
    widgets: string,
  ]
> = {
  en: [
    "A working day, in a few seconds.",
    "Time of day",
    "Time left",
    "Replay the day",
    "A glance is enough.",
  ],
  "zh-CN": [
    "几秒，看完一个工作日。",
    "此刻",
    "距离下班",
    "再看一次",
    "抬眼，就有数。",
  ],
  "zh-TW": [
    "幾秒，看完一個工作日。",
    "此刻",
    "距離下班",
    "再看一次",
    "抬眼，就有數。",
  ],
  "zh-HK": [
    "幾秒，看完一個工作日。",
    "此刻",
    "距離放工",
    "再看一次",
    "望一眼，就有數。",
  ],
  ja: [
    "一日の流れを、数秒で。",
    "時刻",
    "退勤まで",
    "もう一度見る",
    "ひと目で、わかる。",
  ],
  ko: [
    "몇 초로 보는 하루의 흐름.",
    "현재 시각",
    "퇴근까지",
    "다시 보기",
    "한눈에 알 수 있어요.",
  ],
  fr: [
    "Une journée en quelques secondes.",
    "Heure",
    "Temps restant",
    "Revoir la journée",
    "Un coup d’œil suffit.",
  ],
  de: [
    "Ein Arbeitstag in wenigen Sekunden.",
    "Uhrzeit",
    "Zeit bis Feierabend",
    "Tag erneut ansehen",
    "Ein Blick genügt.",
  ],
  es: [
    "Un día de trabajo, en unos segundos.",
    "Hora",
    "Tiempo restante",
    "Volver a ver",
    "Basta una mirada.",
  ],
  it: [
    "Una giornata in pochi secondi.",
    "Ora",
    "Tempo rimasto",
    "Rivedi la giornata",
    "Basta uno sguardo.",
  ],
  pt: [
    "Um dia de trabalho em poucos segundos.",
    "Hora",
    "Tempo restante",
    "Ver novamente",
    "Um olhar basta.",
  ],
  ru: [
    "Рабочий день за несколько секунд.",
    "Время",
    "До конца смены",
    "Посмотреть снова",
    "Достаточно одного взгляда.",
  ],
  "hi-IN": [
    "कुछ सेकंड में एक कामकाजी दिन।",
    "समय",
    "बचा समय",
    "फिर देखें",
    "एक नज़र काफी है।",
  ],
  "mr-IN": [
    "काही सेकंदांत कामाचा एक दिवस.",
    "वेळ",
    "उरलेला वेळ",
    "पुन्हा पाहा",
    "एक नजर पुरेशी आहे.",
  ],
  tr: [
    "Birkaç saniyede bir iş günü.",
    "Saat",
    "Kalan süre",
    "Günü tekrar izle",
    "Bir bakış yeter.",
  ],
  ar: [
    "يوم عمل في بضع ثوانٍ.",
    "الوقت",
    "الوقت المتبقي",
    "شاهد اليوم مجددًا",
    "نظرة واحدة تكفي.",
  ],
  th: [
    "วันทำงานในไม่กี่วินาที",
    "เวลา",
    "เวลาที่เหลือ",
    "ดูอีกครั้ง",
    "แค่มองก็รู้",
  ],
  id: [
    "Satu hari kerja dalam beberapa detik.",
    "Waktu",
    "Waktu tersisa",
    "Lihat lagi",
    "Cukup sekilas.",
  ],
  vi: [
    "Một ngày làm việc trong vài giây.",
    "Giờ",
    "Thời gian còn lại",
    "Xem lại",
    "Chỉ cần nhìn qua.",
  ],
};

export function homeDemo(locale: HallLocale) {
  const [day, now, left, replay, widgets] = labels[locale];
  return { day, now, left, replay, widgets };
}
