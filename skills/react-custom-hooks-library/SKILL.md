---
name: react-custom-hooks-library
description: Use when building reusable custom React hooks for DOM observers, debouncing, local storage synchronization, and viewport tracking.
---

# Reusable Custom React Hooks Library

Battle-tested implementations for common stateful interactions that clean up resources properly and handle Server-Side Rendering (SSR).

---

## 1. `useDebounce`
Debounce fast-changing input values (e.g. search boxes) to avoid excessive API requests:

```typescript
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delayMs: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(handler);
  }, [value, delayMs]);

  return debouncedValue;
}
```

---

## 2. `useIntersectionObserver`
Lazy-load content or trigger animations when an element scrolls into view:

```typescript
import { useState, useEffect, useRef, RefObject } from 'react';

export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
): [RefObject<HTMLDivElement | null>, boolean] {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return [elementRef, isIntersecting];
}
```

---

## 3. `useOnClickOutside`
Detect clicks outside of a flyout menu or dropdown to close it:

```typescript
import { useEffect, RefObject } from 'react';

export function useOnClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
```
