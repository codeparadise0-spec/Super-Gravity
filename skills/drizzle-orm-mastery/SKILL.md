---
name: drizzle-orm-mastery
description: Use when authoring type-safe SQL schemas with Drizzle ORM, running prepared statements, relational queries, and managing lightweight SQL migrations.
---

# Drizzle ORM Architecture & Query Mastery

Drizzle ORM is a lightweight, zero-overhead TypeScript ORM that mirrors raw SQL syntax while providing compile-time type safety.

---

## 1. Defining Schema with Relations (`schema.ts`)

```typescript
import { pgTable, text, timestamp, uuid, integer, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const userRoleEnum = pgEnum('user_role', ['MEMBER', 'ADMIN', 'OWNER']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  role: userRoleEnum('role').default('MEMBER').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  authorId: uuid('author_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  views: integer('views').default(0).notNull(),
});

// Relational Definitions
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));
```

---

## 2. High-Performance Relational Queries & Prepared Statements

```typescript
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq, sql } from 'drizzle-orm';
import * as schema from './schema';

const db = drizzle(pool, { schema });

// Prepared statement (Cached execution plan in Postgres)
const findUserByEmailPrepared = db.query.users.findFirst({
  where: (users, { eq }) => eq(users.email, sql.placeholder('userEmail')),
  with: {
    posts: {
      columns: { id: true, title: true },
      limit: 5,
    },
  },
}).prepare('find_user_by_email');

// Execute prepared query
const user = await findUserByEmailPrepared.execute({ userEmail: 'alice@example.com' });
```
