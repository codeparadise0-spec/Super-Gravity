---
name: db-migration
description: Use when authoring, reviewing, or running database migrations, schema alterations, index additions, and zero-downtime data changes.
---

# Zero-Downtime Database Migration Protocol

Database schema changes can lock tables, block traffic, and take down services if executed without care. Follow this protocol for safe, backward-compatible migrations.

---

## 1. The Expand and Contract Pattern

Never rename or drop a column in a single deployment. Always use the 3-phase Expand-Contract lifecycle:

```
Phase 1: EXPAND (Add new column alongside old column; dual-write)
             │
             ▼
Phase 2: BACKFILL & MIGRATE (Backfill historical data; switch reads to new column)
             │
             ▼
Phase 3: CONTRACT (Deprecate writes to old column; drop old column in subsequent release)
```

---

## 2. Safe vs Dangerous Schema Operations (PostgreSQL)

| Dangerous Operation | Safe Alternative |
| :--- | :--- |
| `ALTER TABLE users ADD COLUMN bio VARCHAR NOT NULL DEFAULT 'hello';` (Locks table in older PG) | Add column as NULLable first, then add default, then backfill, then set NOT NULL. |
| `CREATE INDEX idx_users_email ON users(email);` (Exclusive table lock) | `CREATE INDEX CONCURRENTLY idx_users_email ON users(email);` (Non-blocking background index build) |
| `ALTER TABLE orders DROP COLUMN customer_notes;` (Instant breakage if old code is running) | Stop reading/writing the column in application code first; deploy; drop column in next release. |
| `ALTER TABLE items ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id);` (Scans full table with lock) | Add constraint with `NOT VALID`, then validate in a separate step: `ALTER TABLE items VALIDATE CONSTRAINT fk_user;` |

---

## 3. Lock Timeouts Safeguard
Always set a strict lock timeout before running DDL migrations so a lock queue cannot cause a cascading connection pool outage:

```sql
-- Safeguard: abort migration if lock cannot be acquired within 2 seconds
SET lock_timeout = '2s';

ALTER TABLE subscriptions ADD COLUMN trial_ends_at TIMESTAMPTZ;
```

---

## 4. Migration Review Checklist
- [ ] Is there an automated rollback / down migration script tested?
- [ ] Are all new indexes built `CONCURRENTLY`?
- [ ] Does the migration run cleanly without acquiring long-lived table locks?
- [ ] Can the previous version of application code run concurrently with this migration in production?
