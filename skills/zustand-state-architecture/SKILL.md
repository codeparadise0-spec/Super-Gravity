---
name: zustand-state-architecture
description: Use when managing global React client state with Zustand, creating sliced stores, subscribing to atomic selectors, and configuring local storage persistence.
---

# Zustand Global State Architecture

Zustand provides a lightweight ($<1\text{KB}$), boilerplate-free state management library with automatic render optimizations through atomic selector subscriptions.

---

## 1. Slices Pattern for Large Application Stores

Organize complex stores into cohesive feature slices:

```typescript
// store/createCartSlice.ts
import { StateCreator } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartSlice {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const createCartSlice: StateCreator<CartSlice> = (set) => ({
  cart: [],
  addToCart: (item) => set((state) => {
    const existing = state.cart.find((i) => i.id === item.id);
    if (existing) {
      return {
        cart: state.cart.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i),
      };
    }
    return { cart: [...state.cart, { ...item, quantity: 1 }] };
  }),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((i) => i.id !== id) })),
  clearCart: () => set({ cart: [] }),
});
```

---

## 2. Combined Store with Persistence & DevTools Middleware

```typescript
// store/useAppStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { CartSlice, createCartSlice } from './createCartSlice';
import { UserSlice, createUserSlice } from './createUserSlice';

export type AppStore = CartSlice & UserSlice;

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (...a) => ({
        ...createCartSlice(...a),
        ...createUserSlice(...a),
      }),
      {
        name: 'app-storage',
        partialize: (state) => ({ cart: state.cart }), // Only persist cart, not user session
      }
    )
  )
);
```

---

## 3. Atomic Selector Subscriptions (Zero Unnecessary Re-Renders)

Always select the exact primitive or sub-property needed:

```tsx
// Re-renders ONLY when the cart item count changes (not when user profile changes)
export function CartBadge() {
  const itemCount = useAppStore((state) => state.cart.reduce((sum, item) => sum + item.quantity, 0));
  return <span className="badge">{itemCount}</span>;
}
```
