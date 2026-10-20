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

# Android timer loop

The homepage shows the Android phone beside the iPhone, both counting down. The visitor's own platform comes first (`html[data-platform]`, read in the browser only).

| File | Language, appearance |
| --- | --- |
| `android/en-white.{mp4,png}` | English, light |
| `android/en-black.{mp4,png}` | English, dark |
| `android/zh-white.{mp4,png}` | Simplified Chinese, light |
| `android/zh-black.{mp4,png}` | Simplified Chinese, dark |
| `web/android-*.mp4` | Web encodes (`node scripts/prepare-web-video.mjs android-en-white …`) |

Recorded 2026-10-20 on a Pixel 10 Pro (Android 3.2.3) with `adb shell screenrecord`, using only the isolated Debug install `com.rainif.doneat.shots` from the product repo's `scripts/marketing-shots/android` (synthetic demo history, timer scene seeded 09:00–18:00, in-app theme light or dark, per-app locale, System UI demo mode and Do Not Disturb during the take, all restored afterwards). The Play-installed app and its data were not touched.

Each take is 1280×2856. The phone's own status-bar icons between the clock and the battery are masked with that row's background colour, as the product repo's Play composer does; app content is unchanged:

```bash
ffmpeg -ss 1 -t 14 -i en-white.raw.mp4 -an \
  -vf "drawbox=x=215:y=0:w=890:h=150:color=0xf3f3f7:t=fill,fps=30,format=yuv420p" \
  -c:v libx264 -preset slow -crf 24 -profile:v high -movflags +faststart android/en-white.mp4
ffmpeg -ss 0.5 -i android/en-white.mp4 -frames:v 1 android/en-white.png
```

Dark takes use `color=0x000000`. For stills, `scripts/mask-android-status.mjs` applies the same mask to a PNG.

The frame is `frames/pixel-10-pro.png` (1410×2968): Google's Pixel 10 Pro device art, `back.webp` with `mask.webp` composited at (59, 60), unchanged otherwise. The 1280×2856 capture fills the screen opening at (59, 60) with the emulator's 99 px corner radius.

- Source: [Android Studio device art, `pixel_10_pro/`](https://android.googlesource.com/platform/tools/adt/idea/+/refs/heads/mirror-goog-studio-main/artwork/resources/device-art-resources/pixel_10_pro/) (the same files ship in the Android SDK under `skins/pixel_10_pro`). SHA-256: `back.webp` e21487b8a953f84c685478f609747bb8c3c51350451d1152594746fe41aa7903, `mask.webp` b47546422e36fa002dc174dc204cd166eef9d5c2b6b79fcd5fbedfcf0121c31f.
- Google's [Device Art Generator](https://developer.android.com/distribute/marketing-tools/device-art-generator) offers this artwork for framing app screenshots "on your website or in other promotional materials". Site content is licensed under [Creative Commons Attribution 2.5](https://developer.android.com/license); the attribution sentence is at the end of each About page's open-source section. Google's trademarks are not licensed by it, and Google asks not to use framed screenshots in Play listings.
- Do not redraw or recolour the frame. Do not treat it as original DoneAt artwork.
