#!/usr/bin/env node
import { basename, dirname, join } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("/Users/zhengyuxuan/Off-Work-Countdown/node_modules/sharp");

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cream = { r: 255, g: 241, b: 216, alpha: 1 };
const bezel = { r: 29, g: 19, b: 41, alpha: 1 };

const jobs = [
  ["en-iphone-main.png", "iphone-portrait-en.png"],
  ["zh-CN-iphone-main.png", "iphone-portrait-zh-CN.png"],
];

for (const [rawName, outName] of jobs) {
  const rawPath = join(root, "assets/device/raw", rawName);
  const raw = sharp(rawPath);
  const { width, height } = await raw.metadata();
  if (!width || !height) throw new Error(`Cannot read ${rawPath}`);

  const screenRadius = Math.round(width * 0.12);
  const bezelPad = Math.round(width * 0.028);
  const framedWidth = width + bezelPad * 2;
  const framedHeight = height + bezelPad * 2;
  const canvasPadX = Math.round(framedWidth * 0.14);
  const canvasPadY = Math.round(framedHeight * 0.08);
  const canvasWidth = framedWidth + canvasPadX * 2;
  const canvasHeight = framedHeight + canvasPadY * 2;

  const screen = await sharp(rawPath)
    .composite([
      {
        input: Buffer.from(
          `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
            <rect width="${width}" height="${height}" rx="${screenRadius}" ry="${screenRadius}" fill="#fff"/>
          </svg>`
        ),
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();

  const frame = await sharp({
    create: { width: framedWidth, height: framedHeight, channels: 4, background: bezel },
  })
    .composite([
      {
        input: Buffer.from(
          `<svg xmlns="http://www.w3.org/2000/svg" width="${framedWidth}" height="${framedHeight}">
            <rect width="${framedWidth}" height="${framedHeight}" rx="${screenRadius + bezelPad}" ry="${screenRadius + bezelPad}" fill="#1D1329"/>
          </svg>`
        ),
        blend: "dest-in",
      },
      { input: screen, left: bezelPad, top: bezelPad },
    ])
    .png()
    .toBuffer();

  const shadow = await sharp({
    create: {
      width: framedWidth + 48,
      height: framedHeight + 48,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: await sharp(frame)
          .ensureAlpha()
          .tint({ r: 43, g: 25, b: 53 })
          .toBuffer(),
        left: 24,
        top: 28,
      },
    ])
    .blur(18)
    .png()
    .toBuffer();

  await sharp({
    create: { width: canvasWidth, height: canvasHeight, channels: 4, background: cream },
  })
    .composite([
      { input: shadow, left: canvasPadX - 24, top: canvasPadY - 20 },
      { input: frame, left: canvasPadX, top: canvasPadY },
    ])
    .png()
    .toFile(join(root, "assets/device", outName));

  console.log(`framed ${basename(outName)} ${canvasWidth}×${canvasHeight}`);
}
