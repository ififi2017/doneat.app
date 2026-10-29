# 国内 Android 支持页部署记录

**当前路由（2026-10-29核对）：**实际启用的 `doneat-cn-static.conf` 使用 `try_files $uri/index.html` 从 `current/android` 读取五页；下文2026-10-27的exact alias片段已不再include。`android-current`仍用于旧assets兼容。不要只切android-current而漏掉新root中的android子树；不需要修改Nginx配置。

2026-10-27，按本轮用户授权，将独立静态子树部署到现有成都网站。不含支付接入、公开 APK、销售开放、DNS 或 TLS 配置变更；网页继续明确测试状态。

## 服务器与实际配置

- 主机：`root@47.108.65.173`。
- 实际启用站点：`/etc/nginx/sites-enabled/doneat-cn` → `/etc/nginx/sites-available/doneat-cn-tls`。旧的 `sites-available/doneat-cn` 未启用。
- 现有 HTTP 80 → HTTPS 308、www → 裸域及 TLS 配置均保留；网站 443 server 引用 `/etc/nginx/snippets/doneat-cn-static.conf`。
- 页面发布：`/var/www/doneat-cn/android-releases/20261027T013500Z/android/`。
- 独立 symlink：`/var/www/doneat-cn/android-current` → 上述 android 目录。
- 新配置：`/etc/nginx/snippets/doneat-cn-android.conf`，与本目录 `nginx-android.conf` 一致。五页 exact alias，`default_type text/html`；资源使用单独 alias，其余 `/android/` 路径 404。页面没有覆盖 `add_header`，继承原站 nosniff/no-cache。
- 原 static snippet 仅追加该配置的 include；`nginx -t` 成功后执行 `systemctl reload nginx`。

配置备份：

```text
/etc/nginx/snippets/doneat-cn-static.conf.before-android-20261027T013500Z
/etc/nginx/sites-available/doneat-cn-tls.before-android-20261027T013500Z
```

原 root symlink 完全保留：

```text
/var/www/doneat-cn/current
  → releases/54cde09877b3d63707c0cd77fc772b946f84aeed-d2a67ae5e0cd4b788e30fb85382928b6
```

## 构建包

`doneat-cn-android-pages-20261027.tar.gz` 仅含 `android/` 子树，无根站文件，最终包不含 macOS xattrs/AppleDouble 元数据。服务器 `/tmp/` 保留同名最终包。

SHA256：

```text
e956048bfe49f5389f4574566ea47d29b1efe1d7a99e4939b5931c829b27f790
```

重打包命令（输出哈希可能随打包时间/文件元数据变化）：

```sh
COPYFILE_DISABLE=1 tar --no-xattrs -czf domestic/doneat-cn-android-pages-20261027.tar.gz -C domestic/dist android
```

## HTTP 验证证据

源站验证使用有效 TLS 证书校验，并将 hostname 解析到 loopback，未使用 `-k`：

```sh
curl --noproxy '*' --resolve doneat.com.cn:443:127.0.0.1 \
  -sS -D - -o /dev/null https://doneat.com.cn/android/buy
```

源站响应：`200`、`Content-Type: text/html; charset=utf-8`、`X-Content-Type-Options: nosniff`、`Cache-Control: no-cache`。五页均 200，CSS/字体/PNG 类型正确；未知页面与资源均 404。`/` 仍为 `302 Location: /zh-CN`。

随后从本机请求公网 EdgeOne 地址，五页返回 200 且 `EO-Cache-Status: MISS`：

| 公网 URL | 状态 |
| --- | --- |
| `https://doneat.com.cn/android` | 200 HTML |
| `https://doneat.com.cn/android/buy` | 200 HTML |
| `https://doneat.com.cn/android/faq` | 200 HTML |
| `https://doneat.com.cn/android/privacy` | 200 HTML |
| `https://doneat.com.cn/android/refunds` | 200 HTML |
| `https://doneat.com.cn/android/assets/missing.png` | 404 |
| `https://doneat.com.cn/android/unknown` | 404 |

所有 5 份 HTML 与 8 份资源的公网响应体，逐文件 SHA256 均与本地 `dist/` 一致，所有响应保留 `nosniff`。HTML/CSS/字体等为 no-cache；EdgeOne 对 PNG/SVG 返回已有图片缓存策略 `max-age=3600`，响应体仍一致。

原 `/zh-CN` 页面正文在部署前、部署后源站及公网的 SHA256 相同：

```text
1eb22adb0c02e6c1f439daf63b905b861c35eafc8b7bc4f102d2c60cc135d470
```

## 内容与视觉范围

源文件已核对五页：联系入口、小红书账号、试用主动领取且不自动扣款、年/终身、单设备及换绑、24 小时离线、国内/Play 分离、人工退款以及实际隐私处理方均相互一致。当前没有固定退款窗口、价格数值、假付款按钮或不存在的 APK 下载。

本地 `build` 与 `check` 通过：五页、66 个本地引用/锚点、canonical 与测试状态、无脚本/表单。主 Agent 已使用实际 Chrome 在 390×844 对购买页浅/深色截图走查；本子任务没有另外接管浏览器或声称完成全页面视觉矩阵。公网证据为 HTTP 和逐文件一致性验证，不能替代国内多运营商网络测试。

未执行 Git 提交或推送。根 `PLAN.md` 与总体验收记录由主 Agent 维护。


## 2026-10-28 正式APK下载发布

