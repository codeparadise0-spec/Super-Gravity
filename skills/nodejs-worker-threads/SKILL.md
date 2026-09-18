---
name: nodejs-worker-threads
description: Use when offloading CPU-intensive computations, image/video transcoding, cryptographic hashing, and heavy data processing to Node.js Worker Threads.
---

# Node.js Worker Threads & Parallel Processing

Node.js runs JavaScript on a single thread. CPU-heavy operations (e.g. image processing, heavy encryption, large JSON parsing, PDF generation) block the event loop and freeze all incoming HTTP requests. Offload heavy computation to Worker Threads (`worker_threads`).

---

## 1. Main Thread Dispatcher Pattern

```typescript
// workers/heavyCompute.worker.ts (Worker Script)
import { parentPort, workerData } from 'worker_threads';

function computeIntensivePrimes(limit: number): number[] {
  const primes: number[] = [];
  for (let i = 2; i <= limit; i++) {
    let isPrime = true;
    for (let j = 2; j * j <= i; j++) {
      if (i % j === 0) { isPrime = false; break; }
    }
    if (isPrime) primes.push(i);
  }
  return primes;
}

const result = computeIntensivePrimes(workerData.limit);
parentPort?.postMessage(result);
```

```typescript
// services/compute.service.ts (Main Thread Caller)
import { Worker } from 'worker_threads';
import path from 'path';

export function runPrimeWorker(limit: number): Promise<number[]> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.resolve(__dirname, '../workers/heavyCompute.worker.js'), {
      workerData: { limit },
    });

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}
```

---

## 2. Using `piscina` for Worker Pool Reuse
Creating new threads per request is slow ($~20\text{ms}$ thread spawn overhead). Use a thread pool like `piscina` to keep warm worker threads ready:

```typescript
import Piscina from 'piscina';

export const workerPool = new Piscina({
  filename: new URL('./worker.js', import.meta.url).href,
  maxThreads: 4, // Match CPU cores
});

const result = await workerPool.run({ data: myPayload });
```
