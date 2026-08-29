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
  return Response.redirect(url, 302);
}
