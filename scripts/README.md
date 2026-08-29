# Maintainer scripts

Run from the repo root. `prepare-images.mjs` and `frame-iphone.mjs` currently import `sharp` from the sibling product checkout `../Off-Work-Countdown/node_modules/sharp`.

| Script | What |
| --- | --- |
| `fetch-badges.mjs` | Re-download Apple and Microsoft official badge SVGs. |
| `prepare-images.mjs` | Favicon, apple-touch, and OG still from the brand SVGs. |
| `frame-iphone.mjs` | Cream canvas + simple bezel around `assets/device/raw`. |
