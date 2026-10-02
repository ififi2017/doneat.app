# 开发交接（给下一个 agent）

`doneat.app` 官网已于 2026-08-30 上线，由本仓的 Vercel 项目提供。本文件是维护规则。产品边界、路由和发布要求继续有效；2026-10-01 用户明确要求的官网重设计已取代旧首页分栏／窄屏居中条款，当前布局规则如下，并与 [PLAN.md](PLAN.md) 同步。先读两份文件，再写代码。

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
- 首页整页（`.shift-page`）不可选中文字；下载 / FAQ / 关于等长文页照常可选。
- 新版首页窄屏按语言起始边对齐，RTL 跟随阅读方向；章节竖叠，真实手机放在第 01 章，首屏不放手机。桌面首屏左为双行标题、品牌句和两个入口，右为与产品网页版同款的实时卡片（`LiveShiftCard.astro`）；窄屏卡片在入口下方。首屏不再重复顶栏的品牌字标。可五连击的品牌 mark 在收尾章标题上方用内联 SVG；官方商店徽章在收尾章提供，不要求重复放首屏。首页顶栏用 `tone="dark"`，两种系统配色下都是深梅色实色栏。顶栏不要用 `backdrop-filter`：盖在钉住的滚动场景上时，Chromium 会在栏里画出神秘方框。
- 窄屏页脚可以折成多行，导航、社交图标、署名都居中。桌面仍左导航，右侧是社交图标 + 署名。
- 页脚是：怎么算的、隐私、联系我们；社交图标列（现为 X `@doneatapp`，渠道写在 `site.json` 的 `socials`，不要把空位画出来）；署名 `© fi_niaR Studio` 和 Powered by Astro。GitHub **源码**在顶栏图标，不进页脚，也不进社交列。

## 实现经验（不要重踩）

- 门厅 mark 用内联 SVG（`BrandMark.astro`），不要 `<img src="/brand/….svg">`。用 img 时浏览器会先栅格化，放大后边缘虚。几何仍以 `assets/brand/off-work-countdown-mark.svg` 为准，不要另造。
- 收尾章 mark 居中放在标题上方，不加负边距，约 6.5–8.5rem，用深色 `drop-shadow` 托起（不是暖光）；不要另造 mark。
- 收尾章居中排版：标题末尾的全角句号、换行处的「时间，」逗号用 `.end-punct` 收掉半个字宽，否则肉眼看整行偏左；说明句按句子成块换行；说明与平台行用标题同色（米色）。收尾章商店徽章用 `StoreEntries tone="dark"`：两枚都用黑色版（含微软官方脚本 `theme="dark"`），不随系统明暗变成一黑一白。
- 文案层级：短标题大字，长句用导读字号（约 1.15–1.45rem）。不要把整句说明放成巨型粗体。
- 首屏按高度和宽度同时限字号：1280×720、1440×800 这类带浏览器工具栏的笔记本首屏里，主按钮和整张卡片都要完整可见。
- 全站字体是产品 Web／Desktop 同款 Geist（`public/fonts/GeistVF.woff2`，OFL 许可在 `public/licenses/geist-ofl.txt`），中日韩、阿拉伯、印地等文字回落系统字体。Geist 缺越南语声调字形，`vi` 整页用系统字体。
- 全站外层栅格只由 `src/styles/global.css` 的 `--site-width`／`--site-gutter` 及 `.page-frame, .shift-frame` 定义。导航、首页、下载页和页脚用相同外边缘；长文阅读宽度在栅格内部约束，不能再覆盖外层 frame。色板与动效曲线同样由此文件统一管理。
- 暖光用径向渐变淡到透明。实心圆放大 + `drop-shadow` 叠在深色底上会切出一圈发闷的红褐边。
- 触摸没有 hover。点按必须自己出反馈：橙色圆点约 `scale(1.16)` + 同一套暖光。`prefers-reduced-motion: reduce` 只变亮、不缩放。
- SVG 内的可聚焦元素（如彩蛋命中圆）浏览器按 `:focus` 而非 `:focus-visible` 画默认焦点框，点一下就出现方框。要显式 `:focus { outline: none }`，只在 `:focus-visible` 画圆形焦点环。
- 五连击只打缺口里的橙色圆点（可加大透明命中圆），圆环和指针不计数。第五次指针绕 `512,512` 转一圈回到五点，角度累加，不要从 360 弹回 0。时长约 0.8s，对照 iOS `CelebratingBrandMark`。不要为它拉 React。
- 下载对照表是**手机 / iPad vs 电脑**，不是网页 vs 桌面。三种状态：`included` 实心橙点、`limited` 空心、`absent` 短横 + 「没有」/「No」。不要只靠把字调淡。iOS 独有行不要发明产品里没有的功能。
- 第 02 章使用真实产品原始截图的准确裁切和官方 Watch 框，来源、版本与裁切坐标记录在 `assets/product/sources.json`。宣传标题用页面原生排字，不把带标题的商店海报贴在首页；不生成或重绘产品 UI。
- 首页动效对照 Apple 产品页：`src/lib/home-scenes.ts` 只给每个 `[data-scene]` 写 0–1 的滚动进度（首屏 `--x`，其余 `--p`），并给 `html` 加 `scenes-on`；画面全部由 `home-story.css` 用进度算。`exit` 首屏随滚动上移淡出；`sticky` 一段钉住（左侧宣言逐词点亮、右侧 iPhone 真实录屏升起归位，随后三条价值依次点亮；各部分进度区间写在 `data-words`／`data-steps` 上）；`pass` 两段随进入展开（小组件与手表分层入场、收尾日落光升起）。首屏加载时标题逐行从遮罩里升起、卡片带模糊浮入。
- 所有进度变量默认取完成态：没有脚本、减少动态效果时不钉住、不拉高章节，整页静态可读；切换系统偏好会即时撤销。只动 transform／opacity／color，滚动监听用 rAF 节流、只算视口附近的章节。窄于 880px 不钉住，宣言按自身经过视口中线逐词点亮。不要再做只有文字没有画面的整屏段落。
- 钉住段内容高度必须小于视口：19 语 × 390×700／390×844／1024×768／1280×720／1440×800／1920×1080 要实测，改文案或字号后重跑。
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

