# 2026-10-27 国内版联调记录

本次延续现有工程。协作子 Agent 实际使用 GPT-6.1 Sol（High），未调用其他偏好模型；主 Agent 检查集成并负责真实设备与发布验证。

## 已验证

- 国内五页及八份资源已上线，逐字节与构建产物一致；既有根站正文哈希与 symlink 不变。见 DEPLOYMENT.md。
- Chrome 实际查看桌面入口及 390×844 浅/深色购买页；Pixel 系统浏览器从会员页打开 `/android/buy`，正文、联系入口及退款说明加载成功。未宣称全站完整视觉矩阵。
- Astro check 39 文件零诊断、build 121 页及 SEO 检查通过。domestic 构建与本地链接检查通过。
- 成都测试后端 67 项真实 PostgreSQL 测试通过；迁移004仅应用测试库。新备份恢复隔离验证4迁移、25表、33外键及336小时试用记录；退款账本快照为空，未宣称非空账恢复。
- `console.doneat.app` Worker 发布版本 `84aa2f4e-8c66-42e2-a20c-9c76a2b69187`。HTML/robots/404/图标响应有禁止索引头，HTML有meta，robots禁止全站爬取。三种图标与finiar.app仓库原文件字节一致。
- Pixel 10 Pro（Android17）安装独立 `com.rainif.doneat.cn.debug`；不覆盖原DoneAt包。真实Keystore领取14天试用成功；覆盖升级后截止不变，短期刷新限流不再造成错误pending提示。
- 关联iOS无界面Simulator构建通过，未启动模拟器：`xcodebuild -project src-mobile/ios/App/App.xcodeproj -scheme App -configuration Debug -destination 'generic/platform=iOS Simulator' ... CODE_SIGNING_ALLOWED=NO build`。初次强制iOS SDK使Watch目标选错SDK、受限运行的sandbox问题均非产品源码缺陷；最终正确命令成功。

## 发布边界

网站保留测试说明；未接自动支付或实际退款资金执行。原生API公网仍未开放，Pixel经USB反向转发和SSH访问成都测试接口。生产签名、正式APK、真实支付与完整设备生命周期矩阵另行验收。

后台源码与记录位于私有草稿PR https://github.com/ififi2017/doneat-cn-license/pull/1 。本仓与产品仓保留原有未提交工作，未批量提交无关变更。

## 最终 Pixel 包补充

最终调试 APK：`/private/tmp/doneat-cn-debug-final.apk`，SHA256 `f249948e092f9c43e6bd1433dff0e2ebd5e26d8fa1a8c199f53416dd95645a7d`。国内四模块555项测试、lint和Debug构建通过。覆盖安装后试用仍截止2026-11-10 09:35:53（设备显示时区）；仅断开本次adb reverse再重启应用进程，既有试用保持有效。恢复转发后，查询尚未提交的请求未清除pending；明确点击刷新重试原命令后恢复正常，截止不变。未改变系统时钟、未重启设备，不能外推这些场景已真机通过。最终截图位于 `/private/tmp/doneat-cn-pixel-final.png`。

默认 Play 渠道最终四模块回归、lint、Debug 与 R8 Release 构建完成（`doneat-cn-android-play-final.log`，BUILD SUCCESSFUL，4m）；未将国内测试公钥用于正式包。


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
