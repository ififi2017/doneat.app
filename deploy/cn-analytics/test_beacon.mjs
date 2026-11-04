import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source = readFileSync(new URL('../../src/components/ChinaBeacon.astro', import.meta.url), 'utf8').match(/<script[^>]*>([\s\S]*?)<\/script>/)[1];
function setup(overrides = {}) {
  const sent = []; let click;
  class Element { constructor(href, track) { this.href = href; this.track = track; } closest() { return this; } getAttribute() { return this.track; } }
  vm.runInNewContext(source, { Element, URL, location: { pathname:'/android/', href:'https://doneat.com.cn/android?secret=never-send', origin:'https://doneat.com.cn' }, navigator: { sendBeacon:(url,event)=>sent.push([url,event]), ...overrides }, document:{addEventListener:(_,fn)=>click=fn} });
  return {sent, click:(href,track)=>click({target:new Element(href,track)})};
}
const test = setup();
assert.deepEqual(test.sent, [['/api/cn-events','android_view']]);
test.click('https://downloads.doneat.app/android/cn/x.apk?secret=never-send');
test.click('https://doneat.com.cn/android/buy');
test.click('https://untrusted.example', 'private-event');
assert.deepEqual(test.sent.map(x=>x[1]), ['android_view','apk_download_open','buy_page_open']);
assert.deepEqual(setup({doNotTrack:'1'}).sent, []);
assert.deepEqual(setup({globalPrivacyControl:true}).sent, []);
console.log('PASS: fixed events, no URL/query payload, download/purchase clicks, DNT/GPC');
