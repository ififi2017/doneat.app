// Preserve the original recordings; generate smaller web delivery versions.
import { execFileSync } from "node:child_process";
import { mkdirSync, statSync } from "node:fs";
// iPhone stems read assets/device/<stem>.mp4; Android stems read
// assets/device/android/<stem>.mp4 and write web/android-<stem>.mp4.
// Pass stems as arguments to re-encode only those (e.g. android-en-white).
const allStems = [
  "en-white",
  "en-black",
  "zh-white",
  "zh-black",
  "en-review",
  "zh-review",
  "android-en-white",
  "android-en-black",
  "android-zh-white",
  "android-zh-black",
];
const stems = process.argv.length > 2 ? process.argv.slice(2) : allStems;
mkdirSync("assets/device/web", { recursive: true });
for (const stem of stems) {
  const source = stem.startsWith("android-")
      ? `assets/device/android/${stem.slice("android-".length)}.mp4`
      : `assets/device/${stem}.mp4`,
    target = `assets/device/web/${stem}.mp4`;
  execFileSync("ffmpeg", [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-i",
    source,
    "-vf",
    "scale=720:-2,fps=24",
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "23",
    "-pix_fmt",
    "yuv420p",
    "-an",
    "-movflags",
    "+faststart",
    target,
  ]);
  console.log(
    `${stem}: ${statSync(source).size} → ${statSync(target).size} bytes`,
  );
}
