// Preserve the original recordings; generate smaller web delivery versions.
import { execFileSync } from "node:child_process";
import { mkdirSync, statSync } from "node:fs";
const stems = [
  "en-white",
  "en-black",
  "zh-white",
  "zh-black",
  "en-review",
  "zh-review",
];
mkdirSync("assets/device/web", { recursive: true });
for (const stem of stems) {
  const source = `assets/device/${stem}.mp4`,
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
