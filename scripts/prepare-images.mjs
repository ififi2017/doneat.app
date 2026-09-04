#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("/Users/zhengyuxuan/Off-Work-Countdown/node_modules/sharp");

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const brand = join(root, "assets/brand");
const icons = join(root, "assets/icons");
const cream = "#FFF1D8";
const plum = "#2B1935";

function pngsToIco(frames) {
  const count = frames.length;
  const header = 6 + 16 * count;
  let offset = header;
  const buf = Buffer.alloc(
    header + frames.reduce((sum, frame) => sum + frame.png.length, 0),
  );
  buf.writeUInt16LE(0, 0);
  buf.writeUInt16LE(1, 2);
  buf.writeUInt16LE(count, 4);
  let entry = 6;
  for (const { size, png } of frames) {
    buf.writeUInt8(size >= 256 ? 0 : size, entry);
    buf.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    buf.writeUInt8(0, entry + 2);
    buf.writeUInt8(0, entry + 3);
    buf.writeUInt16LE(1, entry + 4);
    buf.writeUInt16LE(32, entry + 6);
    buf.writeUInt32LE(png.length, entry + 8);
    buf.writeUInt32LE(offset, entry + 12);
    png.copy(buf, offset);
    offset += png.length;
    entry += 16;
  }
  return buf;
}

await sharp(join(brand, "off-work-countdown-icon-rounded.svg"))
  .resize(180, 180)
  .png()
  .toFile(join(icons, "apple-touch-180.png"));

await sharp(join(brand, "off-work-countdown-mark.svg"))
  .resize(32, 32)
  .png()
  .toFile(join(icons, "favicon-32.png"));

const icoFrames = [];
for (const size of [16, 32, 48]) {
  const png = await sharp(join(brand, "off-work-countdown-icon-rounded.svg"))
    .resize(size, size)
    .png()
    .toBuffer();
  icoFrames.push({ size, png });
  if (size === 48) writeFileSync(join(icons, "favicon-48.png"), png);
}
writeFileSync(join(icons, "favicon.ico"), pngsToIco(icoFrames));

const markSvg = readFileSync(join(brand, "off-work-countdown-mark.svg"), "utf8")
  .replace(/<\?xml[^>]*>/, "")
  .replace(/<svg[^>]*>/, "")
  .replace(/<\/svg>/, "")
  .replace(/<title[\s\S]*?<\/title>/, "")
  .replace(/<desc[\s\S]*?<\/desc>/, "");

const og = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${cream}"/>
  <g transform="translate(168,123) scale(0.375)">
    ${markSvg}
  </g>
  <text x="612" y="318" fill="${plum}" font-family="SF Pro Display, Helvetica Neue, Arial, sans-serif" font-size="86" font-weight="700">DoneAt</text>
  <text x="612" y="382" fill="${plum}" font-family="SF Pro Text, Helvetica Neue, Arial, sans-serif" font-size="28" opacity="0.72">Know when your time is yours</text>
</svg>`;

writeFileSync(join(icons, "og-1200x630.svg"), og);
await sharp(Buffer.from(og)).png().toFile(join(icons, "og-1200x630.png"));
console.log("wrote favicon, apple-touch, OG");
