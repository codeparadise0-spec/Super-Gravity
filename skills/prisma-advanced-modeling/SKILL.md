---
name: prisma-advanced-modeling
description: Use when authoring complex schema relationships with Prisma ORM, client extensions, soft delete middlewares, raw SQL casting, and query optimizations.
---

# Prisma ORM Advanced Modeling & Client Extensions

Prisma provides a readable modeling language and automated client generator. Master complex polymorphic relations, client extensions, and soft-delete filters.

---

## 1. Complex Relationships in `schema.prisma`

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["fullTextSearchPostgres"]
}

enum Role {
  USER
  ADMIN
  MODERATOR
}

model User {
  id        String    @id @default(uuid())
  email     String    @unique
  role      Role      @default(USER)
  posts     Post[]
  deletedAt DateTime? // Soft delete column
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  @@index([email])
  @@index([deletedAt])
  @@map("users")
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String   @db.Text
  authorId  String
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())

  @@index([authorId])
  @@map("posts")
}
```

---

## 2. Prisma Client Extension for Automated Soft Deletion

Automatically filter out soft-deleted records across all queries:

```typescript
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient().$extends({
  query: {
    user: {
      async findMany({ args, query }) {
        args.where = { ...args.where, deletedAt: null };
        return query(args);
      },
      async findFirst({ args, query }) {
        args.where = { ...args.where, deletedAt: null };
        return query(args);
      },
      async delete({ args, query }) {
        // Intercept delete and perform soft update
        return prisma.user.update({
          where: args.where,
          data: { deletedAt: new Date() },
        });
      },
    },
  },
});
```
