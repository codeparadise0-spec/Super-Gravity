---
name: incident-response
description: Use when handling production outages, triaging incident severity, coordinating emergency mitigation, and writing blameless postmortems.
---

# Production Incident Response & Triage Protocol

During a production outage, clarity, calm, and structured communication are essential. Follow this protocol to mitigate impact quickly and conduct blameless learning.

---

## 1. Severity Classification Matrix

| Level | Severity Definition | Response SLA | Coordination Channel |
| :--- | :--- | :--- | :--- |
| **SEV-1** | Critical system down; data loss risk; payment processing halted | **Immediate (< 5m)** | Incident Commander assigned; dedicated war room; 15m updates |
| **SEV-2** | Major feature impaired; high percentage of users affected; workaround exists | **< 15 minutes** | Active Slack incident channel; 30m updates |
| **SEV-3** | Minor feature impaired; localized to small subset of users | **< 2 hours** | Normal business hours ticketing |
| **SEV-4** | Cosmetic or non-urgent internal tooling glitch | **Standard backlog** | Prioritized in regular sprint |

---

## 2. Emergency Incident Roles
- **Incident Commander (IC)**: Leads the response, assigns tasks, shields technical investigators from distractions, and makes final go/no-go calls.
- **Operations / Lead Investigator**: Analyzes logs, traces metrics, and tests mitigation actions.
- **Communications Lead**: Updates internal stakeholders and posts public status page announcements.

---

## 3. Communication Template (Every 15-30 Minutes)
```
Status: [Investigating | Identified | Mitigating | Resolved]
Impact: [e.g. ~15% of checkout requests failing with 500 error]
Current Action: [Rolling back deployment v2.4.1 to v2.4.0]
Next Update: [At :45 past the hour]
```

---

## 4. Blameless Postmortem Template

Every SEV-1 and SEV-2 requires a blameless postmortem within 48 hours:

```markdown
# Incident Postmortem: [YYYY-MM-DD Incident Title]

## Summary
- **Duration**: 42 minutes (14:10 UTC - 14:52 UTC)
- **Impact**: 2,300 users encountered transaction failures on checkout.
- **Root Cause**: An unindexed foreign key in the newly migrated `order_items` table triggered full table locks during concurrent writes.

## Timeline (UTC)
- 14:10: Deployment v2.4.1 completed.
- 14:14: PagerDuty alert fired for DB CPU utilization > 95%.
- 14:18: War room opened; Incident Commander designated.
- 14:25: Root cause identified via `pg_stat_activity` locks.
- 14:32: Rollback initiated.
- 14:48: Traffic returned to normal thresholds.
- 14:52: Incident closed.

## Five Whys Analysis
1. *Why did checkouts fail?* The database CPU spiked to 100% and rejected connections.
2. *Why did CPU spike?* Queries on `order_items` were performing sequential scans.
3. *Why sequential scans?* The foreign key column lacked a B-Tree index.
4. *Why was the index missing?* The migration author assumed the ORM created foreign key indexes automatically.
5. *Why was it not caught in staging?* Staging DB had only 500 rows, masking the lack of an index.

## Action Items & Preventive Measures
- [ ] Add linter rule (`squawk` / `atlas`) to CI blocking unindexed foreign keys.
- [ ] Seed staging environment with 1,000,000 anonymized records for performance testing.
```
