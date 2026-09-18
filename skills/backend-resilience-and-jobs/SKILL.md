---
name: backend-resilience-and-jobs
description: Use when building background job queues (BullMQ, Redis), implementing worker pools, managing graceful process shutdowns, and executing Transactional Outbox patterns.
---

# Backend Job Queues & Process Resilience Protocol

Long-running tasks (email delivery, PDF rendering, image processing, webhook delivery) must never block synchronous HTTP request threads. Offload them to background worker queues.

---

## 1. Background Job Queues (BullMQ / Redis)

```typescript
import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');

// 1. Define Queue
export const emailQueue = new Queue('emailQueue', {
  connection,
  defaultJobOptions: {
    attempts: 5, // Automatic retries
    backoff: {
      type: 'exponential',
      delay: 2000, // 2s -> 4s -> 8s -> 16s
    },
    removeOnComplete: 1000,
    removeOnFail: 5000,
  },
});

// 2. Define Worker
export const emailWorker = new Worker(
  'emailQueue',
  async (job) => {
    const { to, subject, html } = job.data;
    await sendTransactionalEmail({ to, subject, html });
    console.log(`Email delivered to ${to} for job ${job.id}`);
  },
  { connection, concurrency: 10 }
);

emailWorker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed after attempts:`, err);
});
```

---

## 2. The Transactional Outbox Pattern

Never call external message brokers inside a database transaction (which can fail after the DB commits, causing lost messages).

```
1. Write entity to DB + Insert event into `outbox_events` table (Single ACID Transaction)
                                  │
                                  ▼
2. Background Poller / CDC reads `outbox_events` and publishes to Kafka / SQS / Redis
                                  │
                                  ▼
3. Mark outbox event as PROCESSED
```

---

## 3. Graceful Process Shutdown Protocol

Never let Docker / Kubernetes abruptly terminate running transactions or active HTTP requests on `SIGTERM`:

```typescript
// server.ts
import { createServer } from 'http';
import app from './app';
import { db } from './lib/db';
import { emailWorker } from './jobs/email.worker';

const server = createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

async function shutdown(signal: string) {
  console.log(`Received ${signal}. Starting graceful shutdown...`);

  // 1. Stop accepting new HTTP connections
  server.close(async () => {
    console.log('HTTP server closed.');

    try {
      // 2. Close worker queues and finish active jobs
      await emailWorker.close();
      console.log('Background workers closed.');

      // 3. Disconnect database connections
      await db.$disconnect();
      console.log('Database connections closed.');

      process.exit(0);
    } catch (err) {
      console.error('Error during shutdown:', err);
      process.exit(1);
    }
  });

  // Force shutdown if cleanup hangs past 10 seconds
  setTimeout(() => {
    console.error('Forceful shutdown after timeout.');
    process.exit(1);
  }, 10000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
```
