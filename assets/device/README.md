# iPhone hero

Portrait captures, 1320×2868. No store headline, no extra Dynamic Island art.

The homepage plays the short timer loops (`en` / `zh` × `white` / `black`) inside the official iPhone 17 Pro Max frame. The download page plays the **feature review** (`en-review` / `zh-review`). The PNG is the poster and the fallback when video cannot play.

| Stem | Language | Where |
| --- | --- | --- |
| `en-white` | English, light | Homepage |
| `en-black` | English, dark | Homepage |
| `zh-white` | Simplified Chinese, light | Homepage |
| `zh-black` | Simplified Chinese, dark | Homepage |
| `en-review` | English | Download page |
| `zh-review` | Simplified Chinese | Download page |

Each stem has `.mp4` (H.264, faststart) and `.png`. Desktop originals were `.mov`; do not ship those.

The review clips were re-recorded on iOS 3.2.0 (2026-09-25). The device recordings are 1284×2778, so they are scaled to 2868 high and 3 px are cropped from each side to reach 1320×2868 without stretching:

```bash
ffmpeg -i EN_Review.mov -an -vf "scale=1326:2868:flags=lanczos,crop=1320:2868:3:0,format=yuv420p" \
  -c:v libx264 -preset slow -crf 26 -profile:v high -movflags +faststart en-review.mp4
ffmpeg -ss 0.5 -i EN_Review.mov -frames:v 1 -vf "scale=1326:2868:flags=lanczos,crop=1320:2868:3:0" en-review.png
```

| Frame | Appearance |
| --- | --- |
| `frames/iphone-17-pro-max-cosmic-orange.png` | Light |
| `frames/iphone-17-pro-max-deep-blue.png` | Dark |

Those frames are Apple Design Resources. License: [`frames/Apple Design Resources License.rtf`](frames/Apple%20Design%20Resources%20License.rtf). Do not treat them as original DoneAt artwork.

The capture is 1320×2868 and matches the screen hole (insets 75 / 66 / 75 / 66 on the 1470×3000 frame). Put the video and PNG in that hole; stack the frame on top. The frame already has the Dynamic Island — do not draw another one.

Pick language from the hall locale (Chinese halls → `zh`, everyone else → `en`). Pick appearance from `prefers-color-scheme` (`white` / Cosmic Orange for light, `black` / Deep Blue for dark).

- `autoplay muted loop playsinline` — no controls, no sound, no tap-to-start.
- The `<img>` is the fallback when the video cannot play.
- `prefers-reduced-motion: reduce` — hide the video, show only the PNG.
