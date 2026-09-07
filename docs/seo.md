# SEO

Official site: [https://doneat.app](https://doneat.app). This repo is Astro + Vercel. The interactive timer stays on [https://off.rainif.com](https://off.rainif.com) (Next.js, product repo).

Do not invent Search Console numbers, rankings, or traffic. Do not open `Google-Extended` / `GPTBot` / other AI-training crawlers unless product explicitly asks; Cloudflare managed robots currently disallow them.

## Search Console (human)

1. Verify the `doneat.app` property (URL-prefix or Domain).
2. Submit **only** `https://doneat.app/sitemap-index.xml`. Do **not** submit `https://doneat.app/sitemap.xml` (that path 301s to the index so a mistaken submit still works).
3. Decide separately whether to verify `off.rainif.com`. Do not run a Search Console Change of Address from the timer domain to `doneat.app`.
4. Give SEO collaborators a read-only Search Console user.

`robots.txt` in this repo allows `/` and points at the sitemap index. Extra AI-bot rules on production come from Cloudflare, not this file. Leave them unless product chooses otherwise.

## Canonical sitemap URLs

| URL | Expected |
| --- | --- |
| `/robots.txt` | `200`, `Sitemap: https://doneat.app/sitemap-index.xml` |
| `/sitemap-index.xml` | `200`, lists `/sitemap-0.xml` |
| `/sitemap-0.xml` | `200`, hall + en/zh-CN support URLs |
| `/sitemap.xml` | `301` → `/sitemap-index.xml` (`vercel.json` + Astro `redirects`) |

`@astrojs/sitemap` emits `sitemap-index.xml` / `sitemap-0.xml`. There is no need for a second index at `/sitemap.xml`.

## Hreflang policy

- **Hall** `/{lang}`: 19 locales, plus `x-default` → `https://doneat.app/en`. HTML (`BaseLayout`) and sitemap xhtml links use the same helper (`src/lib/hreflang.ts`).
- **Support pages** (`about`, `download`, `faq`, `how-it-works`, `privacy`): **en and zh-CN only**. Hreflang and sitemap declare those two plus `x-default` → the English URL. Other hall languages bounce to `en` or `zh-CN` with `noindex`; they must not appear as alternates.
- Do not generate 19 unreviewed translations of long-form pages to “fill” hreflang.

## Structured data

| Page | JSON-LD |
| --- | --- |
| Hall | `@graph`: `Organization` + `SoftwareApplication` + `WebApplication` (browser timer). No ratings or download counts. Native `SoftwareApplication` has no `offers` (iOS Plus is paid). The web timer node may say free. |
| Download | `@graph`: same `Organization` / `SoftwareApplication` `@id`s + `WebPage` |
| FAQ | `FAQPage` only. Questions/answers are parsed from the Markdown body so they match visible copy. |
| 404 | `noindex,nofollow`. No canonical. No `og:url` (must not point at `/en`). |

`Organization.sameAs` is GitHub + X (`@doneatapp`). Keep those; do not invent extra profiles.

Validate FAQ with [Rich Results Test](https://search.google.com/test/rich-results) on `/en/faq` and `/zh-CN/faq`.

## Dual domain (interim)

Default: keep the timer on `off.rainif.com`. Official-site CTAs to the timer use

`utm_source=doneat.app&utm_medium=referral&utm_campaign=official-site&utm_content={header\|hall\|notfound}`

Anchor copy names DoneAt’s web timer. Off Work Countdown is the former name; About already says so.

**Preferred (not this round):** move the timer under `doneat.app` or `app.doneat.app`, 301 every `off.rainif.com/{locale}` URL, then update canonicals, sitemaps, in-app links, and store copy. Needs a redirect table and a rollback. Product must authorize it.

## Brand mark alt

Header, 404, and hall mark are decorative next to visible “DoneAt” text: `alt=""` and `aria-hidden="true"` (SVG hall mark is `aria-hidden`). Store badges keep their own labels. Device stills keep descriptive alts. Do not put `alt="DoneAt"` on a mark that already sits beside the word DoneAt.

## Local / preview checks

```bash
npm install
npm run build
node scripts/check-seo.mjs
npx astro preview
```

Then:

```bash
curl -sSIL http://127.0.0.1:4321/robots.txt | head
curl -sS http://127.0.0.1:4321/sitemap-index.xml
curl -sS http://127.0.0.1:4321/sitemap-0.xml | head -c 2000
curl -sSIL http://127.0.0.1:4321/sitemap.xml | head
curl -sSL http://127.0.0.1:4321/en/faq | grep -i FAQPage
curl -sSL http://127.0.0.1:4321/zh-CN/faq | grep -i FAQPage
curl -sSL http://127.0.0.1:4321/en | grep -i 'application/ld+json'
curl -sSL http://127.0.0.1:4321/en | grep -i 'hreflang="x-default"'
```

On Vercel preview or production, use the deployed origin instead of `127.0.0.1:4321`. `astro preview` serves `/sitemap.xml` as a small HTML refresh (200) to `/sitemap-index.xml`. Vercel production uses `vercel.json` for an HTTP 301.

Canonical spot-check: `/en`, `/zh-CN`, `/ja`, `/en/faq`, `/zh-CN/faq` should each have an HTTPS self-referencing canonical.

Intent-page backlog (no marketing URLs this round): [seo-intent-backlog.md](seo-intent-backlog.md).
