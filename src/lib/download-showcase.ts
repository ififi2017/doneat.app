import { isChineseHall, type ContentLocale } from "./config";

export type CompareStatus = "included" | "limited" | "absent";

export interface CompareCell {
  status: CompareStatus;
  detail: string;
}

export interface CompareRow {
  feature: string;
  mobile: CompareCell;
  android: CompareCell;
  desktop: CompareCell;
}

export type IphoneShot = "countdown" | "widgets" | "calendar" | "watch";
export type AndroidShot = "calendar" | "leave" | "records" | "breaks";

export interface TourFeature<Shot extends string> {
  shot: Shot;
  title: string;
  body: string;
  alt: string;
}

export type IphoneFeature = TourFeature<IphoneShot>;
export type AndroidFeature = TourFeature<AndroidShot>;

export interface DownloadShowcaseCopy {
  heading: string;
  lede: string;
  mobileCaption: string;
  desktopCaption: string;
  miniCaption: string;
  appAlt: string;
  miniAlt: string;
  reviewAlt: string;
  iphoneHeading: string;
  iphoneLede: string;
  iphoneFeatures: IphoneFeature[];
  androidHeading: string;
  androidLede: string;
  androidFeatures: AndroidFeature[];
  comparisonHeading: string;
  comparisonLede: string;
  featureLabel: string;
  mobileLabel: string;
  androidLabel: string;
  desktopLabel: string;
  /** Download-page section nav and the sideways-scroll hint. */
  showcaseLabel: string;
  compareHint: string;
  pageIndexLabel: string;
  compareNavLabel: string;
  rows: CompareRow[];
}

