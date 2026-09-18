---
name: security-review
description: Use when conducting security assessments, identifying OWASP Top 10 vulnerabilities, sanitizing untrusted inputs, and auditing attack surfaces.
---

# Security Review & OWASP Top 10 Protocol

Security must be designed into every endpoint and component, not bolted on as an afterthought.

---

## 1. OWASP Top 10 Attack Surface Checklist

### A. Broken Access Control (BAC)
- **IDOR (Insecure Direct Object References)**: Does querying `/api/documents/9821` verify that the authenticated user owns document `9821`?
- **Role Enforcement**: Are administrative routes checked on the server for admin role privileges? Never trust client-side route guards alone.

### B. Cryptographic Failures
- Passwords must be hashed using modern, memory-hard key derivation functions: **Argon2id** or **bcrypt** ($cost \ge 12$). Never use SHA-256 or MD5 for passwords.
- Enforce TLS 1.3 for all endpoints. Sensitive cookies must have `Secure; HttpOnly; SameSite=Strict` or `Lax`.

### C. Injection (SQL, NoSQL, OS Command)
- **SQL**: Use parameterized prepared statements or typed ORMs. Never concatenate raw user strings into SQL queries:
  ```typescript
  // SECURE
  await db.query('SELECT * FROM users WHERE id = $1', [userId]);
  // INSECURE (VULNERABLE)
  await db.query(`SELECT * FROM users WHERE id = '${userId}'`);
  ```
- **OS Commands**: Avoid `exec()` or shell interpolation. Use argument arrays with `execFile()` or `spawn()`.

### D. Insecure Design & SSRF
- **Server-Side Request Forgery (SSRF)**: If the server fetches URLs provided by users (e.g. webhook URLs, avatar imports), validate that the destination IP is not private/internal (`127.0.0.1`, `10.0.0.0/8`, `192.168.0.0/16`, AWS metadata endpoint `169.254.169.254`).

### E. Security Misconfiguration & CORS
- Set secure HTTP headers:
  - `Content-Security-Policy (CSP)`
  - `X-Content-Type-Options: nosniff`
  - `Strict-Transport-Security (HSTS)`
  - `X-Frame-Options: DENY`
- Never set CORS header to `Access-Control-Allow-Origin: *` when credentials (`cookies/tokens`) are included.
