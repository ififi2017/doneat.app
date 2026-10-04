import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { cpSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CONTENT_PAGES, HALL_LOCALES, hasPublishedContent, isContentPage, siteConfig } from "./src/lib/config";
import { sitemapLinksForUrl } from "./src/lib/hreflang";
import { PUBLISHED_BY_PAGE } from "./src/lib/published-content";

const root = dirname(fileURLToPath(import.meta.url));

/** Edge middleware cannot read the content directory, so the published list is data. Fail the build if that data drifts from the files. */
function assertPublishedContentMatchesDisk() {
  const dir = join(root, "src/content/pages");
  for (const page of Object.keys(PUBLISHED_BY_PAGE)) {
    const onDisk = readdirSync(dir)
      .filter((locale) => existsSync(join(dir, locale, `${page}.md`)))
      .sort();
    const declared = [...PUBLISHED_BY_PAGE[page as keyof typeof PUBLISHED_BY_PAGE]].sort();
    if (onDisk.join("\n") !== declared.join("\n")) {
      throw new Error(
        `src/lib/published-content.ts is out of date for "${page}".\nOn disk: ${onDisk.join(", ")}\nDeclared: ${declared.join(", ")}`,
      );
    }
  }
}

assertPublishedContentMatchesDisk();

function syncPublicAssets() {
  const copies: Array<[string, string]> = [
    ["assets/device", "public/device"],
    ["assets/desktop-demo/media", "public/desktop-demo"],
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
  cpSync(
    join(root, "assets/icons/favicon.ico"),
    join(root, "public/favicon.ico"),
  );
}

syncPublicAssets();

export default defineConfig({
  site: siteConfig.officialSiteUrl,
  output: "static",
  trailingSlash: "never",
  redirects: {
    "/sitemap.xml": {
      status: 301,
      destination: "/sitemap-index.xml",
    },
  },
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
          isContentPage(segments[1]) &&
          !hasPublishedContent(segments[0], segments[1])
        ) {
          return false;
        }
        return true;
      },
      serialize(item) {
        const links = sitemapLinksForUrl(item.url);
        if (links) item.links = links;
        return item;
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
