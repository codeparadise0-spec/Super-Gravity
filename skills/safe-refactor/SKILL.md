---
name: safe-refactor
description: Use when restructuring, modernizing, or cleaning existing code without altering its external behavior or introducing regressions.
---

# Safe Refactoring Protocol

Refactoring is strictly the process of changing a software system's internal structure without altering its external behavior.

## Core Rules of Safe Refactoring

1. **Never refactor and change behavior in the same step.**
   - Commit 1: Pure refactor (tests pass, behavior identical).
   - Commit 2: New feature or behavior change.
2. **Never refactor without a green safety net.**
   - If tests do not exist, write characterization tests *before* modifying code.
3. **Take small, incremental steps.**
   - Run tests after every atomic change (renaming a symbol, extracting a function, inlining a variable).

---

## The 4-Step Refactoring Workflow

```
1. Characterize  ──>  2. Small Step  ──>  3. Verify Green  ──>  4. Commit
```

### 1. Establish Characterization Tests
Characterization tests pin down the current behavior (even bugs or idiosyncratic outputs) so you can detect unintended side effects:
- Capture existing inputs and outputs across boundary conditions.
- Run tests and verify 100% pass rate before starting.

### 2. Standard Refactoring Moves
Apply standard Fowler refactoring patterns:
- **Extract Function / Method**: Turn code fragments into named functions explaining *what* they do.
- **Extract Variable**: Replace complex boolean expressions with descriptive boolean variables.
- **Inline Temp**: Remove unnecessary temporary variables that add noise.
- **Move Function / Module**: Colocate functions with the data they operate on.
- **Replace Conditional with Polymorphism / Strategy**: Decompose monolithic `switch` or `if/else` ladders.
- **Introduce Parameter Object**: Group related arguments into a structured object or type.

### 3. Verification Checkpoints
- Run compiler / linter / type checker.
- Run unit test suite.
- If tests fail, **revert immediately** to the last green state (`git checkout -- .`) and try a smaller step. Do not debug a broken refactor with more speculative edits.

### 4. Atomic Git Commits
Commit after each logical refactoring move:
- `refactor(auth): extract token verification into helper function`
- `refactor(cart): replace magic numbers with pricing constants`
