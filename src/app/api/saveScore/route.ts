"use server"

import { NextResponse } from "next/server"
import prisma from "lib/prisma"
import redis from "lib/redis"
import { z } from "zod"
import { getIronSession } from "iron-session"
import { SessionData, sessionOptions } from "@/auth"
import { getLeaderboard } from "lib/getLeaderboard"

const schema = z.object({
  score: z.number({ coerce: true }).min(0).max(10000),
})

export async function POST(request: Request, response: NextResponse) {
  try {
    const { score } = await request.json()
    // console.log("Saving new score of", score)

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

    await prisma.$transaction(async (prisma) => {
      const leaderboard = await prisma.leaderboard.findUnique({
        where: { userId: session.userId },
      })

      if (leaderboard) {
        // Update
        const newTotalScore = leaderboard.totalScore + score
        const newPlayedGames = leaderboard.playedGames + 1
        const newAverageScore = newTotalScore / newPlayedGames
        const newBestScore = score > leaderboard.bestScore ? score : leaderboard.bestScore
        const updatedUserLeaderboard = await prisma.leaderboard.update({
          where: { userId: session.userId },
          data: {
            playedGames: { increment: 1 },
            totalScore: { increment: score },
            bestScore: newBestScore,
            averageScore: newAverageScore,
          },
        })
        // console.log("Updated user's leaderboard:", updatedUserLeaderboard)
      } else {
        // Create
        const newLeaderboard = await prisma.leaderboard.create({
          data: {
            userId: session.userId!,
            username: session.username!,
            playedGames: 1,
            totalScore: score,
            bestScore: score,
            averageScore: score,
          },
        })
        // console.log("Created new leaderboard:", newLeaderboard)
      }
    })

    // Invalidate cached leaderboard data
    await redis.del("leaderboard")

    // Repopulate cache and fetch
    const globalLeaderboard = await getLeaderboard()

    // Return leaderboards
    return NextResponse.json(globalLeaderboard)

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Could not save score" },
      { status: 500 },
    )
  }
}
