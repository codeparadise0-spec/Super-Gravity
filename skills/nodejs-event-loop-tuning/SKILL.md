---
name: nodejs-event-loop-tuning
description: Use when diagnosing Node.js event loop lag, understanding microtask queues, process.nextTick vs setImmediate, and optimizing async I/O throughput.
---

# Node.js Event Loop Tuning & Queue Diagnostics

The Node.js event loop orchestrates non-blocking async I/O. Understanding its 6 phases and microtask queue priorities is essential for building ultra-low-latency backend services.

---

## 1. The Event Loop Phases

```
┌────────────────────────────────────────┐
│ 1. Timers (setTimeout, setInterval)   │
└───────────────────┬────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────┐
│ 2. Pending Callbacks (OS I/O errors)   │
└───────────────────┬────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────┐
│ 3. Idle, Prepare (Internal Node hooks) │
└───────────────────┬────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────┐
│ 4. Poll (Incoming I/O, DB, HTTP)       │
└───────────────────┬────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────┐
│ 5. Check (setImmediate callbacks)      │
└───────────────────┬────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────┐
│ 6. Close Callbacks (socket.on('close'))│
└────────────────────────────────────────┘
```

> **Microtasks (`process.nextTick` & Promises)**: Executed immediately after the current operation finishes, BEFORE the event loop advances to the next phase. Recursive `process.nextTick` will starve the entire event loop.

---

## 2. Monitoring Event Loop Delay (Lag)

Use Node.js `perf_hooks` to alert on event loop freezes:

```typescript
import { monitorEventLoopDelay } from 'perf_hooks';

const histogram = monitorEventLoopDelay({ resolution: 20 });
histogram.enable();

setInterval(() => {
  const p99 = histogram.percentile(99) / 1e6; // Convert nanoseconds to milliseconds
  const max = histogram.max / 1e6;

  console.log(`Event Loop Lag - p99: ${p99.toFixed(2)}ms, max: ${max.toFixed(2)}ms`);

  if (p99 > 50) {
    console.warn(`CRITICAL: Event loop lag exceeded 50ms (${p99}ms)! Synchronous code is blocking.`);
  }

  histogram.reset();
}, 5000);
```
