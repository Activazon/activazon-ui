import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest } from "next/server";

const locales = ["en", "es"];
const defaultLocale = "es";
const LOCALE_COOKIE_NAME = "act-locale";

function getLocale(request: NextRequest) {
  const acceptLanguageHeader = request.headers.get("accept-language");
  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;

  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  if (!acceptLanguageHeader) return defaultLocale;

  const languages = new Negotiator({
    headers: { "accept-language": acceptLanguageHeader },
  }).languages();

  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const localeInUrl = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  const locale = getLocale(request);

  if (localeInUrl && localeInUrl !== locale) {
    // User changed locale in the URL, update the cookie
    new Response("", {
      headers: {
        "Set-Cookie": `${LOCALE_COOKIE_NAME}=${localeInUrl}; Path=/; Max-Age=31536000; SameSite=Lax`,
      },
    });
  }

  if (!localeInUrl) {
    // Redirect if there is no locale in the URL
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return Response.redirect(request.nextUrl);
  }
}

export const config = {
  matcher: ["/((?!_next|assets|sw|favicon.ico|manifest|pwa).*)"],
};
