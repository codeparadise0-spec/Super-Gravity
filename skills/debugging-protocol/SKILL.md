---
name: debugging-protocol
description: Use when investigating any bug, defect, test failure, crash, or unexpected behavior to diagnose root cause systematically before writing code fixes.
---

# Systematic Debugging Protocol

Random edits, guessing, and trial-and-error changes waste time and introduce regressions. Every bug investigation must follow this 4-phase protocol.

```
1. Reproduce  ──>  2. Isolate  ──>  3. Hypothesize  ──>  4. Verify & Fix
```

---

## Phase 1: Reproduce

Do not attempt to fix a bug you cannot reliably reproduce.

1. **Establish the minimal reproduction steps**:
   - Exact input payload, environment, arguments, and sequence of actions.
2. **Convert into an automated test**:
   - Create a failing unit or integration test reproducing the exact defect.
   - If the bug is transient or concurrency-related, simulate timing delays or state race conditions.
3. **Capture baseline evidence**:
   - Save full stack trace, error logs, and inspect variable values at failure point.

---

## Phase 2: Isolate

Narrow down the search space to the smallest possible boundary.

1. **Binary Search / Bisection**:
   - If the bug was recently introduced, use `git bisect` to locate the offending commit.
2. **Trace the Data Flow**:
   - Trace backwards from the point of failure:
     - Where was the invalid value created?
     - What function passed it?
     - What validation failed to catch it?
3. **Eliminate Variables**:
   - Strip away non-essential middleware, plugins, caching layers, or external network calls to isolate whether the failure is internal or external.

---

## Phase 3: Hypothesize

Formulate an explicit, testable hypothesis before touching production code.

1. **Draft the hypothesis statement**:
   > *"The defect occurs because `function X` assumes parameter `Y` is non-null, but during `condition Z`, the authentication token expiration causes `Y` to evaluate to undefined."*
2. **Identify the root cause category**:
   - State mutation / race condition
   - Off-by-one or boundary condition
   - Unhandled promise rejection / async timing mismatch
   - Type coercion or parsing error
   - Environment or configuration mismatch

---

## Phase 4: Verify & Fix

1. **Test the Hypothesis**:
   - Validate with a breakpoint, debugger, or targeted logging statement. Does the runtime state match your prediction?
2. **Implement the Targeted Fix**:
   - Apply the minimal, surgical fix directly addressing the root cause.
   - Do NOT paper over the symptom (e.g. adding `if (!x) return;` without understanding why `x` was null).
3. **Run the Reproduction Test**:
   - Confirm the automated reproduction test turns green.
4. **Run the Full Test Suite**:
   - Run the entire test suite to guarantee zero collateral regressions.
