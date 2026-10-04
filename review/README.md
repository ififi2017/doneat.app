# DoneAt 官网改版验收 — 2026-10-01

已实现可运行的 Astro 官网改版。视觉方向是“下班前的一束暖光”：沿用原始橙／米／梅品牌、原创品牌句与真实产品素材，用编辑式大标题、暖光和静止刻度弧表达工作的结束。刻度是装饰，不构成第二个倒计时。首页以客户端下载为主入口；下载页按照商店入口、iPhone／Watch 功能、桌面演示、平台对照、系统要求组织。其他支持页共享排版与导航系统。

结论限于本报告实际检查的范围：没有发现仍阻碍首页、下载和主要导航使用的明显缺陷；不宣称客观完美、保证获奖或保证解决收录问题。

## 来源与工作隔离

- 原仓库 `/Users/zhengyuxuan/doneat-site` 开工时无未提交修改；在任务目录独立 clone 操作。
- 本分支 `codex/award-quality-redesign`，基于 `origin/main` 的 `00a706d887e1b2ee88e40792a53fc2961bf89229`。
- 仓库 `AGENTS.md`、`PLAN.md` 与本地 `.agents/skills` 已读；产品仓只读参考，未写入其现有未提交工作。
- 隐私分支 `codex/android-privacy-coverage` 的 `014a947ec6a2699a437038c2c3392c56d515e661` 未合并、未覆盖；本次没有修改两份 privacy.md。
- 未推送、未创建公开 PR、未合并 main、未部署生产、未提交索引；9 月 25 日 x-default 实验、canonical/hreflang、站点地图与已有路由保留。

