"use server"

import { NextResponse } from "next/server"
import prisma from "lib/prisma"
import redis from "lib/redis"
import { z } from "zod"
import { getIronSession } from "iron-session"
import { SessionData, sessionOptions } from "@/auth"

const schema = z.object({
  score: z.number({ coerce: true }).min(0).max(10000),
})

export async function POST(request: Request, response: NextResponse) {
  try {
    const { score } = await request.json()

    const validatedFields = schema.safeParse({
      score,
    })

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 },
      )
    }

    const session = await getIronSession<SessionData>(request, response, sessionOptions)
    if (!session.isLoggedIn) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 400 },
      )
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.userId },
      data: {
        score,
      },
    })

    // Invalidate cached leaderboard data
    await redis.del("leaderboard")

    return NextResponse.json(
      { message: "Score saved successfully", updatedUser },
      { status: 200 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Could not save score" },
      { status: 500 },
    )
  }
}
