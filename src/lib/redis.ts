/*
 * This allows us to use a single instance of Redis.
 * */
import "server-only"
import Redis, { RedisOptions } from "ioredis"

const redisClientSingleton = () => {
  const options: RedisOptions = {
    host: process.env.DOCKER ? process.env.REDIS_HOST : "127.0.0.1",
    lazyConnect: true,
    showFriendlyErrorStack: true,
    enableAutoPipelining: true,
    maxRetriesPerRequest: 0,
    retryStrategy: (times: number) => {
      if (times > 3) {
        throw new Error(`[Redis] Could not connect after ${times} attempts`)
      }
      return Math.min(times * 200, 1000)
    },
  }

  if (process.env.REDIS_PORT) {
    options.port = Number(process.env.REDIS_PORT)
  }

  if (process.env.REDIS_PASSWORD) {
    options.password = process.env.REDIS_PASSWORD
  }

  const redis = new Redis(options)

  redis.on("error", (error: unknown) => {
    console.warn("[Redis] Error connecting", error)
  })

  return redis
}

declare global {
  // eslint-disable-next-line no-var
  var redis: Redis | undefined
}

const redis = globalThis.redis ?? redisClientSingleton()

if (process.env.NODE_ENV !== "production") globalThis.redis = redis

export default redis
