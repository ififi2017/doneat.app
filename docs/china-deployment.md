# 国内静态官网部署

国内站 `doneat.com.cn` 使用同一 Astro 工程，以 `SITE_REGION=cn` 仅生成简中内容，隐藏 X 社交入口，按 `ICP_FILING_NUMBER` 展示备案号。海外 `doneat.app` 的 Vercel/main 发布规则不变。这里不部署倒计时产品，不配置 DNS、Cloudflare 或海外域名。

目标服务器：Ubuntu 24.04、`47.108.65.173`。新 nginx server block 与现有服务并存。先用 HTTP 和 IP 验收；确认域名 DNS 后再单独完成 TLS。构建 canonical 已使用 `https://doneat.com.cn`，TLS 完成前 HTTPS 链接尚不能作为线上验收通过的证据。

## GitHub Actions 设置

创建 environment `china`，允许分支 `codex/china-site` 部署；将来切到 main 时，先调整 environment 的分支规则，再把 workflow 的 `push.branches` 加入 `main`。这只新增国内发布任务，海外仍由 Vercel 的既有配置发布。

| 类型 | 名称 | 值 |
| --- | --- | --- |
| environment variable | `SITE_REGION` | `cn` |
| environment variable | `SITE_ORIGIN` | `https://doneat.com.cn` |
| environment variable | `ICP_FILING_NUMBER` | 未提供时留空；有正式备案号后填写完整展示文本 |
| environment variable | `DEPLOY_HOST` | `47.108.65.173` |
| environment variable | `DEPLOY_USER` | `doneat-deploy` |
| environment variable | `DEPLOY_PORT` | `22`（或实际 SSH 端口） |
| environment secret | `SSH_PRIVATE_KEY` | 该站专用、无口令的 SSH 私钥；不要复用管理员密钥 |
| environment secret | `SSH_KNOWN_HOSTS` | 经可信管理员通道核对的服务器公钥记录 |

workflow 在 `codex/china-site` push 后自动检查、构建、SEO 检查并部署国内站。整个国内 job 使用 `china` environment 的上述同名变量，配置不是 cn/目标 origin 时立即失败。`workflow_dispatch` 的 region 默认为 `cn`；选择 `global` 只构建并保存 artifact，没有 environment secrets、SSH 步骤或任何海外发布动作。

首次新增 workflow 仅在功能分支时，push 可以运行，但手动入口需要该 workflow 文件先出现在仓库默认分支。[GitHub 的手动运行说明](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow)明确要求这一点。文件注册后可选择分支手动运行；选择的分支仍须满足 `china` environment 的部署规则。不要为了首次运行改默认分支。

私钥只临时写入 runner temp、权限 600，结束或收到中断信号时清理。SSH 启用 `StrictHostKeyChecking=yes`、专用 known_hosts、无密码回退，忽略个人 SSH config，不使用 ssh/scp 第三方 action。不要把私钥或 secrets 放进仓库、命令参数或日志。

## 服务器一次性安装（管理员）

以下命令只创建专用用户、目录和新增站点。先确认同名账号/目录不存在冲突，保留现有 nginx/SSH 配置备份。安装 nginx 不应替换现有服务监听配置；若 80 已被其他进程使用，应先由管理员确认共存方式。

```bash
sudo apt-get update
sudo apt-get install nginx python3
id doneat-deploy || sudo useradd --system --home-dir /var/lib/doneat-deploy --create-home --shell /bin/sh doneat-deploy
sudo passwd -l doneat-deploy
sudo chown root:root /var/lib/doneat-deploy
sudo chmod 755 /var/lib/doneat-deploy
sudo install -d -o root -g root -m 755 /var/lib/doneat-deploy/.ssh
sudo install -d -o doneat-deploy -g doneat-deploy -m 755 /var/www/doneat-cn /var/www/doneat-cn/releases
```

通过现有管理员通道把本仓 `deploy/receive-site.py`、`deploy/nginx-china.conf` 传到服务器上的管理员暂存目录，在该目录执行：

```bash
sudo install -o root -g root -m 755 receive-site.py /usr/local/bin/doneat-receive
sudo install -o root -g root -m 644 nginx-china.conf /etc/nginx/sites-available/doneat-cn
sudo ln -s /etc/nginx/sites-available/doneat-cn /etc/nginx/sites-enabled/doneat-cn
```

