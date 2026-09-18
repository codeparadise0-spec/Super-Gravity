---
name: ci-cd-pipeline
description: Use when building, optimizing, or troubleshooting Continuous Integration and Continuous Deployment (CI/CD) pipelines (GitHub Actions, GitLab CI).
---

# CI/CD Pipeline Architecture & Optimization

Fast, reliable CI/CD pipelines provide rapid feedback to engineers and ensure that only verified, secure code reaches production.

---

## 1. High-Performance Pipeline Architecture

```
[Push / PR]
    │
    ├── Step 1: Lint & Typecheck (Parallel)
    ├── Step 2: Security & Dependency Scan (Parallel)
    └── Step 3: Unit Tests (Parallel)
            │
            ▼ (Gated on Steps 1-3 Success)
    ├── Step 4: Integration / E2E Tests
            │
            ▼ (Gated on Step 4 + Merged to Main)
    └── Step 5: Container Build & Staging Deploy
```

---

## 2. GitHub Actions Optimization Patterns

### Dependency Caching
Never download dependencies from scratch on every run. Cache package manager stores:

```yaml
- name: Setup Node.js & Cache Dependencies
  uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: 'npm' # or 'pnpm' / 'yarn'
```

### Path Filtering
Skip heavy pipeline runs if changes only touch markdown or documentation:

```yaml
on:
  push:
    branches: [main]
    paths-ignore:
      - '**.md'
      - 'docs/**'
      - '.gitignore'
```

### Concurrency Control
Cancel in-flight runs when new commits are pushed to the same PR branch:

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

---

## 3. Production Pipeline Checklist
- [ ] Are secrets passed via repository secrets (`${{ secrets.API_KEY }}`), never printed in job logs?
- [ ] Are third-party GitHub Actions pinned to immutable full-length commit SHAs?
- [ ] Is build caching configured for Docker layers (`cache-from: type=gha`)?
- [ ] Does the deploy job require explicit environment protection rules and approvals?
