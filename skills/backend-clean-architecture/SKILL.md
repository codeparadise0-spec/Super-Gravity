---
name: backend-clean-architecture
description: Use when structuring backend applications, implementing Controller-Service-Repository patterns, applying Domain-Driven Design (DDD), and managing dependency injection.
---

# Backend Clean Architecture & Layered Design

Clean Architecture enforces strict boundaries between transport protocols (HTTP/gRPC/GraphQL), domain business logic, and infrastructure adapters (Databases, Third-Party APIs, Message Brokers).

---

## 1. The 3-Layer Dependency Rule

```
[Transport / Controller Layer] ──> [Domain / Service Layer] ──> [Data Access / Repository Layer]
   (HTTP, DTOs, Routing)           (Pure Business Rules)             (Database, ORM, SQL)
```

> **The Dependency Inversion Principle**: The Domain / Service layer must NEVER import directly from database drivers or transport frameworks. Higher-level business logic defines repository interfaces; infrastructure implements them.

---

## 2. Concrete Node/TypeScript Implementation

### Layer 1: Domain / Entity & Repository Interface
```typescript
// domain/user/user.entity.ts
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

// domain/user/user.repository.interface.ts
export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
```

### Layer 2: Service / Application Business Logic
```typescript
// services/user.service.ts
import { IUserRepository } from '../domain/user/user.repository.interface';
import { User } from '../domain/user/user.entity';

export class UserService {
  // Dependency Injection via constructor
  constructor(private readonly userRepo: IUserRepository) {}

  async registerUser(email: string, passwordHash: string): Promise<User> {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) {
      throw new ConflictError(`User with email ${email} already exists`);
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      passwordHash,
      createdAt: new Date(),
    };

    await this.userRepo.save(newUser);
    return newUser;
  }
}
```

### Layer 3: Infrastructure / Repository Implementation
```typescript
// infrastructure/database/prisma-user.repository.ts
import { IUserRepository } from '../../domain/user/user.repository.interface';
import { User } from '../../domain/user/user.entity';
import { PrismaClient } from '@prisma/client';

export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.create({ data: user });
  }
}
```

### Layer 4: Transport / Controller
```typescript
// controllers/user.controller.ts
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  constructor(private readonly userService: UserService) {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await this.userService.registerUser(email, password);
      // Return clean DTO (never leak passwordHash)
      res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
      next(err);
    }
  }
}
```

---

## 3. Benefits & Verification
- **100% Testable**: Services can be unit-tested in $<5\text{ms}$ by passing an in-memory mock repository without touching a real database.
- **Database Agnostic**: Swapping ORMs (e.g. Prisma -> Drizzle -> Kysely) only requires touching the infrastructure adapter; zero changes to business logic.