const copy: Partial<Record<ContentLocale, DownloadShowcaseCopy>> &
  Record<"en" | "zh-CN", DownloadShowcaseCopy> = {
  "zh-CN": {
    heading: "在电脑上，抬眼就能看到",
    lede: "专心做事时，让剩余时间留在菜单栏、托盘或迷你计时里。窗口藏起来，下班提醒也还在。",
    mobileCaption: "iPhone",
    desktopCaption: "电脑主窗",
    miniCaption: "迷你计时，可留在桌面上",
    appAlt: "电脑上的 DoneAt：设好班次后开始倒计时",
    miniAlt: "桌面上的迷你计时",
    reviewAlt:
      "iPhone 上的 DoneAt：今天这班的倒计时和进度，下方是本周、今年的工时和接下来的提醒",
    iphoneHeading: "iPhone 和 Apple Watch 上能做什么",
    iphoneLede:
      "手机上看倒计时，锁屏和手腕上看还剩多久，一整个月的班排在一张月历里。",
    iphoneFeatures: [
      {
        shot: "widgets",
        title: "小组件与实时活动",
        body: "主屏幕和锁定屏幕小组件，不打开 App 也能看到还剩多久。在支持的 iPhone 上，实时活动会把进度留在锁定屏幕和灵动岛上。",
        alt: "DoneAt 在灵动岛、锁定屏幕实时活动和主屏幕小组件里，分别显示这班还剩的时间、进度和接下来的提醒。",
      },
      {
        shot: "calendar",
        title: "月历排班与节假日",
        body: "在同一张月历里设置和预览排班：固定星期、大小周、轮班轮休、自由排班或手动计时，改完立刻能看到。选择国家或地区后，排班会跟着当地节假日走，中国大陆还会按调休安排上班。从旧版本升级的话，到「工作时间与排班」里开启即可。",
        alt: "iPhone 上的 DoneAt 月历：2026 年 10 月，国庆节显示为休息，调休的周六显示为白班；下方是固定星期的排班规律，节假日安排选的是中国大陆。",
      },
      {
        shot: "watch",
        title: "免费的 Apple Watch App",
        body: "抬腕就能看到还剩多久、几点下班，表盘上也可以添加两种复杂功能。Apple Watch 版免费使用，无需 DoneAt Plus；手表上只显示时间和进度，不显示薪资。",
        alt: "Apple Watch 上的 DoneAt：工作中，显示这班还剩的时间、进度条和下班时间。",
      },
      {
        shot: "countdown",
        title: "懂你这一天的倒计时",
        body: "扣除午休后，今天这班还剩多久一目了然，本周和今年的工时就在下面。午休、起身活动和下班提醒会依次出现在「接下来」里。",
        alt: "iPhone 上的 DoneAt：进度条上方是今天这班还剩的时间，下方是本周、今年的工时和接下来的健康提醒、下班提醒。",
      },
    ],
    androidHeading: "Android 上能做什么",
    androidLede:
      "和 iPhone 同一套排班规则；桌面小组件和常驻通知，不打开 App 也能看到还剩多久。",
    androidFeatures: [
      {
        shot: "calendar",
        title: "月历排班与节假日",
        body: "固定星期、大小周、轮班轮休和跨夜班次排在同一张月历里，也可以在自由排班里点一下或划一下铺上班次。在「工作时间与排班」里选择国家或地区，节假日和调休会一起排进去。",
        alt: "Android 上的 DoneAt「工作时间与排班」：2027 年 2 月月历里 5 日至 13 日标为春节，14 日标为补班；下方是固定星期的排班规律。",
      },
      {
        shot: "leave",
        title: "请假规划",
        body: "填好假期余额，DoneAt 会结合节假日找出怎么请假能连休更久，并在月历上标出来。前三次搜索免费；同一次结果里的方案和日期都可以随便翻看。",
        alt: "Android 上的 DoneAt 请假方案：无需请假即可连休 9 天，2 月 5 日至 13 日春节，月历上标出节假日和连休。",
      },
      {
        shot: "records",
        title: "回看每一段工时",
        body: "按周、月、年回看记录和计划，最近七天免费。DoneAt Plus 增加更早的记录，以及年视图和人生视图。",
        alt: "Android 上的 DoneAt 记录年视图：2026 年每个月的工作日用彩色圆点标出。",
      },
      {
        shot: "breaks",
        title: "休息不算工时",
        body: "午休时倒计时显示「午休中」，休息时段不计入剩余工时。今天的班次、今日已赚、本周和今年的工时就在下面。",
        alt: "Android 上的 DoneAt 计时页：午休中，进度 37.5%，下方是今天 09:00–18:00 的班次、今日已赚、本周和今年的工时。",
      },
    ],
    comparisonHeading: "装在哪里，剩余时间出现的方式不一样",
    comparisonLede:
      "倒计时、今日已赚和跨夜班次每个客户端都有。iPhone 和 Android 上还可以用月历排班、跟着节假日走、把年终奖算进去、用生物识别锁住薪资；Apple Watch 和实时活动只在 iPhone 上。",
    featureLabel: "功能",
    mobileLabel: "iPhone / iPad",
    androidLabel: "Android",
    desktopLabel: "电脑",
    showcaseLabel: "DoneAt 客户端功能",
    compareHint: "横向滑动，查看各平台的功能 →",
    pageIndexLabel: "本页内容",
    compareNavLabel: "功能对照",
    rows: [
      {
        feature: "下班倒计时",
        mobile: { status: "included", detail: "实时倒数与进度" },
        android: { status: "included", detail: "实时倒数与进度" },
        desktop: { status: "included", detail: "实时倒数与进度" },
      },
      {
        feature: "今日已赚",
        mobile: { status: "included", detail: "月薪或日薪，按进度累加" },
        android: { status: "included", detail: "月薪或日薪，按进度累加" },
        desktop: { status: "included", detail: "月薪或日薪，按进度累加" },
      },
      {
        feature: "跨夜班次",
        mobile: { status: "included", detail: "下班早于上班时按跨零点处理" },
        android: { status: "included", detail: "下班早于上班时按跨零点处理" },
        desktop: { status: "included", detail: "下班早于上班时按跨零点处理" },
      },
      {
        feature: "月历排班",
        mobile: {
          status: "included",
          detail: "固定星期、大小周、轮班轮休、自由排班或手动计时",
        },
        android: { status: "included", detail: "固定星期、大小周、轮班轮休、自由排班或手动计时" },
        desktop: { status: "limited", detail: "一组上下班时间" },
      },
      {
        feature: "节假日与调休",
        mobile: {
          status: "included",
          detail: "按国家或地区适配，在「工作时间与排班」中开启",
        },
        android: { status: "included", detail: "按国家或地区适配，在「工作时间与排班」中设置" },
        desktop: { status: "absent", detail: "没有" },
      },
      {
        feature: "年终奖",
        mobile: { status: "included", detail: "可折进今日已赚" },
        android: { status: "included", detail: "可折进今日已赚" },
        desktop: { status: "limited", detail: "月薪或日薪" },
      },
      {
        feature: "薪资保密",
        mobile: { status: "included", detail: "打开设置或显示金额要生物识别" },
        android: { status: "included", detail: "显示金额要指纹、人脸或锁屏密码" },
        desktop: { status: "absent", detail: "没有" },
      },
      {
        feature: "接下来",
        mobile: { status: "included", detail: "健康提醒、上班进度、午休" },
        android: { status: "included", detail: "健康提醒、上班进度、午休" },
        desktop: { status: "absent", detail: "没有" },
      },
      {
        feature: "自动循环排班",
        mobile: {
          status: "included",
          detail: "设一次，按班次循环；之后看小组件即可",
        },
        android: { status: "included", detail: "设一次，按班次循环；之后看小组件即可" },
        desktop: { status: "absent", detail: "没有" },
      },
      {
        feature: "离开之后仍提醒",
        mobile: { status: "included", detail: "系统通知" },
        android: { status: "included", detail: "系统通知" },
        desktop: { status: "included", detail: "窗口藏起后仍可系统通知" },
      },
      {
        feature: "抬眼就在",
        mobile: {
          status: "included",
          detail: "主屏幕与锁定屏幕小组件、实时活动",
        },
        android: { status: "included", detail: "桌面小组件与常驻通知" },
        desktop: { status: "included", detail: "菜单栏、托盘与迷你计时" },
      },
      {
        feature: "Apple Watch",
        mobile: { status: "included", detail: "免费 App 与两种复杂功能" },
        android: { status: "absent", detail: "没有" },
        desktop: { status: "absent", detail: "没有" },
      },
      {
        feature: "登录启动与快捷键",
        mobile: { status: "limited", detail: "从主屏幕打开" },
        android: { status: "limited", detail: "从桌面打开" },
        desktop: { status: "included", detail: "登录后就绪，全局快捷键唤出" },
      },
      {
        feature: "数据存储",
        mobile: {
          status: "included",
          detail: "默认保存在本机，可选择通过私人 iCloud 同步",
        },
        android: { status: "included", detail: "默认保存在本机，可包含在 Android 系统备份中" },
        desktop: { status: "included", detail: "班次和薪资不上传" },
      },
    ],
  },
  en: {
    heading: "On your desk. Out of your way.",
    lede: "Keep the time left in your menu bar, system tray or mini timer. Hide the window; your clock-out reminder stays with you.",
    mobileCaption: "iPhone",
    desktopCaption: "Desktop window",
    miniCaption: "Mini timer, stays on the desk",
    appAlt: "DoneAt on a computer: set a shift and start the countdown",
    miniAlt: "The mini timer on the desktop",
    reviewAlt:
      "DoneAt on iPhone: the countdown and progress for today’s shift, with this week’s and this year’s hours and upcoming reminders",
    iphoneHeading: "What DoneAt does on iPhone and Apple Watch",
    iphoneLede:
      "The countdown on your phone, the time left on your Lock Screen and wrist, and a whole month of shifts on one calendar.",
    iphoneFeatures: [
      {
        shot: "widgets",
        title: "Widgets and Live Activities",
        body: "Home Screen and Lock Screen widgets show the time left without opening the app. On supported iPhone models, a Live Activity keeps your progress on the Lock Screen and in the Dynamic Island.",
        alt: "DoneAt in the Dynamic Island, as a Lock Screen Live Activity and as a Home Screen widget, each showing the time left in the shift, its progress and upcoming reminders.",
      },
      {
        shot: "calendar",
        title: "Monthly calendar and public holidays",
        body: "Set up and review your schedule on one monthly calendar: fixed weekdays, alternating weeks, shift rotations, free scheduling or manual timing, with every change visible right away. Choose a country or region and your schedule follows its public holidays. Updating from an earlier version? Turn it on in Work Hours & Schedule.",
        alt: "DoneAt’s monthly calendar on iPhone for July 2026, marking workdays, rest days and Independence Day, with the fixed-weekday pattern and the holiday calendar set to United States.",
      },
      {
        shot: "watch",
        title: "A free Apple Watch app",
        body: "Glance at your wrist to see the time left and when you clock out, and add one of two complications to your watch face. DoneAt for Apple Watch is free, with no DoneAt Plus needed, and shows times and progress, never salary.",
        alt: "DoneAt on Apple Watch while working, showing the time left in the shift, a progress bar and the clock-out time.",
      },
      {
        shot: "countdown",
        title: "A countdown that knows your day",
        body: "See how long is left in today’s shift, with your lunch break taken out, and this week’s and this year’s hours right below. Lunch, a stretch break and the end of your shift show up next under Coming up.",
        alt: "DoneAt on iPhone: the time left in today’s shift above a progress bar, followed by this week’s and this year’s hours and upcoming health and clock-out reminders.",
      },
    ],
    androidHeading: "What DoneAt does on Android",
    androidLede:
      "The same schedule rules as iPhone, with a home-screen widget and an ongoing notification for the time left.",
    androidFeatures: [
      {
        shot: "calendar",
        title: "Monthly calendar and public holidays",
        body: "Fixed weekdays, alternating weeks, rotations and overnight shifts on one calendar, or paint shifts onto a free schedule with a tap or a swipe. Choose a country or region in Hours & schedule and your schedule follows its public holidays.",
        alt: "DoneAt’s Hours & schedule on Android for November 2026, marking workdays, rest days, Veterans Day and Thanksgiving, with the fixed-weekday pattern below.",
      },
      {
        shot: "leave",
        title: "Plan your time off",
        body: "Add your leave balance and DoneAt finds the days off that join up with public holidays into a longer break, then shows them on the calendar. Three searches are free, and you can browse every plan in a result without using another.",
        alt: "A time-off plan in DoneAt on Android: four days of leave for ten days off in a row, from 25 December to 3 January around Christmas Day, marked on the calendar.",
      },
      {
        shot: "records",
        title: "Records, week to year",
        body: "Look back on recorded and planned time by week, month and year. The last seven days are free; DoneAt Plus adds older records and the Year and Life views.",
        alt: "The Records Year view in DoneAt on Android, with each working day of 2026 marked as a coloured dot.",
      },
      {
        shot: "breaks",
        title: "Breaks don’t count as work",
        body: "During lunch the timer shows that you are on break, and break time is left out of the time remaining. Today’s shift, today’s earnings and your weekly and yearly hours sit right below.",
        alt: "DoneAt’s timer on Android during a lunch break at 37.5% progress, with today’s 09:00–18:00 shift, today’s earnings and this week’s and this year’s hours below.",
      },
    ],
    comparisonHeading: "Where it lives is what changes",
    comparisonLede:
      "The countdown, today’s earnings, and overnight shifts are in every app. On iPhone and Android you can also plan the month on a calendar, follow public holidays, fold in a year-end bonus and lock salary behind biometrics. Apple Watch and Live Activities are iPhone only.",
    featureLabel: "Feature",
    mobileLabel: "iPhone / iPad",
    androidLabel: "Android",
    desktopLabel: "Computer",
    showcaseLabel: "DoneAt app features",
    compareHint: "Scroll sideways to compare each platform →",
    pageIndexLabel: "On this page",
    compareNavLabel: "Compare features",
    rows: [
      {
        feature: "Shift countdown",
        mobile: {
          status: "included",
          detail: "Live remaining time and progress",
        },
        android: { status: "included", detail: "Live remaining time and progress" },
        desktop: {
          status: "included",
          detail: "Live remaining time and progress",
        },
      },
      {
        feature: "Today’s earnings",
        mobile: {
          status: "included",
          detail: "Monthly or daily pay, by progress",
        },
        android: { status: "included", detail: "Monthly or daily pay, by progress" },
        desktop: {
          status: "included",
          detail: "Monthly or daily pay, by progress",
        },
      },
      {
        feature: "Overnight shifts",
        mobile: {
          status: "included",
          detail: "End time before start crosses midnight",
        },
        android: { status: "included", detail: "End time before start crosses midnight" },
        desktop: {
          status: "included",
          detail: "End time before start crosses midnight",
        },
      },
      {
        feature: "Monthly calendar",
        mobile: {
          status: "included",
          detail:
            "Fixed weekdays, alternating weeks, rotations, free scheduling or manual timing",
        },
        android: { status: "included", detail: "Fixed weekdays, alternating weeks, rotations, free scheduling or manual timing" },
        desktop: { status: "limited", detail: "One start and end time" },
      },
      {
        feature: "Public holidays",
        mobile: {
          status: "included",
          detail: "By country or region, turned on in Work Hours & Schedule",
        },
        android: { status: "included", detail: "By country or region, set in Hours & schedule" },
        desktop: { status: "absent", detail: "No" },
      },
      {
        feature: "Year-end bonus",
        mobile: { status: "included", detail: "Folds into today’s earnings" },
        android: { status: "included", detail: "Folds into today’s earnings" },
        desktop: { status: "limited", detail: "Monthly or daily pay" },
      },
      {
        feature: "Salary lock",
        mobile: {
          status: "included",
          detail: "Biometrics to open salary settings or show the amount",
        },
        android: { status: "included", detail: "Fingerprint, face or screen lock to show the amount" },
        desktop: { status: "absent", detail: "No" },
      },
      {
        feature: "Coming up",
        mobile: {
          status: "included",
          detail: "Health reminders, shift progress, lunch",
        },
        android: { status: "included", detail: "Health reminders, shift progress, lunch" },
        desktop: { status: "absent", detail: "No" },
      },
      {
        feature: "Recurring schedule",
        mobile: {
          status: "included",
          detail:
            "Set once; it cycles on its own. After that, the widget is enough",
        },
        android: { status: "included", detail: "Set once; it cycles on its own. After that, the widget is enough" },
        desktop: { status: "absent", detail: "No" },
      },
      {
        feature: "Reminders after you leave",
        mobile: { status: "included", detail: "System notifications" },
        android: { status: "included", detail: "System notifications" },
        desktop: {
          status: "included",
          detail: "System notifications with the window hidden",
        },
      },
      {
        feature: "Close at hand",
        mobile: {
          status: "included",
          detail: "Home Screen and Lock Screen widgets, Live Activities",
        },
        android: { status: "included", detail: "Home-screen widgets and an ongoing notification" },
        desktop: {
          status: "included",
          detail: "Menu bar, tray, and mini timer",
        },
      },
      {
        feature: "Apple Watch",
        mobile: {
          status: "included",
          detail: "Free app and two complications",
        },
        android: { status: "absent", detail: "No" },
        desktop: { status: "absent", detail: "No" },
      },
      {
        feature: "Launch at login and shortcut",
        mobile: { status: "limited", detail: "Open it from the home screen" },
        android: { status: "limited", detail: "Open it from the home screen" },
        desktop: {
          status: "included",
          detail: "Ready after login, one shortcut away",
        },
      },
      {
        feature: "Data storage",
        mobile: {
          status: "included",
          detail: "Local by default, with optional private iCloud sync",
        },
        android: { status: "included", detail: "Local by default; Android backup can include it" },
        desktop: {
          status: "included",
          detail: "Hours and salary are not uploaded",
        },
      },
    ],
  },
};

export function downloadShowcaseCopy(
  locale: ContentLocale,
): DownloadShowcaseCopy {
  return copy[locale] ?? copy.en;
}

export function desktopMediaStem(locale: ContentLocale): "zh" | "en" {
  return isChineseHall(locale) ? "zh" : "en";
}
