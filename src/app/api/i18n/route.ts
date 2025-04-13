"use server"

import { z } from "zod"
import { NextRequest, NextResponse } from "next/server"
import { i18nConfig } from "src/i18n"
import { getIronSession } from "iron-session"
import { SessionData, sessionOptions } from "src/auth"
// import prisma from "lib/prisma"
// import redis from "lib/redis"
import { getReferer } from "lib/utils"

const schema = z.object({
  lang: z.enum(i18nConfig.locales),
})

export async function POST(request: NextRequest) {
  const startTime = new Date()
  const destinationUrl = getReferer(request)
  const response = NextResponse.redirect(destinationUrl, { status: 302 })
  const formData = await request.formData()

  const validatedFields = schema.safeParse({
    lang: formData.get("locale"),
  })
  if (!validatedFields.success) {
    return response
  }

  response.cookies.set("lang", validatedFields.data.lang, {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })

  const session = await getIronSession<SessionData>(request, response, sessionOptions)

  // Optionally save user's profile
  // if (session.isLoggedIn) {
  //   try {
  //     const updatedUser = await prisma.user.update({
  //       where: { id: session.userId },
  //       data: {
  //         locale: validatedFields.data.lang
  //       },
  //       select: { username: true },
  //     })
  //
  //     // Invalidate cached data
  //     await redis.del(`user:${session.userId}`)
  //
  //   } catch (e) {
  //     if (e instanceof Error) console.error(e?.message)
  //     else console.error(e)
  //   }
  // }

  const endTime = new Date()
  const duration = endTime.getTime() - startTime.getTime()
  console.log(`Finished changing language in ${duration} ms. (${session?.username || ""})`)

  return response
}
