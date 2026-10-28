// Run after staging the verified APK; existing immutable assets must remain present.
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { loadRelease } from '../release.mjs';
const release = await loadRelease();
const history = JSON.parse(await readFile(new URL('../changelog.json', import.meta.url), 'utf8'));
const entry = history.find(item => item.versionCode === release.versionCode && item.versionName === release.versionName);
assert.ok(entry, 'Published build must have release notes');
assert.ok(entry.releaseNotes.en && entry.releaseNotes['zh-CN']);
assert.ok(Object.keys(entry.releaseNotes).length === 2);
assert.ok(Object.values(entry.releaseNotes).every(note => typeof note === 'string' && note.length <= 3000));
const assets = new URL('./assets/', import.meta.url);
const apk = await readFile(new URL(new URL(release.apkUrl).pathname.slice(1), assets));
assert.equal(apk.length, release.bytes);
assert.equal(createHash('sha256').update(apk).digest('hex'), release.apkSha256);
await writeFile(new URL('android/cn/latest.json', assets), JSON.stringify({
  schemaVersion: 1, applicationId: 'com.rainif.doneat.cn', channel: 'cn',
  versionCode: release.versionCode, versionName: release.versionName, minSdk: 26, releaseNotes: entry.releaseNotes,
}, null, 2) + '\n');
const headers = await readFile(new URL('_headers', assets), 'utf8');
assert.ok(headers.includes('/android/cn/latest.json\n  ! Cache-Control\n  Cache-Control: no-cache, max-age=0, must-revalidate'));
console.log(`Verified APK and prepared update metadata for ${release.versionName} (${release.versionCode}).`);
