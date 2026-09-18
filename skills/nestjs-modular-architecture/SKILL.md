---
name: nestjs-modular-architecture
description: Use when building enterprise-grade backend services with NestJS, organizing feature modules, custom interceptors, guards, and dependency injection.
---

# NestJS Enterprise Modular Architecture

NestJS provides an out-of-the-box application architecture for TypeScript servers, leveraging modular organization, Dependency Injection, and Aspect-Oriented Programming (AOP).

---

## 1. Feature Module Structure

Each feature must be encapsulated in its own module:

```
src/
├── users/
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── entities/user.entity.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── auth/
├── database/
├── app.module.ts
└── main.ts
```

---

## 2. Guard, Pipe & Interceptor Sequence

```
Incoming Request
      │
      ▼
1. Guards (Authentication & RBAC Permissions)
      │
      ▼
2. Interceptors (Pre-Controller: Logging / Metrics)
      │
      ▼
3. Pipes (Validation via class-validator & DTO Transformation)
      │
      ▼
4. Controller Action Handler
      │
      ▼
5. Interceptors (Post-Controller: Response Transformation / Caching)
      │
      ▼
6. Exception Filters (Catch & Format RFC 7807 Error Responses)
```

---

## 3. Global Validation Pipe Configuration
```typescript
// main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips non-whitelisted properties
      forbidNonWhitelisted: true, // Throws 400 if unknown props passed
      transform: true, // Automatically casts types (string -> number/boolean)
    })
  );

  await app.listen(3000);
}
bootstrap();
```
