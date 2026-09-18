---
name: bundle-size-audit
description: Use when analyzing frontend JavaScript bundle payloads, eliminating dead code, configuring tree-shaking, and optimizing asset delivery.
---

# Bundle Size Audit & Code Splitting Protocol

Large JavaScript bundles increase Time to Interactive (TTI), consume mobile data, and slow down mobile CPU parsing.

---

## 1. Bundle Analysis Tools

Visualize chunk sizes and identify bloated third-party packages:

```bash
# Vite / Rollup
npm install -D rollup-plugin-visualizer
# Inspect stats.html treemap

# Next.js / Webpack
ANALYZE=true npm run build
# Uses @next/bundle-analyzer
```

---

## 2. Top Bundle Reduction Strategies

### A. Dynamic Imports & Route-Based Code Splitting
Never load all pages and modal dialogs in the initial page bundle. Split at the route boundary:

```typescript
// React Lazy Loading
import { lazy, Suspense } from 'react';

const HeavyChartModal = lazy(() => import('./components/HeavyChartModal'));

export function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>View Analytics</button>
      {isOpen && (
        <Suspense fallback={<div>Loading chart engine...</div>}>
          <HeavyChartModal />
        </Suspense>
      )}
    </>
  );
}
```

### B. Replace Heavy Dependencies with Lightweight Alternatives
| Heavy Legacy Package | Bundle Size (Gzip) | Modern Lightweight Alternative | Bundle Size (Gzip) | Savings |
| :--- | :--- | :--- | :--- | :--- |
| `moment.js` | ~72 KB | `date-fns` (modular) or `dayjs` | ~2.5 KB | **-96%** |
| `lodash` (entire) | ~25 KB | Native ES6 methods or `radash` | ~1.5 KB | **-94%** |
| `axios` | ~13 KB | Native `fetch()` | 0 KB (Built-in) | **-100%** |
| `crypto-js` | ~45 KB | Web Crypto API (`crypto.subtle`) | 0 KB (Built-in) | **-100%** |

---

## 3. Tree-Shaking Hygiene
- Ensure package imports use named ES module syntax (`import { debounce } from 'lodash-es'`), not CommonJS namespace imports (`import * as _ from 'lodash'`).
- Verify `"sideEffects": false` is declared in custom library `package.json` manifests.
