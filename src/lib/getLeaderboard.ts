import prisma from "lib/prisma"
import redis from "lib/redis"

export async function getLeaderboard() {
  const key = "leaderboard"
  const cached = await redis.get(key)
  let leaderboard = []

  if (cached) {
    /*
     * Cached data
     * */
    leaderboard = JSON.parse(cached)

  } else {
    /*
     * Fresh data
     * */
    leaderboard = await prisma.leaderboard.findMany({
      orderBy: { averageScore: "desc" },
      take: 10,
    })

    // Cache the result for 5 minutes
    const MAX_AGE_SECONDS = 60 * 5; // 5 minutes
    await redis.set(key, JSON.stringify(leaderboard), "EX", MAX_AGE_SECONDS)
  }

  return leaderboard
}
