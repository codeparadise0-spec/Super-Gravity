---
name: state-and-cache
description: Use when designing client-side state architecture, data fetching, server cache synchronization (React Query/TanStack, SWR, Zustand), and optimistic UI updates.
---

# State Management & Server Cache Architecture

A clean separation between **server state** (asynchronous, remote, cached) and **client UI state** (synchronous, local, ephemeral) is critical to prevent stale data bugs and spaghetti architecture.

---

## 1. The State Classification Matrix

| State Type | Characteristics | Recommended Tool | Example |
| :--- | :--- | :--- | :--- |
| **Server Cache** | Asynchronous, shared, remote, requires invalidation/revalidation | TanStack Query, SWR, RTK Query | User profiles, list of projects, checkout carts |
| **Local UI State** | Synchronous, isolated to single component | Component state (`useState`, signals) | Modal open/close, accordion expansion, input drafts |
| **Global UI State** | Synchronous, shared across unrelated components | Zustand, Jotai, Pinia, Context | Active theme (dark/light), sidebar collapsed state, toast alerts |
| **URL State** | Shareable, bookmarkable, back-button aware | Search params (`useSearchParams`) | Active filter tabs, pagination page, sort order |

---

## 2. Invalidation & Cache Synchronization Patterns

### Invalidate on Mutation
Never manually mutate or reconcile complex nested cache structures when a simple refetch guarantees source-of-truth accuracy:

```typescript
// TanStack Query Mutation Pattern
const mutation = useMutation({
  mutationFn: updateProjectDetails,
  onSuccess: (data, variables) => {
    // Invalidate query to trigger automatic background refetch
    queryClient.invalidateQueries({ queryKey: ['projects', variables.projectId] });
  },
});
```

---

## 3. Optimistic UI Updates Protocol

Optimistic updates make an application feel instantaneous by rendering the anticipated result before the network request finishes.

### Safe Optimistic Update Workflow
1. **Cancel Outgoing Queries**: Stop in-flight queries from overwriting the optimistic state.
2. **Snapshot Previous State**: Save current cache data for rollback.
3. **Apply Optimistic Data**: Write predicted data to the cache immediately.
4. **On Error**: Roll back to the saved snapshot and display an actionable toast.
5. **On Settled**: Invalidate the query to ensure eventual consistency with the server.

```typescript
const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.toggleTodo,
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData(['todos']);

      queryClient.setQueryData(['todos'], (old: any[]) =>
        old.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
      );

      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      // Roll back cache on network failure
      queryClient.setQueryData(['todos'], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
```
