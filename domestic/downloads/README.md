# Cloudflare APK distribution

2026-10-28: account R2 is not activated (API10042). The approved Cloudflare distribution uses **Workers Static Assets**, with no application Worker logic or R2 purchase. APK3.2.1(5) is5744285bytes, below the25MiB per-file limit. Official limits/pricing: https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/ . If future artifacts exceed this limit, select/enable appropriate object storage before uploading.

Service: `doneat-downloads`, custom domain `downloads.doneat.app`. No admin/API bindings. Workers.dev and preview URLs disabled. Current deployment version `62deeeb1-d6a4-413f-9068-aba4517b772c`.

Assets are ignored in Git. Retain every distributed immutable version when preparing future deployments: Workers deployments describe the whole asset tree, so deploying only a new version would remove old public paths. Never overwrite an existing version/hash path with different bytes. Original APK and release metadata are archived in the product workspace under `build/android-cn-production-20261027/`.

Current public prefix:
`/android/cn/3.2.1-5/d10a832cece3a/`

Files: `doneat-cn-3.2.1-5.apk`, `release.json`, `SHA256SUMS.txt`.

`assets/_headers` sets nosniff/noindex/no-referrer, one-year immutable cache, and exact APK MIME plus attachment filename for APK only. No authentication, secrets, user records, mappings or backup objects are uploaded. Source is publicly retained at the fixed GitHub commit linked by `../release.json`.

Deploy from the site root using a pinned existing Wrangler installation:
`wrangler deploy --config domestic/downloads/wrangler.jsonc`

Verify the public body hash, signature, MIME and attachment filename after deployment, and verify404 for unknown paths. Record the deployment version. Static serving currently returns200/full body for Range requests: resumable downloads are **not** claimed. The current file is about5.5MiB. Default curl/Python user agents can be blocked by the existing zone security policy; an honest `DoneAt-Release-Verification/1.0` client and an Android Chrome user agent downloaded successfully from Chengdu, without changing any zone security rules.

Do not remove old source tags/commits or mark the Android release as the latest desktop release. Restore the website's prior symlinks if rollback is needed; keep already-distributed artifacts/source obtainable.

## Manual Android update checks

`/android/cn/latest.json` is public metadata (schemaVersion/applicationId/channel/versionCode/versionName/minSdk). It uses `no-cache, max-age=0, must-revalidate`, overriding the immutable APK cache. From build 7, the client requests it on foreground launch/resume at most once per 24 hours, or when the user manually checks for updates, compares versionCode locally, rejects other packages/channels/redirects/oversized or malformed responses, and opens the fixed official download page only after confirmation. It never sends installation or membership data and never downloads or installs in the background.

Stage a verified APK under its new immutable version/hash path, update `domestic/release.json`, then run `node domestic/downloads/prepare-update.mjs` before Wrangler deployment. The script checks APK size and SHA-256 before updating the public pointer. Keep all previous APK assets. Never put a candidate's version in the feed before its public download and source record are ready.

2026-10-28 update: build 6 (5,782,546 bytes) uses immutable prefix `/android/cn/3.2.1-6/5f6455f5ce44/`; source commit `2794ec9d9958b8f06c9e35e42eeaf4d4ee9cd5de`. Cloudflare deployment `99488b95-e116-4342-a039-553b0db696c7` retains build 5 and adds the uncached version feed.

Build 7 adds bounded plain-text English/Simplified Chinese release notes from `domestic/changelog.json`. Automatic checks fail silently, never run a background worker, and remind about the same version at most once per seven days. Their local throttle state is excluded from backup.

Build 7 deployment: `a07edf75-127c-4515-b3cc-d6df3200c8b3`; immutable prefix `/android/cn/3.2.1-7/37e480aa222a/`. Builds 5 and 6 retained. Corresponding source: `6c87cb6fe377e65b1764e4793bf9a30f7ccd3138`.
