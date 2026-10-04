# Web delivery recordings

These are delivery encodings of the existing real DoneAt recordings in the parent directory. The original recordings, posters and official device frames remain intact.

Reproduce with `node scripts/prepare-web-video.mjs` from the repository root; this requires ffmpeg. The script exports 720px width, proportional height, 24fps H.264/yuv420p, CRF 23, faststart and no audio.

The four home loops are 159–178 KB (96.4–97.0% smaller than their sources); the two download review clips are 737–795 KB (33.9–34.5% smaller). Exact bytes and ffprobe results are in `review/media-results.json`.

Use timer loops on home and review clips on download. Posters remain visible until playback actually starts. Reduced motion and data saving prevent automatic MP4 source attachment; an explicit Play demos action can opt in.
