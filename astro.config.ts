import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { cpSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CONTENT_PAGES, HALL_LOCALES, isContentLocale, siteConfig } from "./src/lib/config";

const root = dirname(fileURLToPath(import.meta.url));

function syncPublicAssets() {
  const copies: Array<[string, string]> = [
    ["assets/device", "public/device"],
    ["assets/badges", "public/badges"],
    ["assets/brand", "public/brand"],
    ["assets/icons", "public/icons"],
  ];
  for (const [from, to] of copies) {
    const dest = join(root, to);
    mkdirSync(dest, { recursive: true });
    cpSync(join(root, from), dest, {
      recursive: true,
      filter: (source) =>
        !source.endsWith(".md") && !source.endsWith(".rtf"),
    });
  }
  mkdirSync(join(root, "public"), { recursive: true });
  cpSync(
    join(root, "assets/brand/off-work-countdown-mark.svg"),
    join(root, "public/favicon.svg"),
  );
}

syncPublicAssets();

export default defineConfig({
  site: siteConfig.officialSiteUrl,
  output: "static",
  trailingSlash: "never",
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: Object.fromEntries(HALL_LOCALES.map((locale) => [locale, locale])),
      },
      filter: (page) => {
        const url = new URL(page);
        const segments = url.pathname.split("/").filter(Boolean);
        if (segments.length === 0) return false;
        if (segments[0] === "404") return false;
        if (segments.length === 1 && (CONTENT_PAGES as readonly string[]).includes(segments[0])) {
          return false;
        }
        if (
          segments.length === 2 &&
          (CONTENT_PAGES as readonly string[]).includes(segments[1]) &&
          !isContentLocale(segments[0])
        ) {
          return false;
        }
        return true;
      },
    }),
  ],
  i18n: {
    defaultLocale: "en",
    locales: [...HALL_LOCALES],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
