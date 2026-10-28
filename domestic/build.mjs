import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { loadRelease } from './release.mjs';

const release = await loadRelease();

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '..');
const out = path.join(here, 'dist');
export const origin = 'https://doneat.com.cn';
export const contactUrl = 'https://xhslink.cn/o/27s6TlLN00p';
const updated = release.publishedAt.replace(/^(\d+)-(\d+)-(\d+)$/, '$1 年 $2 月 $3 日');
const size = (release.bytes / 1024 / 1024).toFixed(1);
const download = `<a class="btn" href="${release.apkUrl}" rel="noopener noreferrer">下载国内版 APK</a>`;
const releaseInfo = `<section class="reading release-info" id="download"><h2>下载与安装</h2><p>国内版 ${release.versionName}（${release.versionCode}） · ${size} MiB · Android 8.0 及以上</p><div class="actions">${download}<a class="btn secondary" href="${release.sourceUrl}" target="_blank" rel="noopener noreferrer">查看此版本源码 ↗</a></div><p class="meta">下载后打开 APK，按系统提示允许当前浏览器安装应用；安装完成后可关闭该权限。更新请直接覆盖安装，避免卸载导致本地数据或设备授权密钥丢失。</p><details class="checksum"><summary>文件与签名校验信息</summary><dl><dt>APK SHA-256</dt><dd><code>${release.apkSha256}</code></dd><dt>签名证书 SHA-256</dt><dd><code>${release.certificateSha256}</code></dd><dt>对应源码提交</dt><dd><code>${release.sourceCommit}</code></dd></dl></details></section>`;
const mark = (await readFile(path.join(repo, 'assets/brand/off-work-countdown-mark.svg'), 'utf8'))
  .replace('role="img" aria-labelledby="title desc"', 'aria-hidden="true" focusable="false"')
  .replace(/\s*<title[^>]*>.*?<\/title>/s, '')
  .replace(/\s*<desc[^>]*>.*?<\/desc>/s, '');
