# Site assets

Only what the official site needs. Not a dump of the product repo.

| Path | What |
| --- | --- |
| `brand/` | 008 Open Day SVG masters (no Icon Composer layers). |
| `icons/` | Favicon, apple-touch, maskable, and a 1200×630 OG still of mark + DoneAt. |
| `badges/app-store/` | Official “Download on the App Store” SVGs from [Apple Marketing Tools](https://toolbox.marketingtools.apple.com/). Black for light pages, white for dark. |
| `badges/microsoft/` | Official Microsoft Store badge SVGs from `get.microsoft.com/images`. Fallback if the locale widget fails. Runtime can still use the official badge script. |
| `device/` | Homepage phone: `en` / `zh` × `white` / `black` `.mp4`, PNG poster and fallback. |

Do **not** add from the product repo:

- Mac App Store–only badges (`public/badges/download-on-the-mac-app-store-*.svg`)
- Store compose art (`scripts/marketing-shots/**/out`, `p-*.html`)
- Desktop window / mini-timer / demo video (`public/demo/`)
- The full `translation.json` trees
