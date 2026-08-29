#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const map = JSON.parse(readFileSync(join(root, "assets/badges/locales.json"), "utf8"));
const ua =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";

async function download(url, dest) {
  const response = await fetch(url, { headers: { "user-agent": ua } });
  const type = response.headers.get("content-type") ?? "";
  if (!response.ok || !type.includes("image/svg")) {
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