const xhs = (label = '联系小红书 @fi_niaR', classes = 'btn') => `<a class="${classes}" href="${contactUrl}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
const email = '<a href="mailto:hello@doneat.app">hello@doneat.app</a>';
const pilot = `<aside class="pilot" aria-label="下载与购买说明"><p><strong>国内 Android 版现已提供下载。</strong>在应用内可主动领取 14 天试用，无需绑定支付方式。会员通过人工联系购买激活码，本页不直接收款。</p></aside>`;
const contact = `<aside class="contact"><h2>想了解或需要帮助？</h2><p>在小红书联系 @fi_niaR，说明你在咨询 DoneAt 国内 Android 版。购买前会先确认版本、方案、实际价格和交付方式。</p><div class="actions">${xhs()}<a class="btn secondary" href="mailto:hello@doneat.app">邮件联系</a></div></aside>`;
const nav = [['/android', '国内 Android'], ['/android/buy', '购买说明'], ['/android/faq', '常见问题']];
const link = (href, text, route) => `<a href="${href}"${route === href ? ' aria-current="page"' : ''}>${text}</a>`;

export const pages = [
  {
    route: '/android', title: '国内 Android 版', description: '下载 DoneAt 国内 Android 版，主动领取 14 天试用，了解会员方案、激活与售后。', landing: true,
    content: `<section class="landing-band"><div class="page-frame"><div class="inner"><p class="eyebrow">DONEAT · 国内 ANDROID 版</p><h1>几点下班，<br>心里有数。</h1><p class="lede">把时间留给自己。国内 Android 版的试用、激活与支持，都从这里了解。</p><div class="actions">${download}<a class="btn secondary" href="/android/buy">了解会员与购买</a></div></div></div></section>
      <div class="page-frame body"><div class="inner"><section class="section">${pilot}<div class="grid"><article class="card"><p class="label">01 / 先体验</p><h2>14 天，自己决定。</h2><p>在应用中阅读说明并主动领取，由服务器开始计算连续 14 天；无需绑定支付方式，也不会到期自动扣款。</p><p><a href="/android/faq#trial">了解试用规则</a></p></article><article class="card"><p class="label">02 / 再选择</p><h2>年会员或终身会员。</h2><p>国内版以激活码开通。每份授权同一时间仅供一台设备使用，首次激活后另有 3 次换绑机会。价格与交付请先联系确认。</p><p><a href="/android/buy">查看完整购买说明</a></p></article></div></section>${releaseInfo}<section class="reading"><h2>工作数据，仍留在设备里。</h2><p>授权服务用于确认试用和会员资格，不上传你的薪资、排班或工作记录。设备授权信息的处理方式，另有完整说明。</p><p><a href="/android/privacy">阅读国内版隐私说明</a></p></section>${contact}</div></div>`
  },
  {
    route: '/android/buy', title: '购买与激活', description: '了解 DoneAt 国内 Android 版年会员和终身会员、14 天试用、单设备与换绑规则，以及人工咨询和交付方式。',
    lede: '先确认适合你的版本，再决定是否购买。国内 Android 版提供年会员与终身会员，通过激活码开通。',
    content: `${pilot}<div class="grid"><section class="card"><p class="label">按年使用</p><h2>年会员</h2><p>从首次成功激活时起，按日历年计算一年有效期。应用内显示具体到期时间；提前续期从现有到期时间延长。</p><p class="price">实际价格 · 联系确认</p><p>预付费，不自动续费、不自动扣款。</p></section><section class="card"><p class="label">长期使用</p><h2>终身会员</h2><p>会员权益不设置年限。设备授权仍需定期联网校验；“终身”不代表永久离线，也不增加同时可用的设备数量。</p><p class="price">实际价格 · 联系确认</p><p>一次购买；适用国内 Android 版。</p></section></div>
      <section class="reading"><h2>购买前，先看这几项。</h2><dl class="facts"><div><dt>适用版本</dt><dd>仅限 DoneAt 国内 Android 版。与 Google Play 版的购买和会员记录分开，不自动互通；不要求 Google 登录。</dd></div><div><dt>一台有效设备</dt><dd>一份授权同一时间仅供一台设备使用；首次激活之外，另有 3 次换绑机会。续期、升级不会重置换绑次数。</dd></div><div><dt>联网与离线</dt><dd>首次激活、领取试用和换绑需要联网。成功校验后，离线授权最长 24 小时，且不会超过会员或试用的到期时间。</dd></div><div><dt>14 天试用</dt><dd>在应用内阅读说明并主动领取才开始计时；安装或浏览本页不会开始试用。试用到期不自动转为付费。</dd></div></dl></section>
      <section class="reading"><h2>目前怎样咨询与购买？</h2><ol><li><strong>先联系。</strong>打开小红书 @fi_niaR，说明你想了解年会员或终身会员。</li><li><strong>确认后再付款。</strong>先核对适用版本、实际价格、交付方式及售后安排；本网页不收款。</li><li><strong>人工核款与发码。</strong>当前采用人工联系与交付流程，没有支付宝自动支付、自动发码或订单查询入口。</li><li><strong>回到应用激活。</strong>收到激活码后，在对应国内版本的激活入口中使用。请妥善保存购买凭证和激活码，不要公开发到评论区。</li></ol><p>如果没有收到交付、丢失激活码或遇到激活问题，请通过原联系渠道或 ${email} 提供必要购买凭证，由人工核实。</p></section>
      <section class="reading"><h2>售后与退款</h2><p>退款申请由人工结合实际情况逐案处理，页面不承诺固定退款窗口。请先阅读<a href="/android/refunds">退款与售后说明</a>；14 天免费试用不等于 14 天退款承诺。</p><p><a href="/android/faq">还想了解换机、重装或离线使用？</a></p></section>${contact}`
  },
  {
    route: '/android/faq', title: '常见问题', description: 'DoneAt 国内 Android 版的试用、人工购买与收码、激活、换机、离线、退款以及 Google Play 版本区别。',
    lede: '关于国内版的试用、激活和换机，把需要确认的事说明白。',
    content: `${pilot}<div class="faq reading">
      ${faq('available', '现在可以下载、试用或购买吗？', '可以从<a href="/android#download">下载入口</a>获取国内版 APK，并在应用内主动领取 14 天试用。购买年会员或终身会员，请先联系 @fi_niaR 确认方案、价格与交付方式；本页没有自助付款。', true)}
      ${faq('trial', '14 天试用从什么时候开始？', '在应用内先阅读设备数据与试用规则，主动点击领取，并由服务器成功签发后开始计算连续 14 天。安装应用、打开网页或联系咨询都不会开始计时。领取需要联网；不绑定支付方式，也不会自动扣款。')}
      ${faq('repeat-trial', '卸载重装或改手机时间，能重新领取试用吗？', '试用按服务器时间计时。相同设备标识再次领取，只能恢复已有试用的剩余时间，不重新开始 14 天；卸载或删除本机数据不会自动删除服务器试用记录。设备标识受系统环境影响，无法保证识别每一台物理手机。数据用途和保留范围见<a href="/android/privacy#retention">隐私说明</a>。')}
      ${faq('trial-expired', '试用到期后，我的记录会被删除吗？', '不会因为试用结束删除或篡改你的工作记录和设置。试用到期后回到应用现有的免费功能；试用期间开通付费会员，付费权益优先，剩余试用不折现、不叠加到年会员期限。')}
      ${faq('payment', '怎样付款、收到激活码？', '目前请先通过小红书 @fi_niaR 联系。先人工确认方案、价格、付款与交付安排，再核款发码。本页没有自动支付或自动发码功能。没有收到码时，保留凭证并通过原渠道联系，不要重复付款。')}
      ${faq('duration', '年会员与终身会员有什么区别？', '年会员从首次成功激活起按日历年计算一年，续期在现有到期时间后延长，不自动续费。终身会员不设置年限。两者都有设备绑定与最长 24 小时离线授权限制，都需要定期联网校验。')}
      ${faq('transfer', '可以用几台设备？换手机怎么算？', '一份授权同一时间仅供一台设备使用。首次激活后另有 3 次换绑机会，即最多 4 次成功绑定；换回旧手机也算一次换绑。换绑需要联网确认，成功后旧绑定不能再获得服务器续期；旧机已有的离线授权最迟在其到期时失效，不会远程删除工作数据。')}
      ${faq('reinstall', '同一台手机重装，也会扣换绑次数吗？', '当前设备原有密钥仍在、可以完成原绑定校验时，恢复不扣次数。卸载、清除数据或恢复出厂设置可能使密钥丢失，此时可能需要按换绑处理；遇到误扣或无法恢复，请联系人工核实，不保证只凭“还是同一台手机”就自动免扣。')}
      ${faq('offline', '没有网络时还能用吗？', '首次激活、领取试用及换绑需要联网。成功校验后会取得最长 24 小时的离线授权，且截止时间不晚于会员或试用到期时间；超过期限需要重新联网。服务器故障不会无限延长租约，免费功能与本地工作数据不因断网而被删除。')}
      ${faq('renew', '续期或升级会重新计算换绑次数吗？', '不会。年会员续期和升级终身沿用原授权的换绑额度。具体有效期与订单适用范围在办理前人工确认；请不要把续期或升级码当作可独立转送的新授权。')}
      ${faq('lost', '激活码丢了，或者码被别人用了怎么办？', `请通过原购买渠道或 ${email} 联系，提供必要的购买时间、方案和凭证。不要在公开评论中贴出完整激活码。人工核实后再处理挂失、恢复或补发，不承诺仅凭设备截图即可找回。`)}
      ${faq('refund', '怎样申请退款？', '通过原购买渠道或邮件提出申请，由人工按实际情况审核；目前没有固定退款窗口承诺，也没有网页一键退款。资金退款和授权调整分别核实、记录。详见<a href="/android/refunds">退款与售后说明</a>。')}
      ${faq('play', '国内版与 Google Play 版会员能互通吗？', '两条渠道的购买与会员记录分开，不自动互通。国内激活码只适用于国内 Android 版，不能当作 Google Play 订单；购买前请确认你安装的版本。国内版不要求 Google 登录。')}
      ${faq('data', '激活会上传薪资和工作记录吗？', '不会。授权服务器处理的是设备授权、试用和必要网络请求数据，不接收薪资、排班或工作记录。设备哈希仍可用于关联同一设备，不能理解为匿名数据；完整字段与服务提供方见<a href="/android/privacy">国内版隐私说明</a>。')}
      </div>${contact}`
  },
  {
    route: '/android/refunds', title: '退款与售后', description: 'DoneAt 国内 Android 版的人工售后与退款申请方式、处理步骤，以及资金退款和设备授权调整的边界。',
    lede: '遇到交付或使用问题，请先联系。我们会核对购买与授权情况，再说明处理方案。',
    content: `${pilot}<div class="reading"><section><h2>如何提出申请</h2><p>通过原购买时的小红书会话联系 @fi_niaR，或发邮件至 ${email}。请说明购买时间、会员方案、遇到的问题和希望如何处理，并提供必要付款凭证。</p><p>请遮盖凭证中无关的个人信息，不要提供支付密码、验证码，也不要在公开评论区贴出完整激活码。</p></section><section><h2>退款按实际情况逐案处理</h2><p>目前由人工结合交付、激活和使用情况审核，并向你确认处理结果。<strong>本页不承诺固定退款窗口或无条件退款。</strong>14 天试用是免费体验期限，不等同于退款期限；具体售后安排会在付款前确认。</p></section><section><h2>处理分为几步</h2><ol><li><strong>核实申请。</strong>确认购买凭证、对应订单及授权，必要时补充信息。</li><li><strong>告知方案。</strong>说明是否接受退款、涉及的金额及对应权益影响；续期或升级订单需要单独核对。</li><li><strong>人工办理资金退款。</strong>由经营者在原收款渠道办理，并核对实际结果。本页和应用没有自动退钱功能。</li><li><strong>登记回执并调整对应权益。</strong>记录退款结果，再处理对应激活码或权益；不会用撤销授权冒充已经完成退款。</li></ol><p>退款是否到账及时间取决于实际收款渠道，不能仅凭后台状态判断。处理中有疑问时，请在原会话继续联系，以免重复提交造成混淆。</p></section><section><h2>退款如何影响应用使用</h2><p>未使用的激活码可作废；已激活的对应权益可能停止续期、撤销或按处理结果调整。续期、升级退款需核对该次变更，保留其他有效权益，不能简单撤销所有历史购买。</p><p>设备已有的离线授权可能在剩余有效期内继续有效，最长不超过 24 小时；联网校验或票据到期后体现调整。<strong>不承诺离线设备瞬时失效。</strong>退款不会删除你的薪资、排班、工作记录或设置，也不会重置试用领取资格。</p></section><section><h2>其他售后问题</h2><p>没有收到码、激活失败、丢码、误扣换绑或设备丢失，都可以先联系核实。请查看<a href="/android/faq">常见问题</a>了解恢复与换绑规则；人工售后不代表自动补发或无限换绑。</p></section></div>${contact}`
  },
  {
    route: '/android/privacy', title: '国内版隐私说明', description: 'DoneAt 国内 Android 版的本地工作数据、设备授权与试用数据、网络服务提供方，以及保留、删除和联系渠道。',
    lede: '工作内容保留在设备里；联网授权只处理确认试用和会员资格所需的数据。这里说明两者的区别。',
    content: `${pilot}<div class="reading"><section><h2>1. 适用范围与联系</h2><p>本说明适用于 DoneAt 国内 Android 版的试用、激活码授权、人工购买与售后，以及本支持网站。运营品牌为 <strong>fi_niaR Studio</strong>；联系邮箱为 ${email}，也可通过<a href="${contactUrl}" target="_blank" rel="noopener noreferrer">小红书 @fi_niaR</a>联系。Google Play 等其他渠道另有相应说明，会员记录不自动互通。</p><p>本页说明当前国内版的下载、联网授权与支持服务。领取试用和激活由你在应用内主动操作。</p></section><section><h2>2. 工作数据保留在本地</h2><p>薪资、上下班时间、排班、工作记录和个人设置由应用保存在设备本地，<strong>不会上传到国内授权服务器</strong>。授权服务不需要读取通讯录、精确位置、IMEI 或 MAC 地址，也不要求 Google 登录。</p><p>你主动导出文件、使用设备系统备份或把内容发送给客服时，相关数据由你选择的方式处理。请勿在购买或售后中提交与问题无关的工作记录。</p></section><section><h2>3. 联网授权与试用处理哪些数据</h2><ul><li><strong>设备公钥与授权标识：</strong>设备生成的 P-256 公钥、应用及设备标签、版本、激活与换绑等请求，用于确认请求来自已绑定设备、签发授权及处理恢复。</li><li><strong>设备去重标识：</strong>用于试用防重复的 ANDROID_ID 先在设备端做 SHA-256，服务器收到这一摘要后再使用服务端密钥做 HMAC。服务器不接收原始 ANDROID_ID；摘要和 HMAC 仍可关联设备，<strong>不属于匿名数据</strong>。</li><li><strong>试用及会员记录：</strong>试用起止时间、状态、对应设备去重记录，激活码使用、权益期限、绑定/换绑次数、撤销及必要售后记录，用于确认当前资格、防止重复试用与滥用。</li><li><strong>网络与安全数据：</strong>服务端及网络服务方会处理 IP 地址、请求时间、必要错误与安全日志，用于传输、故障排查和限流。请求授权不等于上传工作数据。</li></ul><p>在应用内领取前会展示数据和试用说明，由你主动选择是否领取；试用开始由服务器确认，不因安装应用而默认开始。首次领取或激活需要联网。</p></section><section><h2>4. 购买与售后信息</h2><p>目前通过小红书人工联系；本页不收集表单、不直接收款，也没有自动支付或自动发码。你发送的方案选择、联系信息、付款凭证及售后沟通，可用于核款、交付、找回和退款。我们只应索取处理问题所需的信息。</p><p>小红书、邮件及实际收款渠道按其自身规则处理你向它们提交的信息。支付宝自动支付接口尚未接入，不将计划中的支付能力写成已经启用。</p></section><section><h2>5. 服务提供方与处理地点</h2><ul><li><strong>阿里云成都服务器：</strong>国内业务 API 与自建 PostgreSQL 数据库部署在成都，用于保存和处理授权、试用及必要业务记录。服务器提供方会处理提供基础设施所需的网络与运行数据。</li><li><strong>腾讯云 EdgeOne：</strong>作为国内公开网站的边缘入口，处理连接、IP 及转发请求所需数据；国内授权 API 通过 HTTPS 直连成都服务器，不经过 EdgeOne。不能据此承诺所有网络信息都只由应用处理。</li><li><strong>Cloudflare：</strong>管理后台经 Worker 与 Tunnel 访问成都管理 API。管理操作涉及的请求、响应和授权/售后信息可能经境外设施处理，不能承诺所有业务数据始终只在境内。它不是国内用户业务 API 的入口。APK 通过 Cloudflare 分发；下载时它会处理 IP、请求时间、文件路径等传输所需信息，相关网络请求可能经境外设施处理。</li></ul><p>公开支持页不加载分析、广告或第三方嵌入脚本，不使用 cookie 或本地存储。访问仍会产生主机与边缘网络层的请求数据；点击小红书或邮件链接后，转到相应服务。</p></section><section id="retention"><h2>6. 保留、删除与试用防重复</h2><p>有效授权期间，需要保留设备绑定、公钥、权益事件和必要安全记录，才能续期、恢复、处理换绑与售后。试用结束后仍需保留最小去重记录（设备去重 HMAC、开始/结束时间与状态），防止同一标识反复领取；卸载应用不会自动删除这些服务器记录。</p><p>最小试用去重记录不会随 14 天试用到期自动删除；在试用服务仍提供、相应防重复限制仍适用期间保留。你可以联系查询、提出更正或删除请求；我们会核验与请求有关的必要信息，说明处理范围、结果以及删除对恢复和去重的影响。授权终止后的其他记录按实际售后与安全需要处理，超过必要保留范围的数据应按实际业务与法定义务清理；你也可以联系确认与你有关的记录及处理方式。不要求你提供支付密码或验证码。</p><p>删除本地工作数据可在应用或设备设置中操作。请求删除服务器记录不等于退款、撤销授权或重新获得试用资格；这些事项需分别核对。备份中的数据会随实际备份轮换处理，恢复时仍需遵守已经执行的删除与撤销结果。</p></section><section><h2>7. 你可以怎样选择</h2><p>不主动领取试用、不激活国内会员，就不会因这两个操作提交相应的设备授权请求。关闭网络会影响授权领取及续期，已有离线授权最长 24 小时，且不超过权益到期时间；这不会删除本地工作记录。设备数据如何用于试用，请在领取前阅读应用中的提示。</p><p>如果功能、服务提供方或处理范围发生变化，我们会更新本页，并在需要你作选择的入口提供相应说明。关于退款，见<a href="/android/refunds">退款与售后</a>。</p></section></div>${contact}`
  }
];

function faq(id, question, answer, open = false) {
  return `<details id="${id}"${open ? ' open' : ''}><summary>${question}</summary><p>${answer}</p></details>`;
}
function render(page) {
  const head = page.landing ? '' : `<div class="page-frame"><header class="hero inner"><p class="eyebrow">DONEAT · 国内 ANDROID 版</p><h1>${page.title}</h1><p class="lede">${page.lede}</p><p class="meta">更新于 ${updated}</p></header></div>`;
  return `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${page.title} · DoneAt</title><meta name="description" content="${page.description}"><meta name="robots" content="noindex,follow"><link rel="canonical" href="${origin}${page.route}"><meta name="theme-color" content="#FBF6EE" media="(prefers-color-scheme: light)"><meta name="theme-color" content="#171318" media="(prefers-color-scheme: dark)"><meta property="og:type" content="website"><meta property="og:locale" content="zh_CN"><meta property="og:title" content="${page.title} · DoneAt"><meta property="og:description" content="${page.description}"><meta property="og:url" content="${origin}${page.route}"><meta property="og:image" content="${origin}/android/assets/og-1200x630.png"><link rel="icon" href="/android/assets/favicon.ico" sizes="any"><link rel="icon" type="image/png" sizes="48x48" href="/android/assets/favicon-48.png"><link rel="apple-touch-icon" href="/android/assets/apple-touch-180.png"><link rel="stylesheet" href="/android/assets/styles.css"></head><body><a class="skip" href="#content">跳到正文</a><header class="header"><div class="page-frame"><div class="inner header-row"><a class="brand" href="/android" aria-label="DoneAt 国内 Android 版">${mark}<span>DoneAt</span><small>国内 Android</small></a><nav class="nav" aria-label="主要导航">${nav.map(([href, text]) => link(href, text, page.route)).join('')}</nav></div></div></header><main id="content">${head}${page.landing ? page.content : `<div class="page-frame body"><div class="inner">${page.content}</div></div>`}</main><footer class="footer"><div class="page-frame"><div class="inner footer-row"><nav aria-label="页脚导航">${link('/android/privacy', '隐私说明', page.route)}${link('/android/refunds', '退款与售后', page.route)}<a href="mailto:hello@doneat.app">联系我们</a></nav><span>© fi_niaR Studio · DoneAt</span></div></div></footer></body></html>\n`;
}

// Brand tokens are read from the existing site's authority, not maintained twice.
const shared = await readFile(path.join(repo, 'src/styles/global.css'), 'utf8');
const theme = shared.match(/@theme\s*\{([\s\S]*?)\n\}/)?.[1];
const root = shared.match(/:root\s*\{([\s\S]*?)\n\}/)?.[1];
const dark = shared.match(/@media \(prefers-color-scheme: dark\)\s*\{\s*:root\s*\{([\s\S]*?)\n  \}\n\}/)?.[1];
if (!theme || !root || !dark) throw new Error('Shared brand token blocks changed; inspect global.css before building.');
const font = `@font-face{font-family:Geist;src:url('/android/assets/GeistVF.woff2') format('woff2');font-weight:100 900;font-style:normal;font-display:swap}`;
const css = `${font}\n:root {${theme}\n${root}}\n@media(prefers-color-scheme:dark){:root{${dark}}}\n${await readFile(path.join(here, 'styles.css'), 'utf8')}`;
await rm(out, { recursive: true, force: true });
await mkdir(path.join(out, 'android/assets'), { recursive: true });
await writeFile(path.join(out, 'android/assets/styles.css'), css);
for (const [source, name] of [
  ['assets/brand/off-work-countdown-mark.svg', 'brand-mark.svg'],
  ['assets/icons/favicon.ico', 'favicon.ico'], ['assets/icons/favicon-48.png', 'favicon-48.png'],
  ['assets/icons/apple-touch-180.png', 'apple-touch-180.png'], ['assets/icons/og-1200x630.png', 'og-1200x630.png'],
  ['public/fonts/GeistVF.woff2', 'GeistVF.woff2'], ['public/licenses/geist-ofl.txt', 'geist-ofl.txt']
]) await cp(path.join(repo, source), path.join(out, 'android/assets', name));
for (const page of pages) {
  const directory = path.join(out, page.route);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), render(page));
}
console.log(`Built ${pages.length} domestic pages in ${out}; no root routes emitted.`);
