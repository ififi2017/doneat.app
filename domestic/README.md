# DoneAt 国内 Android 支持页

此目录独立生成 `doneat.com.cn/android` 下的静态支持页，不进入 Astro 路由，不改变 `doneat.app`、根站、19 语页面或其 SEO。没有 JavaScript、支付表单、分析脚本、cookie 或本地存储。APK 通过 Cloudflare 独立下载域名提供，网页仅链接到已核验的固定版本。

## 构建与本地预览

不需要安装依赖。Node.js 20+：

```sh
cd /Volumes/BACKUP/Projects/doneat-site/domestic
npm run build
npm run check
npm run preview
```

预览：`http://127.0.0.1:4322/android`。支持无尾斜杠 URL，与正式路径一致。可用 `PORT=4323 npm run preview` 更换端口。构建会清空且仅重建本目录 `dist/`。

## 内容与输出

| URL | 构建文件 |
| --- | --- |
| `/android` | `dist/android/index.html` |
| `/android/buy` | `dist/android/buy/index.html` |
| `/android/faq` | `dist/android/faq/index.html` |
| `/android/privacy` | `dist/android/privacy/index.html` |
| `/android/refunds` | `dist/android/refunds/index.html` |

内容在 `build.mjs`，布局在 `styles.css`。色板、外层宽度与字体变量在构建时读取现有 `src/styles/global.css`；字体、许可证、图标、原始 SVG mark 从本仓资产复制。导航 mark 内联，几何未重绘。

沿用 `noindex,follow`，每页 canonical 只指向自己的国内 URL，不生成/覆盖根站 sitemap 或 robots。公开下载不自动改变搜索索引策略；后续单独决定。价格在人工购买前确认。

## 部署边界

仅发布 `dist/android/`，不要把整个 `dist/` 用作根站替换。`/var/www/doneat-cn/current` 是根站发布 symlink。2026-10-28用户授权增加下载入口后，已在原根站副本仅增加导航链接并切换该symlink；其余内容保留，见DEPLOYMENT.md。后续只更新Android支持页时不要覆盖根站。

建议把本项目每次输出复制到独立路径，例如 `/var/www/doneat-cn/android-releases/<版本>/android/`，再将 `/var/www/doneat-cn/android-current` 指向该版本的 **android 目录**。2026-10-27 核对：实际启用的是 `/etc/nginx/sites-enabled/doneat-cn` → `sites-available/doneat-cn-tls`，443 server 已 include `/etc/nginx/snippets/doneat-cn-static.conf`，HTTP 80 保持原有 308 HTTPS；旧的 `sites-available/doneat-cn` 是未启用的引导配置。部署时在实际 static snippet 中仅增加 `include /etc/nginx/snippets/doneat-cn-android.conf;`。没有改变 TLS、HTTP 跳转或原 root。完整路由片段为本目录 `nginx-android.conf`，核心布局如下：

```nginx
# Add alongside the existing root site; use exact page locations.
location = /android { alias /var/www/doneat-cn/android-current/index.html; }
location = /android/buy { alias /var/www/doneat-cn/android-current/buy/index.html; }
location = /android/faq { alias /var/www/doneat-cn/android-current/faq/index.html; }
location = /android/privacy { alias /var/www/doneat-cn/android-current/privacy/index.html; }
location = /android/refunds { alias /var/www/doneat-cn/android-current/refunds/index.html; }
location = /android/ { return 308 /android$is_args$args; }
location ^~ /android/assets/ { alias /var/www/doneat-cn/android-current/assets/; }
location /android/ { return 404; }
```

这五个 exact 页面 location 使用 `alias` 指向 HTML 文件时，应在相应 location 明确设置 `default_type text/html;`（或复用部署者已有的 HTML 类型设置），防止无扩展 URL 返回二进制下载类型。根据现有响应头配置同时保留 `X-Content-Type-Options: nosniff`、`Referrer-Policy: strict-origin-when-cross-origin` 与短缓存/`no-cache`。Nginx 的 `add_header` 有继承规则，不能盲目添加导致原安全头丢失。资产 location 依文件扩展名使用现有 MIME 类型。

静态文件指向与 Nginx 配置已在本次部署环境实际验证，记录见 `DEPLOYMENT.md`。保留根站的 TLS、现有响应头和 ACME 配置；不改 DNS、域名绑定、其他子域或后台。

发布后核对五页 200、每条资源 200、无尾斜杠路径与锚点、错误路径 404，以及原根站响应未变。小红书链接为 `https://xhslink.cn/o/27s6TlLN00p`，只打开外部服务，不自动发送消息。

## 本轮验证范围

- `npm run build` 与 `npm run check`：验证五页、全部本地引用与锚点、独立 canonical、实际下载与源码清单、小红书/邮件入口、无空按钮/表单/脚本，以及所有 APK 按钮指向同一固定文件。
- 界面需用实际浏览器核对 390×844 与 1280×720、系统浅/深色、键盘导航；静态检查不能替代视觉验收。
- 2026-10-27 用户授权后，已将独立 Android 子树部署至成都；没有执行 Git 提交或推送。详见 `DEPLOYMENT.md`。

## 固定发布清单

构建前必须提供真实 `release.json`。不提供示例 APK URL，不允许在缺少清单时回退到假下载按钮。字段：

- `versionName`、`versionCode`、`bytes`：实际 APK 信息。
- `apkSha256`、`certificateSha256`：文件及签名证书 SHA-256，小写 64 位。
- `apkUrl`：`https://downloads.doneat.app` 上含版本、构建号及至少前 12 位文件摘要的固定 `.apk` 路径。
- `sourceCommit`：公开对应源码的 40 位 Git 提交；`sourceUrl` 为产品仓该提交的 tree 或 archive URL，不允许 main/latest。
- `publishedAt`：实际发布日，`YYYY-MM-DD`。

`release.mjs` 验证清单后，首页主按钮与下载详情使用相同 APK URL，详情提供版本、体积、Android 要求、文件/证书摘要和对应源码入口。这里仅校验静态清单结构；远程文件的可达性、下载后摘要、签名与源码可获得性仍由发布者在部署前后实际验证。更新网页时不覆盖旧 APK 或旧源码。
