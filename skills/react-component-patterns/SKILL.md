---
name: react-component-patterns
description: Use when building or refactoring React components, designing custom hooks, structuring Server/Client component boundaries, and preventing hydration mismatches.
---

# React Component Patterns & Architecture

High-quality React applications leverage composable component patterns, cleanly separate Client and Server boundaries, and encapsulate reusable logic into custom hooks.

---

## 1. Server Components (RSC) vs Client Components

### The Golden Rule of Boundaries
- **Default to Server Components**: Keep data fetching, database access, and heavy libraries on the server.
- **Push `'use client'` to the Leaves**: Only mark components with `'use client'` when they require:
  - React state (`useState`, `useReducer`) or lifecycle effects (`useEffect`).
  - Browser DOM APIs (`window`, `localStorage`, `navigator.geolocation`).
  - Interactive event listeners (`onClick`, `onChange`, `onSubmit`).

```tsx
// SERVER COMPONENT (app/users/page.tsx)
import { db } from '@/lib/db';
import { UserCard } from './UserCard'; // Client Component

export default async function UsersPage() {
  // Direct DB query on server (Zero client-side JS bundle overhead)
  const users = await db.user.findMany();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Team Directory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </main>
  );
}
```

---

## 2. The Compound Component Pattern

Build flexible, composable UI components (Tabs, Accordions, Dropdowns) that share implicit state without prop drilling:

```tsx
// components/Accordion.tsx
import React, { createContext, useContext, useState } from 'react';

interface AccordionContextType {
  openItem: string | null;
  toggleItem: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

export function Accordion({ children }: { children: React.ReactNode }) {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggleItem = (id: string) => setOpenItem(prev => prev === id ? null : id);

  return (
    <AccordionContext.Provider value={{ openItem, toggleItem }}>
      <div className="border border-slate-200 rounded-lg divide-y divide-slate-200">{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionItem must be used within Accordion');

  const isOpen = context.openItem === id;

  return (
    <div>
      <button
        onClick={() => context.toggleItem(id)}
        aria-expanded={isOpen}
        className="w-full flex justify-between p-4 font-medium text-left hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <span>{title}</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {isOpen && <div className="p-4 bg-slate-50 text-slate-700 text-sm">{children}</div>}
    </div>
  );
}
```

---

## 3. Hydration Safety & Client-Only Rendering

Avoid hydration mismatch errors (`Text content did not match server-rendered HTML`):

```tsx
// hooks/useIsMounted.ts
import { useState, useEffect } from 'react';

export function useIsMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

// Usage in client component showing browser-only data (e.g. localStorage or timezones)
export function ClientFormattedDate({ date }: { date: Date }) {
  const isMounted = useIsMounted();
  if (!isMounted) return <span className="opacity-0">Loading...</span>;

  return <span>{new Intl.DateTimeFormat().format(new Date(date))}</span>;
}
```

---

## 4. Custom Hook Design Principles
- **Single Responsibility**: One hook should manage one stateful concern (e.g., `useDebounce`, `useLocalStorage`, `useMediaQuery`).
- **Return Objects for Extensibility**: Return an object `{ data, isLoading, error, refetch }` rather than a tuple when returning $>2$ values.
- **Cleanup Everything**: Clean up event listeners, timers, web sockets, and abort controllers inside `useEffect` cleanup returns.
