---
trigger: always_on
description: Unconditionally enforces the Super Gravity Domain Redirection & Skill Router across all disciplines (Frontend, Backend, React/Next.js, Database, DevOps, QA, Architecture).
---

# 🔀 Mandatory Domain Redirection & Skill Routing Rule

Whenever the agent is prompted with ANY engineering task, the agent is **STRICTLY AND UNCONDITIONALLY REQUIRED** to inspect [`skills/super-gravity/SKILL_ROUTER.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/super-gravity/SKILL_ROUTER.md) and execute the mandatory skill sequence matching the domain(s) of the request.

---

## 🧭 The Master IF-THEN Redirection Table

| IF The User Prompt or Task Involves... | THEN The Agent MUST Actively Call `view_file` on and Execute: |
| :--- | :--- |
| 🎨 **Frontend / Landing Page / Website / UI / Animation** | 1. `assets/examples/` (1-3 images with `view_file`)<br>2. `skills/mind-blowing-animations/WORLD_CLASS_SHOWCASE_BREAKDOWN.md`<br>3. `skills/frontend-design/SKILL.md` & `skills/vanilla-css-tokens/SKILL.md`<br>4. `skills/minimalist-ui-composition/SKILL.md` & `skills/glassmorphism-and-depth/SKILL.md`<br>5. `skills/mind-blowing-animations/SKILL.md` & `skills/micro-interactions/SKILL.md`<br>6. `skills/responsive-devtools-inspection/SKILL.md` (`check-overflow.js` + `devtools-audit.js`) |
| 🛠️ **Backend / Microservices / API / Server / Queues** | 1. `skills/backend-clean-architecture/SKILL.md`<br>2. `skills/data-validation/SKILL.md` (Zod/Pydantic schemas)<br>3. `skills/fastify-high-performance/SKILL.md` OR `skills/nestjs-modular-architecture/SKILL.md`<br>4. `skills/api-design/SKILL.md` / `skills/graphql-api-design/SKILL.md` / `skills/grpc-and-protobuf/SKILL.md`<br>5. `skills/backend-security-and-rate-limiting/SKILL.md` & `skills/backend-resilience-and-jobs/SKILL.md` |
| ⚛️ **React / Next.js / Fullstack Web App** | 1. `skills/nextjs-app-router-patterns/SKILL.md` & `skills/nextjs-server-actions/SKILL.md`<br>2. `skills/react-suspense-streaming/SKILL.md` & `skills/react-component-patterns/SKILL.md`<br>3. `skills/zustand-state-architecture/SKILL.md` & `skills/state-and-cache/SKILL.md`<br>4. `skills/react-forms-and-validation/SKILL.md` & `skills/react-headless-ui/SKILL.md`<br>5. `skills/react-error-boundaries/SKILL.md` & `skills/react-performance-optimization/SKILL.md` |
| 🗄️ **Database / SQL / Postgres / ORM / Redis** | 1. `skills/drizzle-orm-mastery/SKILL.md` OR `skills/prisma-advanced-modeling/SKILL.md`<br>2. `skills/db-migration/SKILL.md` (Zero-downtime expand-contract)<br>3. `skills/postgres-advanced-indexing/SKILL.md` & `skills/postgres-transactions-and-isolation/SKILL.md`<br>4. `skills/query-optimization/SKILL.md` (EXPLAIN ANALYZE)<br>5. `skills/redis-caching-patterns/SKILL.md` & `skills/database-connection-pooling/SKILL.md` |
| 🚢 **DevOps / Docker / CI/CD / Cloud / Security** | 1. `skills/docker-multi-stage-builds/SKILL.md` & `skills/kubernetes-manifest-design/SKILL.md`<br>2. `skills/github-actions-ci-cd-matrix/SKILL.md` & `skills/deployment-protocol/SKILL.md`<br>3. `skills/security-review/SKILL.md`, `skills/auth-flow-review/SKILL.md` & `skills/secrets-hygiene/SKILL.md`<br>4. `skills/opentelemetry-tracing/SKILL.md` & `skills/observability-setup/SKILL.md` |
| 🔬 **Testing / QA / Debugging / Verification** | 1. `skills/tdd-workflow/SKILL.md` & `skills/debugging-protocol/SKILL.md`<br>2. `skills/e2e-testing/SKILL.md` (Playwright) & `skills/load-testing/SKILL.md`<br>3. `skills/performance-profiling/SKILL.md` & `skills/memory-leak-hunting/SKILL.md`<br>4. `skills/verification-before-completion/SKILL.md` (Evidence before assertion) |
| 🏛️ **Architecture / Refactoring / Tech Debt** | 1. `skills/architecture-decisions/SKILL.md` (ADR authoring)<br>2. `skills/system-design-review/SKILL.md` & `skills/tech-debt-triage/SKILL.md`<br>3. `skills/safe-refactor/SKILL.md` & `skills/migration-planning/SKILL.md`<br>4. `skills/legacy-code-navigation/SKILL.md`, `skills/doc-sync/SKILL.md` & `skills/changelog-writing/SKILL.md` |

---

## 🚫 Prohibited Execution Anti-Patterns

1. **Blind Coding**: Writing backend, frontend, or database code without first calling `view_file` on the governing skill files from the router table above.
2. **Skipping DevTools Verification**: Completing frontend tasks without running `check-overflow.js` and `devtools-audit.js`.
3. **Skipping Boundary Validation**: Writing API route handlers without strict Zod / Pydantic schema parsers.
