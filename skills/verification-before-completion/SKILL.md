---
name: verification-before-completion
description: Use when about to claim work is complete, fixed, or passing, before finalizing responses, merging, or committing - requires running verification commands and confirming actual output before making any success claims; evidence before assertions always.
---

# Verification Before Completion Protocol

**Evidence Before Assertion**: Never claim a task is completed, a bug is resolved, or tests are passing without running the verification commands and inspecting the output in the same turn.

```
┌──────────────────────────────────────────────────────────┐
│              The Iron Gate of Verification               │
│                                                          │
│  1. Run Verification Command                             │
│  2. Inspect Real Output (Exit Code 0 + Green Assertions) │
│  3. Diff Sanity Check (Clean, No Debug Leftovers)        │
│  4. Cite Concrete Evidence in Final Response             │
└──────────────────────────────────────────────────────────┘
```

---

## 1. The 4-Step Verification Gate

### Step 1: Execute the Verification Suite
Execute the concrete automated command for the stack:

```bash
# 1. Type check
npm run typecheck # or tsc --noEmit / mypy / cargo check

# 2. Automated Test Suite
npm test # or pytest / cargo test / go test ./...

# 3. Linter & Formatting
npm run lint # or biome check / ruff / flake8

# 4. Production Build (When applicable)
npm run build
```

> **HARD GATE**: If any command fails or produces unexpected warnings, **you are not done**. Diagnose and resolve the failure immediately. Do not ask the user to test broken code.

---

### Step 2: Fresh-Eyes Diff Sanity Audit
Before declaring completion, review `git diff` across all modified files:
- [ ] **No leftover debug code**: Remove `console.log`, `print()`, `debugger;`, or temporary dump files.
- [ ] **No commented-out code**: Delete dead code blocks rather than leaving commented-out clutter.
- [ ] **No hardcoded test values**: Ensure temporary IDs, mock URLs, or bypasses (`if (true) return;`) are removed.
- [ ] **No unstaged secrets**: Verify no `.env` files or credentials are staged.

---

### Step 3: Frontend Visual & DevTools Audit (For UI Tasks)
If the task modified frontend code or styling:
- [ ] Viewport matrix verified at $375\text{px}$ (Mobile) and $1440\text{px}$ (Desktop).
- [ ] No horizontal scrollbars or element clipping (`overflow-x`).
- [ ] Browser console has zero unhandled runtime exceptions or 404 asset failures.

---

## 2. Standardized Completion Report Template

When delivering the final response, format the conclusion with verified evidence:

```markdown
## ✅ Verification & Validation Summary

### 1. Automated Verification Results
- **Typecheck**: `tsc --noEmit` passed with 0 errors.
- **Test Suite**: 24 of 24 tests passed (0 failures).
- **Linter**: Clean exit code 0.
- **Build**: Production bundle generated successfully in 2.1s.

### 2. Manual & Visual Checks
- Tested responsive layout at 375px mobile and 1440px desktop viewports.
- Zero horizontal overflow detected (`check-overflow.js` reported 0 culprits).
- Verified zero console errors.

### 3. Changes Ready to Ship
- All modifications are committed cleanly with conventional commit messages.
```
