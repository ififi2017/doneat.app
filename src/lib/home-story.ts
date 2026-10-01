import type { HallLocale } from "./config";

const en = {
  headlineWork: "Work ends.", headlineLife: "Your time begins.",
  proofTitle: "Know what's left.", proofBody: "Set your shift. See the time remaining, your progress and today's earnings in one place.",
  carryTitle: "Take it with you.", carryBody: "Home Screen widgets, Live Activities and a free Apple Watch app keep your countdown close, without opening the iPhone app every time.",
  getTitle: "Make room for your time.", getBody: "Choose the app that fits your day. Or start with the timer in your browser.",
  clockIn: "Clock in", clockOut: "Clock out", shiftExample: "An illustrative shift", explore: "Explore DoneAt", recording: "Real app recording; not a live timer",
};
const zh = {
  headlineWork: "工作有终点。", headlineLife: "时间归自己。",
  proofTitle: "还剩多少，不必猜。", proofBody: "设好班次，剩余时间、一天的进度和今日已赚，在一个地方看清。",
  carryTitle: "把时间，带离屏幕。", carryBody: "主屏幕小组件、实时活动，还有免费的 Apple Watch App。不必每次打开 iPhone App，也能看清离下班还有多久。",
  getTitle: "给自己的时间，留个位置。", getBody: "选一个顺手的客户端，或者先在浏览器里试试。",
  clockIn: "上班", clockOut: "下班", shiftExample: "班次示意", explore: "看看 DoneAt", recording: "真实 App 录屏，非实时计时器",
};
export function homeStory(locale: HallLocale): typeof en { return locale.startsWith("zh") ? zh : en; }
