import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest } from "next/server";

const LOCALES_SUPPORTED = ["en", "es"];
const LOCALE_DEFAULT = "es";

const getNextLocale = (request: NextRequest) => {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && LOCALES_SUPPORTED.includes(cookieLocale)) {
    console.log("using next locale cookie");
    return cookieLocale;
  }
  return null;
};

const getAcceptLanguage = (request: NextRequest) => {
  const acceptLanguageHeader = request.headers.get("accept-language");
  if (!acceptLanguageHeader) {
    return null;
  }

  const languages = new Negotiator({
    headers: { "accept-language": acceptLanguageHeader },
  }).languages();

  console.log("using accept");
  return match(languages, LOCALES_SUPPORTED, LOCALE_DEFAULT);
};

function getLocale(request: NextRequest) {
  return getNextLocale(request) || getAcceptLanguage(request) || LOCALE_DEFAULT;
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = LOCALES_SUPPORTED.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return Response.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!_next|assets|sw|favicon.ico|manifest|pwa|api|monitoring|visit|sitemap[.]xml).*)",
  ],
};
