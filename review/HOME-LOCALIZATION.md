# 首页 v2 本地化与源码复核 — 2026-10-01

本次继续 `787e7daa` 的新方向，不重做设计。首屏为深梅色巨幅排字与橙色班次示意；真实手机位于证据章节，随后是橙色小组件／Watch 章节与下载入口。历史原型说明见 `HOME-PROTOTYPE.md`。

## 本次修正

- 19 种现有语言逐一提供 15 个首页字段、暂停／播放与品牌互动标签；繁体中文独立提供，不再回退简中或英文。使用 `Record<HallLocale, …>` 约束覆盖范围。
- 小组件图片描述 Dynamic Island、锁屏和主屏幕；Watch 图片描述剩余时间、进度与下班时刻。两者各有独立的本地化 alt，不再重复章节正文。
- 页脚组件的实际 scoped 规则读取继承颜色 token。主页指定奶油色链接、橙色 hover／焦点；其他页面使用原颜色作为 fallback，避免低特异度全局选择器失效。
- 品牌互动图形扩大到 5rem；按 SVG 几何推算，命中圆直径约 25px（16px 根字号）。尚未在浏览器测量触控效果。
- 真实录屏在暂停时不挂载 source；初始媒体事件不再直接加载屏幕外的录屏。继续使用 IntersectionObserver、静态 poster 与既有 reduced-motion／全局暂停流程，等待浏览器验证运行效果。
- 对九组声明的纯色前景／背景计算 WCAG 对比度，结果 6.68–15.48，均高于 4.5；这是颜色 token 的计算，不是浏览器像素或全部状态验收。

## 验证方式与范围

`npm run check`：33 files，0 errors／warnings／hints；`npm run build`：121 页成功；`npm run seo:check`：passed。本次实际输出随审阅包提供。额外运行：

```sh
node --experimental-strip-types review/check-home-content.mjs
```

此脚本解析构建 HTML，核对 19 语文案、控件标签、两种图片描述、RTL/LTR、单一 h1、下载／工具入口、canonical／x-default、真实录屏映射及语言菜单目标。它解析实际编译 CSS，匹配 scoped 选择器、比较特异度并解析继承 token，核对浅／深色和 normal／hover 页脚链接；它不是浏览器 computed-style 检查。

本轮静态结果：19 语 HTML 检查通过；152 个编译页脚颜色用例通过。页脚普通链接 `#fff1d8`、悬停 `#ff9a45`，背景 `#30202c`，声明颜色对比度分别为 13.75、7.28。记录见 `home-v2-localization-results.json`、`home-v2-footer-cascade.json`、`home-v2-color-ratios.json`。

构建曾在模块和缓存资源读取阶段等待；检查发现本项目依赖中的 macOS `dataless` 占位文件。并行正常读取后构建恢复，但后续类型检查仍在文件读取中长时间等待。将同一源码复制到 `/tmp/doneat-home-v2-final`，按原锁文件重新安装依赖，在本地临时目录完成最终检查。未修改系统存储设置。最终日志为实际运行的检查输出，不以启动日志当作通过。

真实录屏仍只有中英两套，营销图也是仓库中的真实英文素材；其他语言使用英文录屏是既有资源映射。没有制造多语言产品界面、评价、销量或奖项；Android 保持待发布。长内容页仍按既有中英路由映射。

## 预览与回退

Mac 最终本地预览：`http://localhost:4327/zh-CN`、`/en`、`/ar`；客户端下载页 `/zh-CN/download`、`/en/download`。原 `4322` 预览保留。

持续保存的隔离源码目录：`/Users/zhengyuxuan/Documents/Codex/2026-10-01/task/doneat-redesign`；最终检查临时目录：`/tmp/doneat-home-v2-final`。后者避开本次文件读取问题，保存相同实现与最终提交。需要启动时在最终源码目录运行 `npm run build`，再运行 `npm run preview -- --host 127.0.0.1 --port 4327`。源码 bundle 与完整预览另外保存在 Library 审阅包，避免依赖临时目录长期留存。

完整离线预览包包含所有构建路由和语言菜单目标。解压后在包目录执行 `python3 -m http.server 4326 --bind 127.0.0.1 --directory preview`，打开 `http://localhost:4326/zh-CN/`。静态服务器不能模拟 Vercel 的根路由语言跳转及生产响应头；直接语言路径用于视觉审阅。

保留第一版 `codex/award-quality-redesign` / `fdbcc7d5`，以及第二版原型 `787e7daa`；新修正另行提交。未推送、未合并、未部署、未创建公开 PR，未触碰待审隐私分支。

## 剩余验收

当前工具目录没有浏览器／CUA／Playwright 接口，第二版尚无实际渲染截图或浏览器实测。第一版四轮截图与测试不能作为第二版验收证据。

排版、留白、视觉层级、色彩、动效、微交互、响应式、原创性仍需新一轮真实页面审阅；还需检查窄屏／短屏／19 语长文案／阿拉伯 RTL、键盘焦点与菜单、暂停／reduced-motion、触控、加载行为及控制台。译文未经过逐语母语审校。此次交付为完整本地化且经过源码检查的可审阅实现，不宣称最终视觉验收通过。
