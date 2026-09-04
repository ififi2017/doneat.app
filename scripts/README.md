# Maintainer scripts

Run from the repo root. `prepare-images.mjs` currently imports `sharp` from the sibling product checkout `../Off-Work-Countdown/node_modules/sharp`.

| Script | What |
| --- | --- |
| `fetch-badges.mjs` | Re-download Apple and Microsoft official badge SVGs. |
| `prepare-images.mjs` | Favicon PNG / ICO, apple-touch, and OG still from the brand SVGs. Search engines need `/favicon.ico` and a PNG ≥48px; they ignore SVG. |
