import { localeFromAcceptLanguage } from "./src/lib/locale";

export const config = {
  matcher: "/",
};

export default function middleware(request: Request): Response {
  const url = new URL(request.url);
  const locale = localeFromAcceptLanguage(request.headers.get("accept-language"));
  url.pathname = `/${locale}`;
  return Response.redirect(url, 302);
}
