---
name: backend-security-and-rate-limiting
description: Use when hardening backend APIs, implementing Redis rate limiting, preventing race conditions with distributed locks, and handling idempotency keys.
---

# Backend API Hardening, Rate Limiting & Idempotency

Harden production APIs against denial-of-service, brute force attacks, duplicate payment submissions, and concurrent race conditions.

---

## 1. Sliding Window Rate Limiting (Redis)

Protect public endpoints (`/login`, `/register`, `/api/checkout`) against brute force and DDoS:

```typescript
import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import Redis from 'ioredis';

const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Strict limiter for authentication endpoints
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per window
  standardHeaders: true, // Return standard RateLimit-* headers
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (...args: string[]) => redisClient.call(...args),
    prefix: 'rl:auth:',
  }),
  message: {
    status: 429,
    message: 'Too many login attempts. Please try again in 15 minutes.',
  },
});
```

---

## 2. The Idempotency Key Pattern

Prevent users or network retries from double-charging credit cards or creating duplicate records:

```typescript
import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

const redis = new Redis();

export async function idempotencyMiddleware(req: Request, res: Response, next: NextFunction) {
  const idempotencyKey = req.header('Idempotency-Key');
  if (!idempotencyKey) return next();

  const cacheKey = `idempotency:${req.user?.id}:${idempotencyKey}`;
  const cachedResponse = await redis.get(cacheKey);

  if (cachedResponse) {
    const { status, body } = JSON.parse(cachedResponse);
    return res.status(status).json(body);
  }

  // Intercept response send to cache result
  const originalJson = res.json.bind(res);
  res.json = (body: any) => {
    // Cache response for 24 hours (86400 seconds)
    redis.setex(cacheKey, 86400, JSON.stringify({ status: res.statusCode, body }));
    return originalJson(body);
  };

  next();
}
```

---

## 3. Distributed Locking for Race Conditions (Redlock)

When two concurrent requests attempt to modify the same resource (e.g., claiming the last concert seat, redeeming a single-use coupon):

```typescript
import Redlock from 'redlock';
import Redis from 'ioredis';

const redlock = new Redlock([new Redis()], { retryCount: 3, retryDelay: 200 });

export async function claimSeat(userId: string, seatId: string) {
  const lockKey = `locks:seat:${seatId}`;

  // Acquire lock for 5000ms
  const lock = await redlock.acquire([lockKey], 5000);

  try {
    const seat = await db.seat.findUnique({ where: { id: seatId } });
    if (seat.isBooked) throw new Error('Seat already booked');

    await db.seat.update({
      where: { id: seatId },
      data: { isBooked: true, bookedById: userId },
    });
  } finally {
    // Always release lock
    await lock.release();
  }
}
```
