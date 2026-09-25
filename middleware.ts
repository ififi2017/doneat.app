import { resolveLocaleRedirectPath } from "./src/lib/locale";

export const config = {
  matcher: [
    "/",
    "/((?!_astro|brand|icons|badges|device|favicon|robots\\.txt|sitemap).*)",
  ],
};

export default function middleware(request: Request): Response | undefined {
  const url = new URL(request.url);
  const nextPath = resolveLocaleRedirectPath(
    url.pathname,
    request.headers.get("accept-language"),
  );
  if (!nextPath) return;
  url.pathname = nextPath;
  // The target depends on Accept-Language. Say so for caches and crawlers;
  // the root is also the hall hreflang x-default (src/lib/hreflang.ts).
  return new Response(null, {
    status: 302,
    headers: { Location: url.toString(), Vary: "Accept-Language" },
  });
}
