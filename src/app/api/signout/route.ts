"use server"

import { getIronSession } from "iron-session"
import { SessionData, sessionOptions } from "src/auth"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { getRandomHexString } from "lib/utils"

export async function POST(request: NextRequest) {
  const startTime = new Date()
  const destinationUrl = request.headers.get("origin")!
  const response = NextResponse.redirect(destinationUrl, { status: 302 })

  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
  if (!session.isLoggedIn) return response

  const username = session?.username
  response.cookies.delete("csrf")
  session.destroy()
  await session.save()

  // Create new session
  session.id = getRandomHexString(16)
  session.isLoggedIn = false
  session.createdAt = new Date().getTime()
  session.currency = "eur"
  await session.save()

  const endTime = new Date()
  const duration = endTime.getTime() - startTime.getTime()
  console.log(`Finished logout in ${duration} ms. (${username})`)

  return response
}
