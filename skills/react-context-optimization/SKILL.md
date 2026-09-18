---
name: react-context-optimization
description: Use when designing React Context architectures, splitting state from dispatch, preventing re-render cascades, and using selector patterns.
---

# React Context Optimization Protocol

React Context is a dependency injection mechanism, not a high-frequency state management engine. Misconfigured Context triggers re-renders on every consuming component whenever any sub-property changes.

---

## 1. The State / Dispatch Split Pattern

Always split read-only state from update actions. Components that only trigger actions (like buttons) will never re-render when state changes:

```tsx
import React, { createContext, useContext, useReducer, useMemo } from 'react';

// 1. Separate Contexts
const AuthStateContext = createContext<AuthState | null>(null);
const AuthDispatchContext = createContext<AuthDispatch | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // Memoize dispatch actions object
  const actions = useMemo(() => ({
    login: (user: User) => dispatch({ type: 'LOGIN', payload: user }),
    logout: () => dispatch({ type: 'LOGOUT' }),
  }), []);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={actions}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

// 2. Custom Consumer Hooks
export function useAuthState() {
  const context = useContext(AuthStateContext);
  if (!context) throw new Error('useAuthState must be inside AuthProvider');
  return context;
}

export function useAuthActions() {
  const context = useContext(AuthDispatchContext);
  if (!context) throw new Error('useAuthActions must be inside AuthProvider');
  return context;
}
```

---

## 2. When to Migrate from Context to Zustand
- If state updates occur multiple times per second (e.g. mouse tracking, streaming data, complex canvas editing).
- If components only need a small slice of an object (e.g. `state.user.preferences.theme`). Migrate to Zustand with selector subscriptions.
