---
name: continuous-context-discovery
description: Use throughout the development lifecycle to continuously inspect, verify, and read relevant codebase files (imports, schemas, components, contracts) before generating or modifying code.
---

# Continuous Context Discovery & Codebase Reading Protocol

High-reliability engineering requires continuous verification of active codebase state. Agents must never rely solely on a brief initial skim; they must actively inspect dependencies, sibling files, and interfaces throughout their implementation journey.

---

## 1. The Iterative "Read-Before-Write" Loop

```
┌────────────────────────────────────────────────────────┐
│ 1. Identify Target Boundary (Component / API / Store)  │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ 2. READ Current Files (Parent layout, DTOs, Schemas)   │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ 3. Author / Modify Code matching real patterns         │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ 4. Read sibling & consuming files to verify interface  │
└────────────────────────────────────────────────────────┘
```

---

## 2. Checkpoint Reading Requirements

| Development Step | Mandatory Files to Read BEFORE Writing Code |
| :--- | :--- |
| **Adding a UI Component** | Read parent layout container, theme/token CSS files, and 1 existing sibling component to mirror styling patterns. |
| **Calling a Backend Endpoint** | Read the backend route definition, request validator schema (Zod/Pydantic), and controller return shape. |
| **Writing a DB Query** | Read the database schema migration / ORM model file (`schema.prisma`, `schema.ts`) to verify exact column names and nullability. |
| **Writing / Updating a Test** | Read the test setup/mock fixtures and test configuration (`vitest.config.ts`, `playwright.config.ts`). |
| **Importing a Library** | Read `package.json` to verify the installed package version and look for existing usage patterns in the repository. |

---

## 3. Anti-Pattern: "Generate and Hope"
- **Never guess**: If unsure whether a prop is `userId` or `user_id`, read the type definition file.
- **Never assume CSS classes**: If unsure how dark mode is handled (Tailwind `dark:` class vs CSS custom properties), read `index.css` or `tailwind.config.js`.
- **Never blind-create duplicate utilities**: Search `utils/` or `lib/` before writing helper functions (e.g. date formatters, cn class merge utilities).
