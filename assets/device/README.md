# Homepage iPhone stills

PLAN: one portrait off-work countdown, simple bezel, no store headline, no extra Dynamic Island art. English and Simplified Chinese.

| File | What |
| --- | --- |
| `raw/en-iphone-main.png` | Simulator capture, English, working shift at 14:22. |
| `raw/zh-CN-iphone-main.png` | Same scene, Simplified Chinese. |
| `iphone-portrait-en.png` | Cream canvas + thin plum bezel. |
| `iphone-portrait-zh-CN.png` | Same frame, Chinese UI. |

Captured from the installed Debug build on `iPhone 17 Pro Max` with `-ios.native.qaDebugScenario working` (09:00–17:00, virtual clock 14:22). The timer tab does not show the product name.

Re-frame after replacing the raw files:

```bash
node scripts/frame-iphone.mjs
```

Do not check in store compose art from the product repo (`scripts/marketing-shots/ios/out`).
