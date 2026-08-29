# Site assets

Only what the official site needs. Not a dump of the product repo.

| Path | What |
| --- | --- |
| `brand/` | 008 Open Day SVG masters (no Icon Composer layers). |
| `icons/` | Favicon, apple-touch, maskable, and a 1200×630 OG still of mark + DoneAt. |
| `badges/app-store/` | Official “Download on the App Store” SVGs from [Apple Marketing Tools](https://toolbox.marketingtools.apple.com/). Black for light pages, white for dark. |
| `badges/microsoft/` | Official Microsoft Store badge SVGs from `get.microsoft.com/images`. Fallback if the locale widget fails. Runtime can still use the official badge script. |
| `device/` | Homepage timer loops (`en` / `zh` × `white` / `black`) and download-page review clips (`en-review` / `zh-review`). |
| `desktop-demo/` | Windows/macOS download-page clips from `off.rainif.com`. Live download page uses `media/` (main window + mini timer). See that folder's README. |

Do **not** add from the product repo:

- Mac App Store–only badges (`public/badges/download-on-the-mac-app-store-*.svg`)
- Store compose art (`scripts/marketing-shots/**/out`, `p-*.html`)
- The full `translation.json` trees
- Extra copies of `public/demo/` outside `desktop-demo/`
