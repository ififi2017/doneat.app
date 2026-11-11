import { getCollection } from "astro:content";
import {
  CONTENT_PAGES,
  defaultLocale,
  isChina,
  showGooglePlay,
  siteConfig,
  type ContentPage,
} from "../lib/config";

/**
 * llms.txt (https://llmstxt.org): a short Markdown map for AI search and
 * answer engines. Page titles and descriptions come from the same content
 * frontmatter the pages render, so this file cannot drift from visible copy.
 * Facts below must stay true for every platform; check the FAQ before editing.
 */

const PAGE_ORDER: ContentPage[] = ["faq", "how-it-works", "download", "about", "privacy", "terms"].filter(
  (page): page is ContentPage => (CONTENT_PAGES as readonly string[]).includes(page),
);

type PageEntry = { id: string; data: { title: string; description: string } };

function pageLinks(entries: PageEntry[], locale: string): string[] {
  const byId = new Map(entries.map((entry) => [entry.id, entry.data]));
  return PAGE_ORDER.flatMap((page) => {
    const data = byId.get(`${locale}/${page}`);
    if (!data) return [];
    const title = data.title.replace(/\s+[—–-]\s+DoneAt$/, "");
    return [`- [${title}](${siteConfig.officialSiteUrl}/${locale}/${page}): ${data.description}`];
  });
}

function storeLinks(): string[] {
  const appStore = siteConfig.appStoreUrlTemplate.replace("{storefront}", isChina ? "cn" : "us");
  if (isChina) {
    return [
      `- [App Store（iPhone、iPad、Mac、Apple Watch）](${appStore})`,
      `- [Microsoft Store（Windows）](${siteConfig.microsoftStoreUrl})`,
      `- [网页版](${siteConfig.webAppUrl}/${defaultLocale})`,
    ];
  }
  return [
    `- [App Store (iPhone, iPad, Mac, Apple Watch)](${appStore})`,
    ...(showGooglePlay ? [`- [Google Play (Android)](${siteConfig.googlePlayUrl})`] : []),
    `- [Microsoft Store (Windows)](${siteConfig.microsoftStoreUrl})`,
    `- [Chrome Web Store (extension)](${siteConfig.chromeWebStoreUrl})`,
    `- [Web timer](${siteConfig.webAppUrl}/${defaultLocale})`,
  ];
}

function globalBody(entries: PageEntry[]): string {
  return `# DoneAt

> DoneAt is a work-shift countdown for the browser, iPhone, iPad, Android, Mac and Windows. Set the time you start and finish; it shows the time left, a progress bar for the shift and an optional estimate of what you have earned so far. Hours and salary stay on the device by default, and there is no DoneAt account. DoneAt was formerly called Off Work Countdown.

Key facts:

- Overnight shifts: if the end time is earlier than the start time (for example 22:00 to 06:00), the shift crosses midnight.
- Earnings estimate: a monthly salary is divided by working days per month (21.75 by default) and spread linearly across the shift. It is an estimate, not a payslip.
- Privacy: hours, salary and preferences stay on the device by default. On iPhone and iPad, sync is optional and uses the user's private iCloud. Salary never appears in widgets, notifications, Live Activities, share links or analytics.
- Platforms: the web timer and the Mac and Windows apps use one start and end time. Shift rotations, alternating weeks, public holidays and a monthly schedule calendar are in the iPhone, iPad and Android apps. The Apple Watch app is free.
- Price: the countdown is free everywhere. DoneAt Plus (iPhone, iPad, Android) adds full records, reports and focus tools; it is bought separately in the App Store or Google Play.
- Open source under MPL-2.0: ${siteConfig.githubUrl}
- Languages: 19, including English, Simplified and Traditional Chinese, Japanese, Korean, French, German and Spanish.

## Docs

${pageLinks(entries, defaultLocale).join("\n")}

## Get DoneAt

${storeLinks().join("\n")}

## Chinese (简体中文)

${pageLinks(entries, "zh-CN").join("\n")}

## Optional

- [Web timer llms.txt](${siteConfig.webAppUrl}/llms.txt): the browser countdown and work hours calculator
- [Sitemap](${siteConfig.officialSiteUrl}/sitemap-index.xml)
- Contact: ${siteConfig.supportEmail}
`;
}

function chinaBody(entries: PageEntry[]): string {
  return `# DoneAt

> DoneAt 是一款下班倒计时工具，可在浏览器、iPhone、iPad、Android、Mac 和 Windows 上使用。设好上班和下班时间，就能看到剩余时间、班次进度，以及可选的今日收入估算。工时和薪资默认只保存在设备上，不需要注册账号。DoneAt 原名 Off Work Countdown。

## 页面

${pageLinks(entries, defaultLocale).join("\n")}

## 下载

${storeLinks().join("\n")}

## 其他

- [国际站](https://doneat.app/zh-CN)
- [网站地图](${siteConfig.officialSiteUrl}/sitemap-index.xml)
- 联系：${siteConfig.supportEmail}
`;
}

export async function GET() {
  const entries = (await getCollection("pages")) as PageEntry[];
  const body = isChina ? chinaBody(entries) : globalBody(entries);
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
