# DoneAt 官网开发计划

- **Status**: PREVIEW — S0–S3（预览域能做的）已落地；S4 上线窗口未做
- **Preview**: 匿名临时部署 [temporary-rapid-sequoia-9rkyrq6.vercel.app](https://temporary-rapid-sequoia-9rkyrq6.vercel.app/en)（约 60 分钟过期）。认领并接到独立 Vercel 项目：[claim](https://vercel.com/claim-deployment?code=16e3c9c3-95ec-4602-bd8e-980c21efe3b8)。未登录 CLI，本仓尚未绑定长期 `*.vercel.app`。
- **Repo**: [ififi2017/doneat.app](https://github.com/ififi2017/doneat.app)
- **Goes live as**: https://doneat.app
- **Product plan**: [Off-Work-Countdown 009](https://github.com/ififi2017/Off-Work-Countdown/blob/main/plans/009-doneat-platform-brand-domain.md)
- **Reviewed against**: 2026-08-28 Grill（009 + 官网设计）；邮箱已由 Cloudflare 接通

本仓只做官网。倒计时 Web App、Desktop、iOS、商店 listing 和旧域 301 在产品仓，必须和本仓**同一窗口**上线，见 009 G5。

## 一句话

`doneat.app` 是 DoneAt 的品牌门厅、商店下载和支持站。可交互的倒计时仍在 `off.rainif.com`。这里不复制 Web App，不注册 PWA，不放 GitHub 直装。

## 和产品仓的边界

| | 本仓 | 产品仓 `Off-Work-Countdown` |
| --- | --- | --- |
| 域名 | `doneat.app` | `off.rainif.com` |
| 首页 `/{lang}` | 品牌落地页 | Web App |
| `/download` `/privacy` `/about` `/faq` `/how-it-works` | 正式页（en / zh-CN） | 上线当天改为 301 到本站 |
| 预设页 `/{lang}/{preset}` | 不复制 | 保留 |
| GitHub 直装 | 不上官网 | README / Releases + updater |
| Web 上的下载营销 | 设置态「获取 App」、`/download` 301 都进本站 | 不再放直达商店的 badge / 直装对话框 |
| 技术栈 | Astro + TypeScript + Tailwind，静态输出 | Next.js 15（Web / Desktop）+ SwiftUI（iOS） |

产品仓 slug `ififi2017/Off-Work-Countdown` 不改（桌面 updater）。官网仓目前同在个人账号下；GitHub Organization 是品牌外壳，和本计划的上线窗口无关。

## Grill 锁定

### 品牌

- 显示名 **DoneAt**，不随语言翻译。
- 功能行：英文 Work Shift Countdown，简中下班倒计时；其他门厅语言用各语功能词（对产品仓 `offWorkCountdown`，en 须改成 Work Shift Countdown）。
- 品牌句：英文 Know when your time is yours（`again` 留给产品 002）。中文门厅用原创句，不直译英文：简中「几点下班，心里有数」，台湾「幾點下班，心裡有數」，香港「幾點放工，心裡有數」。其他门厅用各语自然句。不要把品牌句写进功能行。
- 过渡说明可写一次「Off Work Countdown 现为 DoneAt」，不长期双品牌并列。

### 路由

| 路径 | 做什么 |
| --- | --- |
| `/{lang}` | 19 语品牌落地页 |
| `/{en\|zh-CN}/download` | 商店 + Web 入口，以及为何要用原生 |
| `/{en\|zh-CN}/privacy` | 隐私；支持邮箱 `hello@doneat.app` |
| `/{en\|zh-CN}/about` | 品牌 / 开源 |
| `/{en\|zh-CN}/faq` | 跨平台 FAQ（按现有问题骨架重写） |
| `/{en\|zh-CN}/how-it-works` | 班次、进度和今日已赚怎么算 |
| `https://www.doneat.app/*` | 301 到裸域，保留 path + query |

没有对应长文的语言：门厅可以是该语言，点 FAQ / About 等落到 `en` 或 `zh-CN`（中文含繁体 → zh-CN，其余 → en）。不存在的语言版本不得 301 到假 URL。

每条路由只认本域 canonical。不要声明「全站迁到 doneat.app」。Search Console 不做整站 Change of Address。

### 技术栈

- Astro + TypeScript + Tailwind CSS，静态输出，独立 Vercel 项目。
- 长文：Content Collections，`en` / `zh-CN` Markdown 或 MDX。
- 门厅 19 语：Astro i18n 路由。铬层文案本仓自维护，不整份拷产品 `translation.json`。
- 亮暗只跟 `prefers-color-scheme`，不做主题切换。
- 尽量零水合。语言选择器用自绘 `<details>` 菜单，不要原生 `<select>`。
- 不用产品仓的 Next、Serwist、`next-i18next`、倒计时组件。不注册 Service Worker / 可安装 manifest。
- Mark 与图标以产品仓 [008](https://github.com/ififi2017/Off-Work-Countdown/blob/main/plans/008-brand-doneat.md) 的 `assets/brand` 为准，不另造一套。

门厅语言：`en` `zh-CN` `zh-TW` `zh-HK` `ja` `ko` `fr` `de` `es` `it` `pt` `ru` `hi-IN` `mr-IN` `tr` `ar` `th` `id` `vi`。

### 首页

桌面左右分栏：左为静止 Open Day mark、DoneAt、品牌句/功能行、三个入口；右为一台 iPhone。手机竖叠，机位在入口下方。

- Mark **静止**，不做五连击、不转圈。
- 入口顺序：**Web → App Store → Microsoft Store**。Web 用本站按钮。
  - **App Store** 用 [Apple Marketing Tools](https://toolbox.marketingtools.apple.com/) 的官方徽章图，不是产品仓里那套 Mac App Store 专用 SVG。模板：
    `https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/{black|white}/{apple-locale}`
    浅色用 `black`，深色用 `white`；`apple-locale` 跟当前门厅语言（如 `zh-cn`、`en-us`），没有对应图就回退 `en-us`。
    链接以 **id `6802803318`** 为准，商店地区跟语言走（简中用 `/cn/`，不要写死 `/us/`）。路径上的 `下班倒计时` / `off-work-countdown` 是现在的 listing slug，listing 改成 DoneAt 后会变，实现时不要把旧中文名当品牌写死。Apple 生成的 `itscg` / `itsct` / `mttnsubad` 查询参数保留。
  - **Microsoft Store** 用[官方 badge 脚本](https://get.microsoft.com/badge/)：按页面语言返回对应徽章，主题跟系统亮暗。两家官方 CDN 的可用性都作为接受的依赖。
- Web 与顶栏「打开计时」都进 `https://off.rainif.com/{lang}`。
- 入口下方三条短价值：本地、无账号、看清下班。不上长对比表，不把 FAQ 铺在首页。
- 首页机位：**先播短视频，PNG 当 poster 和播不了时的兜底**，再套官方 iPhone 17 Pro Max 框（浅色 Cosmic Orange，深色 Deep Blue，`assets/device/frames/`）。竖屏下班倒计时，不要商店合成图，不要另造机框或灵动岛。素材在 `assets/device/`：`en` / `zh` × `white` / `black` 各一份 `.mp4` + `.png`。语言跟内容语言走（中文门厅用 `zh`，其余用 `en`）；亮暗跟 `prefers-color-scheme`。`autoplay muted loop playsinline`，无控件、无声音。`prefers-reduced-motion: reduce` 只出 PNG。
- 第一版不放桌面主窗 / 迷你计时（窗口标题仍是旧名）。不上产品仓里那套旧名桌面 demo。

### 下载页

与首页同一套三个入口，外加「为何要用原生」：通知、小组件/菜单栏、关了页面仍在走。若下载页也放机位，与首页同一套视频 + PNG 兜底。无功能对比表。语气不贬网页版。不放 GitHub 直装。

### 铬层

- 顶栏：打开 Web 计时、下载、FAQ、关于。
- 页脚：怎么算的、隐私、`hello@doneat.app`、产品仓 GitHub **源码**文字链（不是下载按钮）。
- 门厅：19 语自绘选择器。内容页：同一组件，仅 English / 中文。日文门厅点 FAQ → `/en/faq`。
- 内容页与首页同一套视觉（008 橙 / 米 / 梅），阅读栏宽；不要产品站 gray-100 的文章壳。
- OG / favicon：mark + DoneAt，不写 `off.rainif.com`。

### 长文

从产品仓 `public/locales/{en,zh-CN}/content.json` 拷贝后，**以本仓为准**。FAQ 必须先按跨平台口径重写再标 canonical：改掉「网页工具、不用下载」；把 iOS / 桌面写成正式用法；不写 Widget、灵动岛、计时五态。隐私页写 `hello@doneat.app`（已接通）；`offwork@rainif.com` 只转发、不展示。

商店链接（实现时与产品仓核对 **id**，不要抄死旧 slug）：

- App Store：`https://apps.apple.com/{storefront}/app/id6802803318`（地区随语言；Apple 徽章链可带 `itscg` / `itsct` / `mttnsubad`）
- Microsoft Store：https://apps.microsoft.com/detail/9PM0HJ2PP2LJ
- 产品源码：https://github.com/ififi2017/Off-Work-Countdown

## 阶段

### S0 — 脚手架

- [x] 建立公开仓 `ififi2017/doneat.app`
- [x] Astro + TypeScript + Tailwind；i18n 路由；Content Collections
- [ ] 接入独立 Vercel 项目（先用 `*.vercel.app`，切域名前不拆 Cloudflare 302）
- [x] 拷贝 008 mark / 图标；产出 favicon、apple-touch 与基础 OG（`assets/`）

### S1 — 铬层与首页

- [x] 顶栏 / 页脚 / 19 语选择器 / 内容页 en-zh 切换
- [x] 首页按上方锁定实现（分栏、静止 mark、三个入口、三条价值、机位视频 + PNG 兜底）
- [x] App Store 入口接 Marketing Tools 徽章图（语言 + 黑白随亮暗）；Microsoft Store 接官方 badge 脚本 + SVG 兜底（脚本失败仍可点，不再叠文字链）
- [x] 中英 × 浅色/深色真机短视频 + PNG 兜底（`assets/device/`）
- [x] 跟随系统亮暗；RTL 至少不撑破顶栏（`ar`）

### S2 — 五页长文

- [x] 拷贝 about / faq / how-it-works / download / privacy
- [x] 重写 FAQ；隐私页改邮箱与品牌名
- [x] 下载页：三入口 + 为何原生；删 GitHub 直装与过时对照表
- [x] 内容页「打开计时」指 `off.rainif.com`，不形成来回跳转

### S3 — SEO 与响应头

- [x] 每页自己的 canonical、hreflang、Open Graph、必要 JSON-LD（SoftwareApplication 在下载页，Organization 在首页）
- [x] `sitemap.xml` / `robots.txt` 只声明本域
- [ ] `www` → 裸域 301，保留 path + query（Cloudflare 或 Vercel，选一处做，不要两层抢；`vercel.json` 已写好，等 S4 指域名后才生效）

### S4 — 与产品仓同一窗口上线

本仓准备好后**不要独自拆 302**。等产品仓 009 的 Web 品牌、五页 301、桌面 DisplayName 和 Microsoft Store listing 能同一天切。

上线当天本仓：

- [ ] `doneat.app` / `www.doneat.app` DNS 指到本 Vercel；TLS
- [ ] 去掉 Cloudflare 现在这条丢 path/query、指到 `off.rainif.com/` 的临时 302
- [ ] production 核对：http/https、裸域/www、根路径/内容页、无重定向环、无第二份 PWA、无 GitHub 直装按钮

产品仓当天的清单仍以 009 P3–P6 为准。

## 明确不做

- 不在本站做第二份倒计时 Web App / PWA / Service Worker
- 不放 GitHub 直装按钮（页脚源码链可以）
- 不搬产品仓的 Host 分流或 Next App Router
- 不改产品仓 bundle id、updater URL、exe 名
- 不为长文临时生成 19 份未审译文
- 不等 007 上架才开始做；也不在 007 送审包里切域名
- 第一版不放桌面窗口截图和旧名 demo 视频

## 验收（本仓）

- 19 语门厅可打开，语言选择器能落到正确 `/{lang}`
- 英中长文、三条 CTA（Apple / Microsoft 官方徽章按语言出图）、隐私邮箱、源码链
- 手机与桌面、浅色与深色
- 任何同内容双 canonical、重定向环、query 丢失都挡发布
- 预览部署不能代替 production 域名实测
