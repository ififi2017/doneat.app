# iPhone hero

Portrait timer captures, 1320×2868. No store headline, no extra Dynamic Island art.

The homepage plays the short **inside the official iPhone 17 Pro Max frame**. The PNG is the poster and the fallback when video cannot play.

| Stem | Language | Appearance |
| --- | --- | --- |
| `en-white` | English | Light |
| `en-black` | English | Dark |
| `zh-white` | Simplified Chinese | Light |
| `zh-black` | Simplified Chinese | Dark |

Each stem has `.mp4` (H.264, faststart) and `.png`. Desktop originals were `.mov`; do not ship those.

| Frame | Appearance |
| --- | --- |
| `frames/iphone-17-pro-max-cosmic-orange.png` | Light |
| `frames/iphone-17-pro-max-deep-blue.png` | Dark |

The capture is 1320×2868 and matches the screen hole (insets 75 / 66 / 75 / 66 on the 1470×3000 frame). Put the video and PNG in that hole; stack the frame on top. The frame already has the Dynamic Island — do not draw another one.

Pick language from the hall locale (Chinese halls → `zh`, everyone else → `en`). Pick appearance from `prefers-color-scheme` (`white` / Cosmic Orange for light, `black` / Deep Blue for dark).

- `autoplay muted loop playsinline` — no controls, no sound, no tap-to-start.
- The `<img>` is the fallback when the video cannot play.
- `prefers-reduced-motion: reduce` — hide the video, show only the PNG.
