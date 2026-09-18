---
name: code-review
description: Use when evaluating pull requests, git diffs, or newly implemented code against security, performance, correctness, architecture, and maintainability standards.
---

# Checklist-Driven Code Review Protocol

This skill provides a rigorous review methodology. Reviews must never be superficial ("looks good to me"). Every review evaluates code through five structured lenses.

---

## The 5-Lens Review Checklist

### 1. Correctness & Logic
- [ ] Does the implementation fulfill the actual business requirements and acceptance criteria?
- [ ] Are all edge cases handled (empty lists, null/undefined, negative numbers, extreme values)?
- [ ] Are async operations properly awaited? Are promise errors caught?
- [ ] Is there any chance of race conditions, deadlocks, or stale closures?
- [ ] Are error states gracefully surfaced to the caller or user?

### 2. Security (OWASP Focus)
- [ ] **Injection**: Are all SQL, NoSQL, OS command, and LDAP queries parameterized?
- [ ] **XSS**: Is user-controlled input properly escaped before rendering in the DOM/HTML?
- [ ] **Auth & AuthZ**: Are authorization checks enforced on *every* endpoint, not just the client UI?
- [ ] **Secrets**: Are there any hardcoded keys, passwords, or tokens in the diff?
- [ ] **Rate Limiting & DoS**: Are expensive operations protected against unbounded requests or payload sizes?

### 3. Performance & Efficiency
- [ ] Are database queries optimized? Are there N+1 query patterns inside loops?
- [ ] What is the algorithmic complexity ($O(n)$, $O(n^2)$)? Can it handle production scale?
- [ ] Are large datasets paginated or streamed instead of loaded entirely into memory?
- [ ] Are expensive operations or static data appropriately cached?
- [ ] Frontend: Are re-renders minimized? Are large libraries imported selectively (tree-shaking)?

### 4. Architecture & Design
- [ ] Does this follow established codebase patterns and directory organization?
- [ ] Is there unnecessary coupling between components or modules?
- [ ] Does it adhere to the Single Responsibility Principle (SRP)?
- [ ] Is code DRY without falling into premature abstraction?
- [ ] Are types strict and meaningful (no unchecked `any` or loose casting)?

### 5. Test Quality & Coverage
- [ ] Do unit and integration tests cover new and changed code paths?
- [ ] Do tests assert behavior rather than implementation details?
- [ ] Are tests deterministic (no flaky time-dependent or network-dependent assertions)?
- [ ] Are error paths tested alongside the happy path?

---

## Review Output Format

Structure every review report as follows:

```markdown
## Code Review Summary: [Branch / PR Title]

### Verdict: [APPROVE | REQUEST CHANGES | COMMENT]

### Critical Issues (Must Fix Before Merge)
- **[Security/Correctness]** `path/to/file.ts:L45`: Description of defect and concrete code recommendation.

### Warnings & Suggestions (Non-blocking)
- **[Performance/Maintainability]** `path/to/file.ts:L112`: Optimization or readability suggestion.

### Positive Observations
- Note clean patterns, excellent test coverage, or elegant solutions.
```
