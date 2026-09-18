---
name: pr-and-ship
description: Use when preparing, validating, and submitting a pull request or shipping a completed feature branch to production.
---

# PR & Shipping Protocol

This skill enforces strict pre-flight validation, commit hygiene, PR documentation standards, and deployment readiness before shipping code.

---

## 1. Pre-Flight Verification Checklist

Before opening a pull request or proposing a merge, run this automated pre-flight sequence:

```bash
# 1. Type check
npm run typecheck # or tsc --noEmit / mypy / cargo check

# 2. Linter & Formatter
npm run lint # or biome check / ruff / flake8

# 3. Automated Test Suite
npm test # or pytest / cargo test / go test ./...

# 4. Production Build
npm run build # verify bundle succeeds with zero errors
```

> **GATE**: If any step fails, STOP. Fix the failure and rerun the pre-flight checks. Never push code that breaks build or test gates.

---

## 2. Commit Hygiene

- **Conventional Commits**: Format commit messages consistently:
  - `feat(scope): add user profile avatar upload`
  - `fix(auth): handle expired refresh token race condition`
  - `refactor(db): extract query builder into repository layer`
  - `test(billing): add test cases for prorated refunds`
- **Clean Git History**:
  - Rebase against `main`/`master` to prevent messy merge conflicts.
  - Squash messy WIP ("fix typo", "try again") commits into cohesive logical units.

---

## 3. PR Description Template

Every Pull Request must be generated with this structure:

```markdown
## Summary of Changes
- Concise bullet points describing what was added, modified, or removed.

## Motivation & Context
- Why is this change necessary? Reference issue ticket (e.g. `Fixes #123`).

## Technical Decisions & Tradeoffs
- Why this approach was chosen over alternatives.
- Any new dependencies introduced and their bundle weight / licensing.

## Verification & Testing Performed
- [x] Automated unit/integration tests added and passing (`npm test`).
- [x] Manual testing completed (describe scenarios verified).
- [x] DevTools responsive layout verified across mobile, tablet, and desktop.
- [x] Zero console errors in production build.

## Screenshots / Video (For UI changes)
[Embed before / after screenshots or DevTools captures]

## Migration / Deployment Instructions
- Any environment variable changes (`.env.example` updated).
- Database migrations to run before/after deployment.
```
