#!/usr/bin/env python3
"""Generate provisioned Grafana dashboard; no credentials embedded."""
import json
from pathlib import Path
DS={'type':'prometheus','uid':'bfpzceehv9q80f'}
panels=[]
def panel(title, expr, x, y, w=6, h=4, kind='stat', unit='short', legend=None, description=''):
    p={'id':len(panels)+1,'title':title,'type':kind,'gridPos':{'x':x,'y':y,'w':w,'h':h},'datasource':DS,'description':description,
       'targets':[{'refId':'A','expr':expr,'instant':kind!='timeseries','range':kind=='timeseries','legendFormat':legend or '{{event}}','datasource':DS}],
       'fieldConfig':{'defaults':{'unit':unit,'color':{'mode':'palette-classic'},'thresholds':{'mode':'absolute','steps':[{'color':'green','value':None}]}},'overrides':[]},
       'options':{'reduceOptions':{'calcs':['lastNotNull'],'fields':'','values':False},'colorMode':'value','graphMode':'none','textMode':'auto','orientation':'auto'}}
    if kind=='timeseries': p['options']={'legend':{'displayMode':'table','placement':'bottom','calcs':['lastNotNull','max']},'tooltip':{'mode':'multi'}}
    if kind=='bargauge': p['options'].update({'orientation':'horizontal','displayMode':'gradient','showUnfilled':True})
    panels.append(p)
    return p

def text(title, content, y, h=3):
    panels.append({'id':len(panels)+1,'title':title,'type':'text','gridPos':{'x':0,'y':y,'w':24,'h':h},'options':{'mode':'markdown','content':content}})

text('统计口径', '**国内官网 · doneat.com.cn**　[官网](https://doneat.com.cn/zh-CN) · [Android 下载](https://doneat.com.cn/android) · [服务运行](https://shanghai.rainif.com/d/doneat-service-runtime)\n\n上半区为 **Nginx 回源请求**，包括机器人，**不包含 EdgeOne 缓存命中**；下半区为浏览器匿名事件，不统计 UV 或用户身份。概览使用顶部「汇总天数」（北京时间，含今天）；趋势使用右上角时间范围。日志历史仅覆盖当前保留文件，埋点从上线后开始。下载点击不代表下载完成，购买点击不代表付款。',0,4)
sel='days="$days"'
base='doneat_cn_web_origin_requests_window{'+sel+'}'
panel('回源请求 · 汇总', 'sum('+base+')',0,4)
panel('正式页面 · 回源请求','sum(doneat_cn_web_origin_requests_window{'+sel+',category="page",status="2xx"})',6,4)
panel('疑似扫描 · 路径特征','sum(doneat_cn_web_origin_requests_window{'+sel+',category="suspected_scan"})',12,4,description='仅按固定扫描路径特征分类，可能误判；不等同全部攻击量。')
panel('服务端错误 · 5xx','sum(doneat_cn_web_origin_requests_window{'+sel+',status="5xx"})',18,4)
panel('回源请求趋势 · 5 分钟均值','sum by(status)(doneat_cn_web_origin_requests_5m) / 300',0,8,12,8,'timeseries','reqps','{{status}}')
panel('回源类别 · 5 分钟均值','sum by(category)(doneat_cn_web_origin_requests_5m) / 300',12,8,12,8,'timeseries','reqps','{{category}}')
panel('回源响应流量 · 5 分钟均值','doneat_cn_web_origin_bytes_5m / 300',0,16,12,7,'timeseries','Bps','源站响应字节')
panel('回源状态码 · 汇总','sum by(status)('+base+')',12,16,12,7,'bargauge',legend='{{status}}')
text('匿名浏览与下载', '仅保存「日期、固定事件名、次数」，不使用 Cookie、访客 ID，不保存 IP / UA / 来源网址 / 查询参数。遵循 DNT / GPC。开放计数接口可能被伪造，数据用于趋势参考，不作为订单或财务记录。',23,3)
def ev(regex): return 'sum(doneat_cn_web_events_window{'+sel+',event=~"'+regex+'"})'
panel('页面浏览事件',ev('.*_view'),0,26)
panel('Android 下载页浏览',ev('android_view'),6,26)
panel('APK 下载点击',ev('apk_download_open'),12,26)
panel('购买入口点击',ev('buy_page_open'),18,26)
panel('页面浏览 · 分类','doneat_cn_web_events_window{'+sel+',event=~".*_view"}',0,30,12,9,'bargauge',legend='{{event}}')
panel('下载 / 商店 / 联系 · 点击','doneat_cn_web_events_window{'+sel+',event=~".*_open"}',12,30,12,9,'bargauge',legend='{{event}}')
# Mapping avoids changing stable metric keys for display.
names={'hall_view':'首页','download_view':'客户端下载页','android_view':'Android 下载页','android_buy_view':'购买页','android_faq_view':'Android 常见问题','android_privacy_view':'Android 隐私','android_refunds_view':'退款流程','faq_view':'常见问题','about_view':'关于','privacy_view':'隐私','how_it_works_view':'怎么算的','apk_download_open':'APK 下载','buy_page_open':'购买入口','contact_xhs_open':'小红书联系','contact_email_open':'邮件联系','android_page_open':'Android 下载页入口','app_store_open':'App Store','microsoft_store_open':'Microsoft Store','web_timer_open':'网页版','download_page_open':'客户端下载入口','github_source_open':'GitHub 源码','github_releases_open':'GitHub Releases','chrome_extension_open':'Chrome 扩展'}
for p in panels:
    if p.get('type')=='bargauge' and 'event=' in p['targets'][0]['expr']:
        p['fieldConfig']['overrides']=[{'matcher':{'id':'byName','options':k},'properties':[{'id':'displayName','value':v}]} for k,v in names.items()]
