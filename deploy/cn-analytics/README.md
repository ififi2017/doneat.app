# 国内官网访问与下载

`doneat.com.cn` 独立统计；不修改海外 Redis/Vercel 大盘、授权服务或 Lark。

- 成都 `47.108.65.173`：`/opt/doneat-cn-analytics/`，Python 标准库，无额外软件依赖。接收器以独立非登录用户 `doneat-analytics` 监听 `127.0.0.1:18092`，SQLite 位于 `/var/lib/doneat-cn-analytics/events.sqlite`（目录 0700）。
- Nginx：`/api/cn-events` POST，Origin 必须为 `https://doneat.com.cn`，最多 64 字节，只接受固定事件名。全站固定速率桶 20/s、burst 40，不影响授权 API 限流。关闭该入口的请求/错误日志，回源不传 Cookie、Authorization、IP、UA、Referer。Origin 不是身份认证，公开计数可被伪造，不作账务依据。
- 每次仅写日期、事件、次数；北京时间每日汇总，最多 90 天，启动和每小时清理，无访问时也清理。不保存标识或浏览历史。浏览器尊重 DNT/GPC；仅国内构建注入，海外 Vercel 路径不变。
- `doneat-cn-web-export.timer` 每分钟扫描现有 `doneat-cn.access.log*`（含 gzip 轮转），单次解压扫描上限 128 MiB、超时 45 秒，原子写入 `/var/lib/node_exporter/textfile_collector/doneat-cn-web.prom`。失败保留旧文件，面板采集年龄 >180s 变红。不会将原始日志、IP、请求路径作为指标标签。
- 复用既有 node_exporter/Prometheus 采集；所有本项目指标为 **gauge**，5m 表示滑动 300 秒计数，不能用 rate()。按天窗口包含北京时间今天；每日历史仅显示保留日志覆盖日期，不补造之前的 0。
- 上海 `ubuntu@118.89.95.51` 同时运行 Grafana/Prometheus/备份。看板 `/var/lib/grafana/dashboards/doneat-runtime/cn-web.json`，沿用 DoneAt 文件供应器，UID `doneat-cn-web`、数据源 `bfpzceehv9q80f`。由 `dashboard.py` 生成，不经 UI 改写；不重启或覆盖现有监控。

## 指标边界

Nginx 是回源数据，包含机器人，不含 EdgeOne 缓存命中。正式页面请求也不是 UV。扫描只是固定路径启发式分类，可能漏报或误报。下载点击不是下载完成，购买点击不是订单。匿名埋点从部署时开始，历史请求可由保留日志汇总；Prometheus 时间趋势从接入时开始。概览由「汇总天数」控制，实时趋势由右上角时间范围控制。

## 验证与部署

`python3 -m unittest discover -s deploy/cn-analytics -v`、`node deploy/cn-analytics/test_beacon.mjs`、`npm run check`、海外和国内 build/seo:check、`SITE_REGION=cn node domestic/check.mjs`。

先安装 Python 文件和 systemd 单元，再安装 `nginx-http.conf` 到 `/etc/nginx/conf.d/doneat-cn-events.conf`、`nginx-location.conf` 到 `/etc/nginx/snippets/doneat-cn-events.conf`，只在国内 HTTPS 规则引入后者。备份原配置，`nginx -t` 成功后 reload。启动服务与 timer，公网 POST 合法事件应为 204，未知事件 400，其他 Origin 403；不对测试循环发大量生产计数。最后部署已提交源码的国内 Astro 产物并用浏览器验证事件与 Prometheus 链路。

站点回滚恢复 `/var/www/doneat-cn/current` 的前一 symlink。采集回滚移除新增 Nginx include（校验后 reload）、停用两个新增服务及 timer，保留 SQLite；删除新增看板文件不影响旧看板（供应器 disableDeletion=true 时需另行管理已供应条目）。不触碰 `/opt/doneat-prometheus`、Lark 和原 Prometheus 配置。