不要预先创建 `current` 目录。首次成功发布会创建指向 `releases/<sha>-<随机值>` 的 `current` 符号链接。nginx 用户只需读权限。`doneat-deploy` 不加入 sudoers，不能修改 `/usr/local/bin/doneat-receive`、自己的 home/.ssh 或 nginx 配置。

管理员用 `sudoedit /var/lib/doneat-deploy/.ssh/authorized_keys` 填入专用公钥（替换下面公钥占位），且该文件只放这把受限公钥：

```text
restrict,no-pty,command="/usr/local/bin/doneat-receive" ssh-ed25519 <专用公钥内容> doneat-cn-actions
```

```bash
sudo chown root:root /var/lib/doneat-deploy/.ssh/authorized_keys
sudo chmod 644 /var/lib/doneat-deploy/.ssh/authorized_keys
```

公钥文件可读但只有 root 可写，用户不能移除 forced-command。部署用户需要 `/bin/sh` 让 sshd 执行 forced command；不要设置 nologin。专用 key 的 `restrict` 禁止端口/agent/X11 转发与用户 rc，`no-pty` 禁止终端。接收器只解释 `SSH_ORIGINAL_COMMAND`，从不把它交给 shell。[OpenSSH authorized_keys 文档](https://man.openbsd.org/sshd.8)描述了这些限制。

管理员另用 `sudoedit /etc/ssh/sshd_config.d/90-doneat-deploy.conf` 添加仅针对此用户的防护，避免未来加入其他 key 时绕过限制：

```text
Match User doneat-deploy
    AuthenticationMethods publickey
    PasswordAuthentication no
    KbdInteractiveAuthentication no
    AllowTcpForwarding no
    AllowAgentForwarding no
    X11Forwarding no
    PermitTTY no
    PermitUserRC no
    ForceCommand /usr/local/bin/doneat-receive
Match all
```

```bash
sudo sshd -t
sudo systemctl reload ssh
sudo nginx -t
sudo systemctl reload nginx
```

任何配置检查失败都先修正，保留当前管理员 SSH 会话，再开第二个会话确认可登录。检查 `sudo sshd -T -C user=doneat-deploy,host=localhost,addr=127.0.0.1` 的有效配置；不要修改其他用户规则。新增 server block 没有 `default_server`，不删除默认站点，不改既有服务。`www.doneat.com.cn` 暂时 308 到同协议的裸域；IP 验收不会被转到域名。

## 核对服务器身份

从可信的现有管理员会话读取 `/etc/ssh/ssh_host_ed25519_key.pub`，用以下命令显示其指纹，并与服务器控制台记录核对：

```bash
sudo ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
```

`SSH_KNOWN_HOSTS` 是下面格式的一行（实际内容来自已核对的服务器公钥），不是指纹文本：

```text
47.108.65.173 ssh-ed25519 <服务器公钥内容>
```

非 22 端口使用 `[47.108.65.173]:<端口>` 作为第一列。不能把未经独立核对的 `ssh-keyscan` 结果直接当作信任依据。换 host key 时先核对新身份，再更新 secret；不关闭校验。

## 手动发布

与 Actions 使用完全相同的协议。在干净、已提交的 checkout 中构建，避免把未提交内容标记成已有 Git SHA。私钥与 known_hosts 文件保存在仓库外：

```bash
export SITE_REGION=cn
export SITE_ORIGIN=https://doneat.com.cn
export ICP_FILING_NUMBER=''
npm ci
npm run check
npm run build
npm run seo:check
export DEPLOY_HOST=47.108.65.173
export DEPLOY_USER=doneat-deploy
export DEPLOY_PORT=22
export DEPLOY_SHA="$(git rev-parse HEAD)"
export SSH_PRIVATE_KEY_FILE=/absolute/private/path/doneat-cn-key
export SSH_KNOWN_HOSTS_FILE=/absolute/private/path/doneat-cn-known_hosts
bash scripts/deploy-china.sh
```

脚本先校验 host/user/port/SHA 与国内环境、检查必要文件和普通文件类型，然后压缩 `dist/`，通过 SSH stdin 发送 `deploy <40位SHA>`，最后调用 `status` 核对当前 SHA。不会调用远程 tar、scp 或任意远程 shell。

## 接收、保留和回滚

receiver 在专用用户权限下运行，用非阻塞独占锁串行发布。先收完整 gzip tar（压缩上限 512 MiB），限时 300 秒，最多 10,000 条目、单文件 256 MiB、总文件内容 1 GiB、解压流含元数据上限 1 GiB + 16 MiB。拒绝绝对路径、`..`、控制字符、反斜杠、重复路径、超深路径、symlink/hardlink、稀疏文件、设备/FIFO；不恢复归档权限或所有者。只自行创建普通文件/目录，检查简中首页、五页正文、404、robots 与 sitemap 必须齐全，并拒绝常见海外语言目录。

通过后写隐藏 SHA 元数据，暂存目录改名为唯一 release，原子替换 `current` symlink。传输/提取失败会清理暂存物，现有站点不切换。若进程被 SIGKILL 或服务器断电，可能留下 `.incoming-*`、`.archive-*` 或未引用 release；清理必须由管理员确认无发布在运行后执行。部署账号持有站点内容写权限；密钥泄漏者可替换本站内容，不能靠此协议获得服务器任意命令权限。

旧 release 不自动删除，避免误删或失去回滚点。管理员定期检查 `df -h /var/www/doneat-cn`、`du -sh /var/www/doneat-cn/releases`，保留 current 与最近若干已验收版本（建议 3–5 个），按完整目录名手动清理其余版本。不要用未经核对的通配符删除。首次上线前记录可用磁盘；发布需要归档、展开内容与旧版同时存在。

回滚由管理员执行，不向受限 key 开放 rollback 命令：先从 `releases/` 选定并检查一个已验收目录，然后将下列占位替换成该完整目录名：

```bash
release_name='填写已验收版本的完整目录名'
[[ $release_name =~ ^[0-9a-f]{40}-[0-9a-f]{32}$ ]] || { printf '无效版本目录\n' >&2; exit 1; }
sudo -u doneat-deploy test -f "/var/www/doneat-cn/releases/$release_name/.doneat-release-sha"
sudo -u doneat-deploy ln -s "releases/$release_name" /var/www/doneat-cn/.rollback-next
sudo -u doneat-deploy mv -Tf /var/www/doneat-cn/.rollback-next /var/www/doneat-cn/current
```

`mv -T` 在同一目录中替换 symlink；无需重启 nginx。之后重新核对 HTTP 内容与 SHA。不要在发布任务进行时手动回滚。

## HTTP 验收

nginx 仅公开简中六条正式路由与已知静态资源类型，未知文件、隐藏文件与其他语言返回真实 404，内部 `/404.html` 保留原响应状态。根与五个短路径为 302 且保留 query；`/sitemap.xml` 为 301 且保留 query。无 SPA fallback、目录列表或动态应用。

`_astro` 已知构建资源缓存一年并标记 immutable；媒体/字体最多一小时且需重新验证；HTML、robots、sitemap、许可证与 404 使用 no-cache。MP4 由 nginx 静态模块提供 byte-range。参考 [nginx try_files/error_page 文档](https://nginx.org/en/docs/http/ngx_http_core_module.html)。

管理员首次发布后检查：

```bash
curl -I 'http://47.108.65.173/?utm_source=acceptance'
curl -I 'http://47.108.65.173/download?utm_source=acceptance'
curl -I 'http://47.108.65.173/sitemap.xml?source=acceptance'
curl -I http://47.108.65.173/zh-CN
curl -I http://47.108.65.173/zh-CN/download
curl -I http://47.108.65.173/missing-page
curl -I http://47.108.65.173/en
curl -I http://47.108.65.173/.doneat-release-sha
curl -I -H 'Host: www.doneat.com.cn' 'http://47.108.65.173/zh-CN/download?source=acceptance'
```

从构建 HTML 中选一个实际 MP4 URL，用 `curl -I -H 'Range: bytes=0-1023'` 请求，确认 206/Content-Range；选一个 `_astro` 文件确认 immutable。实际浏览器检查浅/深、手机/桌面：首页和五页可读，下载链接有效，X 不显示，未提供备案号时保留空位，不显示伪备案文字。curl 不代替视觉与交互验收。

## HTTPS 配置与 webroot 续期

2026-10-11 主线程经 Google DoH 核对，裸域和 www 的 A 记录均已指向 `47.108.65.173`。这只确认该解析结果；签发前仍应核对权威解析、其他公共解析和 AAAA（若配置了 IPv6，必须同样可达），并确认入站 80/443 与 ACME 服务的出站 HTTPS 可达。本轮新增的是待安装配置，未声称证书签发或 TLS 已成功。

- `deploy/nginx-china.conf` 保留首次 HTTP bootstrap 原样。
- `deploy/nginx-china-static.conf` 是原 bootstrap 主站规则的原样抽取，安装为 `/etc/nginx/snippets/doneat-cn-static.conf`，供裸域 HTTPS 与 IP HTTP 共用。
- `deploy/nginx-china-tls.conf` 是证书存在后的最终站点配置：HTTP 两个域名 308 到 HTTPS 裸域，HTTPS www 308 到裸域，均保留完整 path/query；IP HTTP 继续直接服务静态站；不设置 HSTS。

最终 HTTP 域名 block 的 ACME 使用独立 `location ^~ /.well-known/acme-challenge/`，读取 `/var/lib/letsencrypt`，重定向仅在 `location /` 内，不能改成 server 层整体 `return`。用 `certbot certonly --webroot` 签发/续期，不让 nginx 插件改写现有 server block。参考 [Certbot webroot 与续期说明](https://eff-certbot.readthedocs.io/en/stable/using.html)和 [nginx HTTPS 配置](https://nginx.org/en/docs/http/configuring_https_servers.html)。

### 1. 先安装共享片段与临时 ACME HTTP 站点

将新增两份配置通过现有管理员通道送到服务器的暂存目录，在该目录执行：

```bash
sudo apt-get install certbot
sudo install -d -o root -g root -m 755 /etc/nginx/snippets /var/lib/letsencrypt/.well-known/acme-challenge
sudo install -o root -g root -m 644 nginx-china-static.conf /etc/nginx/snippets/doneat-cn-static.conf
sudo install -o root -g root -m 644 nginx-china-tls.conf /etc/nginx/sites-available/doneat-cn-tls
```

旧 bootstrap 不含 ACME location。证书不存在时不要启用 TLS 配置，`nginx -t` 会因无法读取证书失败。管理员用 `sudoedit /etc/nginx/sites-available/doneat-cn-acme` 创建以下临时 HTTP 配置；它继续服务国内内容，并优先公开验证 token：

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name doneat.com.cn www.doneat.com.cn 47.108.65.173;
    location ^~ /.well-known/acme-challenge/ {
        root /var/lib/letsencrypt;
        default_type text/plain;
        autoindex off;
        try_files $uri =404;
        add_header Cache-Control 'no-store' always;
    }
    include /etc/nginx/snippets/doneat-cn-static.conf;
}
```

```bash
sudo chown root:root /etc/nginx/sites-available/doneat-cn-acme
sudo chmod 644 /etc/nginx/sites-available/doneat-cn-acme
sudo ln -sfn /etc/nginx/sites-available/doneat-cn-acme /etc/nginx/sites-enabled/doneat-cn
sudo nginx -t
```

检查成功才 `sudo systemctl reload nginx`。如果失败，先将该 symlink 恢复到原 `/etc/nginx/sites-available/doneat-cn`，修正后重新检查。只替换国内站这一个 symlink，不同时启用 bootstrap/acme/tls，不改其他站点和现有服务。

在 webroot 写一个无敏感信息的测试 token，分别从外部经两个真实域名请求，必须直接返回 200 和该内容，不能返回 308/404；确认后删除测试 token。Let’s Encrypt 的 HTTP-01 必须可从公网端口 80 访问，不能只用本机或 IP 验证代替域名验证。

### 2. 签发并切换 HTTPS

```bash
sudo certbot certonly --webroot --webroot-path /var/lib/letsencrypt \
  --cert-name doneat.com.cn \
  -d doneat.com.cn -d www.doneat.com.cn
sudo test -s /etc/letsencrypt/live/doneat.com.cn/fullchain.pem
sudo test -s /etc/letsencrypt/live/doneat.com.cn/privkey.pem
sudo certbot certificates
```

按 Certbot 提示填写管理员邮箱并接受 CA 条款，检查证书覆盖两个域名。若出站连接或挑战失败，保留临时 ACME HTTP 站点，排查后重试；不提前启用 TLS，不用 `curl -k` 绕过证书验收，不把密钥拷进部署用户目录。

证书已成功生成且路径符合上述值后：

```bash
sudo ln -sfn /etc/nginx/sites-available/doneat-cn-tls /etc/nginx/sites-enabled/doneat-cn
sudo nginx -t
```

检查成功才 `sudo systemctl reload nginx`。检查失败先恢复 symlink 到 `doneat-cn-acme`，不要 reload 失败配置。切换后，IP HTTP 也以 308 跳转至 HTTPS 裸域；两个域名使用 HTTPS，主页面、404、缓存和视频范围规则来自同一共享片段。

```bash
curl -I 'http://doneat.com.cn/zh-CN/download?source=tls-check'
curl -I 'http://www.doneat.com.cn/zh-CN/download?source=tls-check'
curl -I 'https://www.doneat.com.cn/zh-CN/download?source=tls-check'
curl -I 'https://doneat.com.cn/?source=tls-check'
curl -I 'https://doneat.com.cn/download?source=tls-check'
curl -I https://doneat.com.cn/zh-CN/download
curl -I https://doneat.com.cn/missing-page
curl -I http://47.108.65.173/zh-CN/download
```

前三项预期 308 且 path/query 完整；HTTPS 根/短路径预期 302；正式页 200，IP 页 308 到 HTTPS；不存在页面 404。再用真实域名确认 canonical/sitemap 都是 `https://doneat.com.cn`，测试 `_astro` 缓存、MP4 206/Content-Range、浅/深与手机/桌面浏览器。证书可信链和两域名主机名校验必须通过。

### 3. 自动续期与成功后的 reload

webroot 参数由 Certbot 写入此证书的 renewal 配置，最终 HTTP ACME location 保持可用。管理员检查 `/etc/letsencrypt/renewal/doneat.com.cn.conf` 的 authenticator/webroot，避免后续被 nginx/manual 模式覆盖。不要停止 nginx 来续期，也不要建立重复 cron/timer。

通过 `sudoedit /etc/letsencrypt/renewal-hooks/deploy/doneat-cn-nginx` 创建 root-owned 成功续期 hook（先用 `sudo install -d -o root -g root -m 755 /etc/letsencrypt/renewal-hooks/deploy` 建目录）：

```sh
#!/bin/sh
set -eu
[ "${RENEWED_LINEAGE:-}" = /etc/letsencrypt/live/doneat.com.cn ] || exit 0
/usr/sbin/nginx -t
/usr/bin/systemctl reload nginx
```

```bash
sudo chown root:root /etc/letsencrypt/renewal-hooks/deploy/doneat-cn-nginx
sudo chmod 755 /etc/letsencrypt/renewal-hooks/deploy/doneat-cn-nginx
sudo systemctl list-timers --all certbot.timer
```

使用 apt 的 `certbot.timer` 时，若未启用，执行 `sudo systemctl enable --now certbot.timer`；如已有其他安装渠道的 timer/cron，沿用并确认只存在一套计划。hook 仅在此证书成功续期后测试并 reload nginx，失败不 reload，并通过 lineage 条件避免影响其他证书的续期流程。

```bash
sudo certbot renew --cert-name doneat.com.cn --dry-run --run-deploy-hooks
sudo journalctl -u certbot.service --since '1 day ago'
```

dry-run 会测试 ACME 流程；`--run-deploy-hooks` 还会在模拟续期成功后执行配置检查/reload，提前记录这次维护操作。真实证书不被 staging 证书替换。检查命令退出码与 timer 日志，定期核对证书到期时间；只有实际 dry-run 成功才能记录自动续期验收完成。

## 本次检查边界

本地临时目录测试已通过：同 SHA 两次成功发布保留两个独立 release；14 种恶意归档、5 类上限、截断归档、并发锁和 6 种非法 SSH 命令均被拒绝；失败不切换 current、无暂存残留；status 返回当前 SHA。workflow YAML 已解析，global job 无 environment 或部署 secrets；mock SSH 完整发布协议和临时私钥清理通过，6 种不合法 shell 参数被拒绝。

HTTPS 配置的本地静态检查通过：共享片段与原 bootstrap 主站规则逐行一致、两处共用 include、证书路径、ACME 优先 location、重定向保留 request_uri 和无 HSTS 均已核对；新增文档中的 shell/hook 代码通过语法检查。未在本机运行 nginx，也未签发证书。

本仓可运行 `bash -n scripts/deploy-china.sh`、Python compile 和临时目录 receiver 测试，验证合法部署、SHA 状态、重复发布的唯一目录以及恶意归档拒绝。服务器安装、真实 SSH/host key、nginx 配置加载、HTTP 与 TLS 只有在目标服务器实际检查后才能记为完成。

## 2026-10-11 实际部署记录

专用账号、受限公钥、root 管理的 SSH Match/接收器/Nginx 已安装，sshd -t、nginx -t 与真实受限 SSH 通过。私钥只保存在 GitHub environment china secret；未保存管理员密码。首次 [Actions run 38116278761](https://github.com/ififi2017/doneat.app/actions/runs/38116278761) 的 check/build/SEO/部署均成功；后续 push 国内分支继续发布。

IP HTTP 六页、根/短路径 query、真实 404、资源缓存、MP4 206 已验收。48 个首页/下载页 HTML 本地资源与链接经服务器连接返回 200。Mac 内嵌 Chromium：390×844 下载页、1440×900 首页无横向溢出，X/语言选择隐藏，备案空位 32px，预览/恢复按钮可用；支持页和资源经 SSH 隧道验收，公网首页可读，公网下载页浏览器曾超时（直接 HTTP 为 200）。本次未实测另一系统配色、reduce 或 NoJS。

[PR #32](https://github.com/ififi2017/doneat.app/pull/32) 保持草稿。[Vercel Preview](https://doneat-app-git-codex-china-site-ififi2017s-projects.vercel.app) 为默认海外构建，带登录保护，不代替国内验收。main 未合并，海外生产 last-modified 保持 2026-10-04。

根域与 www 的 A 记录经 Google DoH 均为 47.108.65.173。两个公网域名返回 Server: Beaver、Non-compliance ICP Filing 403，HTTP-01 被同样拦截。按[阿里云说明](https://help.aliyun.com/zh/icp-filing/the-influence-of-the-record-during-the-site-visit)，先完成网站备案并接入阿里云，再启用正常域名访问。

Certbot 已安装但没有成功签发证书，未启用 HTTPS，也未验收自动续期。服务器直连 ACME 出现 TLS EOF；临时出站连接测试可到达 CA 后仍因备案拦截失败。临时连接在交付前关闭，未修改现有代理配置。

TLS/静态片段已安装为备用文件；独立 nginx -t -c 用临时测试证书通过，测试证书已删除。国内 enabled symlink 仍指向 HTTP bootstrap。备案通过并解决出站连接后，按上文 webroot 签发、切换和 dry-run 启用 HTTPS。

获得真实网站备案号后，在 environment china 设置 ICP_FILING_NUMBER 并推送国内分支触发构建。网站备案与 App Store 的 APP 备案分别办理，此部署不会自动恢复 iOS 中国大陆上架。

## 2026-10-21 备案配置与设计同步

用户提供正式网站备案号：沪ICP备2026055302号-1。已写入 GitHub environment `china` 的 `ICP_FILING_NUMBER`，沿用构建时注入，未写入海外环境。国内分支同步 main `895de47`；国内与海外构建、SEO 检查均通过。HTTPS 443 当前无法连接，不能将内容部署等同于 HTTPS/续期完成。

### 2026-10-21 HTTPS 接入排查

用户已在 ServerCat 提供管理员会话。创建并启用 `doneat-cn-acme`，Nginx 检查与 reload 成功；根域/www 的 HTTP-01 测试文件均公网 200。站点仍提供 HTTP 服务，TLS 配置未启用。

服务器使用 ShellCrash fake-IP DNS；Let’s Encrypt 正式/测试服务直连 TLS 失败，通过现有 127.0.0.1:7890 代理亦失败；现有 HK/US 节点对正式 ACME 端点的 delay 测试返回 503/504。未修改代理规则、节点、DNS 或防火墙，等待用户决定修复范围。原有 ACME 账号目录存在，未重新注册或接受新协议。

### HTTPS 已启用（2026-10-21）

用户修复出口后 ACME 连接恢复。使用既有账号签发 doneat.com.cn 与 www.doneat.com.cn 的证书（到期 2027-01-19），enabled symlink 已切到 doneat-cn-tls，Nginx 检查与 reload 成功。域名、www、IP HTTP 统一 308 至 HTTPS 裸域并保留 path/query，ACME HTTP-01 例外保留。公网六页 200、备案、404、www 重定向及证书信任验证通过；Mac 内置 Chromium HTTPS 首页可读。certbot.timer 已存在，新增 root-owned deploy hook 仅为本站证书检查并 reload Nginx。

自动续期验收：`certbot renew --cert-name doneat.com.cn --dry-run --run-deploy-hooks` 成功，deploy hook 实际执行 Nginx 检查与 reload；计划任务使用既有 certbot.timer。

## 2026-10-26 公安备案展示

国内站共用页脚在 ICP 备案号旁展示「沪公网安备31011202023803号」，链接使用用户提供的公安部查询地址 `https://beian.mps.gov.cn/#/query/webSearch?code=31011202023803`。仅国内构建显示，海外构建不显示。
