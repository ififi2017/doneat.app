# 开发交接（给下一个 agent）

`doneat.app` 官网已于 2026-08-30 上线，由本仓的 Vercel 项目提供。本文件是维护规则：锁定已经拍完，不要重新决策。先读本文件和 [PLAN.md](PLAN.md)，再写代码。

## 你在哪个仓

- **工作区**：`/Users/zhengyuxuan/doneat-site`（本机文件夹不能叫 `*.app`，否则 macOS / Cursor 会当成应用包。GitHub 仓库仍是 `ififi2017/doneat.app`）。
- **产品仓**（只读对照，不要改，除非用户明确要求）：`/Users/zhengyuxuan/Off-Work-Countdown`。产品计划是 [009](https://github.com/ififi2017/Off-Work-Countdown/blob/main/plans/iOS/009-doneat-platform-brand-domain.md)，搜索增长见 [Web 001](https://github.com/ififi2017/Off-Work-Countdown/blob/main/plans/Web/001-seo-search-growth.md)。
- 本仓只做品牌门厅、商店下载和支持站。可交互倒计时仍在 `https://off.rainif.com`。

## 已经有的（不要重做）

| 路径 | 内容 |
| --- | --- |
| `PLAN.md` | Grill 锁定与阶段。实现以它为准。 |
| `site.json` | 品牌名、双域、邮箱、商店 id、色值。 |
| `locales/hall.json` | 19 语功能行、Apple / Microsoft 徽章语言与 storefront 映射。英文功能行已是 **Work Shift Countdown**。 |
| `assets/brand/` | Open Day SVG（mark 明/暗、满幅图标、圆角图标）。不要另造 mark。 |
| `assets/icons/` | favicon、apple-touch、maskable、OG（mark + DoneAt）。 |
| `assets/badges/` | 已下载的官方 App Store / Microsoft Store SVG。用仓内文件，不要再去产品仓拿 Mac App Store 专用标。 |
| `assets/device/` | 首页机位 timer loop（`en` / `zh` × `white` / `black`）和下载页 review 录屏（`en-review` / `zh-review`，iOS 3.2.0），各一份 `.mp4` + `.png`。用法与转码命令见该目录 README。 |
| `assets/showcase/` | 下载页 iPhone 功能区用的 3.2.0 商店图，`en` / `zh-CN` 各四张（小组件、月历、Apple Watch、倒计时），720 宽 WebP。 |
| `content/source/*.content.json` | 英中长文草稿。**不能原文上线**，见下方 S2。 |

Astro 门厅、英中长文、下载页都已上线。接着改现有工程，不要当空白仓重做。

- 部署：`main` 自动发布到 `doneat.app`（Vercel 项目 `doneat-app`）；每个 PR 由 Vercel 出预览链接，写进 PR 评论。
- 域名：Cloudflare 只管 DNS 和 AI 爬虫规则。`http` → `https`、`www` → 裸域都是 308，保留 path 和 query；根路径 `/` 由本仓 middleware 按浏览器语言 302 到门厅。**不要改 DNS、Cloudflare 规则或 Vercel 域名绑定，除非用户明确要求。**

## 已经拍板（不要重开）

官网优先把人送到**客户端**，不是网页计时。

- 首页主按钮是「详细了解客户端」（en：Learn more about the apps）→ `/{en|zh-CN}/download`。繁中门厅进 `/zh-CN/download`，其余进 `/en/download`。不要写成「看电脑版什么样」——下载页手机和电脑都有。
- 「在浏览器里试试」用次要描边，仍去 `https://off.rainif.com/{lang}`。下载页不要再放这两颗按钮。
- 商店徽章顺序仍是 **App Store → Microsoft Store**。顶栏「打开网页版」仍去网页计时。
- 首页整页（`.hall-page`）不可选中文字；下载 / FAQ / 关于等长文页照常可选。
- 窄屏（小于 880px）门厅**整列居中**：mark、标题、品牌句、按钮、徽章、两行说明、机位。桌面仍左右分栏。
- 窄屏页脚可以折成多行，导航、社交图标、署名都居中。桌面仍左导航，右侧是社交图标 + 署名。
- 页脚是：怎么算的、隐私、联系我们；社交图标列（现为 X `@doneatapp`，渠道写在 `site.json` 的 `socials`，不要把空位画出来）；署名 `© fi_niaR Studio` 和 Powered by Astro。GitHub **源码**在顶栏图标，不进页脚，也不进社交列。

## 实现经验（不要重踩）

- 门厅 mark 用内联 SVG（`BrandMark.astro`），不要 `<img src="/brand/….svg">`。用 img 时浏览器会先栅格化，放大后边缘虚。几何仍以 `assets/brand/off-work-countdown-mark.svg` 为准，不要另造。
- 桌面 mark 用负 `margin-inline-start`（约 `159/1024` 的边长）把圆环左缘和标题对齐——SVG viewBox 四周有空。窄屏居中时不要加这个负边距。
- 桌面门厅（≥880px）文案和机位是**一组居中**，间距随机位宽度（`--hall-stage-width` 的一半，3–12rem）走。机位按 `100dvh` 缩放，14 寸 MacBook 带浏览器工具栏时只有约 270px 宽；不要改回文案贴左、机位 `justify-self: end`，否则中间会空出近一半内容宽。
- 暖光用径向渐变淡到透明。实心圆放大 + `drop-shadow` 叠在深色底上会切出一圈发闷的红褐边。
- 触摸没有 hover。点按必须自己出反馈：橙色圆点约 `scale(1.16)` + 同一套暖光。`prefers-reduced-motion: reduce` 只变亮、不缩放。
- 五连击只打缺口里的橙色圆点（可加大透明命中圆），圆环和指针不计数。第五次指针绕 `512,512` 转一圈回到五点，角度累加，不要从 360 弹回 0。时长约 0.8s，对照 iOS `CelebratingBrandMark`。不要为它拉 React。
- 下载对照表是**手机 / iPad vs 电脑**，不是网页 vs 桌面。三种状态：`included` 实心橙点、`limited` 空心、`absent` 短横 + 「没有」/「No」。不要只靠把字调淡。iOS 独有行不要发明产品里没有的功能。
- 首页机位用 timer loop（`en`/`zh` × `white`/`black`）。下载页手机用 review clip（`en-review` / `zh-review`）。不要对调。首页不要换成商店合成图。
- 商店图上印的标题搜索引擎读不到。下载页用商店图时，每张都要配一段页面上可见的功能说明和具体的 `alt`，只写该版本真实存在的功能（对照产品仓 `app-store-connect/ios/<版本>.json` 与 `docs/reviews/`）。
- 下载页 iPhone 功能区是一个图位轮播多张商店图，说明列在旁边、始终可见，不要摆成商店图墙。轮播用内联脚本，不拉框架；悬停、键盘焦点、不在视口时暂停，`prefers-reduced-motion: reduce` 时不自动切换；没有脚本时停在第一张。
- 新真机录屏常是别的机型尺寸（如 1284×2778）。等比缩放到 2868 高再居中裁到 1320×2868，不要拉伸；去音轨、`+faststart`。命令见 `assets/device/README.md`。
- 搜索结果 favicon 要根路径 `/favicon.ico` 和一枚 ≥48 的 PNG。Google 搜索不认 SVG；不要只挂 32px。

## 各页面规则

S0–S4 都已完成（S4 上线 2026-08-30）。以下按阶段保留仍然有效的规则。

### S0

- 初始化 Astro + TypeScript + Tailwind，静态输出。
- i18n 路由：门厅 19 语 `/{lang}/`；长文只有 `en`、`zh-CN`。
- Content Collections 放 about / faq / how-it-works / download / privacy。
- 独立 Vercel 项目 `doneat-app`，`main` 即 production。
- 铬层文案本仓自维护薄目录（可从 `locales/hall.json` 扩），**不要**整份拷产品 `translation.json`。

### S1 首页与铬层

桌面左右分栏：左为 Open Day mark、DoneAt、品牌句/功能行、入口；右为 iPhone 机位。手机竖叠并**居中**，机位在入口下方。

- Mark 默认定住，用内联 SVG。只有缺口里的橙色圆点接收五连击；第五次指针转一圈回到五点（与 iOS `CelebratingBrandMark` 相同）。悬停出柔和暖光；触摸点按放大并出光。`prefers-reduced-motion: reduce` 只做透明度变化。不要为它拉 React。
- 英文门厅：DoneAt + `Know when your time is yours` + Work Shift Countdown。
- 中文门厅（zh-CN / zh-TW / zh-HK）：DoneAt + 原创品牌句 + 该语功能行。简中「几点下班，心里有数」，台湾「幾點下班，心裡有數」，香港「幾點放工，心裡有數」。不要英文字面直译。
- 其他门厅：DoneAt + 各语品牌句 + `hall.json` 里的功能行。品牌句要像当地话，不要英文字面直译。功能行仍独立。
- 首页文字按钮：主按钮「详细了解客户端」进下载页；次按钮「在浏览器里试试」进 `https://off.rainif.com/{lang}`。商店徽章顺序仍是 **App Store → Microsoft Store**。
  - App Store：仓内 `assets/badges/app-store/{black\|white}/{apple-locale}.svg`。浅色页用 black 标，深色页用 white 标。语言映射见 `hall.json`；`hi-IN`、`ar` 回退 `en-us`。链接用 id **`6802803318`**，storefront 跟语言走（简中 `/cn/`）。不要把 listing slug（`下班倒计时` / `off-work-countdown`）写死当品牌。若带 Apple 的 `itscg` / `itsct` / `mttnsubad` 就保留。
  - Microsoft Store：官方 badge 脚本 + 仓内 SVG 兜底，链到 `https://apps.microsoft.com/detail/9PM0HJ2PP2LJ`。脚本挂了 SVG 仍可点。不要在徽章下再叠一条重复文字链。
- 入口下三条短价值：本地、无账号、看清下班。不上对比表，不把 FAQ 铺在首页。
- 机位：**先播 mp4，png 做 poster 和播不了时的兜底**。`autoplay muted loop playsinline`，无控件、无声音。中文门厅用 `zh-*`，其余用 `en-*`。`prefers-color-scheme` 选 white/black。`prefers-reduced-motion: reduce` 只出 PNG。套仓内官方 iPhone 17 Pro Max 框（浅色 Cosmic Orange，深色 Deep Blue，`assets/device/frames/`）。视频和 PNG 铺在屏洞里，框叠在上面；框自带灵动岛，不要再另造机框或岛。
- 顶栏：GitHub 源码图标、打开网页版、下载、FAQ、关于。
- 页脚：怎么算的、隐私、联系我们（`hello@doneat.app`）；社交图标列；署名 fi_niaR Studio 与 Astro。源码不在页脚重复。
- 19 语选择器：自绘零水合组件（`<details>` + 链接），不要原生 `<select>`。内容页同一套组件，选项只有 `en` / `zh-CN`。
- 亮暗只跟 `prefers-color-scheme`，不做主题开关。
- `ar` RTL 至少不撑破顶栏。
- 视觉：008 橙 / 米 / 梅（`site.json` 的 `colors`）。不要产品站 ContentPage 那套 gray-100 壳。

### S2 五页长文（仅 en / zh-CN）

从 `content/source/` 重写成 Content Collections，之后以本仓为准。

- FAQ：保持现有问题骨架；改掉「网页工具、不用下载」；iOS / 桌面是正式用法；不写计时五态。2026-09-25 起（产品仓 `plans/Web/001` §7-3）可以写 3.2.0 已上架的小组件、实时活动 / 灵动岛、免费 Apple Watch、月历排班和节假日。
- 隐私：品牌 DoneAt；联系邮箱只写 `hello@doneat.app`（已接通）。不要展示 `offwork@rainif.com`。
- About / How it works / Download：DoneAt；无 GitHub 直装；无网页 vs 桌面对照表。下载页商店徽章 + 手机和电脑演示 + iPhone 功能区（当前为 3.2.0：小组件与实时活动、月历排班与节假日、免费 Apple Watch、倒计时）+ 手机/电脑对照（included / limited / absent）+ 「为何要用原生」。语气不贬网页版。下载页手机用 review clip，不要用首页那套 timer loop。
- 「返回 / 打开计时」指向 `https://off.rainif.com`，不要在本域绕回。
- 没有长文的门厅语言：链到 `en` 或 `zh-CN`（中文含繁体 → zh-CN，其余 → en）。**不要** 301 到不存在的 URL。
- 日文门厅点 FAQ → `/en/faq`。

### S3

- 每页自己的 canonical（`https://doneat.app/...`）、hreflang、OG（用 `assets/icons/og-1200x630.png`，文案不写 `off.rainif.com`）。
- 首页 Organization JSON-LD；下载页 SoftwareApplication JSON-LD。
- `sitemap.xml` / `robots.txt` 只声明 `doneat.app`。
- 不要声明「全站已迁到 doneat.app」。Search Console 不做整站 Change of Address。

## 硬禁止

- 不要改产品仓；不要动 bundle id、updater、exe 名、GitHub slug。
- 不要做第二份倒计时 / PWA / Service Worker / 可安装 manifest。
- 不要放 GitHub 直装按钮。
- 不要用产品仓的 Next、Serwist、`next-i18next`、倒计时组件。
- 不要为长文生成 19 份未审译文。
- 不要把品牌句写进 19 语功能行。
- 首页不要上桌面主窗 / 迷你计时 / 产品仓旧名 demo。下载页的桌面演示只用仓内归档 `assets/desktop-demo/`，不另造截图。
- 不要改 DNS、Cloudflare 规则或 Vercel 域名绑定，除非用户明确要求。
- 尽量零水合。语言选择器不要为了它拉一个 React 运行时。

## 文案语气

对用户说话，不评判、不说教。先讲好处，再给下一步。技术/隐私句子要具体、可执行。不要把实现细节当卖点。

铬层和门厅短句以简中意思为底，但**不要逐字直译**。按当地人会搜、会说的话来写（信达雅）：功能行带上当地会搜的词（如 Feierabend、退勤、퇴근、tan ca、pulang kerja）；品牌句像当地口语，不要搬英文 “your time is yours”，也不要搬「几点下班，心里有数」。英文品牌句和中文三句锁死。导航用当地习惯（How it works / 怎么算的 / Comment ça marche），不要为了对齐中文写成 How it's counted。

## 验收

- `astro build` 通过，19 个门厅路由能打开，语言选择器落到正确 `/{lang}`。
- 英中五页长文可读；FAQ / 隐私已按上面改过。
- 三入口在浅色/深色、桌面/手机下都能点；徽章脚本失败时仍有商店链接。
- 机位：浅/深、中/英四套对得上；减少动态效果时是静帧。
- 没有第二份 PWA，没有 GitHub 直装按钮，没有指向假长文 URL 的 301。
- 下载页 iPhone 功能区：浅/深、中/英、手机/桌面宽度都能读；减少动态效果时不自动轮播、不请求视频。
- `npm run check`、`npm run build`、`npm run seo:check` 通过。PR 用 Vercel 预览链接验收；合并到 `main` 即发布到 `doneat.app`。

做完后更新 `PLAN.md` 对应 checkbox，并在 PR 里写清 Vercel 预览链接。