panel('采集距今','time() - doneat_cn_web_export_timestamp_seconds',0,39,8,4,unit='s')
panel('日志最早记录','doneat_cn_web_oldest_log_timestamp_seconds * 1000',8,39,8,4,unit='dateTimeAsIso')
panel('采集节点在线','up{instance="AliYun CD",job="node_exporter_remote"}',16,39,8,4)
panels[-3]['fieldConfig']['defaults']['thresholds']['steps']=[{'color':'green','value':None},{'color':'red','value':180}]
text('数据维护', 'Nginx 日志以服务器现有轮转为准；匿名事件在成都自建 SQLite 保存 90 天，Prometheus 历史按现有 30 天保留。两者不包含会员、激活码、工作记录或薪资。指标每分钟刷新，Lark 告警保持原有配置。',43,3)
# Backfilled daily history from retained logs; absent days are not invented.
for item in panels:
    if item['gridPos']['y'] >= 23: item['gridPos']['y'] += 8
p = panel('每日回源请求 · 现存日志', 'doneat_cn_web_origin_requests_day', 0, 23, 24, 8, 'table')
p['targets'][0]['format'] = 'table'
p['options'] = {'showHeader': True, 'sortBy': [{'displayName': '日期（北京时间）', 'desc': True}]}
p['transformations'] = [{'id':'organize','options':{'excludeByName':{'Time':True,'__name__':True,'instance':True,'job':True},'renameByName':{'date':'日期（北京时间）','Value':'回源请求数'}}}]
dashboard={'uid':'doneat-cn-web','title':'DoneAt 国内官网 · 访问与下载','tags':['DoneAt','China','Website'],'timezone':'Asia/Shanghai','schemaVersion':39,'version':1,'editable':False,'refresh':'1m','time':{'from':'now-24h','to':'now'},'panels':panels,'templating':{'list':[{'name':'days','label':'汇总天数','type':'custom','query':'1,7,14,30','current':{'text':'7','value':'7'},'options':[{'text':str(v),'value':str(v),'selected':v==7} for v in [1,7,14,30]],'includeAll':False,'multi':False}]}}
Path(__file__).with_name('dashboard.json').write_text(json.dumps(dashboard,ensure_ascii=False,indent=2)+'\n')
