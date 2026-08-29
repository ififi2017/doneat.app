# iPhone hero

Portrait timer captures, 1320×2868. No store headline, no extra Dynamic Island art.

The homepage (and any other phone slot) **plays the short**. The PNG is the poster and the fallback.

| Stem | Language | Appearance |
| --- | --- | --- |
| `en-white` | English | Light |
| `en-black` | English | Dark |
| `zh-white` | Simplified Chinese | Light |
| `zh-black` | Simplified Chinese | Dark |

Each stem has `.mp4` (H.264, faststart) and `.png`. Desktop originals were `.mov`; do not ship those.

Pick language from the hall locale (Chinese halls → `zh`, everyone else → `en`). Pick appearance from `prefers-color-scheme` (`white` light, `black` dark).

```html
<video
  autoplay
  muted
  loop
  playsinline
  poster="/device/en-white.png"
  width="1320"
  height="2868"
>
  <source src="/device/en-white.mp4" type="video/mp4" />
</video>
<img src="/device/en-white.png" width="1320" height="2868" alt="" />
```

- `autoplay muted loop playsinline` — no controls, no sound, no tap-to-start.
- The `<img>` is the fallback when the video cannot play.
- `prefers-reduced-motion: reduce` — hide the video, show only the PNG.
- Do not add a second bezel or Dynamic Island overlay.
