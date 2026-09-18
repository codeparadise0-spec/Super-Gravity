---
name: secrets-hygiene
description: Use when auditing code for exposed credentials, scanning git diffs for API keys, and managing environment variable security.
---

# Secrets Hygiene & Credential Protection

Hardcoded credentials represent one of the most common vectors for security breaches. Enforce zero-leakage discipline across all repositories.

---

## 1. Secrets Pre-Commit Scanning

Before committing code, scan changed files for common credential patterns:

```bash
# Search staged files for potential API keys and secrets
git diff --cached | grep -E -i "(api[_-]?key|secret|password|bearer|auth|token|private[_-]?key)\s*[:=]\s*['\"][0-9a-zA-Z_\-]{16,}['\"]"
```

Common credential signatures to block immediately:
- AWS Access Key IDs (`AKIA[0-9A-Z]{16}`)
- GitHub Personal Access Tokens (`ghp_[0-9a-zA-Z]{36}`)
- Stripe API Keys (`sk_live_[0-9a-zA-Z]{24}`)
- Private SSH / RSA Keys (`-----BEGIN OPENSSH PRIVATE KEY-----`)
- Database Connection URIs containing plaintext passwords (`postgres://user:password@host/db`)

---

## 2. Environment Variable Standards

1. **`.env` is in `.gitignore`**:
   Verify that `.env`, `.env.local`, `.env.production` are strictly tracked in `.gitignore`.
2. **Provide Sanitized `.env.example`**:
   Every required environment variable must be documented with safe placeholder values:
   ```env
   # Database Configuration
   DATABASE_URL="postgresql://postgres:your_password_here@localhost:5432/my_db"
   
   # Third-Party Integrations
   STRIPE_SECRET_KEY="sk_test_placeholder_key"
   JWT_SECRET="replace_with_32_byte_random_string"
   ```

---

## 3. Incident Response for Leaked Secrets
If a secret is accidentally committed:
1. **Assume Compromise Immediately**: The credential must be rotated in the service provider console immediately.
2. **Do Not Just Delete the File in a New Commit**: The secret persists in git history.
3. **Rewrite History**: Use `git-filter-repo` or BFG Repo-Cleaner to scrub the commit, then force-push only after team coordination.
