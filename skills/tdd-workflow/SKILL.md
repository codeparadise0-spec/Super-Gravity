---
name: tdd-workflow
description: Use when implementing new features, bug fixes, or behavioral changes to enforce strict Test-Driven Development (Red-Green-Refactor).
---

# Test-Driven Development (TDD) Workflow

This skill enforces disciplined Test-Driven Development. Writing implementation code before a failing test exists is strictly forbidden.

## The Three Laws of TDD

1. You must write a failing automated test before you write a single line of production code.
2. You must not write more of a unit test than is sufficient to fail (and not compiling is failing).
3. You must not write more production code than is sufficient to pass the one failing unit test.

---

## The Red-Green-Refactor Loop

```
┌───────────────────────────────────────────────┐
│ 1. RED: Write minimal failing test           │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│ 2. GREEN: Write simplest code to pass test    │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│ 3. REFACTOR: Clean code without breaking test │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
             (Repeat for next behavior)
```

### Phase 1: RED (Failing Test)
- **Identify unit of behavior**: Name the test clearly describing the expectation:
  `it('should calculate discount when cart total exceeds 100', () => { ... })`
- **Arrange-Act-Assert (AAA)**:
  - **Arrange**: Set up test fixtures, mocks, and inputs.
  - **Act**: Invoke the single method or function under test.
  - **Assert**: Verify output, return value, or side effects.
- **Run the test runner**: Ensure the test fails for the *expected reason* (e.g. function undefined or assertion failed), NOT because of a syntax error or misconfigured test setup.

### Phase 2: GREEN (Make It Pass)
- Write the minimal code necessary to make the failing test pass.
- Do not add speculative handling, extra parameters, or unrelated abstractions.
- Hardcoding return values ("fake it till you make it") is acceptable if needed to advance to the next test cycle.
- Run the test suite: Confirm test passes with green status.

### Phase 3: REFACTOR (Clean & Optimize)
- Remove duplication (DRY).
- Improve variable and function naming.
- Extract helper functions or classes if responsibilities are mixed.
- Keep tests running after every refactoring edit. All tests must remain 100% green.

---

## Edge Case Testing Checklist
Before concluding a TDD cycle for a feature, ensure tests exist for:
- [ ] Null / undefined / None inputs.
- [ ] Empty inputs (empty string `""`, empty array `[]`, empty object `{}`).
- [ ] Boundary conditions (0, -1, max integer, length limits).
- [ ] Error conditions (invalid formats, network timeouts, duplicate IDs).
- [ ] Type mismatches and unexpected exceptions.
