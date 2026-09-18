---
name: dependency-audit
description: Use when scanning dependencies for known CVEs, auditing open-source supply chains, and resolving security vulnerabilities.
---

# Dependency Security Audit Protocol

Modern applications inherit 80-90% of their code from open-source dependencies. Secure the software supply chain against malicious packages, typosquatting, and known CVEs.

---

## 1. Automated Vulnerability Scanning

Run language-specific audit commands:

```bash
# Node.js
npm audit --audit-level=moderate
# or pnpm audit / yarn audit

# Python
pip-audit # or safety check

# Rust
cargo audit

# Go
govulncheck ./...
```

---

## 2. Vulnerability Assessment & Triage

When a vulnerability is detected, triage according to this hierarchy:

```
┌───────────────────────────────────────────────┐
│ 1. Is the vulnerable function actually called? │
└───────────────────────┬───────────────────────┘
                        │
         ┌──────────────┴──────────────┐
         ▼                             ▼
       [YES]                          [NO]
  Critical Risk                 Lower Priority
  Update or Patch               Document exemption
```

1. **Direct vs Transitive**:
   - Direct dependencies: Upgrade the version in your manifest (`package.json`, `pyproject.toml`).
   - Transitive dependencies: Use package manager overrides/resolutions (`overrides` in npm, `resolutions` in yarn/pnpm).
2. **Review Changelogs**: Check the package release notes for breaking changes before bumping major versions.
3. **Verify Lockfile Integrity**: Always commit `package-lock.json`, `pnpm-lock.yaml`, or `Cargo.lock` to ensure reproducible, tamper-proof builds.

---

## 3. Supply Chain Hardening Rules
- **Lock exact versions**: Avoid loose wildcards (`*`, `latest`) in production dependencies.
- **Enable Automated Bot Scans**: Keep Dependabot or Renovate active on repositories.
- **Audit New Dependencies**: Before introducing a new package, verify download volume, maintainer activity, license compatibility (MIT/Apache vs GPL), and recent releases.
