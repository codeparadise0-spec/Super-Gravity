---
name: legacy-code-navigation
description: Use when exploring, mapping, or understanding an unfamiliar, complex, or undocumented codebase before making modifications.
---

# Legacy Code Navigation & Cartography

Modifying an unfamiliar codebase without understanding its architecture leads to unintended side effects, architectural degradation, and breakage. Use this cartography workflow to map the terrain first.

---

## 4-Step Cartography Workflow

```
1. Entry Points & Routing  ──>  2. Dependency Graphing  ──>  3. Data Modeling  ──>  4. Execution Tracing
```

### 1. Identify Entry Points & Routing
- **Find the application boots**:
  - Web/API: `index.ts`, `main.go`, `app.py`, `server.ts`, routes directory.
  - CLI: `cli.ts`, `main.rs`, `bin/`.
- **Map the boundary interfaces**:
  - What HTTP routes, GraphQL queries/mutations, CLI commands, or message queue subscribers exist?
  - Identify how requests flow from entry point to business logic.

### 2. Dependency & Module Graphing
- Locate configuration manifests (`package.json`, `Cargo.toml`, `go.mod`, `pyproject.toml`).
- Review core architectural patterns:
  - Is it a monolith, modular monolith, or microservices?
  - Is it layered (Controller -> Service -> Repository), hexagonal, or feature-sliced?
- Identify core shared utilities (`lib/`, `utils/`, `common/`).

### 3. Data & State Modeling
- Inspect database schemas, migrations (`prisma/schema.prisma`, `migrations/`, ORM models).
- Identify core domain entities (e.g., `User`, `Organization`, `Order`, `Transaction`) and their relationships (1-to-many, many-to-many).
- Inspect global state stores (Redux, Zustand, React Context, Redis cache keys).

### 4. Execution Tracing (Read before Edit)
- Pick a critical user flow (e.g. "User registers and pays for subscription").
- Trace execution step-by-step through function calls across files.
- Document any surprising behaviors, global mutable state, or legacy workarounds before writing code.

---

## Output: Architecture Map Artifact
Summarize findings in a quick architecture memo:
- **Core Stack**: Frameworks, ORM, DB, styling engine.
- **Entry Points**: Where execution starts.
- **Key Modules**: Primary folders and their responsibilities.
- **Identified Hazards**: Tangled dependencies, missing test coverage, fragile areas.
