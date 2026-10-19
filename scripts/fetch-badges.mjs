#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const map = JSON.parse(readFileSync(join(root, "assets/badges/locales.json"), "utf8"));
const ua =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";

async function download(url, dest, expectedType = "image/svg") {
  const response = await fetch(url, { headers: { "user-agent": ua } });
  const type = response.headers.get("content-type") ?? "";
  if (!response.ok || !type.includes(expectedType)) {
    throw new Error(`${url} -> ${response.status} ${type}`);
  }
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, Buffer.from(await response.arrayBuffer()));
  console.log(`wrote ${dest.slice(root.length + 1)}`);
}

for (const locale of map.apple) {
  for (const theme of ["black", "white"]) {
    const url = `https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/${theme}/${locale}`;
    await download(url, join(root, "assets/badges/app-store", theme, `${locale}.svg`));
  }
}

for (const locale of map.microsoft) {
  for (const theme of ["dark", "light"]) {
    const url = `https://get.microsoft.com/images/${encodeURIComponent(`${locale} ${theme}`)}.svg`;
    await download(url, join(root, "assets/badges/microsoft", `${locale}-${theme}.svg`));
  }
}

// Google publishes the localized badge only as PNG (646×250, one dark artwork).
// Locales disagree on the transparent margin (41px or none), so trim it once
// here; every badge then renders at the same 40px height as the App Store one.
const { default: sharp } = await import("sharp");
for (const locale of map.googlePlay) {
  const url = `https://play.google.com/intl/en_us/badges/static/images/badges/${locale}_badge_web_generic.png`;
  const dest = join(root, "assets/badges/google-play", `${locale}.png`);
  await download(url, dest, "image/png");
  writeFileSync(dest, await sharp(readFileSync(dest)).trim({ threshold: 16 }).png().toBuffer());
}
