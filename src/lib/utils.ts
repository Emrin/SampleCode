import { NextRequest } from "next/server"
import { headers } from "next/headers"

// Used in POST request routes
export function getReferer(request: NextRequest) {
  // The Origin and Referer are validated by middleware
  const refererHeader = request.headers.get("referer")

  // Provide a fallback URL in case Referer is missing
  let destinationUrl = request.headers.get("origin")!

  if (refererHeader) {
    try {
      const refererUrl = new URL(refererHeader)
      // Construct the destination URL using origin and pathname
      destinationUrl = `${refererUrl.origin}${refererUrl.pathname}`
    } catch (e) {
      console.error("Error parsing Referer URL:", e)
      // destinationUrl remains as the fallback URL
    }
  } else {
    console.warn("Referer header is missing. Redirecting to fallback URL.")
  }
  return destinationUrl
}

export function getRandomHexString(length: number) {
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
              .map(byte => byte.toString(16).padStart(2, "0"))
              .join("")
}

export async function getPathname() {
  const headersList = await headers()
  return headersList.get("x-url")?.split("/")?.at(-1)?.split("?")[0]
}
