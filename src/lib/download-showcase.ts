import type { ContentLocale } from "./config";

export type CompareStatus = "included" | "limited" | "absent";

export interface CompareRow {
  feature: string;
  mobile: { status: CompareStatus; detail: string };
  desktop: { status: CompareStatus; detail: string };
}

export interface DownloadShowcaseCopy {
  heading: string;
  lede: string;
  mobileCaption: string;
  desktopCaption: string;
  miniCaption: string;
  appAlt: string;
  miniAlt: string;
  comparisonHeading: string;
  comparisonLede: string;
  featureLabel: string;
  mobileLabel: string;
  desktopLabel: string;
  rows: CompareRow[];
}

const copy: Record<ContentLocale, DownloadShowcaseCopy> = {
  "zh-CN": {
    heading: "手机和电脑上的倒计时",
    lede: "同一个班次，装在口袋里或桌面上。关掉页面之后，通知和剩余时间还在。",
    mobileCaption: "iPhone",
    desktopCaption: "电脑主窗",
    miniCaption: "迷你计时，可留在桌面上",
    appAlt: "电脑上的 DoneAt：设好班次后开始倒计时",
    miniAlt: "桌面上的迷你计时",
    comparisonHeading: "装在哪里，剩余时间出现的方式不一样",
    comparisonLede: "倒计时、今日已赚和跨夜班次两边都有。手机上还可以排更多班、把年终奖算进去，并用生物识别锁住薪资。",
    featureLabel: "功能",
    mobileLabel: "手机 / iPad",
    desktopLabel: "电脑",
    rows: [
      {
        feature: "下班倒计时",
        mobile: { status: "included", detail: "实时倒数与进度" },
        desktop: { status: "included", detail: "实时倒数与进度" },
      },
      {
        feature: "今日已赚",
        mobile: { status: "included", detail: "月薪或日薪，按进度累加" },
        desktop: { status: "included", detail: "月薪或日薪，按进度累加" },
      },
      {
        feature: "跨夜班次",
        mobile: { status: "included", detail: "下班早于上班时按跨零点处理" },
        desktop: { status: "included", detail: "下班早于上班时按跨零点处理" },
      },
      {
        feature: "更多班次",
        mobile: { status: "included", detail: "大小周、轮班轮休，或先不排班、手动开" },
        desktop: { status: "limited", detail: "一组上下班时间" },
      },
      {
        feature: "年终奖",
        mobile: { status: "included", detail: "可折进今日已赚" },
        desktop: { status: "limited", detail: "月薪或日薪" },
      },
      {
        feature: "薪资保密",
        mobile: { status: "included", detail: "打开设置或显示金额要生物识别" },
        desktop: { status: "absent", detail: "没有" },
      },
      {
        feature: "接下来",
        mobile: { status: "included", detail: "健康提醒、上班进度、午休" },
        desktop: { status: "absent", detail: "没有" },
      },
      {
        feature: "自动循环排班",
        mobile: { status: "included", detail: "设一次，按班次循环；之后看小组件即可" },
        desktop: { status: "absent", detail: "没有" },
      },
      {
        feature: "离开之后仍提醒",
        mobile: { status: "included", detail: "系统通知" },
        desktop: { status: "included", detail: "窗口藏起后仍可系统通知" },
      },
      {
        feature: "抬眼就在",
        mobile: { status: "included", detail: "主屏幕与小组件" },
        desktop: { status: "included", detail: "菜单栏、托盘与迷你计时" },
      },
      {
        feature: "登录启动与快捷键",
        mobile: { status: "limited", detail: "从主屏幕打开" },
        desktop: { status: "included", detail: "登录后就绪，全局快捷键唤出" },
      },
      {
        feature: "数据留在本机",
        mobile: { status: "included", detail: "班次和薪资不上传" },
        desktop: { status: "included", detail: "班次和薪资不上传" },
      },
    ],
  },
  en: {
    heading: "The same countdown, on a phone or a computer",
    lede: "One shift, in your pocket or on the desk. After you close the page, reminders and remaining time stay with the app.",
    mobileCaption: "iPhone",
    desktopCaption: "Desktop window",
    miniCaption: "Mini timer, stays on the desk",
    appAlt: "DoneAt on a computer: set a shift and start the countdown",
    miniAlt: "The mini timer on the desktop",
    comparisonHeading: "Where it lives is what changes",
    comparisonLede: "The countdown, today’s earnings, and overnight shifts are on both. On iPhone you can also set more kinds of shifts, fold in a year-end bonus, and lock salary behind biometrics.",
    featureLabel: "Feature",
    mobileLabel: "iPhone / iPad",
    desktopLabel: "Computer",
    rows: [
      {
        feature: "Shift countdown",
        mobile: { status: "included", detail: "Live remaining time and progress" },
        desktop: { status: "included", detail: "Live remaining time and progress" },
      },
      {
        feature: "Today’s earnings",
        mobile: { status: "included", detail: "Monthly or daily pay, by progress" },
        desktop: { status: "included", detail: "Monthly or daily pay, by progress" },
      },
      {
        feature: "Overnight shifts",
        mobile: { status: "included", detail: "End time before start crosses midnight" },
        desktop: { status: "included", detail: "End time before start crosses midnight" },
      },
      {
        feature: "More shift kinds",
        mobile: { status: "included", detail: "Alternating weeks, work/rest rotations, or no schedule and start by hand" },
        desktop: { status: "limited", detail: "One start and end time" },
      },
      {
        feature: "Year-end bonus",
        mobile: { status: "included", detail: "Folds into today’s earnings" },
        desktop: { status: "limited", detail: "Monthly or daily pay" },
      },
      {
        feature: "Salary lock",
        mobile: { status: "included", detail: "Biometrics to open salary settings or show the amount" },
        desktop: { status: "absent", detail: "No" },
      },
      {
        feature: "Coming up",
        mobile: { status: "included", detail: "Health reminders, shift progress, lunch" },
        desktop: { status: "absent", detail: "No" },
      },
      {
        feature: "Recurring schedule",
        mobile: { status: "included", detail: "Set once; it cycles on its own. After that, the widget is enough" },
        desktop: { status: "absent", detail: "No" },
      },
      {
        feature: "Reminders after you leave",
        mobile: { status: "included", detail: "System notifications" },
        desktop: { status: "included", detail: "System notifications with the window hidden" },
      },
      {
        feature: "Close at hand",
        mobile: { status: "included", detail: "Home screen and widgets" },
        desktop: { status: "included", detail: "Menu bar, tray, and mini timer" },
      },
      {
        feature: "Launch at login and shortcut",
        mobile: { status: "limited", detail: "Open it from the home screen" },
        desktop: { status: "included", detail: "Ready after login, one shortcut away" },
      },
      {
        feature: "Stays on this device",
        mobile: { status: "included", detail: "Hours and salary are not uploaded" },
        desktop: { status: "included", detail: "Hours and salary are not uploaded" },
      },
    ],
  },
};

export function downloadShowcaseCopy(locale: ContentLocale): DownloadShowcaseCopy {
  return copy[locale];
}

export function desktopMediaStem(locale: ContentLocale): "zh" | "en" {
  return locale === "zh-CN" ? "zh" : "en";
}
