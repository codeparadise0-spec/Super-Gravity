---
name: deployment-protocol
description: Use when orchestrating releases, blue-green or canary deployments, monitoring post-deploy health, and executing rollback procedures.
---

# Production Deployment & Rollback Protocol

Deployments must be boring, predictable, and fully reversible. Adopt a "Rollback First, Diagnose Second" instinct.

---

## 1. Deployment Strategies

### A. Blue-Green Deployment
- Maintain two identical production environments (Blue = live, Green = idle).
- Deploy new release to Green environment.
- Run smoke tests and health checks against Green.
- Switch load balancer traffic router from Blue to Green instantaneously.
- Keep Blue alive for 1 hour as an instant rollback target.

### B. Canary Deployment
- Route 2% of live traffic to the new version.
- Observe error rates, latency ($p95/p99$), and CPU/memory saturation for 15 minutes.
- If error budget is healthy, increase to 10% -> 50% -> 100%.
- Automatically abort and route 100% back to stable if error rate increases by $>0.1\%$.

---

## 2. The Rollback-First Protocol

```
Alert Triggered / Anomaly Detected
               │
               ▼
   [Instant Rollback Action]
               │
               ▼
 [Stabilize Production Traffic]
               │
               ▼
[Postmortem & Root Cause Analysis]
```

When an alert fires during or immediately following a deployment:
1. **Do not attempt to hotfix or patch in production.**
2. **Execute rollback immediately**:
   - Revert traffic router or trigger container rollback (`kubectl rollout undo deployment/api`).
3. **Verify recovery**: Confirm error rate and latency metrics return to baseline.
4. **Isolate for diagnosis**: Reproduce the incident in staging or a local sandbox.

---

## 3. Post-Deployment Smoke Verification Checklist
- [ ] Synthetic Health Check endpoint (`GET /healthz`) returns HTTP 200 OK.
- [ ] Database migrations successfully applied and verified.
- [ ] Core business flow verified (e.g. login, search, checkout transaction).
- [ ] Error tracking service (Sentry/Datadog) reports zero new unhandled error spikes.
