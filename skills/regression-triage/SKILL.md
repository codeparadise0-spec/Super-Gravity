---
name: regression-triage
description: Use when bisecting unexpected regressions, isolating minimal reproducible examples (MRE), and diagnosing when and why existing functionality broke.
---

# Regression Triage & Git Bisect Protocol

When existing behavior unexpectedly regresses, use binary search across git history to identify the exact commit responsible.

---

## 1. Automated Git Bisect Workflow

```bash
# 1. Start bisect mode
git bisect start

# 2. Mark current HEAD as broken
git bisect bad

# 3. Mark the last known working commit or tag
git bisect good v1.4.2

# 4. Automated test runner (bisect will run this on every midpoint commit)
git bisect run npm test -- --grep "should process payment successfully"
```

Git will automatically checkout midpoints, execute the test, and identify the first commit that introduced the regression:
```
e4a8b291c is the first bad commit
commit e4a8b291c98129038d810293
Author: ...
Date: ...
    refactor: simplify checkout validation
```

---

## 2. Minimal Reproducible Example (MRE) Checklist

Once the regression is located, build a minimal reproducible example:
- **Strip away unrelated dependencies**: Reduce a 200-line scenario to a 10-line standalone test.
- **Static inputs**: Remove dynamic timestamps or random IDs.
- **Freeze dependencies**: Ensure third-party package updates aren't masking the root cause.

---

## 3. Regression Prevention Posture
- **Never close a regression ticket without an automated regression test.**
- The test must fail when run against the bad commit and pass on the fix.
- Tag or comment the test with the regression issue ID (e.g. `it('handles null phone number regression [REG-401]', ...)`).