- 源码固定提交 `59bf5e40959cafc21d3dc20ad9ce667d11934a83`、tag `android-cn-v3.2.1-5` 已公开；[版本记录](https://github.com/ififi2017/Off-Work-Countdown/releases/tag/android-cn-v3.2.1-5)。独立快照assembleRelease/lintRelease通过，1460个解压文件与原Pixel已验收APK逐字节一致。两份APK整体摘要不同，不声称逐字节重现整个签名容器。实际分发仍为原验收包。
- Cloudflare Static Assets下载域名 `downloads.doneat.app` 已发布；固定版本文件、SHA256SUMS及release.json，无R2开通/付款。部署细节见 `downloads/README.md`。
- APK3.2.1(5)，5744285bytes，SHA256 `d10a832cece3a88105aa9bdb9586304fa1779154b452c1092d97e57370ac6d60`；签名证书 `2554fa47d4cb553bf22c1d8821769ca2c27381821c65fe68af835a9336bcd41b`。
- Android静态子树切换为 `/var/www/doneat-cn/android-releases/20261028-cn-3.2.1-5/android`；五页公网正文逐文件与本机构建一致。FAQ/隐私/购买状态同步实际试用、人工发码、API直连及Cloudflare下载。
- 国内根站复制原release至 `/var/www/doneat-cn/releases/20261028-cn-3.2.1-5`，仅用 `add-android-entry.py` 给6个中文页面的桌面/手机导航各加一个Android链接。`current`切至新副本。国际站、TLS、EdgeOne及API配置未改。
- 回滚元数据 `/var/www/doneat-cn/release-20261028-cn-3.2.1-5.json` 保留previousRoot/previousAndroid。回滚时用临时symlink+rename分别恢复两个旧路径；不要删除已公开APK/源码。旧页面目录仍在。
- `domestic build/check`、主站`npm run check/build/seo:check`全部通过；主站121页构建仅用于验证，没有把国际站构建部署到国内根目录。无本轮Vercel发布，因此没有虚构Vercel预览链接。
- 本机和成都服务器下载APK摘要均匹配；正确MIME/attachment/nosniff/immutable响应。不存在文件404；Range请求返回200整包，未承诺断点续传或全运营商下载质量。
- Chrome桌面页面布局与版本信息可读；其点击下载遇到本机ERR_BLOCKED_BY_CLIENT，未关闭安全设置。Pixel浏览器从官网成功到达正确文件名/5.74MB的标准APK下载确认框；确认由用户亲自操作，未代越过安全提示。


## 2026-10-29 CN 3.2.3（9）公开发布

[GitHub正式版本](https://github.com/ififi2017/Off-Work-Countdown/releases/tag/android-cn-v3.2.3-9) 对应源码 `0538cf48d3259a5898ec0e6012c5ebdfce8e0263`，APK 6,671,723 bytes，SHA-256 `2965f0ca2737f4c612b9ef89567f00ba10f1194b586ba03e89c751c618cfbb66`；原CN证书 `2554fa47d4cb553bf22c1d8821769ca2c27381821c65fe68af835a9336bcd41b` 未变。官方apksigner/aapt2复验通过，公开下载体与候选逐字节一致。

下载先发布固定APK及metadata，Cloudflare版本 `71157ecc-b974-498e-82da-9fb371af30c7` 保持feed7；五页和引用资产上线验证后，再用 `ac00641e-349d-4016-9400-a8a945a9a039` 将latest切到9。旧5/6/7资源在部署前逐个下载核对，并完整保留；上传记录分别只新增三项固定文件、更新一项latest，不上传mapping或源码归档。

页面发布到 `/var/www/doneat-cn/releases/20261029-cn-3.2.3-9-955c252-r2` 与 `/var/www/doneat-cn/android-releases/20261029-cn-3.2.3-9-955c252-r2/android`。以当前root复制新目录，只覆盖副本android子树；新增1项共享资源，222项已有资源一致，原6个zh-CN正文SHA-256不变。源站及公网五页、13项引用资源逐字节符合构建。首次验收按过时alias文档操作时返回旧正文，脚本自动恢复旧链接；确认实际路由后重新发布通过，未改Nginx/TLS/DNS/API或支付配置。

回滚元数据：`/var/www/doneat-cn/release-20261029-cn-3.2.3-9-955c252-r2.json`。旧root是 `/var/www/doneat-cn/releases/20261028-entry-filing`，旧android是 `/var/www/doneat-cn/android-releases/20261028-astro-android/android`。用临时symlink加rename分别恢复current/android-current；保留所有新旧目录。下载回滚可将服务回到上述APK staging版本（包含5/6/7/9全部固定资产，feed7），或在完整资源树上仅恢复旧feed；不要回到缺少9资产的旧部署，不删除公开APK和源码。

`npm run check`、国际构建和SEO、国内构建及五页142项本地引用/清单检查通过。国内构建使用线上已有ICP备案与公安备案文字，主Agent实际IAB检查下载信息和四项更新日志布局正常；没有重新声称全主题/设备矩阵。公共feed9及APK摘要已由主Agent另行验证。国际专用SEO脚本不适用于CN构建；国内采用专门检查，未放宽脚本断言。

站点 [PR47](https://github.com/ififi2017/doneat.app/pull/47)；[Vercel Preview](https://doneat-app-git-codex-cn-323-release-site-ififi2017s-projects.vercel.app)。main合并会按现有规则发布Vercel，仅国内版本JSON/日志及本次发布文档改变；未带入原检出的隐私/About未提交修改。可复核的公网正文摘要及服务器发布记录见 [publication JSON](releases/3.2.3-9-publication.json)。
