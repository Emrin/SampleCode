"use server"

import { z } from "zod"
import { getIronSession } from "iron-session"
import { SessionData, sessionOptions } from "src/auth"
import { NextRequest, NextResponse } from "next/server"
import prisma from "lib/prisma"
import { getRandomHexString, getReferer } from "lib/utils"
import { hash } from "bcryptjs"

const schema = z.object({
  username: z.string().trim().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/),
  password: z.string().min(8).max(256).trim(),
  confirm_password: z.string().min(8).max(256).trim(),
  terms: z.preprocess((input) => !!input, z.boolean()),
})
  .refine((data) => data.password === data.confirm_password, {
   path: ["confirm_password"],
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
    confirm_password: formData.get("confirm_password"),
    terms: formData.get("terms"),
  })

  try {
    /*
     * Validation
     * */
    if (!validatedFields.success) {
      console.warn({ errors: validatedFields.error.flatten().fieldErrors })
      failPopup = "Invalid form."
      throw new Error("Validation error.")
    }

    // Optional Captcha check here.

    /*
     * Check username
     * */
    const usernameTaken = await prisma.user.findFirst({
      where: {
        username: {
          equals: validatedFields.data.username,
          mode: "insensitive",
        },
      },
      select: { username: true },
    })
    if (usernameTaken) {
      failPopup = "Username taken."
      throw new Error("Username taken")
    }

    const passwordHash = await hash(validatedFields.data.password, 12)

    await prisma.$transaction(async (prisma) => {
      // Create the new user
      const user = await prisma.user.create({
        data: {
          username: validatedFields.data.username,
          password: passwordHash,
        },
        select: {
          id: true,
          username: true,
        },
      })
      console.log("Created new user:", user.username)

      // Log user in new session.
      session.id = getRandomHexString(16)
      session.isLoggedIn = true
      session.createdAt = new Date().getTime()
      session.userId = user.id
      session.username = user.username
      session.currency = "eur"
      session.successPopup = "Welcome !"
      response.headers.set("location", request.headers.get("origin")! + "/")
    })
  } catch (e) {
    // If there's an error, redirect back to  page.
    response.headers.set("location", getReferer(request))
    if (e instanceof Error) console.error(e?.message)
    else console.error(e)
    session.failPopup = failPopup ? failPopup : "server"
  }

  await session.save()

  const endTime = new Date()
  const duration = endTime.getTime() - startTime.getTime()
  console.log(`Processed registration in ${duration} ms. (${validatedFields?.data?.username || ""})`)

  return response
}
