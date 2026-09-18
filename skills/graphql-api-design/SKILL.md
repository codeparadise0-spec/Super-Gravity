---
name: graphql-api-design
description: Use when designing GraphQL schemas, preventing N+1 queries with DataLoader, configuring query complexity limits, and implementing resolvers.
---

# GraphQL Schema Design & DataLoader Architecture

GraphQL provides precise client-driven data fetching. However, nested queries easily introduce catastrophic $N+1$ database performance degradation and DoS vulnerabilities without DataLoader batching and depth limiting.

---

## 1. Batching with DataLoader (Eliminating $N+1$)

Never query relationships individually inside field resolvers:

```typescript
import DataLoader from 'dataloader';
import { db } from './db';

// Batch loader function accepts an array of keys and returns an array of matching values
export function createAuthorLoader() {
  return new DataLoader<string, Author>(async (authorIds) => {
    // Single database query for ALL author IDs in the current execution tick
    const authors = await db.author.findMany({
      where: { id: { in: authorIds as string[] } },
    });

    const authorMap = new Map(authors.map(a => [a.id, a]));
    return authorIds.map(id => authorMap.get(id) || null);
  });
}

// Resolver
export const resolvers = {
  Book: {
    author: (book, args, context) => {
      // Batches into a single DB query across all books
      return context.loaders.authorLoader.load(book.authorId);
    },
  },
};
```

---

## 2. Query Complexity & Depth Limiting (DoS Prevention)

Protect against malicious recursive queries (e.g. `author { books { author { books { ... } } } }`):

```typescript
import { createComplexityLimitRule } from 'graphql-validation-complexity';
import depthLimit from 'graphql-depth-limit';

const server = new ApolloServer({
  schema,
  validationRules: [
    depthLimit(5), // Maximum nested query depth: 5
    createComplexityLimitRule(1000), // Maximum calculated query complexity
  ],
});
```
