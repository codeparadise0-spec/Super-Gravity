---
name: devtools-lighthouse-cwv
description: Use when auditing Core Web Vitals (LCP, CLS, INP) using Chrome DevTools Lighthouse and Web Vitals extension to hit green scores (>=90).
---

# Lighthouse & Core Web Vitals (CWV) Audit

Google uses Core Web Vitals as a direct search ranking and user experience benchmark. Every production web application must achieve **Green** scores ($\ge 90$).

---

## 1. The 3 Core Web Vitals Thresholds

| Metric | Good (Green) | Needs Improvement (Amber) | Poor (Red) | Target Focus |
| :--- | :--- | :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | $\le 2.5\text{s}$ | $2.5\text{s} - 4.0\text{s}$ | $> 4.0\text{s}$ | Perceived loading speed (Hero image/text) |
| **INP** (Interaction to Next Paint) | $\le 200\text{ms}$ | $200\text{ms} - 500\text{ms}$| $> 500\text{ms}$| Responsiveness to user clicks/keys |
| **CLS** (Cumulative Layout Shift) | $\le 0.1$ | $0.1 - 0.25$ | $> 0.25$ | Visual layout stability (no jumping elements) |

---

## 2. Optimization Playbook

### Improving LCP ($<2.5\text{s}$)
1. Preload hero images: `<link rel="preload" as="image" href="hero.webp" fetchpriority="high">`.
2. Inline critical CSS in `<head>` to avoid render-blocking stylesheet waterfalls.
3. Use a global CDN (Cloudflare / Fastly) to bring TTFB $<200\text{ms}$.

### Improving INP ($<200\text{ms}$)
1. Yield to the main thread during heavy computations: `await new Promise(resolve => setTimeout(resolve, 0))` or `scheduler.yield()`.
2. Avoid expensive React state updates synchronously on keystrokes (`useDeferredValue`).

### Improving CLS ($<0.1$)
1. Always set explicit `width`, `height`, or `aspect-ratio` on images, videos, and ads.
2. Reserve space for dynamic banners and skeleton loaders before async data arrives.
3. Preload web fonts with `font-display: swap` or `optional` to prevent FOIT/FOUT shifts.
