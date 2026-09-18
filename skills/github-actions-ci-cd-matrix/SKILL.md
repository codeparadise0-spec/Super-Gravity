---
name: github-actions-ci-cd-matrix
description: Use when building multi-version test matrices, reusable workflows, container publishing, and environment deployments in GitHub Actions.
---

# GitHub Actions CI/CD Matrix & Reusable Workflows

Run test suites concurrently across multiple Node/OS environments and deploy securely to staging and production environments with automated approvals.

---

## 1. Parallel Test Matrix (`ci.yaml`)

```yaml
name: Continuous Integration

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test-matrix:
    name: Test Node ${{ matrix.node-version }} on ${{ matrix.os }}
    runs-on: ${{ matrix.os }}
    strategy:
      fail-fast: false
      matrix:
        node-version: [18.x, 20.x, 22.x]
        os: [ubuntu-latest]

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Typecheck
        run: npm run typecheck

      - name: Run Test Suite
        run: npm test -- --coverage
```

---

## 2. Environment Deploy Gate with GitHub Environments
- Define **`environment: production`** in your deploy job.
- Configure required reviewers and deployment branch rules in GitHub repository settings to guarantee human approval before production code pushes.
