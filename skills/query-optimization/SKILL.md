---
name: query-optimization
description: Use when diagnosing slow database queries, reading EXPLAIN ANALYZE execution plans, designing indexes, and eliminating N+1 query patterns.
---

# Query Optimization & Indexing Protocol

Slow queries are the primary cause of high database CPU and latency degradation. Optimize using data and execution plans rather than guesswork.

---

## 1. How to Read `EXPLAIN (ANALYZE, BUFFERS)`

Always inspect the true execution plan on representative data volume:

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM orders
WHERE customer_id = 9481 AND status = 'COMPLETED'
ORDER BY created_at DESC
LIMIT 20;
```

### Red Flags in Query Plans
- **Seq Scan (Sequential Scan)**: The database is scanning every single row on disk. If table size $>10,000$ rows, an index is likely needed.
- **High Buffers (shared read)**: Large number of disk reads indicating the working set doesn't fit in shared memory (`shared_buffers`).
- **Sort Method: external merge Disk**: The query exceeded `work_mem` and performed an expensive disk sort.
- **Estimated Rows vs Actual Rows**: A 10x+ discrepancy indicates stale statistics (Run `ANALYZE table_name;`).

---

## 2. Index Strategy & The Equality-Sort-Range (ESR) Rule

When designing composite indexes for multi-column queries:

$$\text{Index Column Order: } [ \text{Equality} ] \longrightarrow [ \text{Sort} ] \longrightarrow [ \text{Range} ]$$

Example:
`WHERE organization_id = 4 AND created_at >= '2026-01-01' ORDER BY priority DESC`

- **Equality column**: `organization_id` (First)
- **Sort column**: `priority` (Second)
- **Range column**: `created_at` (Third)
- **Optimal Index**:
  ```sql
  CREATE INDEX idx_org_priority_created ON tickets(organization_id, priority, created_at);
  ```

---

## 3. Eliminating the N+1 Query Problem

Never query the database inside a loop:

```typescript
// INSECURE & SLOW: 1 query for authors + N queries for books
const authors = await db.author.findMany();
for (const author of authors) {
  author.books = await db.book.findMany({ where: { authorId: author.id } });
}

// OPTIMAL: Single query using JOIN / Eager Loading (DataLoader pattern)
const authorsWithBooks = await db.author.findMany({
  include: { books: true }
});
```
