---
name: load-testing
description: Use when designing, running, and analyzing throughput, latency, concurrency, and stress benchmarks using k6, autocannon, or Locust.
---

# Load Testing & Performance Benchmarking

Load testing determines system capacity limits, detects memory leaks under pressure, and exposes database contention before production spikes.

---

## 1. Core Metrics & SLAs

Track these metrics across load phases:
- **Throughput ($RPS / QPS$)**: Total requests served per second without failure.
- **Latency Percentiles**:
  - $p50$ (Median user experience)
  - $p95$ (Tail latency for 95% of users)
  - $p99$ (Worst 1% of transactions - reveals locks, garbage collection pauses)
- **Error Rate**: Percentage of requests returning 5xx status codes or connection resets (Target: $< 0.01\%$).

---

## 2. Load Testing Phases

```
1. Smoke Test (1-5 VUs)  ──>  2. Load Test (Expected Peak)  ──>  3. Stress Test (Breaking Point)  ──>  4. Soak Test (Endurance)
```

1. **Smoke Test**: Verify test scripts execute without logical or parsing errors with minimal traffic.
2. **Standard Load Test**: Ramp up to expected peak production traffic (e.g. 500 Virtual Users over 10 minutes).
3. **Stress / Spike Test**: Surge to 3-5x peak traffic to observe failure modes and verify recovery.
4. **Soak Test**: Run at moderate load for 4-12 hours to detect slow memory leaks or connection pool exhaustion.

---

## 3. k6 Test Script Example

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 50 },  // Ramp up to 50 users
    { duration: '5m', target: 50 },  // Stay at 50 users
    { duration: '2m', target: 150 }, // Surge to 150 users
    { duration: '2m', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<250'], // 95% of requests must complete below 250ms
    http_req_failed: ['rate<0.01'],    // Less than 1% failed requests
  },
};

export default function () {
  const res = http.get('https://api.staging.example.com/v1/products');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });
  sleep(1);
}
```
