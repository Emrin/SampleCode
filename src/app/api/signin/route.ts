"use server"

import { z } from "zod"
import { getIronSession } from "iron-session"
import { SessionData, sessionOptions } from "src/auth"
import { NextRequest, NextResponse } from "next/server"
import { getRandomHexString } from "lib/utils"
import prisma from "lib/prisma"
import { compare } from "bcryptjs"
import { getReferer } from "lib/utils"

const schema = z.object({
  username: z.string().trim().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/),
  password: z.string().trim().min(8).max(256),
})

export async function POST(request: NextRequest) {
  const startTime = new Date()
  const destinationUrl = request.headers.get("origin")!
  const response = NextResponse.redirect(destinationUrl, { status: 302 })
  const session = await getIronSession<SessionData>(request, response, sessionOptions)
  if (session.isLoggedIn) return response
  const formData = await request.formData()
  let failPopup = ""

  const validatedFields = schema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  })

  try {
    /*
     * Validation
     * */
    if (!validatedFields.success) {
      console.warn({ errors: validatedFields?.error?.flatten().fieldErrors })
      failPopup = "validation"
      throw new Error("Validation error.")
    }

    // Captcha here.

    /*
     * Find user
     * */
    const user = await prisma.user.findUnique({
      where: { username: validatedFields.data.username },
      select: {
        id: true,
        username: true,
        password: true,
        currency: true,
        language: true,
      },
    })
    if (!user || !(await compare(validatedFields.data.password, user.password))) {
      failPopup = "User Not Found."
      throw new Error("User not found.")
    }

    // Verify bans, rate limit

    // Update login count
    const updatedUser = await prisma.user.update({
      where: {
        username: validatedFields.data.username,
      },
      data: {
        logins: { increment: 1 },
        // lastConnection: new Date(),
      },
    })

    // Log user in new session.
    session.id = getRandomHexString(16)
    session.isLoggedIn = true
    session.createdAt = new Date().getTime()
    session.userId = user.id
    session.username = user.username
    session.currency = user.currency

    // Synchronize locale
    response.cookies.set("lang", user.language, {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })

  } catch (e) {
    // If there's an error, redirect back to log in page.
    response.headers.set("location", getReferer(request))
    if (e instanceof Error) console.error(e?.message)
    else console.error(e)
    session.failPopup = failPopup ? failPopup : "server"
  }

  await session.save()

  const endTime = new Date()
  const duration = endTime.getTime() - startTime.getTime()
  console.log(`Finished login in ${duration} ms. (user:${validatedFields?.data?.username || ""})`)

  return response
}
