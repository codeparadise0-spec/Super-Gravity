---
name: react-suspense-streaming
description: Use when building instant-loading web apps with React Suspense, Server Component streaming, progressive hydration, and skeleton fallbacks.
---

# React Suspense & Streaming SSR Protocol

Streaming SSR breaks page rendering into chunks, allowing the browser to render critical HTML instantly while slow asynchronous data queries resolve in parallel.

---

## 1. Granular Suspense Boundaries Pattern

Never block an entire page because a single slow widget (e.g. analytics charts or recommended products) takes $800\text{ms}$:

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react';
import { QuickStats } from './QuickStats'; // Instant DB query (5ms)
import { SlowRevenueChart } from './SlowRevenueChart'; // Slow analytical query (600ms)
import { RecentActivityFeed } from './RecentActivityFeed'; // External API call (300ms)
import { ChartSkeleton, ActivitySkeleton } from './Skeletons';

export default function DashboardPage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Executive Dashboard</h1>

      {/* Rendered immediately in the initial HTML stream */}
      <QuickStats />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Streamed in as soon as chart computation finishes */}
        <Suspense fallback={<ChartSkeleton />}>
          <SlowRevenueChart />
        </Suspense>

        {/* Streamed in independently */}
        <Suspense fallback={<ActivitySkeleton />}>
          <RecentActivityFeed />
        </Suspense>
      </div>
    </main>
  );
}
```

---

## 2. Skeleton Screen Best Practices
- **Match Exact Dimensions**: The skeleton's height, width, and margin must match the resolved component to prevent Cumulative Layout Shift (CLS).
- **Subtle Pulse Animation**: Use CSS `animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite` with slate/zinc neutral tones.
