---
name: devtools-performance-flamechart
description: Use when profiling JavaScript execution in the Chrome DevTools Performance panel, analyzing long tasks (>50ms), layout thrashing, and render blocking.
---

# Chrome DevTools Performance Flame Chart Diagnostics

The Performance panel records millisecond-accurate flame charts of main-thread JavaScript execution, style recalculations, layout reflows, and composite layers.

---

## 1. How to Capture a Clean Performance Profile

1. Open Chrome DevTools -> **Performance** tab.
2. Enable **Screenshots** and **Web Vitals** checkboxes.
3. Set CPU throttling to **4x Slowdown** (emulates a budget Android / mobile phone).
4. Click **Record**, trigger the sluggish interaction (e.g. typing in a search box, opening a heavy table), then click **Stop**.

---

## 2. Red Flags in the Flame Chart

### A. Long Tasks (Red Corner Indicators)
- Any task exceeding **$50\text{ms}$** is flagged with a red triangle.
- The area above $50\text{ms}$ is counted as Total Blocking Time (TBT).
- **Remediation**: Decompose large loops with `scheduler.yield()` or move computation to a Web Worker.

### B. Forced Synchronous Layout ("Layout Thrashing")
- Occurs when JavaScript alternates between modifying the DOM and reading layout geometry in a loop:
  ```javascript
  // ANTI-PATTERN: Triggers 100 forced synchronous layouts
  elements.forEach(el => {
    el.style.width = '100px'; // Write
    const h = el.clientHeight; // Forced synchronous layout reflow!
  });

  // OPTIMAL: Batch all reads first, then batch all writes
  const heights = elements.map(el => el.clientHeight); // Read phase
  elements.forEach((el, i) => {
    el.style.width = '100px'; // Write phase
  });
  ```
