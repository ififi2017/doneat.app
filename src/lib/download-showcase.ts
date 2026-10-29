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
  /** Features every app has, listed once above the table instead of as rows. */
  everywhereLabel: string;
  everywhere: string[];
  /** Download-page section nav. */
  showcaseLabel: string;
  pageIndexLabel: string;
  compareNavLabel: string;
  rows: CompareRow[];
}

const copy: Record<ContentLocale, DownloadShowcaseCopy> = {
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
      "基础功能每个客户端都有。手机上排班和薪资更细，电脑上随时唤出。",
    featureLabel: "功能",
    mobileLabel: "iPhone / iPad",
    androidLabel: "Android",
    desktopLabel: "电脑",
    everywhereLabel: "每个客户端都有",
    everywhere: [
      "下班倒计时与进度",
      "今日已赚",
      "跨夜班次",
      "下班提醒",
      "数据默认留在本机",
    ],
    showcaseLabel: "DoneAt 客户端功能",
    pageIndexLabel: "本页内容",
    compareNavLabel: "功能对照",
    rows: [
      {
        feature: "月历与循环排班",
        mobile: { status: "included", detail: "大小周、轮班、自由排班" },
        android: { status: "included", detail: "大小周、轮班、自由排班" },
        desktop: { status: "limited", detail: "一组上下班时间" },
      },
      {
        feature: "节假日与调休",
        mobile: { status: "included", detail: "按国家或地区" },
        android: { status: "included", detail: "按国家或地区" },
        desktop: { status: "absent", detail: "没有" },
      },
      {
        feature: "年终奖",
        mobile: { status: "included", detail: "折进今日已赚" },
        android: { status: "included", detail: "折进今日已赚" },
        desktop: { status: "limited", detail: "只算月薪或日薪" },
      },
      {
        feature: "薪资保密",
        mobile: { status: "included", detail: "生物识别" },
        android: { status: "included", detail: "指纹、人脸或锁屏密码" },
        desktop: { status: "absent", detail: "没有" },
      },
      {
        feature: "接下来的安排",
        mobile: { status: "included", detail: "健康提醒、进度、午休" },
        android: { status: "included", detail: "健康提醒、进度、午休" },
        desktop: { status: "absent", detail: "没有" },
      },
      {
        feature: "抬眼就在",
        mobile: { status: "included", detail: "小组件、实时活动" },
        android: { status: "included", detail: "小组件、常驻通知" },
        desktop: { status: "included", detail: "菜单栏、托盘、迷你计时" },
      },
      {
        feature: "Apple Watch",
        mobile: { status: "included", detail: "免费 App 与复杂功能" },
        android: { status: "absent", detail: "没有" },
        desktop: { status: "absent", detail: "没有" },
      },
      {
        feature: "开机启动与快捷键",
        mobile: { status: "limited", detail: "从主屏幕打开" },
        android: { status: "limited", detail: "从桌面打开" },
        desktop: { status: "included", detail: "登录即就绪，快捷键唤出" },
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
      "The basics are in every app. Phones go deeper on schedules and pay; computers stay one shortcut away.",
    featureLabel: "Feature",
    mobileLabel: "iPhone / iPad",
    androidLabel: "Android",
    desktopLabel: "Computer",
    everywhereLabel: "In every app",
    everywhere: [
      "Shift countdown and progress",
      "Today’s earnings",
      "Overnight shifts",
      "Clock-off reminders",
      "Data stays on your device by default",
    ],
    showcaseLabel: "DoneAt app features",
    pageIndexLabel: "On this page",
    compareNavLabel: "Compare features",
    rows: [
      {
        feature: "Calendar and rotations",
        mobile: { status: "included", detail: "Alternating weeks, rotations, free scheduling" },
        android: { status: "included", detail: "Alternating weeks, rotations, free scheduling" },
        desktop: { status: "limited", detail: "One start and end time" },
      },
      {
        feature: "Public holidays",
        mobile: { status: "included", detail: "By country or region" },
        android: { status: "included", detail: "By country or region" },
        desktop: { status: "absent", detail: "No" },
      },
      {
        feature: "Year-end bonus",
        mobile: { status: "included", detail: "Folds into today’s earnings" },
        android: { status: "included", detail: "Folds into today’s earnings" },
        desktop: { status: "limited", detail: "Monthly or daily pay only" },
      },
      {
        feature: "Salary lock",
        mobile: { status: "included", detail: "Biometrics" },
        android: { status: "included", detail: "Fingerprint, face or screen lock" },
        desktop: { status: "absent", detail: "No" },
      },
      {
        feature: "Coming up",
        mobile: { status: "included", detail: "Health reminders, progress, lunch" },
        android: { status: "included", detail: "Health reminders, progress, lunch" },
        desktop: { status: "absent", detail: "No" },
      },
      {
        feature: "Close at hand",
        mobile: { status: "included", detail: "Widgets, Live Activities" },
        android: { status: "included", detail: "Widgets, ongoing notification" },
        desktop: { status: "included", detail: "Menu bar, tray, mini timer" },
      },
      {
        feature: "Apple Watch",
        mobile: { status: "included", detail: "Free app and complications" },
        android: { status: "absent", detail: "No" },
        desktop: { status: "absent", detail: "No" },
      },
      {
        feature: "Launch at login and shortcut",
        mobile: { status: "limited", detail: "Open from the home screen" },
        android: { status: "limited", detail: "Open from the home screen" },
        desktop: { status: "included", detail: "Ready at login, one shortcut away" },
      },
    ],
  },
  "zh-TW": {
    heading: "在電腦上，抬眼就看得到",
    lede: "專心做事時，讓剩餘時間留在選單列、系統匣或迷你計時裡。視窗藏起來，下班提醒也還在。",
    mobileCaption: "iPhone",
    desktopCaption: "電腦主窗",
    miniCaption: "迷你計時，可留在桌面上",
    appAlt: "電腦上的 DoneAt：設好班次後開始倒數計時",
    miniAlt: "桌面上的迷你計時",
    reviewAlt:
      "iPhone 上的 DoneAt：今天這班的倒數計時和進度，下方是本週、今年的工時和接下來的提醒",
    iphoneHeading: "iPhone 和 Apple Watch 上能做什麼",
    iphoneLede:
      "手機上看倒數計時，鎖定畫面和手腕上看還剩多久，一整個月的班排在一張月曆裡。",
    iphoneFeatures: [
      {
        shot: "widgets",
        title: "小工具與即時動態",
        body: "主畫面和鎖定畫面小工具，不打開 App 也能看到還剩多久。在支援的 iPhone 上，即時動態會把進度留在鎖定畫面和動態島上。",
        alt: "DoneAt 在動態島、鎖定畫面即時動態和主畫面小工具裡，分別顯示這班還剩的時間、進度和接下來的提醒。",
      },
      {
        shot: "calendar",
        title: "月曆排班與節假日",
        body: "在同一張月曆裡設定和預覽排班：固定星期、隔週休、輪班輪休、自由排班或手動計時，改完立刻能看到。選擇國家或地區後，排班會跟著當地節假日走；選中國大陸時，也會按調休安排上班。從舊版本升級的話，到「工作時間與排班」裡開啟即可。",
        alt: "iPhone 上的 DoneAt 月曆：2026 年 10 月，國慶節顯示為休息，調休的週六顯示為白班；下方是固定星期的排班規律，節假日安排選的是中國大陸。",
      },
      {
        shot: "watch",
        title: "免費的 Apple Watch App",
        body: "抬腕就能看到還剩多久、幾點下班，錶盤上也可以添加兩種複雜功能。Apple Watch 版免費使用，無需 DoneAt Plus；手錶上只顯示時間和進度，不顯示薪資。",
        alt: "Apple Watch 上的 DoneAt：工作中，顯示這班還剩的時間、進度條和下班時間。",
      },
      {
        shot: "countdown",
        title: "懂你這一天的倒數計時",
        body: "扣除午休後，今天這班還剩多久一目了然，本週和今年的工時就在下面。午休、起身活動和下班提醒會依次出現在「接下來」裡。",
        alt: "iPhone 上的 DoneAt：進度條上方是今天這班還剩的時間，下方是本週、今年的工時和接下來的健康提醒、下班提醒。",
      },
    ],
    androidHeading: "Android 上能做什麼",
    androidLede:
      "和 iPhone 同一套排班規則；主畫面小工具和常駐通知，不打開 App 也能看到還剩多久。",
    androidFeatures: [
      {
        shot: "calendar",
        title: "月曆排班與節假日",
        body: "固定星期、隔週休、輪班輪休和跨夜班次排在同一張月曆裡，也可以在自由排班裡點一下或滑一下鋪上班次。在「工作時間與排班」裡選擇國家或地區，節假日和調休會一起排進去。",
        alt: "Android 上的 DoneAt「工作時間與排班」：2027 年 2 月月曆裡 5 日至 13 日標為春節，14 日標為補班；下方是固定星期的排班規律。",
      },
      {
        shot: "leave",
        title: "休假規劃",
        body: "填好假期餘額，DoneAt 會結合節假日找出怎麼請假能連休更久，並在月曆上標出來。前三次搜尋免費；同一次結果裡的方案和日期都可以隨便翻看。",
        alt: "Android 上的 DoneAt 請假方案：不用請假就能連休 9 天，2 月 5 日至 13 日春節，月曆上標出節假日和連休。",
      },
      {
        shot: "records",
        title: "回看每一段工時",
        body: "按週、月、年回看記錄和計畫，最近七天免費。DoneAt Plus 增加更早的記錄，以及年視圖和人生視圖。",
        alt: "Android 上的 DoneAt 記錄年視圖：2026 年每個月的工作日用彩色圓點標出。",
      },
      {
        shot: "breaks",
        title: "休息不算工時",
        body: "午休時倒數計時顯示「午休中」，休息時段不計入剩餘工時。今天的班次、今日已賺、本週和今年的工時就在下面。",
        alt: "Android 上的 DoneAt 計時頁：午休中，進度 37.5%，下方是今天 09:00–18:00 的班次、今日已賺、本週和今年的工時。",
      },
    ],
    comparisonHeading: "裝在哪裡，剩餘時間出現的方式不一樣",
    comparisonLede: "基本功能每個 App 都有。手機上排班和薪資更細，電腦上隨時喚出。",
    featureLabel: "功能",
    mobileLabel: "iPhone / iPad",
    androidLabel: "Android",
    desktopLabel: "電腦",
    everywhereLabel: "每個 App 都有",
    everywhere: [
      "下班倒數計時與進度",
      "今日已賺",
      "跨夜班次",
      "下班提醒",
      "資料預設留在本機",
    ],
    showcaseLabel: "DoneAt App 功能",
    pageIndexLabel: "本頁內容",
    compareNavLabel: "功能對照",
    rows: [
      {
        feature: "月曆與循環排班",
        mobile: { status: "included", detail: "隔週休、輪班、自由排班" },
        android: { status: "included", detail: "隔週休、輪班、自由排班" },
        desktop: { status: "limited", detail: "一組上下班時間" },
      },
      {
        feature: "節假日與調休",
        mobile: { status: "included", detail: "按國家或地區" },
        android: { status: "included", detail: "按國家或地區" },
        desktop: { status: "absent", detail: "沒有" },
      },
      {
        feature: "年終獎金",
        mobile: { status: "included", detail: "折進今日已賺" },
        android: { status: "included", detail: "折進今日已賺" },
        desktop: { status: "limited", detail: "只算月薪或日薪" },
      },
      {
        feature: "薪資保密",
        mobile: { status: "included", detail: "生物辨識" },
        android: { status: "included", detail: "指紋、人臉或鎖定畫面密碼" },
        desktop: { status: "absent", detail: "沒有" },
      },
      {
        feature: "接下來的安排",
        mobile: { status: "included", detail: "健康提醒、進度、午休" },
        android: { status: "included", detail: "健康提醒、進度、午休" },
        desktop: { status: "absent", detail: "沒有" },
      },
      {
        feature: "抬眼就在",
        mobile: { status: "included", detail: "小工具、即時動態" },
        android: { status: "included", detail: "小工具、常駐通知" },
        desktop: { status: "included", detail: "選單列、系統匣、迷你計時" },
      },
      {
        feature: "Apple Watch",
        mobile: { status: "included", detail: "免費 App 與複雜功能" },
        android: { status: "absent", detail: "沒有" },
        desktop: { status: "absent", detail: "沒有" },
      },
      {
        feature: "登入時啟動與快捷鍵",
        mobile: { status: "limited", detail: "從主畫面打開" },
        android: { status: "limited", detail: "從桌面打開" },
        desktop: { status: "included", detail: "登入即就緒，快捷鍵喚出" },
      },
    ],
  },
  "zh-HK": {
    heading: "喺電腦上，抬眼就睇到",
    lede: "專心做事嗰陣，將剩餘時間留喺選單列、系統匣或者迷你計時入面。個窗收埋，放工提醒都仲喺度。",
    mobileCaption: "iPhone",
    desktopCaption: "電腦主窗",
    miniCaption: "迷你計時，可以留喺桌面上",
    appAlt: "電腦上嘅 DoneAt：設好更份之後開始倒數計時",
    miniAlt: "桌面上嘅迷你計時",
    reviewAlt:
      "iPhone 上嘅 DoneAt：今日呢更嘅倒數計時同進度，下面係本週、今年嘅工時同接下來嘅提醒",
    iphoneHeading: "iPhone 同 Apple Watch 上可以做咩",
    iphoneLede:
      "手機睇倒數計時，鎖定畫面同手腕睇仲剩幾耐，成個月嘅更排喺一張月曆入面。",
    iphoneFeatures: [
      {
        shot: "widgets",
        title: "小工具同即時動態",
        body: "主畫面同鎖定畫面小工具，唔打開 App 都睇到仲剩幾耐。喺支援嘅 iPhone 上，即時動態會將進度留喺鎖定畫面同動態島上面。",
        alt: "DoneAt 喺動態島、鎖定畫面即時動態同主畫面小工具入面，分別顯示呢更仲剩嘅時間、進度同接下來嘅提醒。",
      },
      {
        shot: "calendar",
        title: "月曆排班同假期",
        body: "喺同一張月曆入面設定同預覽排班：固定星期、隔週休、輪更輪休、自由排班或手動計時，改完即刻睇到。揀國家或地區之後，排班會跟住當地假期走；揀中國大陸嘅話，亦會按調休安排返工。由舊版本升級嘅話，去「工作時間與排班」入面開一次就得。",
        alt: "iPhone 上嘅 DoneAt 月曆：2026 年 10 月，國慶節顯示為休息，調休嘅星期六顯示為白班；下面係固定星期嘅排班規律，假期安排揀嘅係中國大陸。",
      },
      {
        shot: "watch",
        title: "免費嘅 Apple Watch App",
        body: "抬手就睇到仲剩幾耐、幾點放工，錶面上亦可以加兩種複雜功能。Apple Watch 版免費使用，唔使 DoneAt Plus；手錶上只顯示時間同進度，唔顯示薪金。",
        alt: "Apple Watch 上嘅 DoneAt：工作中，顯示呢更仲剩嘅時間、進度條同放工時間。",
      },
      {
        shot: "countdown",
        title: "識你呢一日嘅倒數計時",
        body: "扣咗午休之後，今日呢更仲剩幾耐一目了然，本週同今年嘅工時就喺下面。午休、起身活動同放工提醒會依次出現喺「接下來」入面。",
        alt: "iPhone 上嘅 DoneAt：進度條上面係今日呢更仲剩嘅時間，下面係本週、今年嘅工時同接下來嘅健康提醒、放工提醒。",
      },
    ],
    androidHeading: "Android 上可以做咩",
    androidLede:
      "同 iPhone 同一套排班規則；主畫面小工具同常駐通知，唔打開 App 都睇到仲剩幾耐。",
    androidFeatures: [
      {
        shot: "calendar",
        title: "月曆排班同假期",
        body: "固定星期、隔週休、輪更輪休同跨夜更次排喺同一張月曆入面，亦可以喺自由排班入面點一下或者掃一下鋪上更次。喺「工作時間與排班」入面揀國家或地區，假期同調休會一齊排埋去。",
        alt: "Android 上嘅 DoneAt「工作時間與排班」：2027 年 2 月月曆入面 5 日至 13 日標為春節，14 日標為補班；下面係固定星期嘅排班規律。",
      },
      {
        shot: "leave",
        title: "休假規劃",
        body: "填好假期餘額，DoneAt 會跟住假期搵出點樣請假先至連休得更耐，再喺月曆上標出嚟。頭三次搜尋免費；同一次結果入面嘅方案同日期都可以隨便睇。",
        alt: "Android 上嘅 DoneAt 請假方案：唔使請假就連休到 9 日，2 月 5 日至 13 日春節，月曆上標出假期同連休。",
      },
      {
        shot: "records",
        title: "回看每一段工時",
        body: "按週、月、年回看記錄同計劃，最近七日免費。DoneAt Plus 加入更早嘅記錄，以及年視圖同人生視圖。",
        alt: "Android 上嘅 DoneAt 記錄年視圖：2026 年每個月嘅工作日用彩色圓點標出。",
      },
      {
        shot: "breaks",
        title: "休息唔算工時",
        body: "午休嗰陣倒數計時顯示「午休中」，休息時段唔計入剩餘工時。今日嘅更、今日賺咗、本週同今年嘅工時就喺下面。",
        alt: "Android 上嘅 DoneAt 計時頁：午休中，進度 37.5%，下面係今日 09:00–18:00 嘅更、今日賺咗、本週同今年嘅工時。",
      },
    ],
    comparisonHeading: "裝喺邊度，剩餘時間出現嘅方式唔同",
    comparisonLede: "基本功能每個 App 都有。手機上排班同薪金更細，電腦上隨時叫出。",
    featureLabel: "功能",
    mobileLabel: "iPhone / iPad",
    androidLabel: "Android",
    desktopLabel: "電腦",
    everywhereLabel: "每個 App 都有",
    everywhere: [
      "放工倒數計時同進度",
      "今日賺咗",
      "跨夜更次",
      "放工提醒",
      "資料預設留喺本機",
    ],
    showcaseLabel: "DoneAt App 功能",
    pageIndexLabel: "本頁內容",
    compareNavLabel: "功能對照",
    rows: [
      {
        feature: "月曆同循環排班",
        mobile: { status: "included", detail: "隔週休、輪更、自由排班" },
        android: { status: "included", detail: "隔週休、輪更、自由排班" },
        desktop: { status: "limited", detail: "一組返工放工時間" },
      },
      {
        feature: "假期同調休",
        mobile: { status: "included", detail: "按國家或地區" },
        android: { status: "included", detail: "按國家或地區" },
        desktop: { status: "absent", detail: "冇" },
      },
      {
        feature: "年終花紅",
        mobile: { status: "included", detail: "折入今日賺咗" },
        android: { status: "included", detail: "折入今日賺咗" },
        desktop: { status: "limited", detail: "只計月薪或日薪" },
      },
      {
        feature: "薪金保密",
        mobile: { status: "included", detail: "生物識別" },
        android: { status: "included", detail: "指紋、人面或鎖屏密碼" },
        desktop: { status: "absent", detail: "冇" },
      },
      {
        feature: "接下來嘅安排",
        mobile: { status: "included", detail: "健康提醒、進度、午休" },
        android: { status: "included", detail: "健康提醒、進度、午休" },
        desktop: { status: "absent", detail: "冇" },
      },
      {
        feature: "抬眼就喺度",
        mobile: { status: "included", detail: "小工具、即時動態" },
        android: { status: "included", detail: "小工具、常駐通知" },
        desktop: { status: "included", detail: "選單列、系統匣、迷你計時" },
      },
      {
        feature: "Apple Watch",
        mobile: { status: "included", detail: "免費 App 同複雜功能" },
        android: { status: "absent", detail: "冇" },
        desktop: { status: "absent", detail: "冇" },
      },
      {
        feature: "登入時啟動同快捷鍵",
        mobile: { status: "limited", detail: "由主畫面打開" },
        android: { status: "limited", detail: "由桌面打開" },
        desktop: { status: "included", detail: "登入就就緒，快捷鍵叫出" },
      },
    ],
  },
  ja: {
    heading: "デスクの端に。作業のじゃまはしない。",
    lede: "残り時間はメニューバー、システムトレイ、ミニタイマーに置いておけます。ウィンドウを隠しても、退勤の知らせは残ります。",
    mobileCaption: "iPhone",
    desktopCaption: "デスクトップのウィンドウ",
    miniCaption: "ミニタイマー。デスクトップに置いたまま",
    appAlt: "パソコンの DoneAt。シフトを設定してカウントダウンを始める",
    miniAlt: "デスクトップ上のミニタイマー",
    reviewAlt:
      "iPhone の DoneAt。今日のシフトのカウントダウンと進捗。下には今週と今年の勤務時間、これからのリマインダー",
    iphoneHeading: "iPhone と Apple Watch でできること",
    iphoneLede:
      "スマホでカウントダウン、ロック画面と手首で残り時間、ひと月分のシフトはカレンダー 1 枚に。",
    iphoneFeatures: [
      {
        shot: "widgets",
        title: "ウィジェットとライブアクティビティ",
        body: "ホーム画面とロック画面のウィジェットで、アプリを開かなくても残り時間がわかります。対応する iPhone では、ライブアクティビティがロック画面と Dynamic Island に進捗を残します。",
        alt: "Dynamic Island、ロック画面のライブアクティビティ、ホーム画面のウィジェットに、シフトの残り時間、進捗、これからのリマインダーを表示する DoneAt。",
      },
      {
        shot: "calendar",
        title: "月間カレンダーと祝日",
        body: "1 つの月間カレンダーでスケジュールを組んで、その場で確認できます。固定曜日、隔週、シフトローテーション、フリー、手動タイマーに対応し、変更はすぐ反映されます。国や地域を選ぶと、その地域の祝日がスケジュールに入ります。古いバージョンからアップデートした場合は、「勤務時間とスケジュール」で一度有効にしてください。",
        alt: "iPhone の DoneAt 月間カレンダー。2026 年 7 月で、勤務日、休日、独立記念日を示し、固定曜日のパターンと、アメリカ合衆国に設定した祝日カレンダー。",
      },
      {
        shot: "watch",
        title: "無料の Apple Watch アプリ",
        body: "手首を上げるだけで残り時間と退勤時刻がわかり、文字盤には 2 種類のコンプリケーションを置けます。Apple Watch 版は無料で、DoneAt Plus は不要です。時計には時間と進捗だけを表示し、給与は出しません。",
        alt: "勤務中の Apple Watch の DoneAt。シフトの残り時間、進捗バー、退勤時刻。",
      },
      {
        shot: "countdown",
        title: "その日に合わせたカウントダウン",
        body: "昼休みを除いた、今日のシフトの残り時間がすぐにわかり、今週と今年の勤務時間はその下にあります。昼休み、立ち上がって体を動かす時間、退勤は「このあと」に順に並びます。",
        alt: "iPhone の DoneAt。進捗バーの上に今日のシフトの残り時間。下に今週と今年の勤務時間と、健康と退勤のリマインダー。",
      },
    ],
    androidHeading: "Android でできること",
    androidLede:
      "スケジュールのルールは iPhone と同じ。ホーム画面のウィジェットと常駐通知で、アプリを開かなくても残り時間がわかります。",
    androidFeatures: [
      {
        shot: "calendar",
        title: "月間カレンダーと祝日",
        body: "固定曜日、隔週、ローテーション、日をまたぐシフトを 1 つのカレンダーに置けます。フリーのスケジュールでは、タップやスワイプでシフトを塗ることもできます。「勤務時間とシフト」で国や地域を選ぶと、その地域の祝日がスケジュールに入ります。",
        alt: "Android の DoneAt「勤務時間とシフト」。2026 年 11 月で、勤務日、休日、復員軍人の日、感謝祭を示し、下に固定曜日のパターン。",
      },
      {
        shot: "leave",
        title: "休暇の計画",
        body: "休暇の残りを入れると、DoneAt は祝日とつなげて長く休める日を探し、カレンダーに示します。検索は 3 回まで無料。同じ結果の中なら、プランも日付も何度でも見られます。",
        alt: "Android の DoneAt の休暇プラン。休暇 4 日で、クリスマスを挟んで 12 月 25 日から 1 月 3 日まで 10 連休。カレンダーに表示。",
      },
      {
        shot: "records",
        title: "週から年まで、記録を振り返る",
        body: "記録と予定を週、月、年で振り返れます。直近 7 日間は無料。DoneAt Plus で、それより前の記録と、年ビュー、ライフビューが加わります。",
        alt: "Android の DoneAt 記録の年ビュー。2026 年の勤務日が色付きの点で示されている。",
      },
      {
        shot: "breaks",
        title: "休憩は勤務時間に入らない",
        body: "昼休みのあいだ、タイマーは休憩中と表示し、休憩の時間は残り勤務から除きます。今日のシフト、本日の収入、今週と今年の勤務時間はその下にあります。",
        alt: "Android の DoneAt タイマー。昼休み中、進捗 37.5%。下に今日の 09:00–18:00 のシフト、本日の収入、今週と今年の勤務時間。",
      },
    ],
    comparisonHeading: "入れる場所で、残り時間の出方が変わる",
    comparisonLede:
      "基本はどのアプリにもあります。スマホはスケジュールと給与が細かく、パソコンはすぐ呼び出せます。",
    featureLabel: "機能",
    mobileLabel: "iPhone / iPad",
    androidLabel: "Android",
    desktopLabel: "パソコン",
    everywhereLabel: "どのアプリにもある",
    everywhere: [
      "シフトのカウントダウンと進捗",
      "本日の収入",
      "日をまたぐシフト",
      "退勤リマインダー",
      "データは初期状態で端末内",
    ],
    showcaseLabel: "DoneAt アプリの機能",
    pageIndexLabel: "このページ",
    compareNavLabel: "機能の比較",
    rows: [
      {
        feature: "カレンダーとローテーション",
        mobile: { status: "included", detail: "隔週、ローテーション、フリー" },
        android: { status: "included", detail: "隔週、ローテーション、フリー" },
        desktop: { status: "limited", detail: "出勤と退勤が 1 組" },
      },
      {
        feature: "祝日",
        mobile: { status: "included", detail: "国や地域ごと" },
        android: { status: "included", detail: "国や地域ごと" },
        desktop: { status: "absent", detail: "なし" },
      },
      {
        feature: "年末の賞与",
        mobile: { status: "included", detail: "本日の収入に反映" },
        android: { status: "included", detail: "本日の収入に反映" },
        desktop: { status: "limited", detail: "月給か日給だけ" },
      },
      {
        feature: "給与を隠す",
        mobile: { status: "included", detail: "生体認証" },
        android: { status: "included", detail: "指紋、顔または画面ロック" },
        desktop: { status: "absent", detail: "なし" },
      },
      {
        feature: "このあと",
        mobile: { status: "included", detail: "健康、進捗、昼休み" },
        android: { status: "included", detail: "健康、進捗、昼休み" },
        desktop: { status: "absent", detail: "なし" },
      },
      {
        feature: "いつでも見られる",
        mobile: { status: "included", detail: "ウィジェット、ライブアクティビティ" },
        android: { status: "included", detail: "ウィジェット、常駐通知" },
        desktop: { status: "included", detail: "メニューバー、トレイ、ミニタイマー" },
      },
      {
        feature: "Apple Watch",
        mobile: { status: "included", detail: "無料アプリとコンプリケーション" },
        android: { status: "absent", detail: "なし" },
        desktop: { status: "absent", detail: "なし" },
      },
      {
        feature: "ログイン時の起動とショートカット",
        mobile: { status: "limited", detail: "ホーム画面から開く" },
        android: { status: "limited", detail: "ホーム画面から開く" },
        desktop: { status: "included", detail: "ログインですぐ、ショートカットで呼び出し" },
      },
    ],
  },
  ko: {
    heading: "책상 위에 두되, 일은 가리지 않게.",
    lede: "남은 시간은 메뉴 바, 시스템 트레이, 미니 타이머에 두세요. 창을 숨겨도 퇴근 알림은 그대로입니다.",
    mobileCaption: "iPhone",
    desktopCaption: "데스크톱 창",
    miniCaption: "미니 타이머, 바탕화면에 둘 수 있음",
    appAlt: "컴퓨터의 DoneAt. 근무를 정하고 카운트다운을 시작",
    miniAlt: "바탕화면의 미니 타이머",
    reviewAlt:
      "iPhone의 DoneAt. 오늘 근무의 카운트다운과 진행률. 아래에는 이번 주와 올해의 근무 시간, 다가오는 알림",
    iphoneHeading: "iPhone과 Apple Watch에서 할 수 있는 일",
    iphoneLede:
      "휴대폰에서 카운트다운, 잠금 화면과 손목에서 남은 시간, 한 달 근무는 달력 하나에.",
    iphoneFeatures: [
      {
        shot: "widgets",
        title: "위젯과 라이브 액티비티",
        body: "홈 화면과 잠금 화면 위젯으로 앱을 열지 않아도 남은 시간을 볼 수 있습니다. 지원되는 iPhone에서는 라이브 액티비티가 잠금 화면과 다이내믹 아일랜드에 진행률을 남겨 둡니다.",
        alt: "다이내믹 아일랜드, 잠금 화면 라이브 액티비티, 홈 화면 위젯에 근무 남은 시간, 진행률, 다가오는 알림을 보여주는 DoneAt.",
      },
      {
        shot: "calendar",
        title: "월간 캘린더와 공휴일",
        body: "월간 캘린더 하나에서 스케줄을 짜고 바로 확인할 수 있습니다. 고정 요일, 격주, 교대 로테이션, 자유 설정, 수동 타이머를 지원하며, 바꾸면 곧바로 반영됩니다. 국가나 지역을 고르면 그곳의 공휴일이 스케줄에 들어갑니다. 이전 버전에서 업데이트했다면 「근무 시간 및 스케줄」에서 한 번 켜 주세요.",
        alt: "iPhone의 DoneAt 월간 캘린더. 2026년 7월, 근무일·휴일·미국 독립기념일이 표시되고, 고정 요일 패턴과 미국으로 설정된 공휴일 달력.",
      },
      {
        shot: "watch",
        title: "무료 Apple Watch 앱",
        body: "손목을 들면 남은 시간과 퇴근 시각이 보이고, 워치 페이스에 컴플리케이션 두 가지를 넣을 수 있습니다. Apple Watch 버전은 무료이며 DoneAt Plus가 필요 없습니다. 시계에는 시간과 진행률만 나오고, 급여는 나오지 않습니다.",
        alt: "근무 중인 Apple Watch의 DoneAt. 근무 남은 시간, 진행 막대, 퇴근 시각.",
      },
      {
        shot: "countdown",
        title: "오늘 하루에 맞춘 카운트다운",
        body: "점심시간을 뺀 오늘 근무의 남은 시간이 한눈에 보이고, 이번 주와 올해 근무 시간은 그 아래에 있습니다. 점심, 일어나 몸 풀기, 퇴근은 「다음」에 차례로 나옵니다.",
        alt: "iPhone의 DoneAt. 진행 막대 위에 오늘 근무의 남은 시간. 아래에는 이번 주와 올해의 근무 시간, 건강 알림과 퇴근 알림.",
      },
    ],
    androidHeading: "Android에서 할 수 있는 일",
    androidLede:
      "스케줄 규칙은 iPhone과 같습니다. 홈 화면 위젯과 상시 알림으로 앱을 열지 않아도 남은 시간을 볼 수 있습니다.",
    androidFeatures: [
      {
        shot: "calendar",
        title: "월간 캘린더와 공휴일",
        body: "고정 요일, 격주, 교대 로테이션, 날짜를 넘는 근무를 달력 하나에 넣을 수 있습니다. 자유 스케줄에서는 탭하거나 쓸어서 근무를 칠할 수도 있습니다. 「근무 시간 및 일정」에서 국가나 지역을 고르면 그곳의 공휴일이 스케줄에 들어갑니다.",
        alt: "Android의 DoneAt 「근무 시간 및 일정」. 2026년 11월, 근무일·휴일·재향군인의 날·추수감사절이 표시되고, 아래에 고정 요일 패턴.",
      },
      {
        shot: "leave",
        title: "휴가 계획",
        body: "남은 휴가를 넣으면 DoneAt이 공휴일과 이어 더 길게 쉴 수 있는 날을 찾아 달력에 표시합니다. 검색은 세 번까지 무료입니다. 같은 결과 안에서는 방안과 날짜를 얼마든지 넘겨 볼 수 있습니다.",
        alt: "Android DoneAt의 휴가 계획. 휴가 4일로 크리스마스를 끼고 12월 25일부터 1월 3일까지 10일 연휴. 달력에 표시.",
      },
      {
        shot: "records",
        title: "주간에서 연간까지, 기록 돌아보기",
        body: "기록과 계획을 주, 월, 년으로 돌아볼 수 있습니다. 최근 7일은 무료입니다. DoneAt Plus는 그보다 이전 기록과 연간 보기, 라이프 뷰를 더합니다.",
        alt: "Android DoneAt 기록의 연간 보기. 2026년의 근무일이 색점 표시.",
      },
      {
        shot: "breaks",
        title: "휴식은 근무 시간에 넣지 않음",
        body: "점심시간에는 타이머가 휴식 중이라고 보여 주고, 쉬는 시간은 남은 근무에서 뺍니다. 오늘 근무, 오늘 번 금액, 이번 주와 올해의 근무 시간은 그 아래에 있습니다.",
        alt: "Android DoneAt 타이머. 점심 휴식 중, 진행률 37.5%. 아래에 오늘 09:00–18:00 근무, 오늘 번 금액, 이번 주와 올해의 근무 시간.",
      },
    ],
    comparisonHeading: "어디에 두느냐에 따라 남은 시간이 보이는 방식이 달라집니다",
    comparisonLede:
      "기본은 모든 앱에 있습니다. 휴대폰은 스케줄과 급여가 더 자세하고, 컴퓨터는 바로 불러낼 수 있습니다.",
    featureLabel: "기능",
    mobileLabel: "iPhone / iPad",
    androidLabel: "Android",
    desktopLabel: "컴퓨터",
    everywhereLabel: "모든 앱에 있음",
    everywhere: [
      "근무 카운트다운과 진행률",
      "오늘 번 금액",
      "날짜를 넘는 근무",
      "퇴근 알림",
      "데이터는 기본적으로 기기에",
    ],
    showcaseLabel: "DoneAt 앱 기능",
    pageIndexLabel: "이 페이지",
    compareNavLabel: "기능 비교",
    rows: [
      {
        feature: "캘린더와 교대",
        mobile: { status: "included", detail: "격주, 교대, 자유 설정" },
        android: { status: "included", detail: "격주, 교대, 자유 설정" },
        desktop: { status: "limited", detail: "출퇴근 시간 하나" },
      },
      {
        feature: "공휴일",
        mobile: { status: "included", detail: "국가 또는 지역별" },
        android: { status: "included", detail: "국가 또는 지역별" },
        desktop: { status: "absent", detail: "없음" },
      },
      {
        feature: "연말 상여",
        mobile: { status: "included", detail: "오늘 번 금액에 반영" },
        android: { status: "included", detail: "오늘 번 금액에 반영" },
        desktop: { status: "limited", detail: "월급 또는 일급만" },
      },
      {
        feature: "급여 잠금",
        mobile: { status: "included", detail: "생체 인증" },
        android: { status: "included", detail: "지문, 얼굴 또는 화면 잠금" },
        desktop: { status: "absent", detail: "없음" },
      },
      {
        feature: "다음 일정",
        mobile: { status: "included", detail: "건강 알림, 진행률, 점심" },
        android: { status: "included", detail: "건강 알림, 진행률, 점심" },
        desktop: { status: "absent", detail: "없음" },
      },
      {
        feature: "언제든 볼 수 있어요",
        mobile: { status: "included", detail: "위젯, 라이브 액티비티" },
        android: { status: "included", detail: "위젯, 상시 알림" },
        desktop: { status: "included", detail: "메뉴 바, 트레이, 미니 타이머" },
      },
      {
        feature: "Apple Watch",
        mobile: { status: "included", detail: "무료 앱과 컴플리케이션" },
        android: { status: "absent", detail: "없음" },
        desktop: { status: "absent", detail: "없음" },
      },
      {
        feature: "로그인 시 실행과 단축키",
        mobile: { status: "limited", detail: "홈 화면에서 열기" },
        android: { status: "limited", detail: "홈 화면에서 열기" },
        desktop: { status: "included", detail: "로그인하면 준비, 단축키로 호출" },
      },
    ],
  },
  fr: {
    heading: "Sur le bureau. Hors du passage.",
    lede: "Gardez le temps restant dans la barre de menus, la zone de notification ou le mini-minuteur. Cachez la fenêtre : le rappel de fin de journée reste là.",
    mobileCaption: "iPhone",
    desktopCaption: "Fenêtre sur l’ordinateur",
    miniCaption: "Mini-minuteur, reste sur le bureau",
    appAlt: "DoneAt sur un ordinateur : un quart est défini, le compte à rebours démarre",
    miniAlt: "Le mini-minuteur sur le bureau",
    reviewAlt:
      "DoneAt sur iPhone : le compte à rebours et la progression du quart du jour, avec les heures de la semaine, de l’année et les rappels à venir",
    iphoneHeading: "Ce que DoneAt fait sur iPhone et Apple Watch",
    iphoneLede:
      "Le compte à rebours sur le téléphone, le temps restant sur l’écran de verrouillage et au poignet, et un mois de quarts sur un seul calendrier.",
    iphoneFeatures: [
      {
        shot: "widgets",
        title: "Widgets et Activités en direct",
        body: "Les widgets de l’écran d’accueil et de verrouillage montrent le temps restant sans ouvrir l’app. Sur les iPhone compatibles, une Activité en direct garde la progression sur l’écran de verrouillage et dans Dynamic Island.",
        alt: "DoneAt dans Dynamic Island, en Activité en direct sur l’écran de verrouillage et en widget d’accueil, avec le temps restant du quart, sa progression et les rappels à venir.",
      },
      {
        shot: "calendar",
        title: "Calendrier mensuel et jours fériés",
        body: "Composez et relisez votre planning sur un seul calendrier mensuel : jours fixes, semaines alternées, rotations, libre planification ou minuterie manuelle. Chaque changement se voit tout de suite. Choisissez un pays ou une région, et le planning suit ses jours fériés. Vous arrivez d’une ancienne version ? Activez-le une fois dans « Horaires et planning ».",
        alt: "Calendrier mensuel de DoneAt sur iPhone pour juillet 2026, avec les jours travaillés, les jours de repos et le Jour de l’Indépendance, le schéma des jours fixes et le calendrier des fériés réglé sur les États-Unis.",
      },
      {
        shot: "watch",
        title: "Une app Apple Watch gratuite",
        body: "Levez le poignet pour voir le temps restant et l’heure de fin, et ajoutez l’une des deux complications au cadran. DoneAt pour Apple Watch est gratuit, sans DoneAt Plus, et n’affiche que les heures et la progression, jamais le salaire.",
        alt: "DoneAt sur Apple Watch pendant le travail : temps restant du quart, barre de progression et heure de fin.",
      },
      {
        shot: "countdown",
        title: "Un compte à rebours qui connaît votre journée",
        body: "Voyez le temps restant dans le quart du jour, pause déjeuner retirée, avec les heures de la semaine et de l’année juste en dessous. Le déjeuner, une pause pour s’étirer et la fin du quart arrivent ensuite sous « À suivre ».",
        alt: "DoneAt sur iPhone : le temps restant du quart du jour au-dessus d’une barre de progression, puis les heures de la semaine et de l’année, et les rappels de santé et de fin de journée.",
      },
    ],
    androidHeading: "Ce que DoneAt fait sur Android",
    androidLede:
      "Les mêmes règles de planning que sur iPhone, avec un widget d’écran d’accueil et une notification permanente pour le temps restant.",
    androidFeatures: [
      {
        shot: "calendar",
        title: "Calendrier mensuel et jours fériés",
        body: "Jours fixes, semaines alternées, rotations et quarts qui passent minuit sur un seul calendrier, ou peignez les quarts sur un planning libre d’un toucher ou d’un balayage. Choisissez un pays ou une région dans « Horaires et planning », et le planning suit ses jours fériés.",
        alt: "« Horaires et planning » de DoneAt sur Android pour novembre 2026, avec les jours travaillés, les jours de repos, le Jour des anciens combattants et Thanksgiving, et le schéma des jours fixes en dessous.",
      },
      {
        shot: "leave",
        title: "Prévoir vos congés",
        body: "Indiquez votre solde de congés : DoneAt cherche les jours qui se raccordent aux fériés pour une pause plus longue, puis les montre sur le calendrier. Trois recherches sont gratuites, et vous pouvez parcourir chaque plan d’un résultat sans en dépenser une autre.",
        alt: "Un plan de congés dans DoneAt sur Android : quatre jours de congé pour dix jours d’affilée, du 25 décembre au 3 janvier autour de Noël, indiqués sur le calendrier.",
      },
      {
        shot: "records",
        title: "Les relevés, de la semaine à l’année",
        body: "Revenez sur le temps enregistré et prévu par semaine, par mois et par année. Les sept derniers jours sont gratuits ; DoneAt Plus ajoute les relevés plus anciens et les vues Année et Vie.",
        alt: "La vue Année des relevés dans DoneAt sur Android : chaque jour travaillé de 2026 est un point de couleur.",
      },
      {
        shot: "breaks",
        title: "Les pauses ne comptent pas comme du travail",
        body: "À la pause déjeuner, le minuteur indique que vous êtes en pause, et ce temps sort du temps restant. Le quart du jour, les gains du jour et les heures de la semaine et de l’année sont juste en dessous.",
        alt: "Le minuteur de DoneAt sur Android pendant la pause déjeuner, à 37,5 % d’avancement, avec le quart du jour 09:00–18:00, les gains du jour et les heures de la semaine et de l’année.",
      },
    ],
    comparisonHeading: "Ce qui change, c’est l’endroit où il vit",
    comparisonLede:
      "L’essentiel est dans chaque app. Le téléphone va plus loin sur le planning et la paie ; l’ordinateur reste à un raccourci.",
    featureLabel: "Fonction",
    mobileLabel: "iPhone / iPad",
    androidLabel: "Android",
    desktopLabel: "Ordinateur",
    everywhereLabel: "Dans chaque app",
    everywhere: [
      "Compte à rebours du quart et progression",
      "Gains du jour",
      "Quarts passant minuit",
      "Rappels de fin de journée",
      "Les données restent sur l’appareil par défaut",
    ],
    showcaseLabel: "Fonctions des apps DoneAt",
    pageIndexLabel: "Sur cette page",
    compareNavLabel: "Comparer les fonctions",
    rows: [
      {
        feature: "Calendrier et rotations",
        mobile: { status: "included", detail: "Semaines alternées, rotations, libre" },
        android: { status: "included", detail: "Semaines alternées, rotations, libre" },
        desktop: { status: "limited", detail: "Une seule paire d’horaires" },
      },
      {
        feature: "Jours fériés",
        mobile: { status: "included", detail: "Selon le pays ou la région" },
        android: { status: "included", detail: "Selon le pays ou la région" },
        desktop: { status: "absent", detail: "Non" },
      },
      {
        feature: "Prime de fin d’année",
        mobile: { status: "included", detail: "Intégrée aux gains du jour" },
        android: { status: "included", detail: "Intégrée aux gains du jour" },
        desktop: { status: "limited", detail: "Salaire mensuel ou journalier seulement" },
      },
      {
        feature: "Verrouillage du salaire",
        mobile: { status: "included", detail: "Biométrie" },
        android: { status: "included", detail: "Empreinte, visage ou verrouillage" },
        desktop: { status: "absent", detail: "Non" },
      },
      {
        feature: "À suivre",
        mobile: { status: "included", detail: "Santé, progression, déjeuner" },
        android: { status: "included", detail: "Santé, progression, déjeuner" },
        desktop: { status: "absent", detail: "Non" },
      },
      {
        feature: "Toujours accessible",
        mobile: { status: "included", detail: "Widgets, Activités en direct" },
        android: { status: "included", detail: "Widgets, notification permanente" },
        desktop: { status: "included", detail: "Barre de menus, zone de notification, mini-minuteur" },
      },
      {
        feature: "Apple Watch",
        mobile: { status: "included", detail: "App gratuite et complications" },
        android: { status: "absent", detail: "Non" },
        desktop: { status: "absent", detail: "Non" },
      },
      {
        feature: "Lancement à la connexion et raccourci",
        mobile: { status: "limited", detail: "Ouverture depuis l’écran d’accueil" },
        android: { status: "limited", detail: "Ouverture depuis l’écran d’accueil" },
        desktop: { status: "included", detail: "Prêt à la connexion, un raccourci" },
      },
    ],
  },
  de: {
    heading: "Auf dem Schreibtisch. Nicht im Weg.",
    lede: "Lass die Restzeit in der Menüleiste, im Infobereich oder im Mini-Timer. Das Fenster kannst du zuklappen, die Feierabend-Erinnerung bleibt.",
    mobileCaption: "iPhone",
    desktopCaption: "Fenster auf dem Computer",
    miniCaption: "Mini-Timer, bleibt auf dem Schreibtisch",
    appAlt: "DoneAt auf einem Computer: Schicht einstellen und den Countdown starten",
    miniAlt: "Der Mini-Timer auf dem Schreibtisch",
    reviewAlt:
      "DoneAt auf dem iPhone: Countdown und Fortschritt der heutigen Schicht, dazu die Stunden dieser Woche und dieses Jahres und die nächsten Erinnerungen",
    iphoneHeading: "Was DoneAt auf iPhone und Apple Watch kann",
    iphoneLede:
      "Der Countdown auf dem Handy, die Restzeit auf dem Sperrbildschirm und am Handgelenk, und ein ganzer Monat Schichten in einem Kalender.",
    iphoneFeatures: [
      {
        shot: "widgets",
        title: "Widgets und Live-Aktivitäten",
        body: "Widgets auf dem Home- und Sperrbildschirm zeigen die Restzeit, ohne die App zu öffnen. Auf unterstützten iPhones bleibt eine Live-Aktivität auf dem Sperrbildschirm und in der Dynamic Island.",
        alt: "DoneAt in der Dynamic Island, als Live-Aktivität auf dem Sperrbildschirm und als Home-Widget, jeweils mit Restzeit der Schicht, Fortschritt und kommenden Erinnerungen.",
      },
      {
        shot: "calendar",
        title: "Monatskalender und Feiertage",
        body: "Plane und prüfe deinen Monat in einem Kalender: feste Wochentage, Wechselwochen, Schichtrotation, freie Eingabe oder manuelles Timing. Jede Änderung ist sofort sichtbar. Wählst du ein Land oder eine Region, folgt der Plan den dortigen Feiertagen. Du kommst von einer älteren Version? Schalte es einmal unter „Arbeitszeiten und Zeitplan“ ein.",
        alt: "Monatskalender von DoneAt auf dem iPhone für Juli 2026, mit Arbeitstagen, Ruhetagen und dem Unabhängigkeitstag, dem Muster fester Wochentage und dem Feiertagskalender auf Vereinigte Staaten.",
      },
      {
        shot: "watch",
        title: "Eine kostenlose Apple-Watch-App",
        body: "Ein Blick aufs Handgelenk zeigt die Restzeit und den Feierabend, und du kannst eine von zwei Komplikationen auf das Zifferblatt legen. DoneAt für die Apple Watch ist kostenlos, ohne DoneAt Plus, und zeigt Zeiten und Fortschritt, nie das Gehalt.",
        alt: "DoneAt auf der Apple Watch während der Arbeit: Restzeit der Schicht, Fortschrittsbalken und Feierabend.",
      },
      {
        shot: "countdown",
        title: "Ein Countdown, der deinen Tag kennt",
        body: "Sieh, wie lange die heutige Schicht noch geht, die Mittagspause schon abgezogen, und die Stunden dieser Woche und dieses Jahres direkt darunter. Mittagessen, eine kurze Dehnpause und das Schichtende erscheinen danach unter „Als Nächstes“.",
        alt: "DoneAt auf dem iPhone: die Restzeit der heutigen Schicht über einem Fortschrittsbalken, darunter die Stunden dieser Woche und dieses Jahres sowie Gesundheits- und Feierabend-Erinnerungen.",
      },
    ],
    androidHeading: "Was DoneAt auf Android kann",
    androidLede:
      "Dieselben Zeitplanregeln wie auf dem iPhone, mit einem Widget auf dem Startbildschirm und einer dauerhaften Benachrichtigung für die Restzeit.",
    androidFeatures: [
      {
        shot: "calendar",
        title: "Monatskalender und Feiertage",
        body: "Feste Wochentage, Wechselwochen, Rotation und Schichten über Mitternacht in einem Kalender, oder tippe und wische Schichten in einen freien Plan. Wähle unter „Zeiten & Dienstplan“ ein Land oder eine Region, dann folgt der Plan den dortigen Feiertagen.",
        alt: "„Zeiten & Dienstplan“ von DoneAt auf Android für November 2026, mit Arbeitstagen, Ruhetagen, Veterans Day und Thanksgiving, darunter das Muster fester Wochentage.",
      },
      {
        shot: "leave",
        title: "Freizeit planen",
        body: "Trag dein Resturlaub ein. DoneAt sucht die freien Tage, die sich mit Feiertagen zu einer längeren Pause verbinden, und zeigt sie im Kalender. Drei Suchen sind kostenlos, und du kannst jeden Plan in einem Ergebnis durchsehen, ohne eine weitere zu verbrauchen.",
        alt: "Ein Freizeitplan in DoneAt auf Android: vier Urlaubstage für zehn Tage am Stück, vom 25. Dezember bis zum 3. Januar um Weihnachten, im Kalender markiert.",
      },
      {
        shot: "records",
        title: "Aufzeichnungen, von der Woche bis zum Jahr",
        body: "Schau dir erfasste und geplante Zeit nach Woche, Monat und Jahr an. Die letzten sieben Tage sind kostenlos; DoneAt Plus ergänzt ältere Aufzeichnungen sowie die Jahres- und Lebensansicht.",
        alt: "Die Jahresansicht der Aufzeichnungen in DoneAt auf Android: jeder Arbeitstag 2026 als farbiger Punkt.",
      },
      {
        shot: "breaks",
        title: "Pausen zählen nicht als Arbeit",
        body: "In der Mittagspause zeigt der Timer, dass du Pause hast, und die Pausenzeit fällt aus der Restzeit. Die heutige Schicht, der heutige Verdienst und die Wochen- und Jahresstunden stehen direkt darunter.",
        alt: "Der Timer von DoneAt auf Android in der Mittagspause bei 37,5 % Fortschritt, mit der heutigen Schicht 09:00–18:00, dem heutigen Verdienst und den Stunden dieser Woche und dieses Jahres.",
      },
    ],
    comparisonHeading: "Was sich ändert, ist der Ort",
    comparisonLede:
      "Das Grundlegende ist in jeder App. Auf dem Handy gehen Zeitplan und Gehalt tiefer; am Computer ist alles einen Kurzbefehl entfernt.",
    featureLabel: "Funktion",
    mobileLabel: "iPhone / iPad",
    androidLabel: "Android",
    desktopLabel: "Computer",
    everywhereLabel: "In jeder App",
    everywhere: [
      "Schicht-Countdown und Fortschritt",
      "Heutiger Verdienst",
      "Schichten über Mitternacht",
      "Feierabend-Erinnerungen",
      "Daten bleiben standardmäßig auf dem Gerät",
    ],
    showcaseLabel: "Funktionen der DoneAt-Apps",
    pageIndexLabel: "Auf dieser Seite",
    compareNavLabel: "Funktionen vergleichen",
    rows: [
      {
        feature: "Kalender und Rotation",
        mobile: { status: "included", detail: "Wechselwochen, Rotation, frei" },
        android: { status: "included", detail: "Wechselwochen, Rotation, frei" },
        desktop: { status: "limited", detail: "Eine Start- und Endzeit" },
      },
      {
        feature: "Feiertage",
        mobile: { status: "included", detail: "Nach Land oder Region" },
        android: { status: "included", detail: "Nach Land oder Region" },
        desktop: { status: "absent", detail: "Nein" },
      },
      {
        feature: "Jahresbonus",
        mobile: { status: "included", detail: "Fließt in den heutigen Verdienst" },
        android: { status: "included", detail: "Fließt in den heutigen Verdienst" },
        desktop: { status: "limited", detail: "Nur Monats- oder Tageslohn" },
      },
      {
        feature: "Gehaltssperre",
        mobile: { status: "included", detail: "Biometrie" },
        android: { status: "included", detail: "Fingerabdruck, Gesicht oder Sperre" },
        desktop: { status: "absent", detail: "Nein" },
      },
      {
        feature: "Als Nächstes",
        mobile: { status: "included", detail: "Gesundheit, Fortschritt, Mittag" },
        android: { status: "included", detail: "Gesundheit, Fortschritt, Mittag" },
        desktop: { status: "absent", detail: "Nein" },
      },
      {
        feature: "Immer griffbereit",
        mobile: { status: "included", detail: "Widgets, Live-Aktivitäten" },
        android: { status: "included", detail: "Widgets, dauerhafte Benachrichtigung" },
        desktop: { status: "included", detail: "Menüleiste, Infobereich, Mini-Timer" },
      },
      {
        feature: "Apple Watch",
        mobile: { status: "included", detail: "Kostenlose App und Komplikationen" },
        android: { status: "absent", detail: "Nein" },
        desktop: { status: "absent", detail: "Nein" },
      },
      {
        feature: "Start bei der Anmeldung und Kürzel",
        mobile: { status: "limited", detail: "Vom Home-Bildschirm öffnen" },
        android: { status: "limited", detail: "Vom Startbildschirm öffnen" },
        desktop: { status: "included", detail: "Bereit nach der Anmeldung, ein Kürzel" },
      },
    ],
  },
  es: {
    heading: "En el escritorio. Sin estorbar.",
    lede: "Deja el tiempo restante en la barra de menús, la bandeja del sistema o el temporizador mini. Oculta la ventana: el aviso de salida sigue ahí.",
    mobileCaption: "iPhone",
    desktopCaption: "Ventana en el ordenador",
    miniCaption: "Temporizador mini, se queda en el escritorio",
    appAlt: "DoneAt en un ordenador: se define un turno y empieza la cuenta regresiva",
    miniAlt: "El temporizador mini en el escritorio",
    reviewAlt:
      "DoneAt en el iPhone: la cuenta regresiva y el progreso del turno de hoy, con las horas de esta semana y de este año y los avisos que vienen",
    iphoneHeading: "Qué hace DoneAt en el iPhone y el Apple Watch",
    iphoneLede:
      "La cuenta regresiva en el teléfono, el tiempo restante en la pantalla de bloqueo y en la muñeca, y un mes de turnos en un solo calendario.",
    iphoneFeatures: [
      {
        shot: "widgets",
        title: "Widgets y Actividades en vivo",
        body: "Los widgets de la pantalla de inicio y de bloqueo muestran el tiempo restante sin abrir la app. En los iPhone compatibles, una Actividad en vivo deja el progreso en la pantalla de bloqueo y en la Dynamic Island.",
        alt: "DoneAt en la Dynamic Island, como Actividad en vivo de la pantalla de bloqueo y como widget de inicio, con el tiempo restante del turno, su progreso y los avisos que vienen.",
      },
      {
        shot: "calendar",
        title: "Calendario mensual y festivos",
        body: "Arma y revisa tu horario en un calendario mensual: días fijos, semanas alternas, rotaciones de turno, programación libre o tiempos manuales. Cada cambio se ve al momento. Elige un país o una región y el horario sigue sus festivos. ¿Vienes de una versión anterior? Actívalo una vez en Horas de trabajo y horario.",
        alt: "Calendario mensual de DoneAt en el iPhone para julio de 2026, con días laborables, días de descanso y el Día de la Independencia de Estados Unidos, el patrón de días fijos y el calendario de festivos en Estados Unidos.",
      },
      {
        shot: "watch",
        title: "Una app gratuita para Apple Watch",
        body: "Mira la muñeca para ver el tiempo restante y la hora de salida, y añade una de las dos complicaciones a la esfera. DoneAt para Apple Watch es gratis, no necesita DoneAt Plus, y muestra horas y progreso, nunca el salario.",
        alt: "DoneAt en el Apple Watch durante el trabajo: tiempo restante del turno, barra de progreso y hora de salida.",
      },
      {
        shot: "countdown",
        title: "Una cuenta regresiva que conoce tu día",
        body: "Mira cuánto queda del turno de hoy, ya sin la comida, y las horas de esta semana y de este año justo debajo. La comida, un estiramiento y el fin del turno aparecen después en «A continuación».",
        alt: "DoneAt en el iPhone: el tiempo restante del turno de hoy sobre una barra de progreso, y debajo las horas de esta semana y de este año y los avisos de salud y de salida.",
      },
    ],
    androidHeading: "Qué hace DoneAt en Android",
    androidLede:
      "Las mismas reglas de horario que en el iPhone, con un widget de la pantalla de inicio y una notificación permanente para el tiempo restante.",
    androidFeatures: [
      {
        shot: "calendar",
        title: "Calendario mensual y festivos",
        body: "Días fijos, semanas alternas, rotaciones y turnos que cruzan la medianoche en un calendario, o pinta turnos en un horario libre con un toque o un deslizamiento. Elige un país o una región en Horario y turnos y el horario sigue sus festivos.",
        alt: "Horario y turnos de DoneAt en Android para noviembre de 2026, con días laborables, días de descanso, el Día de los Veteranos y Acción de Gracias, y debajo el patrón de días fijos.",
      },
      {
        shot: "leave",
        title: "Planifica tus días libres",
        body: "Anota el saldo de días libres y DoneAt busca los que se unen a los festivos para un descanso más largo, y los marca en el calendario. Tres búsquedas son gratis, y puedes revisar cada plan de un resultado sin gastar otra.",
        alt: "Un plan de días libres en DoneAt en Android: cuatro días de permiso para diez seguidos, del 25 de diciembre al 3 de enero alrededor de Navidad, marcados en el calendario.",
      },
      {
        shot: "records",
        title: "Registros, de la semana al año",
        body: "Repasa el tiempo registrado y previsto por semana, mes y año. Los últimos siete días son gratis; DoneAt Plus añade registros más antiguos y las vistas de año y de vida.",
        alt: "La vista de año de los registros en DoneAt en Android: cada día laborable de 2026 como un punto de color.",
      },
      {
        shot: "breaks",
        title: "Los descansos no cuentan como trabajo",
        body: "En la comida el temporizador indica que estás en descanso, y ese tiempo sale del tiempo restante. El turno de hoy, el dinero ganado hoy y las horas de la semana y del año quedan justo debajo.",
        alt: "El temporizador de DoneAt en Android durante la comida, al 37,5 % de progreso, con el turno de hoy 09:00–18:00, el dinero ganado hoy y las horas de esta semana y de este año.",
      },
    ],
    comparisonHeading: "Lo que cambia es dónde vive",
    comparisonLede:
      "Lo básico está en cada app. El teléfono llega más lejos en horarios y sueldo; el ordenador está a un atajo.",
    featureLabel: "Función",
    mobileLabel: "iPhone / iPad",
    androidLabel: "Android",
    desktopLabel: "Ordenador",
    everywhereLabel: "En cada app",
    everywhere: [
      "Cuenta regresiva del turno y progreso",
      "Dinero ganado hoy",
      "Turnos que cruzan la medianoche",
      "Avisos de salida",
      "Los datos se quedan en el dispositivo por defecto",
    ],
    showcaseLabel: "Funciones de las apps DoneAt",
    pageIndexLabel: "En esta página",
    compareNavLabel: "Comparar funciones",
    rows: [
      {
        feature: "Calendario y rotaciones",
        mobile: { status: "included", detail: "Semanas alternas, rotaciones, libre" },
        android: { status: "included", detail: "Semanas alternas, rotaciones, libre" },
        desktop: { status: "limited", detail: "Una hora de inicio y fin" },
      },
      {
        feature: "Festivos",
        mobile: { status: "included", detail: "Por país o región" },
        android: { status: "included", detail: "Por país o región" },
        desktop: { status: "absent", detail: "No" },
      },
      {
        feature: "Bonus de fin de año",
        mobile: { status: "included", detail: "Entra en lo ganado hoy" },
        android: { status: "included", detail: "Entra en lo ganado hoy" },
        desktop: { status: "limited", detail: "Solo paga mensual o diaria" },
      },
      {
        feature: "Bloqueo del salario",
        mobile: { status: "included", detail: "Biometría" },
        android: { status: "included", detail: "Huella, cara o bloqueo de pantalla" },
        desktop: { status: "absent", detail: "No" },
      },
      {
        feature: "A continuación",
        mobile: { status: "included", detail: "Salud, progreso, comida" },
        android: { status: "included", detail: "Salud, progreso, comida" },
        desktop: { status: "absent", detail: "No" },
      },
      {
        feature: "Siempre a mano",
        mobile: { status: "included", detail: "Widgets, Actividades en vivo" },
        android: { status: "included", detail: "Widgets, notificación permanente" },
        desktop: { status: "included", detail: "Barra de menús, bandeja, temporizador mini" },
      },
      {
        feature: "Apple Watch",
        mobile: { status: "included", detail: "App gratuita y complicaciones" },
        android: { status: "absent", detail: "No" },
        desktop: { status: "absent", detail: "No" },
      },
      {
        feature: "Inicio al entrar y atajo",
        mobile: { status: "limited", detail: "Abrir desde la pantalla de inicio" },
        android: { status: "limited", detail: "Abrir desde la pantalla de inicio" },
        desktop: { status: "included", detail: "Listo al entrar, un atajo" },
      },
    ],
  },
  it: {
    heading: "Sulla scrivania. Fuori dai piedi.",
    lede: "Tieni il tempo rimanente nella barra dei menu, nell’area di notifica o nel mini timer. Nascondi la finestra: il promemoria di uscita resta.",
    mobileCaption: "iPhone",
    desktopCaption: "Finestra sul computer",
    miniCaption: "Mini timer, resta sulla scrivania",
    appAlt: "DoneAt su un computer: si imposta un turno e parte il conto alla rovescia",
    miniAlt: "Il mini timer sulla scrivania",
    reviewAlt:
      "DoneAt su iPhone: il conto alla rovescia e l’avanzamento del turno di oggi, con le ore di questa settimana e di quest’anno e i promemoria in arrivo",
    iphoneHeading: "Cosa fa DoneAt su iPhone e Apple Watch",
    iphoneLede:
      "Il conto alla rovescia sul telefono, il tempo rimanente sulla schermata di blocco e al polso, e un mese di turni in un solo calendario.",
    iphoneFeatures: [
      {
        shot: "widgets",
        title: "Widget e Attività in tempo reale",
        body: "I widget della schermata Home e del blocco schermo mostrano il tempo rimanente senza aprire l’app. Sugli iPhone supportati, un’Attività in tempo reale tiene l’avanzamento sulla schermata di blocco e nella Dynamic Island.",
        alt: "DoneAt nella Dynamic Island, come Attività in tempo reale sulla schermata di blocco e come widget della Home, con il tempo rimanente del turno, l’avanzamento e i promemoria in arrivo.",
      },
      {
        shot: "calendar",
        title: "Calendario mensile e festività",
        body: "Imposta e rivedi il programma in un calendario mensile: giorni fissi, settimane alternate, rotazioni di turno, programmazione libera o tempi manuali. Ogni modifica si vede subito. Scegli un paese o una regione e il programma segue le sue festività. Arrivi da una versione precedente? Attivalo una volta in Orari e programmazione.",
        alt: "Calendario mensile di DoneAt su iPhone per luglio 2026, con giorni lavorativi, giorni di riposo e il Giorno dell’Indipendenza degli Stati Uniti, lo schema dei giorni fissi e il calendario delle festività impostato sugli Stati Uniti.",
      },
      {
        shot: "watch",
        title: "Un’app Apple Watch gratuita",
        body: "Alza il polso per vedere il tempo rimanente e l’orario di uscita, e aggiungi una delle due complicazioni al quadrante. DoneAt per Apple Watch è gratuito, non serve DoneAt Plus, e mostra orari e avanzamento, mai lo stipendio.",
        alt: "DoneAt su Apple Watch durante il lavoro: tempo rimanente del turno, barra di avanzamento e orario di uscita.",
      },
      {
        shot: "countdown",
        title: "Un conto alla rovescia che conosce la tua giornata",
        body: "Vedi quanto resta del turno di oggi, pausa pranzo già tolta, e le ore di questa settimana e di quest’anno subito sotto. Il pranzo, una pausa per sgranchirsi e la fine del turno compaiono poi sotto «In programma».",
        alt: "DoneAt su iPhone: il tempo rimanente del turno di oggi sopra una barra di avanzamento, poi le ore di questa settimana e di quest’anno e i promemoria di salute e di uscita.",
      },
    ],
    androidHeading: "Cosa fa DoneAt su Android",
    androidLede:
      "Le stesse regole di programmazione dell’iPhone, con un widget della schermata Home e una notifica persistente per il tempo rimanente.",
    androidFeatures: [
      {
        shot: "calendar",
        title: "Calendario mensile e festività",
        body: "Giorni fissi, settimane alternate, rotazioni e turni che passano la mezzanotte in un calendario, oppure dipingi i turni su un programma libero con un tocco o uno scorrimento. Scegli un paese o una regione in Orari e turni e il programma segue le sue festività.",
        alt: "Orari e turni di DoneAt su Android per novembre 2026, con giorni lavorativi, giorni di riposo, il Giorno dei veterani e il Giorno del Ringraziamento, e sotto lo schema dei giorni fissi.",
      },
      {
        shot: "leave",
        title: "Pianifica le ferie",
        body: "Inserisci il saldo ferie e DoneAt trova i giorni che si uniscono alle festività in una pausa più lunga, poi li mostra sul calendario. Tre ricerche sono gratuite, e puoi sfogliare ogni piano di un risultato senza consumarne un’altra.",
        alt: "Un piano ferie in DoneAt su Android: quattro giorni di ferie per dieci di fila, dal 25 dicembre al 3 gennaio intorno a Natale, segnati sul calendario.",
      },
      {
        shot: "records",
        title: "I record, dalla settimana all’anno",
        body: "Riguarda il tempo registrato e previsto per settimana, mese e anno. Gli ultimi sette giorni sono gratuiti; DoneAt Plus aggiunge i record più vecchi e le viste Anno e Vita.",
        alt: "La vista Anno dei record in DoneAt su Android: ogni giorno lavorativo del 2026 è un puntino colorato.",
      },
      {
        shot: "breaks",
        title: "Le pause non contano come lavoro",
        body: "A pranzo il timer indica che sei in pausa, e quel tempo esce dal tempo rimanente. Il turno di oggi, il guadagno di oggi e le ore della settimana e dell’anno stanno subito sotto.",
        alt: "Il timer di DoneAt su Android durante la pausa pranzo, al 37,5% di avanzamento, con il turno di oggi 09:00–18:00, il guadagno di oggi e le ore di questa settimana e di quest’anno.",
      },
    ],
    comparisonHeading: "Cambia il posto in cui vive",
    comparisonLede:
      "Le basi ci sono in ogni app. Il telefono va più a fondo su programmi e paga; il computer è a una scorciatoia.",
    featureLabel: "Funzione",
    mobileLabel: "iPhone / iPad",
    androidLabel: "Android",
    desktopLabel: "Computer",
    everywhereLabel: "In ogni app",
    everywhere: [
      "Conto alla rovescia del turno e avanzamento",
      "Guadagno di oggi",
      "Turni oltre la mezzanotte",
      "Promemoria di uscita",
      "I dati restano sul dispositivo per impostazione predefinita",
    ],
    showcaseLabel: "Funzioni delle app DoneAt",
    pageIndexLabel: "In questa pagina",
    compareNavLabel: "Confronta le funzioni",
    rows: [
      {
        feature: "Calendario e rotazioni",
        mobile: { status: "included", detail: "Settimane alternate, rotazioni, libera" },
        android: { status: "included", detail: "Settimane alternate, rotazioni, libera" },
        desktop: { status: "limited", detail: "Un solo orario di inizio e fine" },
      },
      {
        feature: "Festività",
        mobile: { status: "included", detail: "Per paese o regione" },
        android: { status: "included", detail: "Per paese o regione" },
        desktop: { status: "absent", detail: "No" },
      },
      {
        feature: "Bonus di fine anno",
        mobile: { status: "included", detail: "Entra nel guadagno di oggi" },
        android: { status: "included", detail: "Entra nel guadagno di oggi" },
        desktop: { status: "limited", detail: "Solo paga mensile o giornaliera" },
      },
      {
        feature: "Blocco dello stipendio",
        mobile: { status: "included", detail: "Biometria" },
        android: { status: "included", detail: "Impronta, volto o blocco schermo" },
        desktop: { status: "absent", detail: "No" },
      },
      {
        feature: "In programma",
        mobile: { status: "included", detail: "Salute, avanzamento, pranzo" },
        android: { status: "included", detail: "Salute, avanzamento, pranzo" },
        desktop: { status: "absent", detail: "No" },
      },
      {
        feature: "Sempre a portata di mano",
        mobile: { status: "included", detail: "Widget, Attività in tempo reale" },
        android: { status: "included", detail: "Widget, notifica persistente" },
        desktop: { status: "included", detail: "Barra dei menu, area di notifica, mini timer" },
      },
      {
        feature: "Apple Watch",
        mobile: { status: "included", detail: "App gratuita e complicazioni" },
        android: { status: "absent", detail: "No" },
        desktop: { status: "absent", detail: "No" },
      },
      {
        feature: "Avvio all’accesso e scorciatoia",
        mobile: { status: "limited", detail: "Apri dalla schermata Home" },
        android: { status: "limited", detail: "Apri dalla schermata Home" },
        desktop: { status: "included", detail: "Pronto all’accesso, una scorciatoia" },
      },
    ],
  },
  pt: {
    heading: "Na mesa. Fora do caminho.",
    lede: "Deixe o tempo restante na barra de menus, na bandeja do sistema ou no mini temporizador. Esconda a janela: o lembrete de saída continua lá.",
    mobileCaption: "iPhone",
    desktopCaption: "Janela no computador",
    miniCaption: "Mini temporizador, fica na mesa",
    appAlt: "DoneAt em um computador: um turno é definido e a contagem regressiva começa",
    miniAlt: "O mini temporizador na área de trabalho",
    reviewAlt:
      "DoneAt no iPhone: a contagem regressiva e o progresso do turno de hoje, com as horas desta semana e deste ano e os lembretes que vêm aí",
    iphoneHeading: "O que o DoneAt faz no iPhone e no Apple Watch",
    iphoneLede:
      "A contagem regressiva no celular, o tempo restante na Tela Bloqueada e no pulso, e um mês de turnos em um só calendário.",
    iphoneFeatures: [
      {
        shot: "widgets",
        title: "Widgets e Atividades em tempo real",
        body: "Os widgets da Tela de Início e da Tela Bloqueada mostram o tempo restante sem abrir o app. Nos iPhones compatíveis, uma Atividade em tempo real deixa o progresso na Tela Bloqueada e na Dynamic Island.",
        alt: "DoneAt na Dynamic Island, como Atividade em tempo real na Tela Bloqueada e como widget da Tela de Início, com o tempo restante do turno, o progresso e os lembretes que vêm aí.",
      },
      {
        shot: "calendar",
        title: "Calendário mensal e feriados",
        body: "Monte e revise a escala em um calendário mensal: dias fixos, semanas alternadas, rotações de turno, programação livre ou tempos manuais. Cada mudança aparece na hora. Escolha um país ou uma região e a escala segue os feriados de lá. Veio de uma versão anterior? Ative uma vez em Horários e programação.",
        alt: "Calendário mensal do DoneAt no iPhone para julho de 2026, com dias de trabalho, dias de descanso e o Dia da Independência dos Estados Unidos, o padrão de dias fixos e o calendário de feriados definido para os Estados Unidos.",
      },
      {
        shot: "watch",
        title: "Um app gratuito para Apple Watch",
        body: "Olhe o pulso para ver o tempo restante e a hora de saída, e coloque uma das duas complicações no mostrador. O DoneAt para Apple Watch é gratuito, não precisa do DoneAt Plus, e mostra horários e progresso, nunca o salário.",
        alt: "DoneAt no Apple Watch durante o trabalho: tempo restante do turno, barra de progresso e hora de saída.",
      },
      {
        shot: "countdown",
        title: "Uma contagem regressiva que conhece o seu dia",
        body: "Veja quanto falta do turno de hoje, já sem o almoço, e as horas desta semana e deste ano logo abaixo. O almoço, uma pausa para alongar e o fim do turno aparecem em seguida em «A seguir».",
        alt: "DoneAt no iPhone: o tempo restante do turno de hoje acima de uma barra de progresso, depois as horas desta semana e deste ano e os lembretes de saúde e de saída.",
      },
    ],
    androidHeading: "O que o DoneAt faz no Android",
    androidLede:
      "As mesmas regras de horário do iPhone, com um widget da tela inicial e uma notificação contínua para o tempo restante.",
    androidFeatures: [
      {
        shot: "calendar",
        title: "Calendário mensal e feriados",
        body: "Dias fixos, semanas alternadas, rotações e turnos que atravessam a meia-noite em um calendário, ou pinte turnos em uma escala livre com um toque ou um deslize. Escolha um país ou uma região em Horários e escala e a escala segue os feriados de lá.",
        alt: "Horários e escala do DoneAt no Android para novembro de 2026, com dias de trabalho, dias de descanso, o Dia dos Veteranos e o Dia de Ação de Graças, e abaixo o padrão de dias fixos.",
      },
      {
        shot: "leave",
        title: "Planeje a folga",
        body: "Informe o saldo de folgas e o DoneAt encontra os dias que se juntam aos feriados para um descanso mais longo, e mostra tudo no calendário. Três buscas são grátis, e você pode ver cada plano de um resultado sem gastar outra.",
        alt: "Um plano de folga no DoneAt no Android: quatro dias de folga para dez seguidos, de 25 de dezembro a 3 de janeiro em volta do Natal, marcados no calendário.",
      },
      {
        shot: "records",
        title: "Registros, da semana ao ano",
        body: "Reveja o tempo registrado e previsto por semana, mês e ano. Os últimos sete dias são grátis; o DoneAt Plus adiciona registros mais antigos e as visualizações de Ano e de Vida.",
        alt: "A visualização de Ano dos registros no DoneAt no Android: cada dia de trabalho de 2026 como um ponto colorido.",
      },
      {
        shot: "breaks",
        title: "O intervalo não conta como trabalho",
        body: "No almoço o temporizador mostra que você está em intervalo, e esse tempo sai do tempo restante. O turno de hoje, o dinheiro ganho hoje e as horas da semana e do ano ficam logo abaixo.",
        alt: "O temporizador do DoneAt no Android no intervalo de almoço, a 37,5% de progresso, com o turno de hoje 09:00–18:00, o dinheiro ganho hoje e as horas desta semana e deste ano.",
      },
    ],
    comparisonHeading: "O que muda é onde ele fica",
    comparisonLede:
      "O básico está em cada app. O celular vai mais fundo em escalas e salário; o computador fica a um atalho.",
    featureLabel: "Recurso",
    mobileLabel: "iPhone / iPad",
    androidLabel: "Android",
    desktopLabel: "Computador",
    everywhereLabel: "Em cada app",
    everywhere: [
      "Contagem regressiva do turno e progresso",
      "Dinheiro ganho hoje",
      "Turnos que passam da meia-noite",
      "Lembretes de saída",
      "Os dados ficam no dispositivo por padrão",
    ],
    showcaseLabel: "Recursos dos apps DoneAt",
    pageIndexLabel: "Nesta página",
    compareNavLabel: "Comparar recursos",
    rows: [
      {
        feature: "Calendário e rotações",
        mobile: { status: "included", detail: "Semanas alternadas, rotações, livre" },
        android: { status: "included", detail: "Semanas alternadas, rotações, livre" },
        desktop: { status: "limited", detail: "Um horário de início e fim" },
      },
      {
        feature: "Feriados",
        mobile: { status: "included", detail: "Por país ou região" },
        android: { status: "included", detail: "Por país ou região" },
        desktop: { status: "absent", detail: "Não" },
      },
      {
        feature: "Bônus de fim de ano",
        mobile: { status: "included", detail: "Entra no ganho de hoje" },
        android: { status: "included", detail: "Entra no ganho de hoje" },
        desktop: { status: "limited", detail: "Só salário mensal ou diário" },
      },
      {
        feature: "Bloqueio do salário",
        mobile: { status: "included", detail: "Biometria" },
        android: { status: "included", detail: "Digital, rosto ou bloqueio de tela" },
        desktop: { status: "absent", detail: "Não" },
      },
      {
        feature: "A seguir",
        mobile: { status: "included", detail: "Saúde, progresso, almoço" },
        android: { status: "included", detail: "Saúde, progresso, almoço" },
        desktop: { status: "absent", detail: "Não" },
      },
      {
        feature: "Sempre à mão",
        mobile: { status: "included", detail: "Widgets, Atividades em tempo real" },
        android: { status: "included", detail: "Widgets, notificação contínua" },
        desktop: { status: "included", detail: "Barra de menus, bandeja, mini temporizador" },
      },
      {
        feature: "Apple Watch",
        mobile: { status: "included", detail: "App gratuito e complicações" },
        android: { status: "absent", detail: "Não" },
        desktop: { status: "absent", detail: "Não" },
      },
      {
        feature: "Iniciar ao entrar e atalho",
        mobile: { status: "limited", detail: "Abrir pela Tela de Início" },
        android: { status: "limited", detail: "Abrir pela tela inicial" },
        desktop: { status: "included", detail: "Pronto ao entrar, um atalho" },
      },
    ],
  },
  ru: {
    heading: "На столе. Не на пути.",
    lede: "Оставьте оставшееся время в строке меню, в трее или в мини-таймере. Спрячьте окно — напоминание об окончании смены никуда не денется.",
    mobileCaption: "iPhone",
    desktopCaption: "Окно на компьютере",
    miniCaption: "Мини-таймер, остаётся на рабочем столе",
    appAlt: "DoneAt на компьютере: смена задана, обратный отсчёт запущен",
    miniAlt: "Мини-таймер на рабочем столе",
    reviewAlt:
      "DoneAt на iPhone: обратный отсчёт и прогресс сегодняшней смены, часы этой недели и этого года и ближайшие напоминания",
    iphoneHeading: "Что DoneAt умеет на iPhone и Apple Watch",
    iphoneLede:
      "Отсчёт на телефоне, оставшееся время на экране блокировки и на запястье, и целый месяц смен в одном календаре.",
    iphoneFeatures: [
      {
        shot: "widgets",
        title: "Виджеты и Live Activity",
        body: "Виджеты на домашнем экране и экране блокировки показывают оставшееся время без открытия приложения. На поддерживаемых iPhone Live Activity оставляет прогресс на экране блокировки и в Dynamic Island.",
        alt: "DoneAt в Dynamic Island, как Live Activity на экране блокировки и как виджет домашнего экрана: оставшееся время смены, прогресс и ближайшие напоминания.",
      },
      {
        shot: "calendar",
        title: "Месячный календарь и праздники",
        body: "Составьте и просмотрите расписание в одном месячном календаре: фиксированные дни, чередующиеся недели, ротация смен, свободный график или ручной ввод. Любое изменение видно сразу. Выберите страну или регион — и расписание учтёт местные праздники. Обновились со старой версии? Включите это один раз в настройках рабочего времени.",
        alt: "Месячный календарь DoneAt на iPhone за июль 2026 года: рабочие дни, выходные и День независимости США, схема фиксированных дней и календарь праздников, выбранный для США.",
      },
      {
        shot: "watch",
        title: "Бесплатное приложение для Apple Watch",
        body: "Поднимите запястье — видно, сколько осталось и когда смена кончается. На циферблат можно добавить одно из двух расширений. DoneAt для Apple Watch бесплатен, DoneAt Plus не нужен, и показывает только время и прогресс, никогда зарплату.",
        alt: "DoneAt на Apple Watch во время работы: оставшееся время смены, полоса прогресса и время окончания.",
      },
      {
        shot: "countdown",
        title: "Отсчёт, который знает ваш день",
        body: "Сразу видно, сколько осталось в сегодняшней смене, уже без обеда, а часы этой недели и этого года — прямо под этим. Обед, короткая разминка и конец смены появляются дальше в разделе «Дальше».",
        alt: "DoneAt на iPhone: оставшееся время сегодняшней смены над полосой прогресса, ниже часы этой недели и этого года и напоминания о здоровье и об окончании смены.",
      },
    ],
    androidHeading: "Что DoneAt умеет на Android",
    androidLede:
      "Те же правила расписания, что на iPhone, плюс виджет на домашнем экране и постоянное уведомление с оставшимся временем.",
    androidFeatures: [
      {
        shot: "calendar",
        title: "Месячный календарь и праздники",
        body: "Фиксированные дни, чередующиеся недели, ротация и смены через полночь в одном календаре — или закрашивайте смены в свободном графике касанием или свайпом. Выберите страну или регион в разделе «Часы и график», и расписание учтёт местные праздники.",
        alt: "«Часы и график» в DoneAt на Android за ноябрь 2026 года: рабочие дни, выходные, День ветеранов и День благодарения, ниже схема фиксированных дней.",
      },
      {
        shot: "leave",
        title: "Спланировать отдых",
        body: "Укажите остаток отпуска, и DoneAt найдёт дни, которые вместе с праздниками складываются в более длинный перерыв, и покажет их в календаре. Три поиска бесплатны, а все варианты внутри одного результата можно листать, не тратя ещё один.",
        alt: "План отпуска в DoneAt на Android: четыре дня отпуска дают десять дней подряд, с 25 декабря по 3 января вокруг Рождества, отмечены в календаре.",
      },
      {
        shot: "records",
        title: "Записи, от недели до года",
        body: "Смотрите учтённое и запланированное время по неделям, месяцам и годам. Последние семь дней бесплатны; DoneAt Plus добавляет более старые записи и виды «Год» и «Жизнь».",
        alt: "Годовой вид записей в DoneAt на Android: каждый рабочий день 2026 года отмечен цветной точкой.",
      },
      {
        shot: "breaks",
        title: "Перерывы не считаются работой",
        body: "В обед таймер показывает, что вы на перерыве, и это время не входит в оставшееся. Сегодняшняя смена, заработок за сегодня и часы недели и года — сразу под этим.",
        alt: "Таймер DoneAt на Android во время обеденного перерыва, прогресс 37,5%, ниже сегодняшняя смена 09:00–18:00, заработок за сегодня и часы этой недели и этого года.",
      },
    ],
    comparisonHeading: "Меняется то, где он живёт",
    comparisonLede:
      "Базовое есть в каждом приложении. На телефоне глубже расписание и оплата; на компьютере всё в одном сочетании клавиш.",
    featureLabel: "Функция",
    mobileLabel: "iPhone / iPad",
    androidLabel: "Android",
    desktopLabel: "Компьютер",
    everywhereLabel: "В каждом приложении",
    everywhere: [
      "Отсчёт смены и прогресс",
      "Заработок за сегодня",
      "Смены через полночь",
      "Напоминания об окончании смены",
      "Данные по умолчанию остаются на устройстве",
    ],
    showcaseLabel: "Функции приложений DoneAt",
    pageIndexLabel: "На этой странице",
    compareNavLabel: "Сравнение функций",
    rows: [
      {
        feature: "Календарь и ротация",
        mobile: { status: "included", detail: "Чередование недель, ротация, свободный график" },
        android: { status: "included", detail: "Чередование недель, ротация, свободный график" },
        desktop: { status: "limited", detail: "Одно начало и конец" },
      },
      {
        feature: "Праздники",
        mobile: { status: "included", detail: "По стране или региону" },
        android: { status: "included", detail: "По стране или региону" },
        desktop: { status: "absent", detail: "Нет" },
      },
      {
        feature: "Годовая премия",
        mobile: { status: "included", detail: "Входит в заработок за сегодня" },
        android: { status: "included", detail: "Входит в заработок за сегодня" },
        desktop: { status: "limited", detail: "Только оклад или дневная ставка" },
      },
      {
        feature: "Скрытие зарплаты",
        mobile: { status: "included", detail: "Биометрия" },
        android: { status: "included", detail: "Отпечаток, лицо или блокировка экрана" },
        desktop: { status: "absent", detail: "Нет" },
      },
      {
        feature: "Дальше",
        mobile: { status: "included", detail: "Здоровье, прогресс, обед" },
        android: { status: "included", detail: "Здоровье, прогресс, обед" },
        desktop: { status: "absent", detail: "Нет" },
      },
      {
        feature: "Всегда под рукой",
        mobile: { status: "included", detail: "Виджеты, Live Activity" },
        android: { status: "included", detail: "Виджеты, постоянное уведомление" },
        desktop: { status: "included", detail: "Строка меню, трей, мини-таймер" },
      },
      {
        feature: "Apple Watch",
        mobile: { status: "included", detail: "Бесплатное приложение и расширения" },
        android: { status: "absent", detail: "Нет" },
        desktop: { status: "absent", detail: "Нет" },
      },
      {
        feature: "Запуск при входе и сочетание клавиш",
        mobile: { status: "limited", detail: "Открыть с домашнего экрана" },
        android: { status: "limited", detail: "Открыть с домашнего экрана" },
        desktop: { status: "included", detail: "Готов при входе, одно сочетание клавиш" },
      },
    ],
  },
  "hi-IN": {
    heading: "डेस्क पर। काम के रास्ते में नहीं।",
    lede: "बचा समय मेनू बार, सिस्टम ट्रे या मिनी टाइमर में रखें। विंडो छिपा दें, छुट्टी का रिमाइंडर वहीं रहता है।",
    mobileCaption: "iPhone",
    desktopCaption: "कंप्यूटर पर विंडो",
    miniCaption: "मिनी टाइमर, डेस्क पर रहता है",
    appAlt: "कंप्यूटर पर DoneAt: शिफ्ट सेट करके उलटी गिनती शुरू",
    miniAlt: "डेस्कटॉप पर मिनी टाइमर",
    reviewAlt:
      "iPhone पर DoneAt: आज की शिफ्ट की उलटी गिनती और प्रगति, नीचे इस हफ्ते और इस साल के घंटे और आने वाले रिमाइंडर",
    iphoneHeading: "iPhone और Apple Watch पर DoneAt क्या करता है",
    iphoneLede:
      "फ़ोन पर उलटी गिनती, लॉक स्क्रीन और कलाई पर बचा समय, और एक महीने की शिफ्ट एक कैलेंडर पर।",
    iphoneFeatures: [
      {
        shot: "widgets",
        title: "विजेट और Live Activities",
        body: "होम स्क्रीन और लॉक स्क्रीन के विजेट ऐप खोले बिना बचा समय दिखाते हैं। समर्थित iPhone पर Live Activity प्रगति को लॉक स्क्रीन और Dynamic Island पर रखती है।",
        alt: "Dynamic Island, लॉक स्क्रीन की Live Activity और होम स्क्रीन विजेट में DoneAt, हर जगह शिफ्ट का बचा समय, प्रगति और आने वाले रिमाइंडर।",
      },
      {
        shot: "calendar",
        title: "मासिक कैलेंडर और सार्वजनिक छुट्टियाँ",
        body: "एक मासिक कैलेंडर पर शेड्यूल बनाएँ और देखें: तय सप्ताह के दिन, वैकल्पिक सप्ताह, शिफ्ट रोटेशन, मुक्त शेड्यूल या मैन्युअल टाइमिंग। हर बदलाव तुरंत दिखता है। देश या क्षेत्र चुनें, तो शेड्यूल वहाँ की सार्वजनिक छुट्टियाँ मानता है। पुराने संस्करण से आए हैं? कार्य घंटे और शेड्यूल में एक बार चालू करें।",
        alt: "iPhone पर DoneAt का मासिक कैलेंडर, जुलाई 2026: कार्यदिवस, विश्राम के दिन और अमेरिकी स्वतंत्रता दिवस, तय सप्ताह-दिनों का पैटर्न, और छुट्टी कैलेंडर संयुक्त राज्य पर।",
      },
      {
        shot: "watch",
        title: "मुफ़्त Apple Watch ऐप",
        body: "कलाई उठाएँ, बचा समय और छुट्टी का समय दिखेगा। वॉच फ़ेस पर दो कॉम्प्लिकेशन में से एक जोड़ सकते हैं। Apple Watch के लिए DoneAt मुफ़्त है, DoneAt Plus नहीं चाहिए, और समय व प्रगति दिखाता है, वेतन कभी नहीं।",
        alt: "काम के दौरान Apple Watch पर DoneAt: शिफ्ट का बचा समय, प्रगति पट्टी और छुट्टी का समय।",
      },
      {
        shot: "countdown",
        title: "उलटी गिनती जो आपके दिन को जानती है",
        body: "दोपहर के खाने को घटाकर आज की शिफ्ट में बचा समय एक नज़र में, और इस हफ्ते व इस साल के घंटे ठीक नीचे। दोपहर का खाना, थोड़ा खिंचाव और शिफ्ट का अंत इसके बाद «आगे» में आते हैं।",
        alt: "iPhone पर DoneAt: प्रगति पट्टी के ऊपर आज की शिफ्ट का बचा समय, नीचे इस हफ्ते और इस साल के घंटे और सेहत व छुट्टी के रिमाइंडर।",
      },
    ],
    androidHeading: "Android पर DoneAt क्या करता है",
    androidLede:
      "शेड्यूल के नियम iPhone जैसे ही, होम स्क्रीन विजेट और लगातार दिखने वाली सूचना से बचा समय।",
    androidFeatures: [
      {
        shot: "calendar",
        title: "मासिक कैलेंडर और सार्वजनिक छुट्टियाँ",
        body: "तय सप्ताह के दिन, वैकल्पिक सप्ताह, रोटेशन और आधी रात पार करने वाली शिफ्ट एक कैलेंडर पर, या मुक्त शेड्यूल पर एक टैप या स्वाइप से शिफ्ट भर दें। समय और शेड्यूल में देश या क्षेत्र चुनें, तो शेड्यूल वहाँ की सार्वजनिक छुट्टियाँ मानता है।",
        alt: "Android पर DoneAt का समय और शेड्यूल, नवंबर 2026: कार्यदिवस, विश्राम के दिन, वेटरन्स डे और थैंक्सगिविंग, नीचे तय सप्ताह-दिनों का पैटर्न।",
      },
      {
        shot: "leave",
        title: "छुट्टी की योजना",
        body: "छुट्टी का बैलेंस डालें। DoneAt वे दिन ढूँढता है जो सार्वजनिक छुट्टियों से जुड़कर लंबा अवकाश बनाते हैं, और उन्हें कैलेंडर पर दिखाता है। तीन खोज मुफ़्त हैं, और एक नतीजे के हर प्लान को बिना दूसरी खोज खर्च किए देख सकते हैं।",
        alt: "Android पर DoneAt की छुट्टी योजना: चार दिन की छुट्टी से दस दिन लगातार, 25 दिसंबर से 3 जनवरी, क्रिसमस के आसपास, कैलेंडर पर चिह्नित।",
      },
      {
        shot: "records",
        title: "रिकॉर्ड, हफ्ते से साल तक",
        body: "दर्ज और नियोजित समय हफ्ते, महीने और साल के हिसाब से देखें। पिछले सात दिन मुफ़्त हैं; DoneAt Plus पुराने रिकॉर्ड और वार्षिक व जीवन दृश्य जोड़ता है।",
        alt: "Android पर DoneAt के रिकॉर्ड का वार्षिक दृश्य: 2026 का हर कार्यदिवस एक रंगीन बिंदु।",
      },
      {
        shot: "breaks",
        title: "ब्रेक काम में नहीं गिना जाता",
        body: "दोपहर के खाने पर टाइमर बताता है कि आप ब्रेक पर हैं, और वह समय बचे हुए समय से बाहर रहता है। आज की शिफ्ट, आज कमाया पैसा और हफ्ते व साल के घंटे ठीक नीचे हैं।",
        alt: "Android पर DoneAt का टाइमर दोपहर के ब्रेक में, प्रगति 37.5%, नीचे आज की 09:00–18:00 शिफ्ट, आज कमाया पैसा और इस हफ्ते व इस साल के घंटे।",
      },
    ],
    comparisonHeading: "बदलता है यह, कि वह कहाँ रहता है",
    comparisonLede:
      "बुनियादी बात हर ऐप में है। फ़ोन पर शेड्यूल और वेतन गहराई से; कंप्यूटर एक शॉर्टकट दूर।",
    featureLabel: "सुविधा",
    mobileLabel: "iPhone / iPad",
    androidLabel: "Android",
    desktopLabel: "कंप्यूटर",
    everywhereLabel: "हर ऐप में",
    everywhere: [
      "शिफ्ट की उलटी गिनती और प्रगति",
      "आज कमाया पैसा",
      "आधी रात पार करने वाली शिफ्ट",
      "छुट्टी के रिमाइंडर",
      "डेटा डिफ़ॉल्ट रूप से डिवाइस पर रहता है",
    ],
    showcaseLabel: "DoneAt ऐप की सुविधाएँ",
    pageIndexLabel: "इस पेज पर",
    compareNavLabel: "सुविधाओं की तुलना",
    rows: [
      {
        feature: "कैलेंडर और रोटेशन",
        mobile: { status: "included", detail: "वैकल्पिक सप्ताह, रोटेशन, मुक्त" },
        android: { status: "included", detail: "वैकल्पिक सप्ताह, रोटेशन, मुक्त" },
        desktop: { status: "limited", detail: "एक शुरू और एक समाप्ति" },
      },
      {
        feature: "सार्वजनिक छुट्टियाँ",
        mobile: { status: "included", detail: "देश या क्षेत्र के अनुसार" },
        android: { status: "included", detail: "देश या क्षेत्र के अनुसार" },
        desktop: { status: "absent", detail: "नहीं" },
      },
      {
        feature: "साल के अंत का बोनस",
        mobile: { status: "included", detail: "आज कमाए पैसे में जुड़ता है" },
        android: { status: "included", detail: "आज कमाए पैसे में जुड़ता है" },
        desktop: { status: "limited", detail: "सिर्फ़ मासिक या दैनिक वेतन" },
      },
      {
        feature: "वेतन लॉक",
        mobile: { status: "included", detail: "बायोमेट्रिक" },
        android: { status: "included", detail: "फ़िंगरप्रिंट, चेहरा या स्क्रीन लॉक" },
        desktop: { status: "absent", detail: "नहीं" },
      },
      {
        feature: "आगे",
        mobile: { status: "included", detail: "सेहत, प्रगति, दोपहर" },
        android: { status: "included", detail: "सेहत, प्रगति, दोपहर" },
        desktop: { status: "absent", detail: "नहीं" },
      },
      {
        feature: "हाथ के पास",
        mobile: { status: "included", detail: "विजेट, Live Activities" },
        android: { status: "included", detail: "विजेट, लगातार सूचना" },
        desktop: { status: "included", detail: "मेनू बार, ट्रे, मिनी टाइमर" },
      },
      {
        feature: "Apple Watch",
        mobile: { status: "included", detail: "मुफ़्त ऐप और कॉम्प्लिकेशन" },
        android: { status: "absent", detail: "नहीं" },
        desktop: { status: "absent", detail: "नहीं" },
      },
      {
        feature: "लॉगिन पर शुरू और शॉर्टकट",
        mobile: { status: "limited", detail: "होम स्क्रीन से खोलें" },
        android: { status: "limited", detail: "होम स्क्रीन से खोलें" },
        desktop: { status: "included", detail: "लॉगिन पर तैयार, एक शॉर्टकट" },
      },
    ],
  },
  "mr-IN": {
    heading: "डेस्कवर. कामाच्या आड नाही.",
    lede: "उरलेली वेळ मेनू बार, सिस्टम ट्रे किंवा मिनी टायमरमध्ये ठेवा. विंडो लपवा, सुट्टीची आठवण तिथेच राहते.",
    mobileCaption: "iPhone",
    desktopCaption: "संगणकावरील विंडो",
    miniCaption: "मिनी टायमर, डेस्कवर राहतो",
    appAlt: "संगणकावरील DoneAt: शिफ्ट सेट करून उलट मोजणी सुरू",
    miniAlt: "डेस्कटॉपवरील मिनी टायमर",
    reviewAlt:
      "iPhone वरील DoneAt: आजच्या शिफ्टची उलट मोजणी आणि प्रगती, खाली या आठवड्याचे आणि या वर्षाचे तास आणि येणाऱ्या आठवणी",
    iphoneHeading: "iPhone आणि Apple Watch वर DoneAt काय करते",
    iphoneLede:
      "फोनवर उलट मोजणी, लॉक स्क्रीन आणि मनगटावर उरलेली वेळ, आणि महिन्याभराच्या शिफ्ट एका दिनदर्शिकेवर.",
    iphoneFeatures: [
      {
        shot: "widgets",
        title: "विजेट आणि Live Activities",
        body: "होम स्क्रीन आणि लॉक स्क्रीनचे विजेट अॅप न उघडता उरलेली वेळ दाखवतात. समर्थित iPhone वर Live Activity प्रगती लॉक स्क्रीन आणि Dynamic Island वर ठेवते.",
        alt: "Dynamic Island, लॉक स्क्रीनची Live Activity आणि होम स्क्रीन विजेटमध्ये DoneAt: शिफ्टची उरलेली वेळ, प्रगती आणि येणाऱ्या आठवणी.",
      },
      {
        shot: "calendar",
        title: "मासिक दिनदर्शिका आणि सार्वजनिक सुट्ट्या",
        body: "एका मासिक दिनदर्शिकेवर वेळापत्रक तयार करा आणि पाहा: ठराविक आठवड्याचे दिवस, आलटून पालटून आठवडे, शिफ्ट रोटेशन, मुक्त वेळापत्रक किंवा मॅन्युअल टाइमिंग. प्रत्येक बदल लगेच दिसतो. देश किंवा प्रदेश निवडा, म्हणजे वेळापत्रक तिथल्या सार्वजनिक सुट्ट्या पाळते. जुन्या आवृत्तीतून आलात? कामाचे तास आणि वेळापत्रक मध्ये एकदा सुरू करा.",
        alt: "iPhone वर DoneAt ची मासिक दिनदर्शिका, जुलै 2026: कामाचे दिवस, विश्रांतीचे दिवस आणि अमेरिकेचा स्वातंत्र्य दिन, ठराविक दिवसांचा नमुना, आणि सुट्टी दिनदर्शिका अमेरिका वर.",
      },
      {
        shot: "watch",
        title: "मोफत Apple Watch अॅप",
        body: "मनगट उचला, उरलेली वेळ आणि सुट्टीची वेळ दिसेल. वॉच फेसवर दोन कॉम्प्लिकेशनपैकी एक जोडू शकता. Apple Watch साठी DoneAt मोफत आहे, DoneAt Plus लागत नाही, आणि वेळ व प्रगती दाखवते, पगार कधीच नाही.",
        alt: "कामादरम्यान Apple Watch वरील DoneAt: शिफ्टची उरलेली वेळ, प्रगती पट्टी आणि सुट्टीची वेळ.",
      },
      {
        shot: "countdown",
        title: "तुमचा दिवस ओळखणारी उलट मोजणी",
        body: "दुपारचे जेवण वगळून आजच्या शिफ्टची उरलेली वेळ एका नजरेत, आणि या आठवड्याचे व या वर्षाचे तास अगदी खाली. दुपारचे जेवण, थोडे स्ट्रेच आणि शिफ्टचा शेवट नंतर «पुढे» मध्ये येतात.",
        alt: "iPhone वर DoneAt: प्रगती पट्टीच्या वर आजच्या शिफ्टची उरलेली वेळ, खाली या आठवड्याचे आणि या वर्षाचे तास आणि आरोग्य व सुट्टीच्या आठवणी.",
      },
    ],
    androidHeading: "Android वर DoneAt काय करते",
    androidLede:
      "वेळापत्रकाचे नियम iPhone सारखेच, होम स्क्रीन विजेट आणि सतत दिसणाऱ्या सूचनेतून उरलेली वेळ.",
    androidFeatures: [
      {
        shot: "calendar",
        title: "मासिक दिनदर्शिका आणि सार्वजनिक सुट्ट्या",
        body: "ठराविक आठवड्याचे दिवस, आलटून पालटून आठवडे, रोटेशन आणि मध्यरात्र ओलांडणाऱ्या शिफ्ट एका दिनदर्शिकेवर, किंवा मुक्त वेळापत्रकावर एक टॅप किंवा स्वाइपने शिफ्ट भरा. वेळ आणि वेळापत्रक मध्ये देश किंवा प्रदेश निवडा, म्हणजे वेळापत्रक तिथल्या सार्वजनिक सुट्ट्या पाळते.",
        alt: "Android वर DoneAt चे वेळ आणि वेळापत्रक, नोव्हेंबर 2026: कामाचे दिवस, विश्रांतीचे दिवस, व्हेटेरन्स डे आणि थँक्सगिव्हिंग, खाली ठराविक दिवसांचा नमुना.",
      },
      {
        shot: "leave",
        title: "सुट्टीची योजना",
        body: "सुट्टीची शिल्लक भरा. DoneAt ते दिवस शोधते जे सार्वजनिक सुट्ट्यांना जोडून मोठी सुट्टी बनवतात, आणि त्यांना दिनदर्शिकेवर दाखवते. तीन शोध मोफत आहेत, आणि एका निकालातील प्रत्येक योजना दुसरा शोध खर्च न करता पाहता येते.",
        alt: "Android वर DoneAt ची सुट्टी योजना: चार दिवसांच्या सुट्टीने दहा दिवस सलग, 25 डिसेंबर ते 3 जानेवारी, ख्रिसमसभोवती, दिनदर्शिकेवर चिन्हांकित.",
      },
      {
        shot: "records",
        title: "नोंदी, आठवड्यापासून वर्षापर्यंत",
        body: "नोंदलेली आणि नियोजित वेळ आठवडा, महिना आणि वर्ष यानुसार पाहा. मागील सात दिवस मोफत आहेत; DoneAt Plus जुन्या नोंदी आणि वार्षिक व जीवन दृश्य जोडते.",
        alt: "Android वर DoneAt च्या नोंदींचे वार्षिक दृश्य: 2026 चा प्रत्येक कामाचा दिवस एक रंगीत ठिपका.",
      },
      {
        shot: "breaks",
        title: "ब्रेक कामात मोजला जात नाही",
        body: "दुपारच्या जेवणात टायमर दाखवतो की तुम्ही ब्रेकवर आहात, आणि ती वेळ उरलेल्या वेळेतून वगळली जाते. आजची शिफ्ट, आज कमावलेले पैसे आणि आठवड्याचे व वर्षाचे तास अगदी खाली आहेत.",
        alt: "Android वर DoneAt चा टायमर दुपारच्या ब्रेकमध्ये, प्रगती 37.5%, खाली आजची 09:00–18:00 शिफ्ट, आज कमावलेले पैसे आणि या आठवड्याचे व या वर्षाचे तास.",
      },
    ],
    comparisonHeading: "बदलते ते, तो कुठे राहतो",
    comparisonLede:
      "पाया प्रत्येक अॅपमध्ये आहे. फोनवर वेळापत्रक आणि पगार सखोल; संगणक एका शॉर्टकटवर.",
    featureLabel: "सुविधा",
    mobileLabel: "iPhone / iPad",
    androidLabel: "Android",
    desktopLabel: "संगणक",
    everywhereLabel: "प्रत्येक अॅपमध्ये",
    everywhere: [
      "शिफ्टची उलट मोजणी आणि प्रगती",
      "आज कमावलेले पैसे",
      "मध्यरात्र ओलांडणाऱ्या शिफ्ट",
      "सुट्टीच्या आठवणी",
      "डेटा डीफॉल्टने डिव्हाइसवर राहतो",
    ],
    showcaseLabel: "DoneAt अॅपच्या सुविधा",
    pageIndexLabel: "या पानावर",
    compareNavLabel: "सुविधांची तुलना",
    rows: [
      {
        feature: "दिनदर्शिका आणि रोटेशन",
        mobile: { status: "included", detail: "आलटून पालटून आठवडे, रोटेशन, मुक्त" },
        android: { status: "included", detail: "आलटून पालटून आठवडे, रोटेशन, मुक्त" },
        desktop: { status: "limited", detail: "एक सुरुवात आणि एक समाप्ती" },
      },
      {
        feature: "सार्वजनिक सुट्ट्या",
        mobile: { status: "included", detail: "देश किंवा प्रदेशानुसार" },
        android: { status: "included", detail: "देश किंवा प्रदेशानुसार" },
        desktop: { status: "absent", detail: "नाही" },
      },
      {
        feature: "वर्षअखेरचा बोनस",
        mobile: { status: "included", detail: "आजच्या कमाईत मिसळतो" },
        android: { status: "included", detail: "आजच्या कमाईत मिसळतो" },
        desktop: { status: "limited", detail: "फक्त मासिक किंवा दैनिक पगार" },
      },
      {
        feature: "पगार लॉक",
        mobile: { status: "included", detail: "बायोमेट्रिक" },
        android: { status: "included", detail: "बोटाचा ठसा, चेहरा किंवा स्क्रीन लॉक" },
        desktop: { status: "absent", detail: "नाही" },
      },
      {
        feature: "पुढे",
        mobile: { status: "included", detail: "आरोग्य, प्रगती, दुपार" },
        android: { status: "included", detail: "आरोग्य, प्रगती, दुपार" },
        desktop: { status: "absent", detail: "नाही" },
      },
      {
        feature: "हाताजवळ",
        mobile: { status: "included", detail: "विजेट, Live Activities" },
        android: { status: "included", detail: "विजेट, सतत सूचना" },
        desktop: { status: "included", detail: "मेनू बार, ट्रे, मिनी टायमर" },
      },
      {
        feature: "Apple Watch",
        mobile: { status: "included", detail: "मोफत अॅप आणि कॉम्प्लिकेशन" },
        android: { status: "absent", detail: "नाही" },
        desktop: { status: "absent", detail: "नाही" },
      },
      {
        feature: "लॉगिनला सुरुवात आणि शॉर्टकट",
        mobile: { status: "limited", detail: "होम स्क्रीनवरून उघडा" },
        android: { status: "limited", detail: "होम स्क्रीनवरून उघडा" },
        desktop: { status: "included", detail: "लॉगिनला तयार, एक शॉर्टकट" },
      },
    ],
  },
  tr: {
    heading: "Masanın üstünde. Yolunun üstünde değil.",
    lede: "Kalan süreyi menü çubuğunda, sistem tepsisinde veya mini sayaçta tut. Pencereyi gizle; iş çıkışı hatırlatması yerinde kalır.",
    mobileCaption: "iPhone",
    desktopCaption: "Bilgisayardaki pencere",
    miniCaption: "Mini sayaç, masada kalır",
    appAlt: "Bilgisayarda DoneAt: vardiya ayarlanır, geri sayım başlar",
    miniAlt: "Masaüstündeki mini sayaç",
    reviewAlt:
      "iPhone’da DoneAt: bugünkü vardiyanın geri sayımı ve ilerlemesi, altında bu haftanın ve bu yılın saatleri ve yaklaşan hatırlatmalar",
    iphoneHeading: "iPhone ve Apple Watch’ta DoneAt ne yapar",
    iphoneLede:
      "Telefonda geri sayım, Kilit Ekranı’nda ve bilekte kalan süre, bir aylık vardiya tek takvimde.",
    iphoneFeatures: [
      {
        shot: "widgets",
        title: "Bileşenler ve Live Activities",
        body: "Ana Ekran ve Kilit Ekranı bileşenleri uygulamayı açmadan kalan süreyi gösterir. Desteklenen iPhone’larda bir Live Activity ilerlemeyi Kilit Ekranı’nda ve Dynamic Island’da tutar.",
        alt: "Dynamic Island’da, Kilit Ekranı Live Activity’sinde ve Ana Ekran bileşeninde DoneAt: vardiyada kalan süre, ilerleme ve yaklaşan hatırlatmalar.",
      },
      {
        shot: "calendar",
        title: "Aylık takvim ve resmi tatiller",
        body: "Aylık bir takvimde programı kur ve gözden geçir: sabit hafta günleri, dönüşümlü haftalar, vardiya rotasyonu, serbest plan veya elle zamanlama. Her değişiklik hemen görünür. Bir ülke veya bölge seç; program oranın resmi tatillerini izler. Eski bir sürümden mi geldin? Çalışma Saatleri ve Program’da bir kez aç.",
        alt: "iPhone’da DoneAt’in aylık takvimi, Temmuz 2026: iş günleri, dinlenme günleri ve ABD Bağımsızlık Günü, sabit gün düzeni ve ABD’ye ayarlı tatil takvimi.",
      },
      {
        shot: "watch",
        title: "Ücretsiz Apple Watch uygulaması",
        body: "Bileği kaldır, kalan süreyi ve iş çıkışını gör; saat yüzüne iki komplikasyondan birini ekle. Apple Watch için DoneAt ücretsizdir, DoneAt Plus gerekmez, süre ve ilerlemeyi gösterir, maaşı asla.",
        alt: "Çalışırken Apple Watch’ta DoneAt: vardiyada kalan süre, ilerleme çubuğu ve iş çıkışı.",
      },
      {
        shot: "countdown",
        title: "Gününü bilen bir geri sayım",
        body: "Öğle arasını düşmüş haliyle bugünkü vardiyada kalan süre bir bakışta, bu haftanın ve bu yılın saatleri hemen altında. Öğle yemeği, bir esneme molası ve vardiyanın sonu ardından «Sırada» altında belirir.",
        alt: "iPhone’da DoneAt: ilerleme çubuğunun üstünde bugünkü vardiyada kalan süre, altında bu haftanın ve bu yılın saatleri ile sağlık ve iş çıkışı hatırlatmaları.",
      },
    ],
    androidHeading: "Android’de DoneAt ne yapar",
    androidLede:
      "iPhone ile aynı program kuralları; Ana Ekran bileşeni ve süren bir bildirimle kalan süre.",
    androidFeatures: [
      {
        shot: "calendar",
        title: "Aylık takvim ve resmi tatiller",
        body: "Sabit hafta günleri, dönüşümlü haftalar, rotasyon ve gece yarısını aşan vardiyalar tek takvimde; ya da serbest plana bir dokunuş veya kaydırma ile vardiya boya. Saatler ve vardiya bölümünde bir ülke veya bölge seç; program oranın resmi tatillerini izler.",
        alt: "Android’de DoneAt’in Saatler ve vardiya ekranı, Kasım 2026: iş günleri, dinlenme günleri, Gaziler Günü ve Şükran Günü, altında sabit gün düzeni.",
      },
      {
        shot: "leave",
        title: "İzni planla",
        body: "İzin bakiyeni gir. DoneAt, resmi tatillerle birleşip daha uzun bir ara eden günleri bulur ve takvimde gösterir. Üç arama ücretsizdir; bir sonucun içindeki her planı başka arama harcamadan gezinebilirsin.",
        alt: "Android’de DoneAt izin planı: dört gün izinle on gün üst üste, 25 Aralık’tan 3 Ocak’a, Noel civarı, takvimde işaretli.",
      },
      {
        shot: "records",
        title: "Kayıtlar, haftadan yıla",
        body: "Kaydedilen ve planlanan süreyi hafta, ay ve yıl olarak geriye dönük gör. Son yedi gün ücretsizdir; DoneAt Plus daha eski kayıtları ve Yıl ile Yaşam görünümlerini ekler.",
        alt: "Android’de DoneAt kayıtlarının Yıl görünümü: 2026’nın her iş günü renkli bir nokta.",
      },
      {
        shot: "breaks",
        title: "Mola, çalışma sayılmaz",
        body: "Öğle arasında sayaç molada olduğunu gösterir ve bu süre kalan zamandan çıkar. Bugünkü vardiya, bugün kazanılan ve haftalık ile yıllık saatler hemen altta durur.",
        alt: "Android’de DoneAt sayacı öğle molasında, ilerleme %37,5, altında bugünkü 09:00–18:00 vardiyası, bugün kazanılan ve bu haftanın ile bu yılın saatleri.",
      },
    ],
    comparisonHeading: "Değişen, nerede durduğu",
    comparisonLede:
      "Temel her uygulamada var. Telefonda program ve ücret daha ayrıntılı; bilgisayar bir kısayol uzağında.",
    featureLabel: "Özellik",
    mobileLabel: "iPhone / iPad",
    androidLabel: "Android",
    desktopLabel: "Bilgisayar",
    everywhereLabel: "Her uygulamada",
    everywhere: [
      "Vardiya geri sayımı ve ilerleme",
      "Bugün kazanılan",
      "Gece yarısını aşan vardiyalar",
      "İş çıkışı hatırlatmaları",
      "Veri varsayılan olarak cihazda kalır",
    ],
    showcaseLabel: "DoneAt uygulama özellikleri",
    pageIndexLabel: "Bu sayfada",
    compareNavLabel: "Özellikleri karşılaştır",
    rows: [
      {
        feature: "Takvim ve rotasyon",
        mobile: { status: "included", detail: "Dönüşümlü haftalar, rotasyon, serbest" },
        android: { status: "included", detail: "Dönüşümlü haftalar, rotasyon, serbest" },
        desktop: { status: "limited", detail: "Tek giriş ve çıkış saati" },
      },
      {
        feature: "Resmi tatiller",
        mobile: { status: "included", detail: "Ülkeye veya bölgeye göre" },
        android: { status: "included", detail: "Ülkeye veya bölgeye göre" },
        desktop: { status: "absent", detail: "Yok" },
      },
      {
        feature: "Yıl sonu ikramiyesi",
        mobile: { status: "included", detail: "Bugün kazanılana katılır" },
        android: { status: "included", detail: "Bugün kazanılana katılır" },
        desktop: { status: "limited", detail: "Yalnızca aylık veya günlük ücret" },
      },
      {
        feature: "Maaş kilidi",
        mobile: { status: "included", detail: "Biyometri" },
        android: { status: "included", detail: "Parmak izi, yüz veya ekran kilidi" },
        desktop: { status: "absent", detail: "Yok" },
      },
      {
        feature: "Sırada",
        mobile: { status: "included", detail: "Sağlık, ilerleme, öğle" },
        android: { status: "included", detail: "Sağlık, ilerleme, öğle" },
        desktop: { status: "absent", detail: "Yok" },
      },
      {
        feature: "Elinin altında",
        mobile: { status: "included", detail: "Bileşenler, Live Activities" },
        android: { status: "included", detail: "Bileşenler, süren bildirim" },
        desktop: { status: "included", detail: "Menü çubuğu, tepsi, mini sayaç" },
      },
      {
        feature: "Apple Watch",
        mobile: { status: "included", detail: "Ücretsiz uygulama ve komplikasyonlar" },
        android: { status: "absent", detail: "Yok" },
        desktop: { status: "absent", detail: "Yok" },
      },
      {
        feature: "Oturum açınca başlatma ve kısayol",
        mobile: { status: "limited", detail: "Ana Ekran’dan aç" },
        android: { status: "limited", detail: "Ana ekrandan aç" },
        desktop: { status: "included", detail: "Oturum açınca hazır, bir kısayol" },
      },
    ],
  },
  ar: {
    heading: "على المكتب. بعيدًا عن طريقك.",
    lede: "أبقِ الوقت المتبقي في شريط القائمة أو منطقة النظام أو المؤقت المصغّر. أخفِ النافذة، ويبقى تذكير نهاية الدوام.",
    mobileCaption: "iPhone",
    desktopCaption: "نافذة على الحاسوب",
    miniCaption: "المؤقت المصغّر، يبقى على المكتب",
    appAlt: "DoneAt على حاسوب: تُضبط وردية ويبدأ العدّ التنازلي",
    miniAlt: "المؤقت المصغّر على سطح المكتب",
    reviewAlt:
      "DoneAt على iPhone: العدّ التنازلي وتقدّم وردية اليوم، وتحته ساعات هذا الأسبوع وهذه السنة والتذكيرات القادمة",
    iphoneHeading: "ماذا يفعل DoneAt على iPhone وApple Watch",
    iphoneLede:
      "العدّ التنازلي على الهاتف، والوقت المتبقي على شاشة القفل والمعصم، وشهر من الورديات في تقويم واحد.",
    iphoneFeatures: [
      {
        shot: "widgets",
        title: "الأدوات وLive Activities",
        body: "أدوات الشاشة الرئيسية وشاشة القفل تعرض الوقت المتبقي دون فتح التطبيق. على أجهزة iPhone المدعومة تُبقي Live Activity التقدّم على شاشة القفل وفي Dynamic Island.",
        alt: "DoneAt في Dynamic Island، وLive Activity على شاشة القفل، وأداة الشاشة الرئيسية: الوقت المتبقي من الوردية، والتقدّم، والتذكيرات القادمة.",
      },
      {
        shot: "calendar",
        title: "تقويم شهري وعطل رسمية",
        body: "رتّب جدولك وراجعه في تقويم شهري واحد: أيام أسبوع ثابتة، أو أسابيع متناوبة، أو تدوير ورديات، أو جدولة حرّة، أو توقيت يدوي. كل تغيير يظهر فورًا. اختر بلدًا أو منطقة فيتبع جدولك عطلها الرسمية. حدّثت من إصدار أقدم؟ فعّله مرة واحدة في ساعات العمل والجدول.",
        alt: "التقويم الشهري لـ DoneAt على iPhone لشهر يوليو 2026، مع أيام العمل وأيام الراحة وعيد الاستقلال الأمريكي، ونمط الأيام الثابتة، وتقويم العطل مضبوط على الولايات المتحدة.",
      },
      {
        shot: "watch",
        title: "تطبيق Apple Watch مجاني",
        body: "ارفع معصمك لترى الوقت المتبقي ووقت الانصراف، وأضف أحد التعقيدين إلى وجه الساعة. DoneAt لـ Apple Watch مجاني ولا يحتاج DoneAt Plus، ويعرض الوقت والتقدّم، لا الراتب أبدًا.",
        alt: "DoneAt على Apple Watch أثناء العمل: الوقت المتبقي من الوردية، وشريط التقدّم، ووقت الانصراف.",
      },
      {
        shot: "countdown",
        title: "عدّ تنازلي يعرف يومك",
        body: "انظر كم بقي من وردية اليوم بعد خصم استراحة الغداء، وساعات هذا الأسبوع وهذه السنة تحتها مباشرة. الغداء، واستراحة تمطٍّ، ونهاية الوردية تظهر بعد ذلك تحت «التالي».",
        alt: "DoneAt على iPhone: الوقت المتبقي من وردية اليوم فوق شريط التقدّم، ثم ساعات هذا الأسبوع وهذه السنة وتذكيرات الصحة ونهاية الدوام.",
      },
    ],
    androidHeading: "ماذا يفعل DoneAt على Android",
    androidLede:
      "قواعد الجدولة نفسها على iPhone، مع أداة للشاشة الرئيسية وإشعار دائم للوقت المتبقي.",
    androidFeatures: [
      {
        shot: "calendar",
        title: "تقويم شهري وعطل رسمية",
        body: "أيام أسبوع ثابتة، وأسابيع متناوبة، وتدوير ورديات، وورديات تعبر منتصف الليل في تقويم واحد، أو ارسم الورديات على جدول حرّ بنقرة أو سحبة. اختر بلدًا أو منطقة في ساعات العمل والجدول فيتبع جدولك العطل الرسمية فيه.",
        alt: "ساعات العمل والجدول في DoneAt على Android لنوفمبر 2026، مع أيام العمل وأيام الراحة ويوم المحاربين القدامى وعيد الشكر، ونمط الأيام الثابتة في الأسفل.",
      },
      {
        shot: "leave",
        title: "خطّط لإجازتك",
        body: "أدخل رصيد إجازتك. يجد DoneAt الأيام التي تتصل بالعطل الرسمية لتصير استراحة أطول، ثم يعرضها على التقويم. ثلاث عمليات بحث مجانية، ويمكنك تصفّح كل خطة داخل نتيجة واحدة دون أن تستهلك بحثًا آخر.",
        alt: "خطة إجازة في DoneAt على Android: أربعة أيام إجازة لعشرة أيام متتالية، من 25 ديسمبر إلى 3 يناير حول عيد الميلاد، معلَّمة على التقويم.",
      },
      {
        shot: "records",
        title: "السجلات، من الأسبوع إلى السنة",
        body: "راجع الوقت المسجَّل والمخطَّط حسب الأسبوع والشهر والسنة. الأيام السبعة الأخيرة مجانية؛ يضيف DoneAt Plus السجلات الأقدم وعرضي السنة والحياة.",
        alt: "عرض السنة للسجلات في DoneAt على Android: كل يوم عمل في 2026 نقطة ملونة.",
      },
      {
        shot: "breaks",
        title: "الاستراحة لا تُحسب عملًا",
        body: "في الغداء يُظهر المؤقت أنك في استراحة، ويُستثنى هذا الوقت من الوقت المتبقي. وردية اليوم، والمال المكتسب اليوم، وساعات الأسبوع والسنة تحت ذلك مباشرة.",
        alt: "مؤقت DoneAt على Android أثناء استراحة الغداء، التقدّم 37.5%، وتحته وردية اليوم 09:00–18:00، والمال المكتسب اليوم، وساعات هذا الأسبوع وهذه السنة.",
      },
    ],
    comparisonHeading: "ما يتغيّر هو المكان الذي يسكنه",
    comparisonLede:
      "الأساس في كل تطبيق. الهاتف أعمق في الجدول والراتب؛ الحاسوب على بُعد اختصار.",
    featureLabel: "الميزة",
    mobileLabel: "iPhone / iPad",
    androidLabel: "Android",
    desktopLabel: "الحاسوب",
    everywhereLabel: "في كل تطبيق",
    everywhere: [
      "عدّ الوردية التنازلي والتقدّم",
      "المال المكتسب اليوم",
      "ورديات تعبر منتصف الليل",
      "تذكيرات نهاية الدوام",
      "البيانات تبقى على الجهاز افتراضيًا",
    ],
    showcaseLabel: "ميزات تطبيقات DoneAt",
    pageIndexLabel: "في هذه الصفحة",
    compareNavLabel: "مقارنة الميزات",
    rows: [
      {
        feature: "التقويم وتدوير الورديات",
        mobile: { status: "included", detail: "أسابيع متناوبة، تدوير، جدولة حرّة" },
        android: { status: "included", detail: "أسابيع متناوبة، تدوير، جدولة حرّة" },
        desktop: { status: "limited", detail: "وقت بداية ونهاية واحد" },
      },
      {
        feature: "العطل الرسمية",
        mobile: { status: "included", detail: "حسب البلد أو المنطقة" },
        android: { status: "included", detail: "حسب البلد أو المنطقة" },
        desktop: { status: "absent", detail: "لا" },
      },
      {
        feature: "مكافأة نهاية السنة",
        mobile: { status: "included", detail: "تدخل في مكتسب اليوم" },
        android: { status: "included", detail: "تدخل في مكتسب اليوم" },
        desktop: { status: "limited", detail: "راتب شهري أو يومي فقط" },
      },
      {
        feature: "قفل الراتب",
        mobile: { status: "included", detail: "القياسات الحيوية" },
        android: { status: "included", detail: "بصمة أو وجه أو قفل الشاشة" },
        desktop: { status: "absent", detail: "لا" },
      },
      {
        feature: "التالي",
        mobile: { status: "included", detail: "الصحة، التقدّم، الغداء" },
        android: { status: "included", detail: "الصحة، التقدّم، الغداء" },
        desktop: { status: "absent", detail: "لا" },
      },
      {
        feature: "قريب من اليد",
        mobile: { status: "included", detail: "أدوات، Live Activities" },
        android: { status: "included", detail: "أدوات، إشعار دائم" },
        desktop: { status: "included", detail: "شريط القائمة، منطقة النظام، المؤقت المصغّر" },
      },
      {
        feature: "Apple Watch",
        mobile: { status: "included", detail: "تطبيق مجاني وتعقيدان" },
        android: { status: "absent", detail: "لا" },
        desktop: { status: "absent", detail: "لا" },
      },
      {
        feature: "التشغيل عند الدخول واختصار",
        mobile: { status: "limited", detail: "افتح من الشاشة الرئيسية" },
        android: { status: "limited", detail: "افتح من الشاشة الرئيسية" },
        desktop: { status: "included", detail: "جاهز عند الدخول، باختصار واحد" },
      },
    ],
  },
  th: {
    heading: "บนโต๊ะ. ไม่ขวางทาง.",
    lede: "เก็บเวลาที่เหลือไว้ที่แถบเมนู ถาดระบบ หรือมินิไทเมอร์ ซ่อนหน้าต่างได้ การเตือนเลิกงานยังอยู่",
    mobileCaption: "iPhone",
    desktopCaption: "หน้าต่างบนคอมพิวเตอร์",
    miniCaption: "มินิไทเมอร์ อยู่บนเดสก์ท็อปได้",
    appAlt: "DoneAt บนคอมพิวเตอร์: ตั้งกะแล้วเริ่มนับถอยหลัง",
    miniAlt: "มินิไทเมอร์บนเดสก์ท็อป",
    reviewAlt:
      "DoneAt บน iPhone: ตัวนับและความคืบหน้าของกะวันนี้ ด้านล่างเป็นชั่วโมงสัปดาห์นี้ ปีนี้ และการเตือนที่กำลังจะมา",
    iphoneHeading: "DoneAt ทำอะไรได้บน iPhone และ Apple Watch",
    iphoneLede:
      "นับถอยหลังบนโทรศัพท์ เวลาที่เหลือบนหน้าจอล็อกและข้อมือ และกะทั้งเดือนในปฏิทินเดียว",
    iphoneFeatures: [
      {
        shot: "widgets",
        title: "วิดเจ็ตและ Live Activities",
        body: "วิดเจ็ตหน้าจอโฮมและหน้าจอล็อกแสดงเวลาที่เหลือโดยไม่ต้องเปิดแอป บน iPhone รุ่นที่รองรับ Live Activity จะคงความคืบหน้าไว้บนหน้าจอล็อกและใน Dynamic Island",
        alt: "DoneAt ใน Dynamic Island, Live Activity บนหน้าจอล็อก และวิดเจ็ตหน้าจอโฮม แสดงเวลาที่เหลือของกะ ความคืบหน้า และการเตือนที่กำลังจะมา",
      },
      {
        shot: "calendar",
        title: "ปฏิทินรายเดือนและวันหยุดราชการ",
        body: "จัดและตรวจตารางในปฏิทินรายเดือนเดียว ทั้งวันในสัปดาห์ตายตัว สัปดาห์สลับ กะหมุนเวียน จัดอิสระ หรือจับเวลาเอง แก้แล้วเห็นทันที เลือกประเทศหรือภูมิภาค ตารางจะตามวันหยุดราชการของที่นั่น อัปเดตจากเวอร์ชันเก่าหรือ เปิดครั้งหนึ่งในชั่วโมงทำงานและตาราง",
        alt: "ปฏิทินรายเดือนของ DoneAt บน iPhone เดือนกรกฎาคม 2026 มีวันทำงาน วันหยุด และวันประกาศอิสรภาพ พร้อมรูปแบบวันตายตัว และปฏิทินวันหยุดตั้งเป็นสหรัฐอเมริกา",
      },
      {
        shot: "watch",
        title: "แอป Apple Watch ฟรี",
        body: "เงยข้อมือก็เห็นเวลาที่เหลือและเวลาเลิกงาน และเพิ่มคอมพลิเคชันได้หนึ่งในสองแบบบนหน้าปัด แอป Apple Watch ฟรี ไม่ต้องใช้ DoneAt Plus แสดงเวลาและความคืบหน้า ไม่แสดงเงินเดือน",
        alt: "DoneAt บน Apple Watch ขณะทำงาน แสดงเวลาที่เหลือของกะ แถบความคืบหน้า และเวลาเลิกงาน",
      },
      {
        shot: "countdown",
        title: "ตัวนับที่รู้จักวันนี้ของคุณ",
        body: "เห็นชัดว่ากะวันนี้เหลืออีกนานแค่ไหนหลังหักพักเที่ยง ชั่วโมงสัปดาห์นี้และปีนี้อยู่ถัดลงไป พักเที่ยง พักยืดเส้น และเลิกกะ จะมาต่อใน «ถัดไป»",
        alt: "DoneAt บน iPhone: เวลาที่เหลือของกะวันนี้อยู่เหนือแถบความคืบหน้า ตามด้วยชั่วโมงสัปดาห์นี้ ปีนี้ และการเตือนสุขภาพกับเลิกงาน",
      },
    ],
    androidHeading: "DoneAt ทำอะไรได้บน Android",
    androidLede:
      "กฎตารางเดียวกับ iPhone พร้อมวิดเจ็ตหน้าจอโฮมและการแจ้งเตือนที่แสดงค้างไว้สำหรับเวลาที่เหลือ",
    androidFeatures: [
      {
        shot: "calendar",
        title: "ปฏิทินรายเดือนและวันหยุดราชการ",
        body: "วันในสัปดาห์ตายตัว สัปดาห์สลับ กะหมุนเวียน และกะข้ามเที่ยงคืนในปฏิทินเดียว หรือแตะหรือปัดเพื่อลงกะบนตารางจัดอิสระ เลือกประเทศหรือภูมิภาคในเวลาและตารางงาน ตารางจะตามวันหยุดราชการของที่นั่น",
        alt: "เวลาและตารางงานของ DoneAt บน Android เดือนพฤศจิกายน 2026 มีวันทำงาน วันหยุด วันทหารผ่านศึก และวันขอบคุณพระเจ้า และรูปแบบวันตายตัวด้านล่าง",
      },
      {
        shot: "leave",
        title: "วางแผนวันหยุดพักผ่อน",
        body: "ใส่ยอดวันหยุดที่เหลือ DoneAt จะหาวันที่ต่อกับวันหยุดราชการแล้วได้หยุดยาวขึ้น แล้วแสดงบนปฏิทิน ค้นหาได้ฟรีสามครั้ง และดูทุกแผนในผลลัพธ์เดียวกันได้โดยไม่เสียครั้งใหม่",
        alt: "แผนวันหยุดใน DoneAt บน Android: ลาสี่วันได้หยุดสิบวันติด ตั้งแต่วันที่ 25 ธันวาคมถึง 3 มกราคมช่วงคริสต์มาส ทำเครื่องหมายบนปฏิทิน",
      },
      {
        shot: "records",
        title: "บันทึก ตั้งแต่สัปดาห์ถึงปี",
        body: "ย้อนดูเวลาที่บันทึกและที่วางแผนไว้ตามสัปดาห์ เดือน และปี เจ็ดวันล่าสุดฟรี DoneAt Plus เพิ่มบันทึกที่เก่ากว่า และมุมมองรายปีกับมุมมองชีวิต",
        alt: "มุมมองรายปีของบันทึกใน DoneAt บน Android: วันทำงานแต่ละวันของปี 2026 เป็นจุดสี",
      },
      {
        shot: "breaks",
        title: "เวลาพักไม่นับเป็นงาน",
        body: "ตอนพักเที่ยงตัวนับบอกว่าคุณกำลังพัก และเวลาพักไม่อยู่ในเวลาที่เหลือ กะวันนี้ รายได้วันนี้ และชั่วโมงของสัปดาห์กับปีอยู่ถัดลงไป",
        alt: "ตัวนับของ DoneAt บน Android ระหว่างพักเที่ยง ความคืบหน้า 37.5% ด้านล่างเป็นกะวันนี้ 09:00–18:00 รายได้วันนี้ และชั่วโมงสัปดาห์นี้กับปีนี้",
      },
    ],
    comparisonHeading: "สิ่งที่เปลี่ยนคือมันอยู่ที่ไหน",
    comparisonLede:
      "พื้นฐานมีในทุกแอป โทรศัพท์ลงรายละเอียดตารางและเงินเดือนมากกว่า คอมพิวเตอร์อยู่ห่างแค่ปุ่มลัด",
    featureLabel: "ฟีเจอร์",
    mobileLabel: "iPhone / iPad",
    androidLabel: "Android",
    desktopLabel: "คอมพิวเตอร์",
    everywhereLabel: "มีในทุกแอป",
    everywhere: [
      "นับถอยหลังกะและความคืบหน้า",
      "รายได้วันนี้",
      "กะข้ามเที่ยงคืน",
      "การเตือนเลิกงาน",
      "ข้อมูลอยู่บนอุปกรณ์เป็นค่าเริ่มต้น",
    ],
    showcaseLabel: "ฟีเจอร์แอป DoneAt",
    pageIndexLabel: "ในหน้านี้",
    compareNavLabel: "เทียบฟีเจอร์",
    rows: [
      {
        feature: "ปฏิทินและกะหมุนเวียน",
        mobile: { status: "included", detail: "สัปดาห์สลับ กะหมุนเวียน จัดอิสระ" },
        android: { status: "included", detail: "สัปดาห์สลับ กะหมุนเวียน จัดอิสระ" },
        desktop: { status: "limited", detail: "เวลาเข้าและเลิกชุดเดียว" },
      },
      {
        feature: "วันหยุดราชการ",
        mobile: { status: "included", detail: "ตามประเทศหรือภูมิภาค" },
        android: { status: "included", detail: "ตามประเทศหรือภูมิภาค" },
        desktop: { status: "absent", detail: "ไม่มี" },
      },
      {
        feature: "โบนัสปลายปี",
        mobile: { status: "included", detail: "คิดรวมในรายได้วันนี้" },
        android: { status: "included", detail: "คิดรวมในรายได้วันนี้" },
        desktop: { status: "limited", detail: "เฉพาะเงินเดือนหรือค่ารายวัน" },
      },
      {
        feature: "ล็อกเงินเดือน",
        mobile: { status: "included", detail: "ไบโอเมตริก" },
        android: { status: "included", detail: "ลายนิ้วมือ ใบหน้า หรือล็อกหน้าจอ" },
        desktop: { status: "absent", detail: "ไม่มี" },
      },
      {
        feature: "ถัดไป",
        mobile: { status: "included", detail: "สุขภาพ ความคืบหน้า พักเที่ยง" },
        android: { status: "included", detail: "สุขภาพ ความคืบหน้า พักเที่ยง" },
        desktop: { status: "absent", detail: "ไม่มี" },
      },
      {
        feature: "อยู่ในมือ",
        mobile: { status: "included", detail: "วิดเจ็ต, Live Activities" },
        android: { status: "included", detail: "วิดเจ็ต, การแจ้งเตือนค้าง" },
        desktop: { status: "included", detail: "แถบเมนู ถาดระบบ มินิไทเมอร์" },
      },
      {
        feature: "Apple Watch",
        mobile: { status: "included", detail: "แอปฟรีและคอมพลิเคชัน" },
        android: { status: "absent", detail: "ไม่มี" },
        desktop: { status: "absent", detail: "ไม่มี" },
      },
      {
        feature: "เปิดตอนเข้าสู่ระบบและปุ่มลัด",
        mobile: { status: "limited", detail: "เปิดจากหน้าจอโฮม" },
        android: { status: "limited", detail: "เปิดจากหน้าจอโฮม" },
        desktop: { status: "included", detail: "พร้อมตอนเข้าสู่ระบบ ปุ่มลัดเดียว" },
      },
    ],
  },
  id: {
    heading: "Di meja. Tidak menghalangi.",
    lede: "Simpan sisa waktu di bilah menu, baki sistem, atau timer mini. Sembunyikan jendelanya; pengingat jam pulang tetap ada.",
    mobileCaption: "iPhone",
    desktopCaption: "Jendela di komputer",
    miniCaption: "Timer mini, tetap di meja",
    appAlt: "DoneAt di komputer: sif diatur, hitung mundur dimulai",
    miniAlt: "Timer mini di desktop",
    reviewAlt:
      "DoneAt di iPhone: hitung mundur dan kemajuan sif hari ini, dengan jam minggu ini dan tahun ini serta pengingat yang akan datang",
    iphoneHeading: "Apa yang DoneAt lakukan di iPhone dan Apple Watch",
    iphoneLede:
      "Hitung mundur di ponsel, sisa waktu di Layar Terkunci dan di pergelangan tangan, dan sebulan sif dalam satu kalender.",
    iphoneFeatures: [
      {
        shot: "widgets",
        title: "Widget dan Live Activity",
        body: "Widget Layar Utama dan Layar Terkunci menampilkan sisa waktu tanpa membuka aplikasi. Pada iPhone yang didukung, Live Activity menjaga kemajuan di Layar Terkunci dan di Dynamic Island.",
        alt: "DoneAt di Dynamic Island, sebagai Live Activity Layar Terkunci, dan sebagai widget Layar Utama, masing-masing menampilkan sisa waktu sif, kemajuannya, dan pengingat yang akan datang.",
      },
      {
        shot: "calendar",
        title: "Kalender bulanan dan hari libur",
        body: "Susun dan tinjau jadwal di satu kalender bulanan: hari tetap, minggu bergantian, rotasi sif, jadwal bebas, atau timer manual. Setiap perubahan langsung terlihat. Pilih negara atau wilayah, dan jadwal mengikuti hari libur resminya. Baru memperbarui dari versi lama? Nyalakan sekali di Jam & jadwal kerja.",
        alt: "Kalender bulanan DoneAt di iPhone untuk Juli 2026, menandai hari kerja, hari istirahat, dan Hari Kemerdekaan Amerika, dengan pola hari tetap dan kalender libur diatur ke Amerika Serikat.",
      },
      {
        shot: "watch",
        title: "Aplikasi Apple Watch gratis",
        body: "Angkat pergelangan tangan untuk melihat sisa waktu dan jam pulang, lalu tambahkan salah satu dari dua komplikasi ke wajah jam. DoneAt untuk Apple Watch gratis, tidak membutuhkan DoneAt Plus, dan menampilkan waktu serta kemajuan, tidak pernah gaji.",
        alt: "DoneAt di Apple Watch saat bekerja: sisa waktu sif, bilah kemajuan, dan jam pulang.",
      },
      {
        shot: "countdown",
        title: "Hitung mundur yang kenal harimu",
        body: "Lihat sisa sif hari ini setelah istirahat makan siang dikurangi, dan jam minggu ini serta tahun ini tepat di bawahnya. Makan siang, jeda peregangan, dan akhir sif muncul berikutnya di «Berikutnya».",
        alt: "DoneAt di iPhone: sisa waktu sif hari ini di atas bilah kemajuan, diikuti jam minggu ini dan tahun ini serta pengingat kesehatan dan jam pulang.",
      },
    ],
    androidHeading: "Apa yang DoneAt lakukan di Android",
    androidLede:
      "Aturan jadwal yang sama dengan iPhone, dengan widget layar utama dan notifikasi berkelanjutan untuk sisa waktu.",
    androidFeatures: [
      {
        shot: "calendar",
        title: "Kalender bulanan dan hari libur",
        body: "Hari tetap, minggu bergantian, rotasi, dan sif yang melewati tengah malam dalam satu kalender, atau lukis sif ke jadwal bebas dengan satu ketukan atau usapan. Pilih negara atau wilayah di Jam & jadwal kerja, dan jadwal mengikuti hari libur resminya.",
        alt: "Jam & jadwal kerja DoneAt di Android untuk November 2026, menandai hari kerja, hari istirahat, Hari Veteran, dan Hari Pengucapan Syukur, dengan pola hari tetap di bawahnya.",
      },
      {
        shot: "leave",
        title: "Rencanakan cuti",
        body: "Masukkan sisa cuti. DoneAt mencari hari yang menyambung dengan hari libur resmi menjadi istirahat yang lebih panjang, lalu menampilkannya di kalender. Tiga pencarian gratis, dan kamu bisa menelusuri setiap rencana dalam satu hasil tanpa memakai pencarian lain.",
        alt: "Rencana cuti di DoneAt pada Android: empat hari cuti untuk sepuluh hari berturut-turut, dari 25 Desember sampai 3 Januari di sekitar Hari Natal, ditandai di kalender.",
      },
      {
        shot: "records",
        title: "Catatan, dari minggu sampai tahun",
        body: "Lihat kembali waktu yang tercatat dan yang direncanakan per minggu, bulan, dan tahun. Tujuh hari terakhir gratis; DoneAt Plus menambahkan catatan yang lebih lama serta tampilan Tahun dan Hidup.",
        alt: "Tampilan Tahun catatan di DoneAt pada Android: setiap hari kerja 2026 ditandai sebagai titik berwarna.",
      },
      {
        shot: "breaks",
        title: "Istirahat tidak dihitung sebagai kerja",
        body: "Saat makan siang, timer menunjukkan bahwa kamu sedang istirahat, dan waktu itu dikeluarkan dari sisa waktu. Sif hari ini, penghasilan hari ini, serta jam mingguan dan tahunan ada tepat di bawahnya.",
        alt: "Timer DoneAt di Android saat istirahat makan siang, kemajuan 37,5%, dengan sif hari ini 09:00–18:00, penghasilan hari ini, serta jam minggu ini dan tahun ini di bawahnya.",
      },
    ],
    comparisonHeading: "Yang berubah adalah tempatnya tinggal",
    comparisonLede:
      "Dasarnya ada di setiap aplikasi. Ponsel lebih dalam soal jadwal dan gaji; komputer tinggal satu pintasan.",
    featureLabel: "Fitur",
    mobileLabel: "iPhone / iPad",
    androidLabel: "Android",
    desktopLabel: "Komputer",
    everywhereLabel: "Di setiap aplikasi",
    everywhere: [
      "Hitung mundur sif dan kemajuan",
      "Penghasilan hari ini",
      "Sif lewat tengah malam",
      "Pengingat jam pulang",
      "Data tetap di perangkat secara bawaan",
    ],
    showcaseLabel: "Fitur aplikasi DoneAt",
    pageIndexLabel: "Di halaman ini",
    compareNavLabel: "Bandingkan fitur",
    rows: [
      {
        feature: "Kalender dan rotasi",
        mobile: { status: "included", detail: "Minggu bergantian, rotasi, jadwal bebas" },
        android: { status: "included", detail: "Minggu bergantian, rotasi, jadwal bebas" },
        desktop: { status: "limited", detail: "Satu jam mulai dan selesai" },
      },
      {
        feature: "Hari libur resmi",
        mobile: { status: "included", detail: "Menurut negara atau wilayah" },
        android: { status: "included", detail: "Menurut negara atau wilayah" },
        desktop: { status: "absent", detail: "Tidak" },
      },
      {
        feature: "Bonus akhir tahun",
        mobile: { status: "included", detail: "Masuk ke penghasilan hari ini" },
        android: { status: "included", detail: "Masuk ke penghasilan hari ini" },
        desktop: { status: "limited", detail: "Hanya gaji bulanan atau harian" },
      },
      {
        feature: "Kunci gaji",
        mobile: { status: "included", detail: "Biometrik" },
        android: { status: "included", detail: "Sidik jari, wajah, atau kunci layar" },
        desktop: { status: "absent", detail: "Tidak" },
      },
      {
        feature: "Berikutnya",
        mobile: { status: "included", detail: "Kesehatan, kemajuan, makan siang" },
        android: { status: "included", detail: "Kesehatan, kemajuan, makan siang" },
        desktop: { status: "absent", detail: "Tidak" },
      },
      {
        feature: "Dekat di tangan",
        mobile: { status: "included", detail: "Widget, Live Activity" },
        android: { status: "included", detail: "Widget, notifikasi berkelanjutan" },
        desktop: { status: "included", detail: "Bilah menu, baki, timer mini" },
      },
      {
        feature: "Apple Watch",
        mobile: { status: "included", detail: "Aplikasi gratis dan komplikasi" },
        android: { status: "absent", detail: "Tidak" },
        desktop: { status: "absent", detail: "Tidak" },
      },
      {
        feature: "Mulai saat masuk dan pintasan",
        mobile: { status: "limited", detail: "Buka dari Layar Utama" },
        android: { status: "limited", detail: "Buka dari layar utama" },
        desktop: { status: "included", detail: "Siap saat masuk, satu pintasan" },
      },
    ],
  },
  vi: {
    heading: "Trên bàn. Không chắn đường.",
    lede: "Để thời gian còn lại trên thanh menu, khay hệ thống hoặc bộ đếm nhỏ. Ẩn cửa sổ đi, nhắc tan ca vẫn ở đó.",
    mobileCaption: "iPhone",
    desktopCaption: "Cửa sổ trên máy tính",
    miniCaption: "Bộ đếm nhỏ, để trên bàn",
    appAlt: "DoneAt trên máy tính: đặt ca rồi bắt đầu đếm ngược",
    miniAlt: "Bộ đếm nhỏ trên màn hình desktop",
    reviewAlt:
      "DoneAt trên iPhone: đếm ngược và tiến độ ca hôm nay, phía dưới là giờ của tuần này, năm nay và các nhắc sắp tới",
    iphoneHeading: "DoneAt làm gì trên iPhone và Apple Watch",
    iphoneLede:
      "Đếm ngược trên điện thoại, thời gian còn lại trên Màn hình khóa và cổ tay, cả tháng ca trên một lịch.",
    iphoneFeatures: [
      {
        shot: "widgets",
        title: "Tiện ích và Hoạt động trực tiếp",
        body: "Tiện ích Màn hình chính và Màn hình khóa hiện thời gian còn lại mà không cần mở ứng dụng. Trên các mẫu iPhone được hỗ trợ, Hoạt động trực tiếp giữ tiến độ trên Màn hình khóa và trong Dynamic Island.",
        alt: "DoneAt trong Dynamic Island, dưới dạng Hoạt động trực tiếp trên Màn hình khóa và tiện ích Màn hình chính, mỗi chỗ hiện thời gian còn lại của ca, tiến độ và các nhắc sắp tới.",
      },
      {
        shot: "calendar",
        title: "Lịch tháng và ngày lễ",
        body: "Lập và xem lịch trên một lịch tháng: ngày cố định, tuần luân phiên, chu kỳ làm/nghỉ, lịch tự do hoặc bộ đếm thủ công. Sửa xong là thấy ngay. Chọn quốc gia hoặc khu vực, lịch sẽ theo ngày lễ của nơi đó. Cập nhật từ bản cũ hơn? Bật một lần trong Giờ làm và lịch.",
        alt: "Lịch tháng của DoneAt trên iPhone cho tháng 7 năm 2026, đánh dấu ngày làm, ngày nghỉ và Ngày Độc lập Hoa Kỳ, cùng quy luật ngày cố định và lịch ngày lễ đặt là Hoa Kỳ.",
      },
      {
        shot: "watch",
        title: "Ứng dụng Apple Watch miễn phí",
        body: "Ngẩng cổ tay là thấy thời gian còn lại và giờ tan ca, và thêm một trong hai complication vào mặt đồng hồ. DoneAt cho Apple Watch miễn phí, không cần DoneAt Plus, chỉ hiện thời gian và tiến độ, không bao giờ hiện lương.",
        alt: "DoneAt trên Apple Watch khi đang làm: thời gian còn lại của ca, thanh tiến độ và giờ tan ca.",
      },
      {
        shot: "countdown",
        title: "Đếm ngược biết ngày của bạn",
        body: "Thấy ngay ca hôm nay còn bao lâu sau khi trừ nghỉ trưa, giờ tuần này và năm nay nằm ngay bên dưới. Nghỉ trưa, nghỉ duỗi người và hết ca lần lượt hiện trong «Sắp tới».",
        alt: "DoneAt trên iPhone: thời gian còn lại của ca hôm nay phía trên thanh tiến độ, rồi giờ tuần này, năm nay và nhắc sức khỏe cùng nhắc tan ca.",
      },
    ],
    androidHeading: "DoneAt làm gì trên Android",
    androidLede:
      "Cùng quy tắc lập lịch như iPhone, với tiện ích Màn hình chính và thông báo thường trực cho thời gian còn lại.",
    androidFeatures: [
      {
        shot: "calendar",
        title: "Lịch tháng và ngày lễ",
        body: "Ngày cố định, tuần luân phiên, chu kỳ làm/nghỉ và ca qua đêm trên một lịch, hoặc tô ca lên lịch tự do bằng một chạm hoặc một lần vuốt. Chọn quốc gia hoặc khu vực trong Giờ làm và lịch, lịch sẽ theo ngày lễ của nơi đó.",
        alt: "Giờ làm và lịch của DoneAt trên Android cho tháng 11 năm 2026, đánh dấu ngày làm, ngày nghỉ, Ngày Cựu chiến binh và Lễ Tạ ơn, với quy luật ngày cố định ở dưới.",
      },
      {
        shot: "leave",
        title: "Lên kế hoạch nghỉ",
        body: "Nhập số ngày nghỉ còn lại. DoneAt tìm những ngày nối với ngày lễ thành một kỳ nghỉ dài hơn, rồi hiện chúng trên lịch. Ba lượt tìm miễn phí, và bạn xem mọi phương án trong một kết quả mà không tốn thêm lượt.",
        alt: "Một kế hoạch nghỉ trong DoneAt trên Android: bốn ngày nghỉ cho mười ngày liền, từ 25 tháng 12 đến 3 tháng 1 quanh Giáng sinh, được đánh dấu trên lịch.",
      },
      {
        shot: "records",
        title: "Bản ghi, từ tuần đến năm",
        body: "Xem lại thời gian đã ghi và đã lên kế hoạch theo tuần, tháng và năm. Bảy ngày gần nhất miễn phí; DoneAt Plus thêm bản ghi cũ hơn cùng chế độ xem Năm và Cuộc sống.",
        alt: "Chế độ xem Năm của bản ghi trong DoneAt trên Android: mỗi ngày làm của năm 2026 là một chấm màu.",
      },
      {
        shot: "breaks",
        title: "Giờ nghỉ không tính là giờ làm",
        body: "Lúc nghỉ trưa, bộ đếm hiện bạn đang nghỉ, và khoảng đó không tính vào thời gian còn lại. Ca hôm nay, số đã kiếm hôm nay và giờ của tuần cùng năm nằm ngay bên dưới.",
        alt: "Bộ đếm DoneAt trên Android trong giờ nghỉ trưa, tiến độ 37,5%, phía dưới là ca hôm nay 09:00–18:00, số đã kiếm hôm nay và giờ tuần này cùng năm nay.",
      },
    ],
    comparisonHeading: "Thứ thay đổi là chỗ nó ở",
    comparisonLede:
      "Phần cơ bản có trong mọi ứng dụng. Điện thoại đi sâu hơn về lịch và lương; máy tính chỉ cách một phím tắt.",
    featureLabel: "Tính năng",
    mobileLabel: "iPhone / iPad",
    androidLabel: "Android",
    desktopLabel: "Máy tính",
    everywhereLabel: "Có trong mọi ứng dụng",
    everywhere: [
      "Đếm ngược ca và tiến độ",
      "Số đã kiếm hôm nay",
      "Ca qua đêm",
      "Nhắc tan ca",
      "Dữ liệu mặc định ở trên máy",
    ],
    showcaseLabel: "Tính năng ứng dụng DoneAt",
    pageIndexLabel: "Trong trang này",
    compareNavLabel: "So sánh tính năng",
    rows: [
      {
        feature: "Lịch và chu kỳ",
        mobile: { status: "included", detail: "Tuần luân phiên, chu kỳ, lịch tự do" },
        android: { status: "included", detail: "Tuần luân phiên, chu kỳ, lịch tự do" },
        desktop: { status: "limited", detail: "Một giờ vào và một giờ ra" },
      },
      {
        feature: "Ngày lễ",
        mobile: { status: "included", detail: "Theo quốc gia hoặc khu vực" },
        android: { status: "included", detail: "Theo quốc gia hoặc khu vực" },
        desktop: { status: "absent", detail: "Không" },
      },
      {
        feature: "Thưởng cuối năm",
        mobile: { status: "included", detail: "Gộp vào số đã kiếm hôm nay" },
        android: { status: "included", detail: "Gộp vào số đã kiếm hôm nay" },
        desktop: { status: "limited", detail: "Chỉ lương tháng hoặc lương ngày" },
      },
      {
        feature: "Khóa lương",
        mobile: { status: "included", detail: "Sinh trắc học" },
        android: { status: "included", detail: "Vân tay, khuôn mặt hoặc khóa màn hình" },
        desktop: { status: "absent", detail: "Không" },
      },
      {
        feature: "Sắp tới",
        mobile: { status: "included", detail: "Sức khỏe, tiến độ, nghỉ trưa" },
        android: { status: "included", detail: "Sức khỏe, tiến độ, nghỉ trưa" },
        desktop: { status: "absent", detail: "Không" },
      },
      {
        feature: "Trong tầm tay",
        mobile: { status: "included", detail: "Tiện ích, Hoạt động trực tiếp" },
        android: { status: "included", detail: "Tiện ích, thông báo thường trực" },
        desktop: { status: "included", detail: "Thanh menu, khay hệ thống, bộ đếm nhỏ" },
      },
      {
        feature: "Apple Watch",
        mobile: { status: "included", detail: "Ứng dụng miễn phí và complication" },
        android: { status: "absent", detail: "Không" },
        desktop: { status: "absent", detail: "Không" },
      },
      {
        feature: "Mở khi đăng nhập và phím tắt",
        mobile: { status: "limited", detail: "Mở từ Màn hình chính" },
        android: { status: "limited", detail: "Mở từ màn hình chính" },
        desktop: { status: "included", detail: "Sẵn khi đăng nhập, một phím tắt" },
      },
    ],
  },
};

/** Every hall locale has its own entry, so a missing key is a compile error. English is only a runtime fallback. */
export function downloadShowcaseCopy(
  locale: ContentLocale,
): DownloadShowcaseCopy {
  return copy[locale] ?? copy.en;
}

export function desktopMediaStem(locale: ContentLocale): "zh" | "en" {
  return isChineseHall(locale) ? "zh" : "en";
}
