---
name: redis-caching-patterns
description: Use when architecting Redis caching strategies, Cache-Aside, Write-Through, Write-Behind, and preventing Cache Stampedes with probabilistic early expiration.
---

# Redis Caching Strategies & Stampede Mitigation

Redis provides in-memory sub-millisecond data retrieval. However, naive caching without invalidation strategies or TTL jitter causes cache stampedes and stale data corruption.

---

## 1. The Cache-Aside (Lazy Loading) Pattern

```
[Application] ── 1. Check Redis Cache ──> [Redis]
     │                                       │
     ├── 2. Cache Hit: Return Data <─────────┘
     │
     └── 3. Cache Miss: Query Database ──> [Database]
              │                                 │
              ├── 4. Return DB Result <─────────┘
              │
              └── 5. Write to Redis with TTL ──> [Redis]
```

```typescript
import Redis from 'ioredis';

const redis = new Redis();

export async function getCachedUser(userId: string): Promise<User> {
  const cacheKey = `users:${userId}`;

  // 1. Try cache
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // 2. Fallback to DB
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) throw new NotFoundError('User not found');

  // 3. Populate cache with TTL jitter to prevent stampedes
  const ttlSeconds = 3600 + Math.floor(Math.random() * 300); // 1hr + 0-5m jitter
  await redis.setex(cacheKey, ttlSeconds, JSON.stringify(user));

  return user;
}
```

---

## 2. Preventing Cache Stampedes (Thundering Herd)

When a hot cache key expires under 10,000 requests/second, all 10,000 requests hit the database simultaneously, crashing the database.

### Mitigation: Distributed Mutex Lock on Cache Miss
```typescript
export async function getWithStampedeLock(key: string, fetcher: () => Promise<any>): Promise<any> {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const lockKey = `lock:${key}`;
  const acquired = await redis.set(lockKey, '1', 'EX', 5, 'NX'); // 5s lock

  if (acquired) {
    // Only 1 worker queries DB and warms cache
    try {
      const data = await fetcher();
      await redis.setex(key, 3600, JSON.stringify(data));
      return data;
    } finally {
      await redis.del(lockKey);
    }
  } else {
    // Other workers wait 50ms and read the freshly warmed cache
    await new Promise(res => setTimeout(res, 50));
    return getWithStampedeLock(key, fetcher);
  }
}
```
