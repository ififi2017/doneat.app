# Desktop demo archive

Staged from the old `off.rainif.com/{en,zh-CN}/download` page on 2026-08-29.

`media/` is copied to `public/desktop-demo/` at config load and shown on
`/{en|zh-CN}/download` (main window + mini timer). Window chrome may still
show the old product name. Do not bring back GitHub sidecar install buttons.

The old `copy/*.json` table is **web vs desktop**. The live page compares
**phone / iPad vs computer** instead; see `src/lib/download-showcase.ts`.

| Path | What |
| --- | --- |
| `media/` | Main window and mini-timer MP4s (en / zh × light / dark), JPEG posters, and Mac desktop widget stills |
| `copy/en.json` | English heading, three benefit cards, comparison table, and demo captions |
| `copy/zh-CN.json` | Same block in Simplified Chinese |

Old page order, for whoever wires this later:

1. Two looping videos — main window, then mini timer / woodfish
2. Three benefit cards
3. Web vs desktop comparison table
4. Store / installer row (do **not** bring GitHub sidecar buttons back onto the official site)
