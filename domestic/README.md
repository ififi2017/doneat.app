# 国内 Android 页面：共享 Astro 工程

五个路由 `/android`、`/android/buy`、`/android/faq`、`/android/privacy`、`/android/refunds` 由 `src/pages/android/[...page].astro` 生成，复用主站 `BaseLayout`、`SiteHeader`、`SiteFooter`、全局字体、色板、栅格和按钮。页面内容在 `src/lib/domestic-pages.mjs`，局部内容样式在 `src/styles/domestic.css`。不再维护独立HTML文档渲染器或复制全局CSS变量。

`domestic/release.json` 是APK固定版本清单；`release.mjs` 校验版本、摘要与不可变源码链接。APK地址/签名/源码不因本次页面整合改变。国际站19语客户端下载页通过 `MainlandAndroidEntry.astro` 链接到国内页面，不做地区识别或自动重定向。

## 构建与发布

在根目录执行 `npm run check`、`npm run build`、`npm run seo:check`。`npm --prefix domestic run build` 调用同一个Astro构建，再打包生成的Android路由和共享 `_astro/brand/icons/fonts/favicon` 资源到 `domestic/dist`；不是第二套页面实现。`npm --prefix domestic run check` 验证五页、共享壳层、链接/清单、无分析脚本及19语入口。

国内页面canonical固定为 `https://doneat.com.cn`，保留noindex,follow，并从国际站sitemap排除。页面关闭Vercel Analytics/TrackBeacon，但保留共用页头菜单的点击/Escape交互，不加载第三方嵌入脚本。

国内服务器使用独立android-current与根站current软链接。每次复制现有根站到新release，只添加新构建的共享资产，不覆盖其它路由；Android目录独立切换。国际站发布通过PR/Vercel。保留旧目录和部署记录供回滚，禁止直接将本机混有无关修改的整个dist覆盖国内根站。

`add-android-entry.py` 是2026-10-28早期发布的历史导航迁移脚本；不要在每次Astro部署时重复运行。完整部署历史见DEPLOYMENT.md。

## Unified deployment (2026-10-28)

The packaging build sets `SITE_REGION=cn`. Run its checks with `SITE_REGION=cn npm --prefix domestic run check`; after a global build, run the same checks without this variable to verify all 19 entries. Production now serves the complete China Astro build from `current`, including `/android`. The old `android-current` is retained for legacy assets and rollback only. Build from a clean committed checkout and preserve the existing ICP/PSB environment values. This supersedes the separate-directory deployment instructions above.
