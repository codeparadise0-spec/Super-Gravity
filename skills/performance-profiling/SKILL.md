---
name: performance-profiling
description: Use when measuring, benchmarking, and diagnosing CPU bottlenecks, event loop lag, slow functions, and rendering jank.
---

# Performance Profiling Protocol: Measure Before Optimizing

Premature optimization is the root of all evil. Never optimize code based on intuition. Always profile, measure baseline metrics, and confirm improvements with reproducible benchmarks.

---

## 1. The Profiling Cycle

```
1. Profile Baseline  ──>  2. Identify Hotspot  ──>  3. Optimize Bottleneck  ──>  4. Verify Benchmark
```

---

## 2. Profiling Techniques & Tools

### A. Node.js / Backend CPU Profiling
Generate flamegraphs to identify functions consuming excessive CPU cycles:

```bash
# Profile application execution
node --cpu-prof app.js

# Or inspect using 0x flamegraph generator
npx 0x app.js
```
- Open `.cpuprofile` in Chrome DevTools (**Performance** tab).
- Inspect the **Flame Chart**:
  - Wide bars represent functions taking significant CPU time.
  - Look for deep call stacks, regex evaluation bottlenecks, or synchronous JSON serialization on large objects.

### B. Chrome DevTools Performance Profiling (Frontend)
1. Open Chrome DevTools -> **Performance** tab.
2. Check **Screenshots** and set CPU throttling to **4x Slowdown** (emulate mid-tier mobile).
3. Click **Record**, interact with the slow page (scroll, click filter), and click **Stop**.
4. Analyze:
   - **Long Tasks**: Red flags indicating tasks taking $>50\text{ms}$ that block the main thread.
   - **Layout Shifts (CLS)**: Visual elements jumping during render.
   - **Forced Synchronous Layouts**: JavaScript reading geometric properties (`offsetWidth`, `clientHeight`) right after mutating styles.

---

## 3. Micro-Benchmarking Discipline

When testing algorithmic optimizations, use statistically sound benchmark suites (e.g. `mitata` or `tinybench`):

```typescript
import { Bench } from 'tinybench';

const bench = new Bench({ time: 1000 });

bench
  .add('Array.prototype.indexOf', () => {
    array.indexOf(target);
  })
  .add('Set.prototype.has', () => {
    set.has(target);
  });

await bench.run();
console.table(bench.table());
```
