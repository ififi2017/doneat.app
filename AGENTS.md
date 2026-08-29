# 开发交接（给下一个 agent）

把 `doneat.app` 做成可以预览的官网。锁定已经拍完，不要重新决策。先读本文件和 [PLAN.md](PLAN.md)，再写代码。

## 你在哪个仓

- **工作区**：`/Users/zhengyuxuan/doneat-site`（本机文件夹不能叫 `*.app`，否则 macOS / Cursor 会当成应用包。GitHub 仓库仍是 `ififi2017/doneat.app`）。
- **产品仓**（只读对照，不要改，除非用户明确要求）：`/Users/zhengyuxuan/Off-Work-Countdown`。产品计划是 [009](https://github.com/ififi2017/Off-Work-Countdown/blob/main/plans/009-doneat-platform-brand-domain.md)。
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
| `assets/device/` | 首页机位：`en` / `zh` × `white` / `black` 的 `.mp4` + `.png`。用法见该目录 README。 |
| `content/source/*.content.json` | 英中长文草稿。**不能原文上线**，见下方 S2。 |

还没有 Astro 工程、没有页面、没有 Vercel。`doneat.app` 现在仍是 Cloudflare 302 到 `off.rainif.com/`（会丢 path/query）。**不要拆这条 302，不要改 DNS。**

## 这一轮做什么

做完 **S0 剩余 + S1 + S2 + S3 里能在预览域做的部分**。停在可以 `*.vercel.app` 预览。S4 上线窗口留给人和产品仓同一天切。

### S0

- 初始化 Astro + TypeScript + Tailwind，静态输出。
- i18n 路由：门厅 19 语 `/{lang}/`；长文只有 `en`、`zh-CN`。
- Content Collections 放 about / faq / how-it-works / download / privacy。
- 接独立 Vercel 项目，先用预览域名。
- 铬层文案本仓自维护薄目录（可从 `locales/hall.json` 扩），**不要**整份拷产品 `translation.json`。

### S1 首页与铬层

桌面左右分栏：左为**静止** Open Day mark、DoneAt、品牌句/功能行、三个入口；右为 iPhone 机位。手机竖叠，机位在入口下方。

- Mark 静止：不转圈、不五连击。
- 英文门厅：DoneAt + `Know when your time is yours` + Work Shift Countdown。
- 中文门厅（zh-CN / zh-TW / zh-HK）：DoneAt + 该语功能行。**不译品牌句。**
- 其他门厅：DoneAt + `hall.json` 里的功能行。
- 入口顺序：**Web → App Store → Microsoft Store**。
  - Web：本站按钮，链到 `https://off.rainif.com/{lang}`。
  - App Store：仓内 `assets/badges/app-store/{black\|white}/{apple-locale}.svg`。浅色页用 black 标，深色页用 white 标。语言映射见 `hall.json`；`hi-IN`、`ar` 回退 `en-us`。链接用 id **`6802803318`**，storefront 跟语言走（简中 `/cn/`）。不要把 listing slug（`下班倒计时` / `off-work-countdown`）写死当品牌。若带 Apple 的 `itscg` / `itsct` / `mttnsubad` 就保留。
  - Microsoft Store：官方 badge 脚本 + 仓内 SVG 兜底 + **永远要有可点的文字/链**到 `https://apps.microsoft.com/detail/9PM0HJ2PP2LJ`。脚本挂了入口不能空白。
- 入口下三条短价值：本地、无账号、看清下班。不上对比表，不把 FAQ 铺在首页。
- 机位：**先播 mp4，png 做 poster 和播不了时的兜底**。`autoplay muted loop playsinline`，无控件、无声音。中文门厅用 `zh-*`，其余用 `en-*`。`prefers-color-scheme` 选 white/black。`prefers-reduced-motion: reduce` 只出 PNG。不要再套一层机框或灵动岛。
- 顶栏：打开 Web 计时、下载、FAQ、关于。
- 页脚：原理、隐私、`hello@doneat.app`、GitHub **源码**文字链（`https://github.com/ififi2017/Off-Work-Countdown`），不是下载按钮。
- 19 语选择器：原生 `<select>` 或等价零水合方案。
- 亮暗只跟 `prefers-color-scheme`，不做主题开关。
- `ar` RTL 至少不撑破顶栏。
- 视觉：008 橙 / 米 / 梅（`site.json` 的 `colors`）。不要产品站 ContentPage 那套 gray-100 壳。

### S2 五页长文（仅 en / zh-CN）

从 `content/source/` 重写成 Content Collections，之后以本仓为准。

- FAQ：保持现有问题骨架；改掉「网页工具、不用下载」；iOS / 桌面是正式用法；**不写** Widget、灵动岛、计时五态。
- 隐私：品牌 DoneAt；联系邮箱只写 `hello@doneat.app`（已接通）。不要展示 `offwork@rainif.com`。
- About / How it works / Download：DoneAt；无 GitHub 直装；无桌面 vs 网页对照表。下载页 = 与首页同一套三入口 + 「为何要用原生」（通知、小组件/菜单栏、关了页面仍在走）。语气不贬网页版。下载页若放机位，复用首页同一套视频 + PNG。
- 「返回 / 打开计时」指向 `https://off.rainif.com`，不要在本域绕回。
- 没有长文的门厅语言：链到 `en` 或 `zh-CN`（中文含繁体 → zh-CN，其余 → en）。**不要** 301 到不存在的 URL。
- 日文门厅点 FAQ → `/en/faq`。

### S3（预览域能做的）

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
- 不要上桌面主窗 / 迷你计时 / 产品仓旧名 demo。
- 不要独自拆 Cloudflare 302，不要切正式域名。
- 尽量零水合。语言选择器不要为了它拉一个 React 运行时。

## 文案语气

对用户说话，不评判、不说教。先讲好处，再给下一步。技术/隐私句子要具体、可执行。不要把实现细节当卖点。

## 验收

- `astro build` 通过，19 个门厅路由能打开，语言选择器落到正确 `/{lang}`。
- 英中五页长文可读；FAQ / 隐私已按上面改过。
- 三入口在浅色/深色、桌面/手机下都能点；徽章脚本失败时仍有商店链接。
- 机位：浅/深、中/英四套对得上；减少动态效果时是静帧。
- 没有第二份 PWA，没有 GitHub 直装按钮，没有指向假长文 URL 的 301。
- 预览部署即可。不要宣布可以切 `doneat.app` DNS。

做完后更新 `PLAN.md` 对应 checkbox，并在 PR / 交接里写清预览 URL 和未做的 S4。
