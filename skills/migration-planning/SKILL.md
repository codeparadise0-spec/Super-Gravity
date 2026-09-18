---
name: migration-planning
description: Use when planning and executing complex refactors, database schema overhauls, framework upgrades, or zero-downtime service migrations.
---

# Zero-Downtime Migration Planning

"Big Bang" rewrites fail because they freeze product development and introduce hundreds of untested assumptions simultaneously. Always migrate incrementally.

---

## 1. The Strangler Fig Pattern

Migrate systems gradually by intercepting requests at the boundary:

```
[Client Traffic]
       │
       ▼
[API Gateway / Router]
 ├── /api/v2/users (New Service / Modern Code) ──> [New System]
 └── /api/v1/* (Legacy Handlers) ───────────────> [Legacy Monolith]
```

1. Create the new implementation alongside the old one.
2. Route a small slice of traffic (1%) to the new implementation via feature flags.
3. Monitor error rates, latency, and data fidelity.
4. Incrementally ramp traffic (1% -> 10% -> 50% -> 100%).
5. Delete the legacy code once verified.

---

## 2. Dual-Writing & Data Shadowing (Zero-Downtime Data Migration)

When replacing or restructuring data stores:

1. **Step 1: Write to Both, Read from Old**:
   - Application writes to Old DB (primary) and asynchronously writes to New DB (secondary).
2. **Step 2: Backfill Historical Data**:
   - Run background backfill scripts to copy records created prior to Step 1.
3. **Step 3: Verification & Parity Audit**:
   - Run verification jobs comparing random samples across both databases until parity is 100%.
4. **Step 4: Write to Both, Read from New**:
   - Switch read queries to New DB. If anomalies occur, read fallback to Old DB is still instant.
5. **Step 5: Cutover & Deprecate Old**:
   - Stop writing to Old DB. Remove dual-write adapter.