质量标尺参考 [Awwwards Superlist](https://www.awwwards.com/sites/superlist) 的视觉、交互与可用性评审，以及主线程核实的 Webby Best Home Page 案例 [Make a Song with Suno](https://winners.webbyawards.com/2024/websites-and-mobile-sites/features-design/best-home-page/295084/make-a-song-with-suno) 和 [The Renaissance Edition](https://winners.webbyawards.com/2026/websites-and-mobile-sites/features-design/best-home-page/372642/the-renaissance-edition)。参考用于质量尺度，未复制具体版式、素材或动效。FWA 动态页面未能形成可靠的具体作品审阅，不将其写为已验证参考。

## 四轮实际迭代

| 轮次 | 实测与修正 |
| --- | --- |
| 1 | 桌面／手机首次渲染：建立首页与下载层级，缩小过大手机机位，强化按钮、焦点与平台表格文字对比。 |
| 2 | production build、暗色和减少动态效果：发现下载光晕在 390px 与 1024px 宽下导致横向溢出，限制装饰宽度后复测为 0px。 |
| 3 | 19 语、键盘与无脚本：修正长语言顶栏布局、菜单 Escape 返回焦点、功能选择器键盘状态、全局暂停联动；去掉首屏淡入透明度，避免内容被截图为灰淡。 |
| 4 | 最终截图／媒体／窄屏复核：移除阻挡无脚本 poster 的 loader，视频真正 playing 后才盖住静态图；修复 Microsoft 官方徽章 CDN 时序导致的空白与重复焦点；修复章节标题被固定顶栏遮挡；短高度屏幕刻度缩到内容区；压缩真实视频并复核素材、链接和 SEO。 |

## 八项维度的交付判断

| 维度 | 实现与检查结论 |
| --- | --- |
| 排版 | 大字 DoneAt 与原品牌句建立识别，内容页正文限制阅读宽度；中英标题、长语言和 Arabic 实际换行通过；消除首屏灰淡字。 |
| 留白 | 首页文案与机位成组，手机居中；下载分区有稳定间距，短高度窗口 1280×720 的刻度不会顶到导航／页脚。 |
| 视觉层级 | 客户端主 CTA 在浏览器次 CTA 之前；App Store／Microsoft 入口稳定可点；下载章节导航与标题滚动留距清楚。 |
| 色彩 | 沿用原品牌，不新增主题开关；明暗配色审阅。关键文字 token 对纯底色最小 5.45:1；次要正文、需求和表格不依赖低透明度隐藏差异。不是整站 WCAG 认证。 |
| 动效 | 静止刻度、8px 入场与原始 800ms 彩蛋；录屏／轮播可全局暂停，离开视口／隐藏文档暂停；reduce 初始不自动挂载 MP4。 |
| 微交互 | 52px 主 CTA、44px 暂停／功能选择／菜单控件、焦点轮廓、Enter／Space 彩蛋、Escape 菜单和键盘表格均实测。Microsoft 官方尺寸为 146×40px，未冒称全部目标 44px。 |
| 响应式 | 360／390／768／1024／1440，另测 1280×720；19 语在 360／1024／1440 共 57 组合无溢出；内容页中英各五页在 390／1440 共 20 组合无溢出。 |
| 原创性 | 原品牌 mark、品牌句与真机录屏；原创刻度与暖光表达，没有虚构评价、奖项、下载量，也没有仿制参考站模板。 |

## 实测证据

- `locale-results.json`：57 个首页组合，横向 overflow=0、CTA／菜单边界正确；主 CTA 高 52px。
- `viewport-results.json`：五种宽度 × 简中首页／英文下载共 10 组合，全为 0px 页面溢出；Microsoft 兜底始终 visible 且 href 为官方商店地址。
- `support-results.json`：中英 download/privacy/about/faq/how-it-works 在 390／1440，共 20 组合，标题、canonical 与布局宽度已读实际 DOM。内容页并未逐页做人工截图审阅。
- `interaction-results.json`：首页主 CTA 到 `/zh-CN/download`；暂停全部视频且 aria-pressed=true；内容页语言只有中英；Escape 关闭菜单并回焦 summary；功能第二项 Enter 激活、焦点 solid；平台表格可键盘横向滚动。
- 原品牌圆点五次 Enter 的 800ms 旋转已在浏览器看到；实际语言切换 `/en`→`/de` 正确。
- 无脚本首页：真实 poster 可见、主 CTA 可用、0 个 video source，隐藏无效的暂停控件与彩蛋焦点。
- 暗色 + reduce 的 390px 下载页：0 个 video source、静态桌面图片正常、页面无横向溢出；章节导航会保留标题所需顶部空间。
- `contrast-results.json`：明色 ink 14.56、muted 5.89、accent 5.45；暗色 15.99／9.46／8.46。记录的是指定 token 对背景的数学值，不涵盖产品视频内文字或所有叠色。
- `media-results.json`：四个首页 MP4 减少 96.4–97.0%，两条下载 review MP4 减少 33.9–34.5%。原录屏保留，无新框架、字体或大插画依赖。
- `final-screenshot-results.json`：九张最终截图；长页截图前先滚动加载真实素材，再回页首。截图目录不进入 Git，由附件单独交付。

最终截图包含：中英 1440×900 首页、简中 390×844 首页、Arabic RTL 360×800 首页、简中暗色桌面、英文 1280×720 短屏、中英桌面下载、简中暗色 reduce 手机下载。

## 检查与真实产品状态

- `npm run check`：31 文件，0 errors／warnings／hints。
- `npm run build`：121 静态页面成功。
- `npm run seo:check`：passed；`git diff --check`：passed。
- Apple 官方 lookup 核实 iOS 3.2.0（2026-09-21 发布、最低 iOS 26.0）；Microsoft 官方商品页确认 Windows 下载已存在。既有系统要求和官方商店链接保留；Android 仍为 Coming soon／即将推出。
- 本地 Apple 返回与 Microsoft 标题仅用于现状核验，未据此虚构评分、评价数量或下载量。

## 本机预览与源码

工作目录：`/Users/zhengyuxuan/Documents/Codex/2026-10-01/task/doneat-redesign`。

本机 production preview：<http://localhost:4322/zh-CN> 与 <http://localhost:4322/en/download>，只绑定 `127.0.0.1`。交付前检查监听和 HTTP 200；该进程独立于短工具调用存活。Mac 关机、重启或进程退出后，在上述目录重启：

```sh
npm ci
npm run build
npm run preview -- --host 127.0.0.1 --port 4322
```

偏好测试用 `review/serve-variants.mjs`，在 build 后以 `node review/serve-variants.mjs dark 4323`、`dark-reduce 4324`、`nojs 4325` 启动；这些是本地 QA 的 CSS／matchMedia 和脚本剥离仿真，不改变正式路由，也不改变用户系统偏好。

源码附件提供增量 Git bundle，依赖上述 main 基础提交。已有仓库可先 `git bundle verify DoneAt-redesign.bundle`，再 fetch 到独立审阅分支。没有推送到 GitHub。

## 剩余限制与审批边界

- 实际浏览器为 Codex in-app browser，未覆盖 Safari／Firefox／Windows 浏览器和实体触摸设备。触控结论来自响应式视口、点击与 DOM 目标尺寸，未做真实手机手势测试。
- dark/reduce/nojs 为本地首方页面仿真；第三方徽章内部行为、OS 偏好热切换与系统 Save Data 未做端到端原生测试。
- 新增暂停控件和 mark 的 accessible label 中英以外回退英文。收尾时浏览器控制工具被撤回，未完成新译文浏览器复核，所以回退该未验证扩展，保留实际截图对应版本。
- 支持页已核对实际 DOM，但未全部人工视觉截图审阅；没有 Lighthouse 分数、线上 CWV 或慢网实测，不把压缩字节数当作实测加载时间。
- 无公开分享预览；如需跨机器在线预览，需用户新授权后再选择部署／隧道方式。当前无需发布即可在此 Mac 审阅。
- GSC 抓取未收录问题仍需独立跟踪；设计改版不能保证收录。发布、合并 main 和隐私草稿 PR 都仍待用户明确批准。
