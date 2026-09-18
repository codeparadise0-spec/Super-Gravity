---
name: data-validation
description: Use when validating untrusted data at system boundaries using schemas (Zod, Pydantic, JSON Schema), sanitizing inputs, and parsing payloads.
---

# Runtime Data Validation & Boundary Defense

Never trust external input. Validate data at every external boundary (HTTP requests, URL params, environment variables, webhooks, file uploads) using runtime schema validators.

---

## 1. The "Parse, Don't Validate" Principle

Instead of running ad-hoc `if` checks across your codebase, parse untrusted data into statically typed, validated domain models right at the perimeter. Once inside the application core, data is guaranteed valid by type definitions.

---

## 2. Zod Schema Example (TypeScript)

```typescript
import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email('Invalid email address format').toLowerCase().trim(),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100).trim(),
  age: z.number().int().min(18, 'Must be at least 18 years old').optional(),
  role: z.enum(['MEMBER', 'ADMIN', 'VIEWER']).default('MEMBER'),
  tags: z.array(z.string().min(1)).max(10).default([]),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;

// Middleware parsing
export function validateCreateUser(rawBody: unknown): CreateUserInput {
  const result = CreateUserSchema.safeParse(rawBody);
  if (!result.success) {
    throw new ValidationError(result.error.flatten());
  }
  return result.data; // Statically typed and guaranteed valid
}
```

---

## 3. Pydantic Model Example (Python)

```python
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List

class CreateUserModel(BaseModel):
    email: EmailStr
    name: str = Field(min_length=2, max_length=100)
    age: Optional[int] = Field(default=None, ge=18)
    tags: List[str] = Field(default_factory=list, max_length=10)

    class Config:
        str_strip_whitespace = True
```

---

## 4. Validation Rules
- **Reject unexpected fields (`strict()`)**: Prevent parameter injection or mass assignment vulnerabilities by stripping or rejecting unknown properties.
- **Fail early**: Reject invalid payloads before invoking database connections or computing expensive queries.
- **Human-readable error messages**: Return structured field-level validation errors so frontend clients can display targeted feedback.
