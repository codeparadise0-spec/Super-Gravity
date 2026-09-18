---
name: dependency-upgrade
description: Use when bumping package versions, reviewing dependency release notes for breaking changes, and safely upgrading frameworks.
---

# Safe Dependency Upgrade Protocol

Upgrading packages blindly frequently introduces subtle regressions, type mismatches, and runtime failures. Follow this incremental protocol.

---

## 1. The 4-Step Upgrade Protocol

```
1. Outdated Check  ──>  2. Changelog & Migration Audit  ──>  3. Incremental Bump  ──>  4. Verification Suite
```

### Step 1: Identify Outdated Dependencies
```bash
npm outdated
# or pnpm outdated / cargo outdated / pip list --outdated
```
Categorize updates:
- **Patch (1.2.0 -> 1.2.1)**: Bug fixes; low risk.
- **Minor (1.2.0 -> 1.3.0)**: New features; backward-compatible; medium risk.
- **Major (1.0.0 -> 2.0.0)**: Breaking changes; high risk.

### Step 2: Read Release Notes & Breaking Changes
Before upgrading a major or minor dependency:
- Locate the repository's `CHANGELOG.md` or GitHub Releases.
- Search for "Breaking Changes", "Deprecated", and "Migration Guide".
- Identify any APIs used in your project that were modified or removed.

### Step 3: Upgrade One Major Package at a Time
- Never run `npm update` across the entire project all at once.
- Upgrade one core package (e.g. `react`, `prisma`, `typescript`) individually.
- Update accompanying types (`@types/*`) simultaneously.

### Step 4: Full Verification Suite
After upgrading:
```bash
npm run typecheck
npm run lint
npm test
npm run build
```
If any test fails, resolve the deprecation or API change before moving to the next package.
