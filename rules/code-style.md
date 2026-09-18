---
trigger: always_on
description: Architectural principles, code quality guidelines, and coding style constraints.
---

# Code Style & Engineering Principles

Enforce high engineering standards across all languages and frameworks.

## 1. Simplicity & YAGNI
- Write the simplest code that completely satisfies the requirements.
- Avoid speculative generalization, premature abstractions, and unused utility functions.
- Prefer explicit, readable code over clever one-liners or esoteric metaprogramming.

## 2. Modularity & Single Responsibility
- Each module, class, or function should have one well-defined responsibility.
- Keep functions small (under 30-50 lines where feasible). If a function does multiple distinct things, decompose it into focused helper functions.
- Keep file sizes manageable (typically under 200-300 lines). When a file grows beyond this, extract cohesive sub-modules.

## 3. Type Safety & Boundary Validation
- Enforce strict typing (TypeScript, typed Python, Go, Rust). Never use `any` as an escape hatch unless strictly interfacing with an untyped third-party legacy module, and document why.
- Validate all untrusted input at boundaries (API endpoints, CLI args, environment variables, webhooks) using schema validators (e.g., Zod, Pydantic, Joi).

## 4. Error Handling & Observability
- Fail fast and fail clearly. Errors should contain actionable context: what failed, with what inputs, and how to recover.
- Never use print statements for production logging. Use structured loggers with log levels (`debug`, `info`, `warn`, `error`) and structured metadata.

## 5. UI & Styling Discipline
- Avoid hardcoded magic numbers in CSS. Use design tokens, CSS variables, or semantic spacing scales.
- Ensure all interactive elements have visible `:focus-visible` focus indicators and meet WCAG touch target sizes ($\ge 48 \times 48\text{px}$).
- Guarantee responsive layouts without horizontal scrolling (`overflow-x`) on viewports down to 360px width.
