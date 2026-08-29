# Official store badges

These are Apple’s and Microsoft’s artwork, not copies of the product-repo Mac App Store SVGs.

## App Store

From [Apple Marketing Tools](https://toolbox.marketingtools.apple.com/):

`/api/v2/badges/download-on-the-app-store/{black|white}/{apple-locale}`

- `black/` on cream / light pages
- `white/` on evening / dark pages
- Hindi and Arabic halls fall back to `en-us` (Apple has no badge slug for those languages in this API)
- Link by app id `6802803318`. Storefront follows `locales/hall.json`. Do not hardcode the listing slug.

Refresh:

```bash
node scripts/fetch-badges.mjs
```

## Microsoft Store

Official SVGs from `https://get.microsoft.com/images/{locale}%20{dark|light}.svg`.

The live site may still load Microsoft’s locale-aware badge script. Keep these files as the no-JS / script-failed fallback. Product id: `9PM0HJ2PP2LJ`.
