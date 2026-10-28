# 国内 Android 支持页部署记录

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
