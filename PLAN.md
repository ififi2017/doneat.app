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

### 产品 MPL 切换与品牌授权（2026-10-04）

- [x] 官网代码保留 MIT；新增 LICENSING / ASSETS / TRADEMARKS，按路径区分原创品牌素材、内联 Logo 与 Apple/Microsoft/字体等第三方资源，保留历史 MIT 权利。
- [x] 19 语 About / FAQ 的产品许可说明改为 MPL-2.0，增加历史授权及品牌边界链接；节假日数据的 MIT 与 Android 的 Apache-2.0 声明保持原样。
- [x] `check`（39 files、0 errors/warnings/hints）、`build`（121 页）、`seo:check` 通过；19 语 × About/FAQ × 390/1280 × 浅/深色共 152 个浏览器用例无溢出，MPL 链接数量正确，已实际查看英/中/阿拉伯语截图。第三方许可和归属段落逐字核对不变。
- [ ] 与产品许可证 PR 协调合并，产品先合并；官网不得提前声明切换已发布。
- [ ] PR 的 Vercel 预览验收和链接记录。

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
