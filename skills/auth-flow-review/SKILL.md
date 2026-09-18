---
name: auth-flow-review
description: Use when designing or auditing authentication systems, OAuth2/OIDC flows, JWT verification, session security, and authorization rules.
---

# Authentication & Authorization Architecture Protocol

Authentication (who the user is) and Authorization (what the user is permitted to do) are the fundamental security perimeter of any software service.

---

## 1. Authentication Architecture Best Practices

### A. Session vs JWT Storage
- **Prefer HttpOnly, Secure, SameSite Cookies**: Never store session IDs or JWTs in `localStorage` or `sessionStorage` (which are vulnerable to XSS exfiltration).
- **Short-Lived Access Tokens + Refresh Tokens**:
  - Access Token: 10 - 15 minutes validity.
  - Refresh Token: Stored in an HttpOnly cookie with refresh token rotation enabled.

### B. OAuth 2.0 & OIDC Flow Discipline
- **Always use PKCE (Proof Key for Code Exchange)** for public clients (SPAs, mobile apps).
- **Validate `state` parameter**: Protect against Cross-Site Request Forgery (CSRF) on callback endpoints.
- **Verify JWT Claims**:
  - Always verify `iss` (issuer), `aud` (audience), and `exp` (expiration).
  - Explicitly restrict acceptable signing algorithms (e.g. `algorithms: ['RS256']`). Never allow `alg: "none"`.

---

## 2. Authorization Design: RBAC & ABAC

### Role-Based Access Control (RBAC)
Enforce access control at the service layer using explicit guards:

```typescript
// NestJS / Express Guard Example
@UseGuards(AuthGuard, RolesGuard)
@Roles('ADMIN', 'PROJECT_LEAD')
@Delete(':projectId')
async deleteProject(@Param('projectId') id: string) { ... }
```

### Attribute-Based Access Control (ABAC / Resource Ownership)
Role checks are not enough. Always verify that the authenticated user owns or belongs to the target organization:

```typescript
// Ensure tenant / ownership isolation
const project = await db.project.findFirst({
  where: {
    id: projectId,
    tenantId: currentUser.tenantId, // Tenant isolation constraint
  }
});

if (!project) {
  throw new ForbiddenException('You do not have access to this resource');
}
```

---

## 3. Auth Review Checklist
- [ ] Are passwords validated for complexity ($\ge 12$ chars) and checked against compromised password lists?
- [ ] Is account lockout / exponential rate limiting enabled on `/login` and `/reset-password`?
- [ ] Are password reset tokens single-use and short-lived ($\le 15$ minutes)?
- [ ] Does logging out invalidate the server-side session or revoke the refresh token?
