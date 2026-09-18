---
name: react-performance-optimization
description: Use when diagnosing React re-render cascades, optimizing component renders with memoization, virtualizing large lists, and leveraging Concurrent React features.
---

# React Performance Optimization Protocol

React is fast by default, but uncontrolled re-render cascades, unnecessary context updates, and un-virtualized DOM trees can cause noticeable frame drops and sluggish UI.

---

## 1. Diagnosing Re-Renders (React DevTools Profiler)

1. Open **React DevTools** -> **Profiler** tab.
2. Enable: *"Highlight updates when components render"* in settings.
3. Click **Record**, interact with the slow UI, and click **Stop**.
4. Identify:
   - **Flamegraph view**: Components colored yellow/red represent heavy render times.
   - **Why did this render?**: DevTools will tell you whether a prop, state, or hook changed.

---

## 2. Memoization Rules of Thumb

Do not wrap every function and object in `useCallback`/`useMemo` blindly (which adds memory overhead).

### When to use `React.memo` & `useCallback`:
- When passing a callback or object to an expensive, memoized child component.
- When passing functions as dependencies in `useEffect` dependency arrays.
- When computing heavy transformations on large datasets ($>1000$ items).

```tsx
// OPTIMIZED PATTERN
interface ItemListProps {
  items: Item[];
  onItemSelect: (id: string) => void;
}

// 1. Memoize heavy child
const MemoizedRow = React.memo(function Row({ item, onSelect }: { item: Item; onSelect: (id: string) => void }) {
  return <li onClick={() => onSelect(item.id)}>{item.name}</li>;
});

export function ItemList({ items, onItemSelect }: ItemListProps) {
  // 2. Stable function reference prevents child re-renders
  const handleSelect = useCallback((id: string) => {
    onItemSelect(id);
  }, [onItemSelect]);

  // 3. Memoize expensive sorting/filtering
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => b.score - a.score);
  }, [items]);

  return (
    <ul>
      {sortedItems.map(item => (
        <MemoizedRow key={item.id} item={item} onSelect={handleSelect} />
      ))}
    </ul>
  );
}
```

---

## 3. List Virtualization (TanStack Virtual)

Never render $>100$ complex DOM nodes simultaneously. Virtualize the list so only visible items are mounted:

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

export function VirtualizedList({ rows }: { rows: string[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48, // 48px row height
    overscan: 5,
  });

  return (
    <div ref={parentRef} className="h-[400px] overflow-auto border rounded-lg">
      <div style={{ height: `${virtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
        {virtualizer.getVirtualItems().map(virtualItem => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
            className="flex items-center px-4 border-b hover:bg-slate-50"
          >
            {rows[virtualItem.index]}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 4. Concurrent React: `useTransition` & `useDeferredValue`

Prevent slow list filtering from freezing user keystrokes in search inputs:

```tsx
import { useState, useTransition } from 'react';

export function SearchFilter({ allItems }: { allItems: Item[] }) {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(allItems);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setQuery(text); // Immediate urgent update for the input text

    // Non-urgent transition: React can interrupt this if the user types again
    startTransition(() => {
      const results = allItems.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
      setFilteredItems(results);
    });
  };

  return (
    <div>
      <input value={query} onChange={handleSearch} placeholder="Search items..." className="p-2 border rounded" />
      {isPending && <span className="text-xs text-slate-500 ml-2">Updating...</span>}
      <ItemList items={filteredItems} />
    </div>
  );
}
```
