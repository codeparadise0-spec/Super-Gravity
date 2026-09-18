---
name: distributed-cron-scheduling
description: Use when building distributed scheduled jobs, cron tasks across clustered Node.js instances, leader election, and BullMQ repeatable jobs.
---

# Distributed Cron & Scheduled Job Architecture

Running standard `node-cron` in a clustered or containerized environment (e.g. 5 Kubernetes pods) causes every scheduled task to execute 5 times simultaneously. Use distributed job schedulers with leader locks.

---

## 1. BullMQ Repeatable Jobs (Recommended)

BullMQ leverages Redis to guarantee that exactly one worker executes each recurring cron tick:

```typescript
import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL);
const scheduledQueue = new Queue('scheduledTasks', { connection });

// Schedule daily invoice generation at 02:00 UTC
await scheduledQueue.add(
  'generateDailyInvoices',
  { date: new Date().toISOString() },
  {
    repeat: {
      pattern: '0 2 * * *', // Standard cron expression
      tz: 'UTC',
    },
    jobId: 'daily_invoices_cron', // Unique ID prevents duplicate registrations
  }
);
```

---

## 2. Distributed Lock Cron Wrapper (For Simple Tasks)

If using existing cron libraries, guard execution with a distributed Redis lock:

```typescript
import cron from 'node-cron';
import Redis from 'ioredis';

const redis = new Redis();

// Run every 10 minutes
cron.schedule('*/10 * * * *', async () => {
  const lockKey = 'locks:cron:cleanup_sessions';
  // Attempt to acquire 5-minute lock (SET NX EX)
  const acquired = await redis.set(lockKey, 'locked', 'EX', 300, 'NX');

  if (!acquired) {
    console.log('Another instance is already executing this cron. Skipping.');
    return;
  }

  try {
    console.log('Running session cleanup...');
    await cleanupExpiredSessions();
  } finally {
    await redis.del(lockKey);
  }
});
```
