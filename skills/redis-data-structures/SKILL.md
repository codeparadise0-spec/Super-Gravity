---
name: redis-data-structures
description: Use when choosing the optimal Redis data structure (Hashes, Sorted Sets, HyperLogLog, Streams, Bitmaps) for real-time analytics, leaderboards, and rate limiters.
---

# Redis Data Structures & Real-Time Engineering

Redis is a versatile data structure server. Selecting the right primitive reduces memory consumption by 90% and delivers $O(1)$ to $O(\log N)$ performance.

---

## 1. Data Structure Selection Matrix

| Structure | Typical Commands | Best Real-World Use Case |
| :--- | :--- | :--- |
| **String** | `GET`, `SET`, `INCRBY` | Simple object caching, token storage, basic rate limiters |
| **Hash** | `HGET`, `HSET`, `HINCRBY` | User session profiles, shopping carts (avoids JSON serialization) |
| **Sorted Set (ZSET)** | `ZADD`, `ZREVRANGE`, `ZRANK` | Gaming leaderboards, priority queues, sliding window rate limiters |
| **HyperLogLog** | `PFADD`, `PFCOUNT` | Counting unique daily active visitors (uses only $12\text{KB}$ for millions of IDs) |
| **Stream** | `XADD`, `XREADGROUP`, `XACK` | Append-only event sourcing, Kafka-lite message broker |
| **Bitmaps** | `SETBIT`, `BITCOUNT` | Daily user login streaks (1 bit per day = $365\text{ bits} \approx 46\text{ bytes}$ per year) |

---

## 2. Real-Time Leaderboard Implementation (Sorted Sets)

```typescript
// Add user score
await redis.zadd('leaderboard:monthly', 1250, 'user_981');
await redis.zadd('leaderboard:monthly', 3400, 'user_412');

// Get Top 10 users with scores
const top10 = await redis.zrevrange('leaderboard:monthly', 0, 9, 'WITHSCORES');

// Get specific user rank (0-indexed)
const rank = await redis.zrevrank('leaderboard:monthly', 'user_981');
console.log(`User rank: #${rank! + 1}`);
```
