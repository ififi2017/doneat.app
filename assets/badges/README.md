# Official store badges

These are Apple’s, Google’s and Microsoft’s artwork, not copies of the product-repo Mac App Store SVGs.

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

## Google Play

Official PNGs from [Google Play badges](https://play.google.com/intl/en_us/badges/):

`https://play.google.com/intl/en_us/badges/static/images/badges/{locale}_badge_web_generic.png`

- One dark artwork for light and dark pages; Google offers no white variant
- Locales ship with different transparent margins, so the script trims only that margin; the artwork is not cropped, resized or recoloured. Keep clear space with layout gaps instead
- Locale map: `hallToGooglePlay` in `locales.json` and `googlePlayBadgeLocale` in `locales/hall.json`
- Link: `https://play.google.com/store/apps/details?id=com.rainif.doneat`. Not shown on the mainland China site, where Google Play is unavailable.
- Google Play and the Google Play logo are trademarks of Google LLC.

## Microsoft Store

Official SVGs from `https://get.microsoft.com/images/{locale}%20{dark|light}.svg`.

The live site may still load Microsoft’s locale-aware badge script. Keep these files as the no-JS / script-failed fallback. Product id: `9PM0HJ2PP2LJ`.
