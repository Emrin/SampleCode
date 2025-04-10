import { NextRequest, NextResponse } from "next/server"
import { Locale, i18nConfig } from "@/i18n"
import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"


export default async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  /*
   * I18n
   * */
  let lang = request.cookies.get("lang")?.value as Locale
  const unsupportedLocale = i18nConfig.locales.every((locale) => locale !== lang)
  if (unsupportedLocale) {
    lang = (getLocale(request) || "en") as Locale
    response.cookies.set({
      name: "lang",
      value: lang,
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
  }

  return response
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/_next`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!_next|.*\\..*).*)",
  ],
}

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-expect-error casting exception
  const locales: string[] = i18nConfig.locales

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  )

  const locale = matchLocale(languages, locales, i18nConfig.defaultLocale)

  return locale
}