当前首页为四段：梅色傍晚首屏排字与实时卡片 → 宣言与 iPhone 真实录屏、三条价值 → 小组件与 Apple Watch → 梅色日落收尾与官方商店下载。首屏主 h1 的两段语义各占一个完整物理行；19 语按实际内容宽度适配字号，不截断、不行数裁切、不横向滚动。手机不在首屏，窄屏按语言起始边排列。

- Mark 默认定住，用内联 SVG。只有缺口里的橙色圆点接收五连击；第五次指针转一圈回到五点（与 iOS `CelebratingBrandMark` 相同）。悬停出柔和暖光；触摸点按放大并出光。`prefers-reduced-motion: reduce` 只做透明度变化。不要为它拉 React。
- 英文门厅：DoneAt + `Know when your time is yours` + Work Shift Countdown。
- 中文门厅（zh-CN / zh-TW / zh-HK）：DoneAt + 原创品牌句 + 该语功能行。简中「几点下班，心里有数」，台湾「幾點下班，心裡有數」，香港「幾點放工，心裡有數」。不要英文字面直译。
- 其他门厅：DoneAt + 各语品牌句 + `hall.json` 里的功能行。品牌句要像当地话，不要英文字面直译。功能行仍独立。
- 首页首屏文字按钮：主按钮「详细了解客户端」进下载页；次按钮「在浏览器里试试」进 `https://off.rainif.com/{lang}`。商店徽章顺序仍是 **App Store → Microsoft Store**。
  - App Store：仓内 `assets/badges/app-store/{black\|white}/{apple-locale}.svg`。浅色页用 black 标，深色页用 white 标。语言映射见 `hall.json`；`hi-IN`、`ar` 回退 `en-us`。链接用 id **`6802803318`**，storefront 跟语言走（简中 `/cn/`）。不要把 listing slug（`下班倒计时` / `off-work-countdown`）写死当品牌。若带 Apple 的 `itscg` / `itsct` / `mttnsubad` 就保留。
  - Microsoft Store：官方 badge 脚本 + 仓内 SVG 兜底，链到 `https://apps.microsoft.com/detail/9PM0HJ2PP2LJ`。脚本挂了 SVG 仍可点。不要在徽章下再叠一条重复文字链。
