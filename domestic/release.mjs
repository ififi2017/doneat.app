import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

export async function loadRelease() {
  const release = JSON.parse(await readFile(new URL('./release.json', import.meta.url), 'utf8'));
  return validateRelease(release);
}

export function validateRelease(release) {
  assert.match(release.versionName, /^\d+\.\d+\.\d+$/);
  assert.ok(Number.isSafeInteger(release.versionCode) && release.versionCode > 0);
  assert.ok(Number.isSafeInteger(release.bytes) && release.bytes > 0);
  assert.match(release.apkSha256, /^[a-f0-9]{64}$/);
  assert.match(release.certificateSha256, /^[a-f0-9]{64}$/);
  assert.match(release.sourceCommit, /^[a-f0-9]{40}$/);
  assert.match(release.publishedAt, /^\d{4}-\d{2}-\d{2}$/);
  const apk = new URL(release.apkUrl);
  assert.equal(apk.origin, 'https://downloads.doneat.app');
  assert.ok(!apk.search && !apk.hash && apk.pathname.endsWith('.apk'));
  assert.ok(apk.pathname.includes(release.versionName) && apk.pathname.includes(String(release.versionCode)), 'APK URL must identify the version/build');
  assert.ok(apk.pathname.includes(release.apkSha256.slice(0, 12)), 'APK URL must include a content hash');
  const source = new URL(release.sourceUrl);
  assert.equal(source.origin, 'https://github.com');
  assert.ok(!source.search && !source.hash);
  assert.ok(source.pathname === `/ififi2017/Off-Work-Countdown/tree/${release.sourceCommit}` || source.pathname === `/ififi2017/Off-Work-Countdown/archive/${release.sourceCommit}.tar.gz` || source.pathname === `/ififi2017/Off-Work-Countdown/archive/${release.sourceCommit}.zip`, 'Source URL must name the immutable covered-source commit');
  return release;
}
