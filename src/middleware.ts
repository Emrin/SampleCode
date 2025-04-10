import { NextRequest, NextResponse } from "next/server"
import { getIronSession } from "iron-session"
import { SessionData, sessionOptions } from "src/auth"
import { Locale, i18nConfig } from "@/i18n"
import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import { RequestCookies, ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies"

export const ALLOWED_ORIGINS = new Set(process.env.ALLOWED_ORIGINS!.split(","))


export default async function middleware(request: NextRequest) {
  if (request.method === "POST" && !isValidRequestOrigin(request)) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 })
  }

  const requestHeaders = new Headers(request.headers)
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  /*
   * Auth
   * */
  const session = await getIronSession<SessionData>(request, response, sessionOptions)
  // console.log("MDW Session =", session)

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

  // Optionally fetch and update user session data on every new page visit

  let successPopup = undefined
  let failPopup = undefined
  if (session?.successPopup) {
    successPopup = session.successPopup
    session.successPopup = undefined
  }
  if (session?.failPopup) {
    failPopup = session.failPopup
    session.failPopup = undefined
  }
  await session.save()
  applySetCookie(request, response, successPopup, failPopup)
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

/**
 * Copy cookies from the Set-Cookie header of the response to the Cookie header of the request,
 * so that it will appear to SSR/RSC as if the user already has the new cookies.
 */
function applySetCookie(req: NextRequest, res: NextResponse, successPopup: string | undefined, failPopup: string | undefined): void {
  // parse the outgoing Set-Cookie header
  const setCookies = new ResponseCookies(res.headers)
  // Build a new Cookie header for the request by adding the setCookies
  const newReqHeaders = new Headers(req.headers)
  newReqHeaders.set("x-url", req.url)
  if (successPopup) newReqHeaders.set("successPopup", successPopup.toString())
  if (failPopup) newReqHeaders.set("failPopup", failPopup)
  const newReqCookies = new RequestCookies(newReqHeaders)
  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie))
  // set “request header overrides” on the outgoing response
  NextResponse.next({
    request: { headers: newReqHeaders },
  }).headers.forEach((value, key) => {
    if (key === "x-middleware-override-headers" || key.startsWith("x-middleware-request-")) {
      res.headers.set(key, value)
    }
  })
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

function isValidRequestOrigin(request: Request) {
  const originHeader = request.headers.get("origin")
  const refererHeader = request.headers.get("referer")
  const hostHeader = request.headers.get("host") || request.headers.get("x-forwarded-host")

  if (!originHeader && !refererHeader) {
    console.error("Missing Origin and Referer headers")
    return false
  }

  // Helper to validate a URL header against allowed origins and the host header.
  const validateHeader = (headerValue: string, headerName: string): boolean => {
    try {
      const url = new URL(headerValue)
      // If we have a host header, ensure it matches.
      if (hostHeader && url.host !== hostHeader) {
        console.error(`${headerName} (${url.host}) does not match Host header (${hostHeader})`)
        return false
      }
      if (!ALLOWED_ORIGINS.has(url.host)) {
        console.error(`${headerName} host (${url.host}) is not allowed`)
        return false
      }
      return true
    } catch (e) {
      console.error(`Invalid ${headerName} header:`, headerValue)
      return false
    }
  }

  let originValid = false
  let refererValid = false

  if (originHeader) {
    originValid = validateHeader(originHeader, "Origin")
  }

  if (refererHeader) {
    refererValid = validateHeader(refererHeader, "Referer")
  }

  // If both headers are present, ensure they are consistent.
  if (originHeader && refererHeader) {
    try {
      const originUrl = new URL(originHeader)
      const refererUrl = new URL(refererHeader)
      if (originUrl.host !== refererUrl.host) {
        console.error(`Origin (${originUrl.host}) and Referer (${refererUrl.host}) hosts do not match`)
        return false
      }
    } catch (e) {
      // Errors already logged in the helper.
      return false
    }
  }

  if (!originValid && !refererValid) {
    console.error("Origin or Referer host not allowed")
    return false
  }

  return true
}
