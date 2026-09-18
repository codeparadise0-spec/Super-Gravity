---
name: memory-leak-hunting
description: Use when diagnosing memory leaks, detached DOM nodes, uncleaned event listeners, and heap bloat using Chrome DevTools or Node.js heap snapshots.
---

# Memory Leak Hunting & Heap Snapshot Protocol

Memory leaks cause single-page applications (SPAs) and long-running backend services to gradually slow down, freeze, and crash with Out-Of-Memory (OOM) errors.

---

## 1. The 3-Snapshot Technique (Frontend DevTools)

Use Chrome DevTools **Memory** tab:

```
Take Snapshot 1 (Baseline)  ──>  Perform Action 10 Times  ──>  Take Snapshot 2  ──>  Force Garbage Collection  ──>  Take Snapshot 3
```

1. Open DevTools -> **Memory** -> Select **Heap snapshot**.
2. Click **Take snapshot** (Snapshot 1: Clean Baseline).
3. Perform the suspected action repeatedly (e.g. open and close a modal dialog 10 times).
4. Click the trash can icon (**Collect garbage**).
5. Take Snapshot 2.
6. In Snapshot 2 view, select **Objects allocated between Snapshot 1 and Snapshot 2**.
7. If the modal was destroyed, all its objects should have been garbage collected. Any surviving objects are leaked memory.

---

## 2. Common Causes of Leaks in Modern Web Apps

### A. Uncleaned Event Listeners / Timers
```typescript
// LEAK: Listener persists after component unmounts
useEffect(() => {
  const onResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', onResize);
  // Missing cleanup function!
}, []);

// FIXED: Always return cleanup function
useEffect(() => {
  const onResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
}, []);
```

### B. Detached DOM Nodes
A detached DOM node occurs when a node is removed from the DOM tree, but a JavaScript object (e.g. an array or global variable) still holds a reference to it.
- In Chrome DevTools heap snapshot, filter class names by `Detached`.
- Inspect the **Retainers** tree to find which closure or object holds the reference.

### C. Global Cache Without Eviction (Unbounded Maps)
- Never use a raw `new Map()` or `{}` as an in-memory cache without an eviction policy (LRU / TTL). It will grow unbounded.
- Use `lru-cache` or `WeakMap` where objects can be garbage collected when no other references exist.