- 第 01 章三条短价值：本地、无账号、看清下班。不上对比表，不把 FAQ 铺在首页。
- 第 01 章机位：**先播 mp4，png 做 poster 和播不了时的兜底**。`autoplay muted loop playsinline`，无控件、无声音。中文门厅用 `zh-*`，其余用 `en-*`。`prefers-color-scheme` 选 white/black。`prefers-reduced-motion: reduce` 只出 PNG。套仓内官方 iPhone 17 Pro Max 框（浅色 Cosmic Orange，深色 Deep Blue，`assets/device/frames/`）。视频和 PNG 铺在屏洞里，框叠在上面；框自带灵动岛，不要再另造机框或岛。
- 顶栏：GitHub 源码图标、打开网页版、下载、FAQ、关于。
- 页脚：怎么算的、隐私、联系我们（`hello@doneat.app`）；社交图标列；署名 fi_niaR Studio 与 Astro。源码不在页脚重复。
- 19 语选择器：自绘零水合组件（`<details>` + 链接），不要原生 `<select>`。内容页同一套组件，选项只有 `en` / `zh-CN`。
- 亮暗只跟 `prefers-color-scheme`，不做主题开关。
- `ar` RTL 至少不撑破顶栏。
- 视觉用 008 品牌色：橙 `#F45A1E`／亮橙 `#FF9A45`、米 `#FFF1D8`、梅 `#30202C`。浅色页面是暖纸色 `#FBF6EE`、浅米 `#F5EADB` 与奶白卡片；首页首屏与收尾是梅色傍晚渐变（`--evening`），不要用纯黑或 Apple 式中性灰（用户 2026-10-01 明确否决）。橙用于 mark、标题渐变、链接和日落光。宣言／iPhone 段与小组件段跟随系统明暗。布局颜色以 `src/styles/global.css` 为权威，`site.json.colors` 同步 theme-color；不要建立首页／下载页各一套色板。按钮全站为胶囊形。

### S2 五页长文（仅 en / zh-CN）

从 `content/source/` 重写成 Content Collections，之后以本仓为准。

- FAQ：保持现有问题骨架；改掉「网页工具、不用下载」；iOS / 桌面是正式用法；不写计时五态。2026-09-25 起（产品仓 `plans/Web/001` §7-3）可以写 3.2.0 已上架的小组件、实时活动 / 灵动岛、免费 Apple Watch、月历排班和节假日。
- 隐私：品牌 DoneAt；联系邮箱只写 `hello@doneat.app`（已接通）。不要展示 `offwork@rainif.com`。
- About / How it works / Download：DoneAt；无 GitHub 直装；无网页 vs 桌面对照表。下载页商店徽章 + 手机和电脑演示 + iPhone 功能区（当前为 3.2.0：小组件与实时活动、月历排班与节假日、免费 Apple Watch、倒计时）+ 手机/电脑对照（included / limited / absent）+ 「为何要用原生」。语气不贬网页版。下载页手机用 review clip，不要用首页那套 timer loop。
- Chrome 扩展（`site.json` 的 `chromeWebStoreUrl`）只在下载页系统要求下方和 GitHub Releases 并列一条文字链接，不做商店徽章、不进首页和平台行。它不是主要收入来源，不要抬高权重。
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
- 不要做第二份可供使用的倒计时 / PWA / Service Worker / 可安装 manifest。首屏卡片是唯一例外，边界如下（2026-10-01 用户批准）：
  - 只用固定的周一至周五 09:00–17:00 示例班次，按访客设备的本地时间实时走；卡片上写明「示例班次」，不接受时间输入，不读写 localStorage／cookie，不上报任何时间。
  - 外观、文案和状态对照产品网页版卡片：Geist、白卡／暗色卡、`{{hours}} 小时 {{minutes}} 分钟 {{seconds}} 秒`、百分比气泡进度条、只滚动变化数字的 160ms 过渡、产品同款 canvas-confetti 参数。前九条文案逐字取自产品 `public/locales/*/translation.json`（见 `src/lib/live-card.ts`），产品改了要同步。
  - 状态：上班前「距上班还有」；班内倒计时；17:00 后「下班时间到！」+ 距下次上班，并放一次礼花；周末「今天不上班」。首屏第二行标题随进度变亮，下班后第一行退后。
  - 「预览下班」任何时候都能快进看下班时刻，「回到现在」恢复实时。「换成我的时间」去网页版（utm_content=card），真正的设置只在产品里做。
  - reduced-motion 下数字直接换、不放礼花；全局「暂停演示」时不自动放礼花；NoJS 显示示例班次起点 8 小时 00 分钟 00 秒。
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
