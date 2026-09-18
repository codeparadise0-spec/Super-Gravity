---
name: postgres-advanced-indexing
description: Use when designing advanced PostgreSQL indexes, partial indexes, expression indexes, GIN/GiST indexes for JSONB & full-text search, and BRIN indexes.
---

# PostgreSQL Advanced Indexing Architecture

Indexes are the single most effective tool for transforming $1,000\text{ms}$ slow sequential table scans into $<5\text{ms}$ sub-millisecond lookups.

---

## 1. Index Types & Optimal Use Cases

| Index Type | Underlying Structure | Best Used For |
| :--- | :--- | :--- |
| **B-Tree** (Default) | Balanced Tree | Exact matches (`=`), ranges (`<, >, BETWEEN`), sort (`ORDER BY`), prefix string matches (`LIKE 'abc%'`). |
| **GIN** (Generalized Inverted) | Inverted List | Array containment (`tags @> '{tech}'`), JSONB key/value lookup (`data @> '{"role":"admin"}'`), Full-Text Search (`tsvector`). |
| **GiST** (Generalized Search Tree)| R-Tree / Tree | Geospatial coordinates (`PostGIS`), geometric shapes, IP range overlap (`inet && inet`). |
| **BRIN** (Block Range Index) | Min/Max per block range | Massive append-only time-series tables ($>100\text{M}$ rows with naturally ordered timestamps). Extremely small footprint (1% size of B-Tree). |

---

## 2. High-Performance Index Patterns

### A. Partial Indexes (Fractional Disk Size)
Index only the rows you actually query:

```sql
-- Only index active, uncompleted orders (e.g. 5% of table)
CREATE INDEX idx_orders_uncompleted 
ON orders (customer_id, created_at) 
WHERE status IN ('PENDING', 'PROCESSING');
```

### B. GIN Index on JSONB Columns
```sql
-- Fast JSONB containment queries
CREATE INDEX idx_users_metadata_gin 
ON users USING GIN (metadata jsonb_path_ops);

-- Accelerated Query:
SELECT * FROM users WHERE metadata @> '{"tier": "enterprise"}';
```

### C. Expression / Functional Indexes
```sql
-- Case-insensitive email lookup
CREATE INDEX idx_users_lower_email 
ON users (LOWER(email));

-- Accelerated Query:
SELECT * FROM users WHERE LOWER(email) = 'alice@example.com';
```
