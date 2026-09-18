---
name: fastify-high-performance
description: Use when architecting ultra-fast Node.js HTTP servers with Fastify, JSON Schema serialization, plugin encapsulation, and lifecycle hooks.
---

# High-Performance Fastify Architecture

Fastify is up to 2x faster than Express due to its Ahead-of-Time (AOT) JSON Schema serialization (`fast-json-stringify`) and radix-tree route matching (`find-my-way`).

---

## 1. Schema-Based Routing & Serialization

Declaring input schemas and response schemas enables compile-time JSON serialization and automated validation:

```typescript
import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

const getUserSchema = {
  params: {
    type: 'object',
    required: ['userId'],
    properties: {
      userId: { type: 'string', format: 'uuid' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        // Strips any internal fields (e.g. passwordHash) automatically
      },
    },
  },
};

fastify.get('/api/users/:userId', { schema: getUserSchema }, async (request, reply) => {
  const { userId } = request.params as { userId: string };
  const user = await db.findUser(userId);
  if (!user) return reply.status(404).send({ message: 'User not found' });
  return user;
});
```

---

## 2. Plugin Encapsulation & Decorators

```typescript
import fp from 'fastify-plugin';

// Encapsulated Database Plugin
export const databasePlugin = fp(async (fastify, opts) => {
  const db = new DatabaseClient(process.env.DATABASE_URL);
  await db.connect();

  // Decorate fastify instance
  fastify.decorate('db', db);

  fastify.addHook('onClose', async (instance) => {
    await instance.db.disconnect();
  });
});
```
