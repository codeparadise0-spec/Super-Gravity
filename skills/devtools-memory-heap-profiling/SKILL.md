---
name: devtools-memory-heap-profiling
description: Use when diagnosing memory leaks, detached DOM nodes, closure retention, and shallow vs retained heap memory in Chrome DevTools Memory panel.
---

# Chrome DevTools Heap Snapshot & Memory Profiling

Memory leaks cause single-page applications to degrade over time and crash on low-memory mobile devices.

---

## 1. Shallow Size vs Retained Size

| Metric | Definition | Importance |
| :--- | :--- | :--- |
| **Shallow Size** | The memory held directly by the object itself (typically 32 to 64 bytes). | Minor. |
| **Retained Size** | The total memory that will be freed when this object is garbage collected (including everything it references). | **Critical**. High retained size indicates a root holding large data structures in memory. |

---

## 2. Diagnosing Detached DOM Trees

A detached DOM node occurs when an element is removed from the active HTML document (`parent.removeChild(node)`), but a JavaScript variable, array, or event listener callback still references it:

1. Open DevTools -> **Memory** tab -> **Heap snapshot** -> Take Snapshot.
2. In the Class filter box, type **`Detached`**.
3. Inspect `Detached HTMLDivElement` nodes:
   - Expand the tree to view the **Retainers** pane below.
   - Look for closure variables or global arrays keeping the element alive.
4. **Remediation**: Nullify event listeners and state references during component unmount (`useEffect` cleanup).
