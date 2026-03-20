import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

type RateLimitEntry = {
  count: number
  resetAt: number
}

type RateLimitOptions = {
  key: string
  limit: number
  windowMs: number
  prefix?: string
}

type RateLimitResult = {
  success: boolean
  remaining: number
  resetAt: number
}

const globalStore = globalThis as typeof globalThis & {
  __ascendRateLimitStore?: Map<string, RateLimitEntry>
  __ascendRedisClient?: Redis
  __ascendRateLimiters?: Map<string, Ratelimit>
}

function getMemoryStore() {
  if (!globalStore.__ascendRateLimitStore) {
    globalStore.__ascendRateLimitStore = new Map<string, RateLimitEntry>()
  }

  return globalStore.__ascendRateLimitStore
}

function checkMemoryRateLimit({
  key,
  limit,
  windowMs,
}: Omit<RateLimitOptions, 'prefix'>): RateLimitResult {
  const now = Date.now()
  const store = getMemoryStore()
  const current = store.get(key)

  if (!current || current.resetAt <= now) {
    const next: RateLimitEntry = {
      count: 1,
      resetAt: now + windowMs,
    }

    store.set(key, next)

    return {
      success: true,
      remaining: limit - 1,
      resetAt: next.resetAt,
    }
  }

  if (current.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetAt: current.resetAt,
    }
  }

  current.count += 1
  store.set(key, current)

  return {
    success: true,
    remaining: Math.max(0, limit - current.count),
    resetAt: current.resetAt,
  }
}

function getRedisClient() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    return null
  }

  if (!globalStore.__ascendRedisClient) {
    globalStore.__ascendRedisClient = new Redis({ url, token })
  }

  return globalStore.__ascendRedisClient
}

function getDistributedLimiter({
  prefix,
  limit,
  windowMs,
}: Required<Pick<RateLimitOptions, 'prefix' | 'limit' | 'windowMs'>>) {
  const redis = getRedisClient()

  if (!redis) {
    return null
  }

  if (!globalStore.__ascendRateLimiters) {
    globalStore.__ascendRateLimiters = new Map<string, Ratelimit>()
  }

  const cacheKey = `${prefix}:${limit}:${windowMs}`
  const cached = globalStore.__ascendRateLimiters.get(cacheKey)

  if (cached) {
    return cached
  }

  const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, `${Math.ceil(windowMs / 1000)} s`),
    analytics: false,
    prefix: `ascend:${prefix}`,
  })

  globalStore.__ascendRateLimiters.set(cacheKey, limiter)

  return limiter
}

export async function checkRateLimit({
  key,
  limit,
  windowMs,
  prefix = 'default',
}: RateLimitOptions): Promise<RateLimitResult> {
  const distributedLimiter = getDistributedLimiter({ prefix, limit, windowMs })
  const scopedKey = `${prefix}:${key}`

  if (!distributedLimiter) {
    return checkMemoryRateLimit({ key: scopedKey, limit, windowMs })
  }

  try {
    const result = await distributedLimiter.limit(key)

    return {
      success: result.success,
      remaining: result.remaining,
      resetAt: result.reset,
    }
  } catch (error) {
    console.error('[rate-limit] Upstash unavailable, falling back to memory store.', error)
    return checkMemoryRateLimit({ key: scopedKey, limit, windowMs })
  }
}
