import { siteConfig } from "../lib/config";
export function GET() {
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${siteConfig.officialSiteUrl}/sitemap-index.xml\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
