# DoneAt 官网开发计划

- **Status**: LIVE — 2026-08-30 起 `doneat.app` 由本仓提供；S0–S4 完成。下载页已按 iOS 3.2.0 更新（2026-09-25）
- **Deploy**: Vercel 项目 `doneat-app`。`main` 即 production；每个 PR 由 Vercel 出预览链接（见 PR 评论）
- **Repo**: [ififi2017/doneat.app](https://github.com/ififi2017/doneat.app)
- **Live at**: https://doneat.app
- **Product plan**: [Off-Work-Countdown 009](https://github.com/ififi2017/Off-Work-Countdown/blob/main/plans/iOS/009-doneat-platform-brand-domain.md)；搜索增长 [Web 001](https://github.com/ififi2017/Off-Work-Countdown/blob/main/plans/Web/001-seo-search-growth.md)
- **Reviewed against**: 2026-08-28 Grill（009 + 官网设计）；邮箱已由 Cloudflare 接通

本仓只做官网。倒计时 Web App、Desktop、iOS、商店 listing 和旧域 301 在产品仓，必须和本仓**同一窗口**上线，见 009 G5。

## 一句话

`doneat.app` 是 DoneAt 的品牌门厅、商店下载和支持站。可交互的倒计时仍在 `off.rainif.com`。这里不复制 Web App，不注册 PWA，不放 GitHub 直装。

## 和产品仓的边界

| | 本仓 | 产品仓 `Off-Work-Countdown` |
| --- | --- | --- |
| 域名 | `doneat.app` | `off.rainif.com` |
| 首页 `/{lang}` | 品牌落地页 | Web App |
| `/download` `/privacy` `/about` `/faq` `/how-it-works` | 正式页（与门厅相同的 19 语） | 上线当天改为 301 到本站 |
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
| `/download` `/privacy` `/about` `/faq` `/how-it-works` | 按浏览器语言 302 到已有该页的门厅语言；该语言还没有文件时落到 `/en/{page}` |
| `/{lang}/download` | 商店 + Web 入口、手机/电脑展示与对照，以及为何要用原生。19 语都有正文 |
| `/{lang}/privacy` | 隐私；支持邮箱 `hello@doneat.app` |
| `/{lang}/about` | 品牌 / 开源 |
| `/{lang}/faq` | 跨平台 FAQ（按现有问题骨架） |
| `/{lang}/how-it-works` | 班次、进度和今日已赚怎么算 |
| 磁盘上还没有的 `/{lang}/{page}` | 不生成路由。门厅用链接直接指向已有语言（现为各语自己的页），不 302 |
| `https://www.doneat.app/*` | 301 到裸域，保留 path + query |

长文路由只为 `src/content/pages/{lang}/{page}.md` 实际存在的语言生成。hreflang 和 sitemap 只列这些语言，并带 `x-default` → `/en/{page}`。缺文件时页面就地显示英文正文，canonical 指到 `/en/{page}`，不 302。不存在的语言版本不得 301 到假 URL。

每条路由只认本域 canonical。不要声明「全站迁到 doneat.app」。Search Console 不做整站 Change of Address。

### 技术栈

- Astro + TypeScript + Tailwind CSS，静态输出，独立 Vercel 项目。
- 长文：Content Collections，与门厅相同的 19 语 Markdown。缺文件的语言不进路由。
- 门厅 19 语：Astro i18n 路由。铬层文案本仓自维护，不整份拷产品 `translation.json`。
- 亮暗只跟 `prefers-color-scheme`，不做主题切换。
- 尽量零水合。语言选择器用自绘 `<details>` 菜单，不要原生 `<select>`。
- 不用产品仓的 Next、Serwist、`next-i18next`、倒计时组件。不注册 Service Worker / 可安装 manifest。
- Mark 与图标以产品仓 [008](https://github.com/ififi2017/Off-Work-Countdown/blob/main/plans/008-brand-doneat.md) 的 `assets/brand` 为准，不另造一套。

门厅语言：`en` `zh-CN` `zh-TW` `zh-HK` `ja` `ko` `fr` `de` `es` `it` `pt` `ru` `hi-IN` `mr-IN` `tr` `ar` `th` `id` `vi`。

### 首页

2026-10-01 用户重设计要求取代旧首屏分栏和窄屏居中：梅色双行标题与班次票据 → 真实录屏 → 小组件／Apple Watch → 下载。窄屏按语言起始边排列，品牌 mark 在首屏署名中，官方商店徽章在下载章；手机位于第 01 章。19 语 h1 必须两行完整可读。全站色板／外层栅格由 `src/styles/global.css` 统一定义，详见 AGENTS。

- Mark 默认定住。橙色圆点五连击后指针转一圈回到五点（与 iOS 相同）；减少动态效果时只脉冲一次。
- 首屏主入口为客户端下载详情，次入口为浏览器计时；下载章商店顺序为 **App Store → Microsoft Store**。Web 不提升为主入口。
  - **App Store** 用 [Apple Marketing Tools](https://toolbox.marketingtools.apple.com/) 的官方徽章图，不是产品仓里那套 Mac App Store 专用 SVG。模板：
    `https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/{black|white}/{apple-locale}`
    浅色用 `black`，深色用 `white`；`apple-locale` 跟当前门厅语言（如 `zh-cn`、`en-us`），没有对应图就回退 `en-us`。
    链接以 **id `6802803318`** 为准，商店地区跟语言走（简中用 `/cn/`，不要写死 `/us/`）。路径上的 `下班倒计时` / `off-work-countdown` 是现在的 listing slug，listing 改成 DoneAt 后会变，实现时不要把旧中文名当品牌写死。Apple 生成的 `itscg` / `itsct` / `mttnsubad` 查询参数保留。
  - **Microsoft Store** 用[官方 badge 脚本](https://get.microsoft.com/badge/)：按页面语言返回对应徽章，主题跟系统亮暗。两家官方 CDN 的可用性都作为接受的依赖。
- Web 与顶栏「打开计时」都进 `https://off.rainif.com/{lang}`。
- 第 01 章三条短价值：本地、无账号、看清下班。不上长对比表，不把 FAQ 铺在首页。平台可用性压成一行说明，不在首页铺 chip；Android 待发布状态在下载章与下载页的既有平台行中说明。
- 第 01 章机位：**当前色彩模式、且未开启 reduced-motion 时才加载对应 MP4**；其余情况只出 PNG。再套官方 iPhone 17 Pro Max 框（浅色 Cosmic Orange，深色 Deep Blue，`assets/device/frames/`）。竖屏下班倒计时，不要商店合成图，不要另造机框或灵动岛。素材在 `assets/device/`：`en` / `zh` × `white` / `black` 各一份 `.mp4` + `.png`。语言跟内容语言走（中文门厅用 `zh`，其余用 `en`）；亮暗跟 `prefers-color-scheme`。`autoplay muted loop playsinline`，无控件、无声音。`prefers-reduced-motion: reduce` 只出 PNG，且不请求视频。
- 首页不放桌面主窗 / 迷你计时（窗口标题仍是旧名），不上产品仓里那套旧名桌面 demo。下载页的桌面演示见下。

### 下载页

商店入口与首页同一套 App Store / Microsoft Store 徽章，不放「在浏览器里试试」。平台行含 Android 即将推出。三项原生价值用卡片排布；系统要求与卡片同宽，并附弱化的 GitHub Releases 文字链（仅 macOS / Windows 未签名直装包）。不放 GitHub 直装按钮。语气不贬网页版。顶栏仍可打开网页计时。

- 手机机位播 review 录屏（`en-review` / `zh-review`，iOS 3.2.0 真机录制），同一套官方机框与 PNG 兜底，不用首页的 timer loop。电脑用仓内归档的主窗与迷你计时演示。
- iPhone 功能区：一个图位轮播当前版本的商店图（`assets/showcase/`，en / zh-CN），旁边每张配一段可见说明，图片有具体 `alt`。3.2.0 为小组件与实时活动、月历排班与节假日、免费 Apple Watch、倒计时。减少动态效果时不自动轮播。
- 对照表是**手机 / iPad vs 电脑**（included / limited / absent），不是网页 vs 桌面。

### 铬层

- 顶栏：打开 Web 计时、下载、FAQ、关于。
- 页脚：怎么算的、隐私、联系我们、社交与 fi_niaR Studio／Astro 署名。产品 GitHub 源码图标在顶栏，不在页脚重复。
- 门厅：19 语自绘选择器。内容页用同一组件，选项是该页已经发布的语言。日文门厅点 FAQ → `/ja/faq`。
- 内容页与首页同一套视觉（008 橙 / 米 / 梅），阅读栏宽；不要产品站 gray-100 的文章壳。
- OG / favicon：mark + DoneAt，不写 `off.rainif.com`。

### 长文

从产品仓 `public/locales/{en,zh-CN}/content.json` 拷贝后，**以本仓为准**。FAQ 必须先按跨平台口径重写再标 canonical：改掉「网页工具、不用下载」；把 iOS / 桌面写成正式用法；不写计时五态。小组件、实时活动 / 灵动岛、免费 Apple Watch、月历排班与节假日自 3.2.0 上架起可写（产品仓 `plans/Web/001` §7-3）。隐私页写 `hello@doneat.app`（已接通）；`offwork@rainif.com` 只转发、不展示。

商店链接（实现时与产品仓核对 **id**，不要抄死旧 slug）：

- App Store：`https://apps.apple.com/{storefront}/app/id6802803318`（地区随语言；Apple 徽章链可带 `itscg` / `itsct` / `mttnsubad`）
- Microsoft Store：https://apps.microsoft.com/detail/9PM0HJ2PP2LJ
- 产品源码：https://github.com/ififi2017/Off-Work-Countdown

## 阶段

### Android 国内激活码版本规划

- [x] 2026-10-26：完成 [Android 国内分发与激活码会员 PLAN](docs/PLAN-ANDROID-CN-ACTIVATION.md) v1，基于现有 Cloudflare Worker/D1 和 Android 签名票据设计 `api.doneat.com.cn`、发卡 Web 后台、年费/终身会员、设备绑定与基础防破解。用户已确认首次激活 + 3 次换绑，同一时间仅一台设备有效。
- [x] 2026-10-26：PLAN v2 按用户提出的“后端直接跑成都服务器、入口套腾讯云”更新为成都 Node.js/PostgreSQL + 腾讯云入口方案；动态 API 优先评估 EdgeOne，补全不缓存、回源鉴权、管理员 MFA、备份恢复和源站共享 IP 边界。现有 Play Worker 保持原样。
- [x] 2026-10-26：PLAN v2.1 根据用户确认“泛解析已接入 EdgeOne”更新为复用现有入口，仅按 `api.doneat.com.cn` 配置规则；不默认新增 CNAME、新购服务或修改全站配置，撤回源站 IP 已公开的未经核实推断。
- [x] 2026-10-26：PLAN v2.2 根据用户 Chrome 只读核对免费 EdgeOne 与成都监控：当前仅根域/www 加速，API 接入需补齐；2 核计算余量充足，1.6 GiB 内存是主要约束。记录精简部署、容量验证、免费版无 SLA 与安装包分发限制；未改云配置或服务器。
- [x] 2026-10-26：PLAN v2.3 确认 APK 分发采用 Cloudflare 方向（建议 R2）；完成腾讯云托管数据库性价比调研，补充 CloudBase PG 持续活跃实际计费、轻量数据库公网限制及备份权益。数据库未选定，未下单、部署或改 DNS。
- [x] 2026-10-26：PLAN v2.4 完成用户授权的成都 SSH 只读勘查：可用内存约 770–784 MiB、磁盘可用 32 GB，已有 Docker/Compose/Nginx 和其他常驻服务，未发现运行中的 PG/MySQL；记录 api 证书缺口、待重启及部署边界，未修改生产环境。
- [x] 2026-10-26：按用户要求在成都主机增加并启用 1 GiB `/swapfile`，备份 fstab 后配置开机启用，保持现有 swappiness；未重启或部署授权业务，执行记录写入 PLAN v2.5。
- [x] 2026-10-27：按用户授权添加 API 的 EdgeOne 域名、阿里云 CNAME、源站 Let’s Encrypt 证书和续期重载钩子；续期演练通过。边缘证书与 API 专用规则已部署，公网 HTTPS/HTTP 跳转/no-store 及跳转后的续期演练通过；免费版不支持源站证书校验，详见 PLAN v2.6。
- [ ] 落实离线租约、换绑冷却、包名、售后、腾讯云套餐与服务器环境等建议默认值；Android 在产品仓实现，商业后端/后台建议独立私有仓库。已配置 Swap 与 API TLS 基础设施，未改产品代码、部署授权业务或发放真实激活码。

### 协作规则维护

- [x] 2026-10-07：按用户提供的文本在 `AGENTS.md` 增加「Sub Agent 协作与模型分工」，明确自主范围内委派、模型偏好与实际支持核对、上下文与文件范围交接、主 Agent 审查验证责任，以及超范围时等待用户决定。

### S0 — 脚手架

- [x] 建立公开仓 `ififi2017/doneat.app`
- [x] Astro + TypeScript + Tailwind；i18n 路由；Content Collections
- [x] 接入独立 Vercel 项目 `doneat-app`
- [x] 拷贝 008 mark / 图标；产出 favicon、apple-touch 与基础 OG（`assets/`）

### S1 — 铬层与首页

- [x] 顶栏 / 页脚 / 19 语选择器 / 内容页 en-zh 切换
- [x] 初版首页按当时锁定实现（历史：分栏、静止 mark、三个入口、三条价值、机位视频 + PNG 兜底；当前布局按 2026-10-01 重设计条款）
- [x] App Store 入口接 Marketing Tools 徽章图（语言 + 黑白随亮暗）；Microsoft Store 接官方 badge 脚本 + SVG 兜底（脚本失败仍可点，不再叠文字链）
- [x] 中英 × 浅色/深色真机短视频 + PNG 兜底（`assets/device/`）
- [x] 跟随系统亮暗；RTL 至少不撑破顶栏（`ar`）

### S2 — 五页长文

- [x] 拷贝 about / faq / how-it-works / download / privacy
- [x] 重写 FAQ；隐私页改邮箱与品牌名
- [x] 2026-09-06：按 iOS 3.1.9 补齐英中关于与隐私政策（记录、生活、专注、Plus、iCloud、备份、购买和删除边界）；Astro check / build 通过，四页本地浏览器预览已查看。本次未部署。
- [x] 下载页：三入口 + 手机/电脑展示与对照 + 为何原生；删 GitHub 直装与网页 vs 桌面对照表
- [x] 2026-09-25：下载页按 iOS 3.2.0 更新（产品仓 Web 001 P1-11）：review 录屏重录；新增 iPhone 功能区（四张商店图轮播 + 可见说明）；对照表加月历排班、节假日与调休、Apple Watch；FAQ 加小组件 / Apple Watch、轮班与节假日两问。check / build / seo:check 通过。
- [x] 2026-09-25：英中关于页按 iOS 3.2.0 更新（小节标题 3.2.0；月历排班、节假日与调休、Apple Watch 倒计时免费；记录七天免费与 Plus 边界按商店写）；关于页「你的数据会去哪里」与 FAQ 薪资隐私问答加入拍板的 iCloud 短句，FAQ JSON-LD 随正文生成。check / build / seo:check 通过。
- [x] 内容页「打开计时」指 `off.rainif.com`，不形成来回跳转
- [x] 2026-10-04：五页长文扩到与门厅相同的 19 语（`en` `zh-CN` `zh-TW` `zh-HK` `ja` `ko` `fr` `de` `es` `it` `pt` `ru` `hi-IN` `mr-IN` `tr` `ar` `th` `id` `vi`）。繁中自有页面，不再跳到简中。`/{lang}/{page}` 不再 302。路由、hreflang 和 sitemap 只包含磁盘上有文件的语言；缺译文时就地回落英文正文。下载页对照表和 iPhone 功能说明除 `en` / `zh-CN` 外仍回落英文。新译文需母语审阅。

### Android 隐私与开源说明

- [x] 2026-09-27：准备 Android 隐私草稿，按当时用户要求暂不发布。
- [x] 2026-10-04：用户要求“Android 相关隐私说明先补上去”，本次解除上述说明的发布暂停。基于官网最新 `cb18b8e` 保留已上线重设计及 19 语言页面，补齐 Android 系统备份、导入导出、Play 购买、Cloudflare 验证、保留与删除、设备认证及评价说明。
- [x] 19 语 About 补充 Kyant 的 Backdrop（AndroidLiquidGlass）2.0.1 / Shapes 1.2.1、LiquidBottomTabs 改编范围、设备本地绘制和 Apache-2.0；两份完整许可证与应用内版本逐字一致。隐私页链接到对应致谢，日期更新至 2026-10-04。Android 保持测试阶段、服务器验证依版本启用的说明。
- [x] 本次 `check`（39 files，0 errors/warnings/hints）、`build`（121 页）、`seo:check` 通过；19 语 × 隐私/About × 390/1280 宽度共 76 个浏览器布局用例无横向溢出。实际查看浅色中文/英文隐私与致谢、阿拉伯语 RTL 段落及俄语标题；修复既有俄语长标题溢出。两份许可证与跨页锚点检查通过。本轮未做深色视觉复验，17 语新增译文的母语审阅仍需后续补充。
- [x] 创建官网 [PR #30](https://github.com/ififi2017/doneat.app/pull/30)，Vercel 构建 Ready。[预览地址](https://doneat-app-git-codex-android-privacy-policy-ififi2017s-projects.vercel.app) 需要 Vercel 登录，当前浏览器会话未获得预览访问；保留访问保护。发布与生产域名验收证据记录在该 PR。Android 功能验证状态仍以产品仓 `docs/android/progress.md` 为准。

### S3 — SEO 与响应头

- [x] 每页自己的 canonical、hreflang、Open Graph、必要 JSON-LD（SoftwareApplication 在下载页，Organization 在首页）
- [x] `sitemap.xml` / `robots.txt` 只声明本域
- [x] Search Console 提交用 `sitemap-index.xml`；`/sitemap.xml` 301 到 index；大厅 sitemap 补 `x-default`；FAQ 页 `FAQPage` JSON-LD（见 [docs/seo.md](docs/seo.md)）
- [x] `www` → 裸域永久跳转，保留 path + query，由 `vercel.json` 负责（Vercel 返回 308）；Cloudflare 不再叠一层

### S4 — 与产品仓同一窗口上线

2026-08-30 与产品仓 009 同一窗口上线（产品仓 009「`doneat.app` 已是独立官网」）。

- [x] `doneat.app` / `www.doneat.app` DNS 指到本 Vercel；TLS
- [x] 去掉 Cloudflare 那条丢 path/query、指到 `off.rainif.com/` 的临时 302；根路径改由本仓 middleware 按语言 302 到门厅
- [x] production 核对（2026-09-25 复核）：`http` → `https` 308；`www` → 裸域 308，保留 path + query；`/` 302 到 `/en`；`/en/download`、`/zh-CN/download` 200；一次跳转即到终点，无重定向环；无第二份 PWA、无 GitHub 直装按钮

产品仓当天的清单仍以 009 P3–P6 为准。

## 明确不做

- 不在本站做第二份倒计时 Web App / PWA / Service Worker
- 不放 GitHub 直装按钮（顶栏源码图标可保留）
- 不搬产品仓的 Host 分流或 Next App Router
- 不改产品仓 bundle id、updater URL、exe 名
- 不为未要求的页面再自动扩写译文。2026-10-04 用户明确要求补齐 19 语长文；这批译文待母语审阅，不要当成已定稿
- 不等 007 上架才开始做；也不在 007 送审包里切域名
- 下载页桌面 demo 用仓内归档素材；窗口标题仍可能是旧名，不另造截图

## 验收（本仓）

- 19 语门厅可打开，语言选择器能落到正确 `/{lang}`
- 19 语长文可读、三条 CTA（Apple / Microsoft 官方徽章按语言出图）、隐私邮箱、源码链
- 手机与桌面、浅色与深色
- 任何同内容双 canonical、重定向环、query 丢失都挡发布
- 预览部署不能代替 production 域名实测

## 2026-10-01 官网设计改版（待审阅，未发布）

- [x] 隔离 clone 分支 `codex/award-quality-redesign`，基于 main `00a706d`；保护原工作区与未合并隐私分支。
- [x] 首页原创暖光／刻度表达，客户端下载主入口；下载页真机、iPhone／Watch 功能、桌面与对照；支持页共享系统。
- [x] 四轮浏览器与截图复核；57 个多语言首页组合、20 个内容页组合、5 宽度与 1280×720 短屏；修复光晕溢出、低对比、poster、徽章时序与章节遮挡。
- [x] 全局暂停、键盘焦点、reduce／NoJS、录屏压缩；check／build／seo 检查通过。
- [x] 审阅证据、局限和本机预览步骤记入 `review/README.md`；截图作为附件交付。
- [ ] 用户视觉审阅与发布批准；未推送、未合并 main、未部署。

## 2026-10-01 首页新方向 v2（待浏览器复核）

- [x] 按用户新方向在 `codex/home-time-transition` 重写首页信息结构：深梅排字首屏、真实录屏证据、橙色随身体验、下载章节；手机不在首屏。
- [x] 保留第一版 `fdbcc7d5` 与原型 `787e7daa`；后续本地化与问题修复独立提交。
- [x] 19 语章节、控件与独立图片描述；页脚组件继承颜色 token；源码层面修复暂停／屏幕外视频挂载。
- [x] 本地临时副本最终 check：33 files，0 errors／warnings／hints；build：121 页；seo:check 通过。19 语构建 HTML、152 个编译页脚颜色用例通过。
- [ ] 第二版真实浏览器、截图、长文案、窄屏／RTL、键盘／触控／reduced-motion 验收。工具当前不可用，第一版证据不替代本轮。
- [ ] 用户新视觉方向审阅。后续已获用户授权推送设计分支、创建草稿 PR #23 和 Vercel Preview；仍未合并 main、未部署生产，未改未合并隐私分支。

## 2026-10-01 独立评审后实质修复（进行中）

- [x] 优先统一首页／下载页／导航／页脚的色板、94rem 外层栅格与响应式内边距；移除旧暖光和重复覆盖规则。
- [x] 优先把第 02 章换成 iOS 3.2.0 原始界面准确裁切与官方 Watch 框，配页面原生排字；移除装饰时钟和箭头。
- [x] 优先实现票据 13:00→17:00、剩余时间与进度联动；一次播放后停住，可重播／全局暂停，离屏／后台休眠，reduce／省流量／NoJS 固定静帧。章节入场只播放一次，默认内容可见。
- [x] 移除首屏假按钮横条；访客说明改为自然文案；真实手机背景改为完整圆角面板；下载对比表单元格内边距由组件独立管理；增强暗色首屏分区。
- [x] 同步 AGENTS 中受重设计取代的布局条款，保留产品边界、品牌资源、SEO、下载顺序与发布限制。保留 19 语两行标题及中文名词加逗号的换行修复。
- [x] 当前修复源码 check：36 files，0 errors／warnings／hints；build：121 页；SEO 与 19 语生成内容／152 个页脚颜色用例通过。六份裁切逐像素、Watch 截图与框逐字节核对源文件。
- [ ] 当前修复 head 的实际 Mac 浏览器、截图与交互验收；先验长语言／RTL，reduce 状态下直接观察时间不自动推进。先前 4821738 仅中英五宽度共 10/95 组通过，不能说 19 语实测已过。
- [ ] 用户审阅与合并／生产批准。草稿 PR #23 保持待审；不合并 main、不部署生产、不动待审隐私分支。

## 2026-10-01 首屏实时卡片与产品同款视觉（Claude 分支 `claude/tender-shannon-6pmpeo`）

- [x] 用户批准：首屏右侧放与产品网页版同款的实时卡片，替换加速票据。固定周一至周五 09:00–17:00 示例班次，按访客本机时间实时倒计时；17:00 后「下班时间到！」并放产品同款礼花；周末「今天不上班」；上班前「距上班还有」。「预览下班」可随时快进看下班时刻，「换成我的时间」去网页版设置。不接受输入、不存储、不上报。
- [x] 卡片对照产品 `off-work-countdown.tsx`、`CountdownDisplay`、`ProgressBar`、`RollingText`、`Confetti`：Geist、白卡／暗色卡、百分比气泡、只滚动变化的数字、canvas-confetti 参数一致；九条文案逐字取自产品 19 语 translation.json，三条站内文案补齐 19 语。
- [x] 全站改用产品同款 Geist（OFL，随站分发许可）；`vi` 因缺声调字形用系统字体。
- [x] 首屏改为左标题／右卡片，按高度限字号；去掉与顶栏重复的首屏字标；可五连击 mark 移到第 03 章；暂停演示移到有录屏的第 01 章；第 02 章两列说明统一为「设备名 + 一句话」，手表在列内垂直居中；第 03 章补上与文案对应的「在浏览器里试试」。
- [x] 修复 RTL 下逐位数字被双向算法反序、印地／泰文逐字拆分破坏字形的问题：只给数字建滚动槽，数字整体按 LTR 隔离。
- [x] check 0 errors；build 121 页；seo:check 通过；`review/check-home-content.mjs` 19 语与 152 个页脚颜色用例通过。Linux headless Chromium（伪造时钟）：19 语 × 360／390／768／1024／1280×720／1440×800 × 班内／下班两种状态共 228 组，无横向溢出、标题与卡片不溢出、≥880px 时主按钮与整张卡片都在首屏内；预览、17:00 实时跨越、reduced-motion、NoJS 分别实测。
- [ ] Mac Safari／Chrome 实机复核（Linux 无苹方，中文字重与字距需在 Mac 上看）；用户审阅后再决定是否并入 PR #23。

## 2026-10-01 Apple 式配色与滚动动效

- [x] 用户反馈配色不好看、要 Apple 产品页式动效。全站换成中性色（近黑／米白／浅灰）+ 品牌橙单一强调色；按钮改胶囊形；顶栏改半透明模糊，首页顶栏固定深色。
- [x] 首页改为五段滚动场景：首屏加载时标题遮罩升起、卡片模糊浮入，滚动时上移淡出；宣言段钉住并逐词点亮；iPhone 段钉住，机身放大后归位、三条价值依次点亮；小组件与手表分层带景深入场；黑底收尾随滚动升起日落光。`home-scenes.ts` 只写进度变量，CSS 计算画面；NoJS／减少动态效果显示完整静态页。
- [x] check 0 errors；build 121 页；seo:check、19 语内容检查与 152 个页脚颜色用例通过；19 语 × 6 视口 × 两种时刻共 228 组首屏实测无溢出且主按钮与卡片在首屏内；19 语 × 6 视口钉住段内容不超出视口、无横向溢出。
- [ ] Mac Safari／Chrome 实机看滚动手感与中文字重；不支持 Intl.Segmenter 的旧浏览器退回按空格分词（中文整句一次点亮）。

## 2026-10-01 回到品牌色、宣言配图、顶栏方框

- [x] 用户反馈 Apple 式中性色太像苹果、黑底难看：回到 008 橙／米／梅，首屏与收尾改梅色傍晚渐变，浅色段落用暖纸色与浅米；下班后首屏第一行只淡到约六成。
- [x] 用户反馈「还剩多少，不必猜」整屏只有文字：宣言与 iPhone 录屏合成一段钉住场景，左侧逐词点亮、右侧机身升起归位，再依次点亮三条价值；窄屏按阅读位置点亮。
- [x] 用户反馈 iPhone 段滚动时顶栏出现方框：去掉顶栏 `backdrop-filter`，改实色；首页顶栏为深梅色。
- [x] check 0 errors；build 121 页；seo:check、19 语内容检查与 152 个页脚颜色用例通过；228 组首屏与 114 组钉住段实测通过。
- [x] 收尾章：mark 放大并加深色投影；两枚商店徽章统一黑色版并居中；标题按字形视觉居中（收掉句末全角标点的空白）；说明与平台行改米色、按句换行。iPhone 段改为大标题 + 导读句，修正层级。

## 2026-10-16 Android 可选审核访问披露（草稿）

- [x] 准备英文／简中 About 与 Privacy 的审核访问补充，以及其余 17 个已有隐私页的短提示和英／简中补充链接；不新增未经审核的多语长文。保留原有工作区变更。
- [x] 本地 `check`（39 files，0 errors/warnings/hints）、`build`（121 页）、`seo:check` 通过；19 个新增补充链接对应的构建锚点存在。Codex 内置浏览器实际查看深色英文 1280×720、简中 390×844 和阿拉伯语短提示；简中/阿拉伯语 390 宽无横向溢出，并实际点击阿拉伯语链接到英文补充。未覆盖亮色或完整 19 语视觉矩阵。
- [ ] 对照最终 Android／Worker 实现验证字段、24 小时授权、最后续期七天安装清理、退出／撤销和备份排除。17 语短提示仍需母语审阅。
- [ ] 用户审阅与发布决定；本轮不推送、合并、部署或提交 Play Data safety，不改首页、DNS 或域名绑定。正式审核访问启用前，必须先有匹配的已发布隐私披露和 Console 声明。

- [x] 2026-10-27：按用户授权完成国内授权后端与发卡后台测试环境。数据库为成都自建 PostgreSQL，私有仓库 `ififi2017/doneat-cn-license`；后台 `console.doneat.app` 由 Worker + Tunnel 访问成都管理 API，使用密码 + 通行密钥。API 公网仍为503，Android等Pixel接入；基线备份恢复通过，生产PITR/异地备份和退款事件回退未完成，详见国内 PLAN v3.0。

- [x] 2026-10-27：国内 PLAN v3.1 补充用户新增的 14 天试用、`doneat.com.cn/android/{buy,faq,privacy}` 入口及页面要求；完成支付宝手机网站支付官方准入、费率与退款能力调研。试用、网页和支付接入仍为待实施，不改变现有官网或 Play 渠道。

## 2026-10-27 国内试用与支持页实施

- [x] 独立 `domestic/` 五页发布至 `doneat.com.cn/android`，包含购买、FAQ、隐私与逐单人工退款说明；联系小红书 @fi_niaR。五页及八份资源线上内容校验一致，原根站内容与发布链接保持原样，详见 `domestic/DEPLOYMENT.md`。
- [x] 14 天试用及退款事件重算已在成都测试后端部署；真实 PostgreSQL 67 项测试通过。Pixel 已以真实 Keystore 签名领取试用，尚非正式渠道发布。
- [x] `console.doneat.app` 全站 X-Robots-Tag、HTML robots meta、禁止爬取 robots.txt 已上线；favicon 原样取自 finiar.app 仓库，线上三种图标字节校验一致。
- [x] 本仓 `check`（39 文件、零诊断）、`build`（121 页）、`seo:check` 通过；Chrome 实看购买页 390×844 浅/深布局与桌面入口。
- [x] 004 备份在隔离临时数据库恢复：4 迁移、25 表、33 外键与 336 小时试用记录核对通过；临时明文和恢复库已清理。该快照退款/权益账为空，不等于已验证非空账本恢复。
- [x] Pixel 国内最终调试包覆盖、14 天试用、进程重启、测试连接中断后重试及购买链接实测通过；国内 555 项单测、lint/Debug，默认 Play lint/Debug/R8 Release 和关联 iOS 无界面构建通过，详见 `domestic/VERIFICATION.md`。完整换绑/退款真机矩阵尚未覆盖。
- [ ] 国内生产 API 安全入口、生产签名及最终 APK 分发、非空退款账恢复与持续异地备份；目前页面明确标注测试阶段，无自动支付。


## 2026-10-27 国内 API 公网接通

- [x] 按用户确认：`api.doneat.com.cn` A 记录直连成都 `47.108.65.173`，TTL600，Let’s Encrypt HTTPS；官网根域/www 保持 EdgeOne，console 保持 Worker/Tunnel。Nginx仅九条原生POST白名单，后台/数据库仍不经此入口暴露。42项指定源站探测、26项正常DNS探测全部通过。
- [x] Pixel 已安装公网 Debug APK（SHA256 `477925cf837099531c0374152fb1dbb1360ee5ddd4dd4274b48421fae04bb479`）；移除USB reverse及电脑SSH转发后，通过手机自身网络完成试用刷新、测试年卡预览/激活、独立会员刷新、进程重启持久化。USB仅保留ADB控制/截图，未声称物理拔线或全运营商网络验收。
- [x] 新试用签发06:05:44 UTC；年卡激活06:09:36 UTC、有效至2027-10-27 14:09 UTC+8，首次绑定/余三次换绑；会员独立刷新06:10:20 UTC。原试用转为converted，无付款。测试码明文已清理，审计保留。中文/系统主题保留，临时输入法切换已恢复。
- [x] 本机未跟踪的 Android local.properties 调试URL已改为HTTPS，避免下次默认打包回到USB依赖。源码URL默认原已为HTTPS，本次无业务代码修改。
- [ ] 仍是test后端及`.cn.debug`包；正式生产trust/独立发布签名、生产环境初始化、完整换绑/退款真机矩阵另行验收。本轮不代表商业发布。

截图 `/private/tmp/doneat-cn-public-annual.png`；详细部署记录在独立后端仓 `docs/PUBLIC-API-PLAN.md`。本次辅助脚本由 GPT-6.1 Sol High 准备，主 Agent 审查并部署/真机验证。


## 2026-10-27 会员验收与生产准备

- [x] 后端新增换绑上限、旧钥失效、年卡精确续期及退款后重放不复活权益的真实 PostgreSQL 验收。首轮70项暴露首次/重试签发跨秒偏差；修复为同一持久化签发时间后，受影响33项全部通过，结合此前通过的37项形成70项分组覆盖，非单次70全绿。修复镜像已部署至test/prod两服务，健康检查通过。
- [x] 非空退款账完成AES-GCM加解密、篡改拒绝及隔离恢复：15永久表、13退款、15权益事件、33外键、ordinal序列全部核对。三个临时验收库清理，未回滚在线业务库。
- [x] Pixel实际公网单次换绑后刷新显示「已转移到其他设备」，Plus失效且数据保留；重启仍失效。测试码transfer_used=1，未清冷却或恢复绑定，不涉及退款资金。截图 `/private/tmp/doneat-cn-pixel-replaced.png`。其余换绑上限/退款场景以自动化证据为准，不声称全为真机走查。
- [x] Android新增测试/生产缓存原子加载防护；CN571项+lint/编译、Play相关回归与Release Kotlin编译、headless iOS构建通过。未覆盖Pixel APK、未发布正式包；两名辅助agent实际均为GPT-6.1 Sol High，由主agent审查与部署。
- [x] 独立空生产库升级004，使用原独立生产密钥/普通应用账号，服务仅监听127.0.0.1:18090；生产专属过期临时数据清理已启用，原测试任务未变。已生成迁移前后加密备份，并校验一份本机副本。
- [x] 生产管理员及通行密钥已由用户初始化并核实；console已切生产，api与Pixel仍保持测试，等待正式客户端。
- [x] 118.89.95.51异地加密备份已接通，每15分钟运行，本机保留7天；专用上传凭据不能覆盖/删除旧备份，实际下载解密和双库隔离恢复通过。登记后新增快照20261027T142051Z.enc已上传。
- [x] 正式签名CN候选3.2.1(5)、生产公钥与Pixel验收通过；年卡激活、独立刷新、短时离线进程重启通过后，api全量切生产，26项公网边界探测通过。
- [x] 双机Lark备份失败、新鲜度与容量告警已启用，用户确认两条测试实收，实际定时检查正常。
- [ ] APK公开下载前补对应源码不可变记录；本轮未公开分发，不声称全国产机型/运营商覆盖或WAL/PITR灾备SLA。

## 2026-10-28 国内授权安全与运行监控

- [x] 正式CN候选在Pixel完成正常TLS、伪造证书拒绝及恢复直连；公网42次边界探测、隔离协议9项通过。未修改或公开分发APK。
- [x] 成都与异地服务器运行告警已启用，覆盖健康、5xx/429、资源与数据库连接；Lark接受两条测试，新增指标日志不含IP/路径/正文。详情保存在独立后端仓 `docs/SECURITY-ACCEPTANCE-20261028.md`；不等于root/Hook防护或DDoS容量验收。

## 2026-10-28 国内版正式下载发布

- [x] 固定对应源码提交 `59bf5e40959cafc21d3dc20ad9ce667d11934a83` 与 `android-cn-v3.2.1-5` 公开；独立重建1460个APK解压文件与原验收包一致。
- [x] 原正式CN3.2.1(5)包发布Cloudflare Static Assets，`downloads.doneat.app`固定版本/摘要路径；本机及成都下载摘要一致。账号R2未启用，本次无需开通付费服务。
- [x] 国内首页及中文页面导航加入Android入口；五个支持页更新下载、实际试用和隐私说明，公网内容核对通过，回滚目录保留。
- [x] 备份失败后的恢复通知逻辑和去重测试核对，Lark接受明确标注的恢复演练通知；未制造真实故障或改线上告警状态。

详见 `domestic/DEPLOYMENT.md`；本轮不发布国际站，不含Vercel预览。
