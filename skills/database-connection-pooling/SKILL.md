---
name: database-connection-pooling
description: Use when sizing database connection pools, configuring PgBouncer, handling serverless Lambda connection spikes, and tuning pool exhaustion timeouts.
---

# Database Connection Pooling & Sizing Architecture

Each open PostgreSQL connection allocates approximately $10\text{MB}$ of dedicated server memory and forks an OS backend process. Opening 1,000 unpooled connections will crash your database.

---

## 1. The PostgreSQL Pool Sizing Formula

According to PostgreSQL performance benchmarks:

$$\text{Optimal Pool Size} = (2 \times \text{CPU Cores}) + \text{Effective Spindle / SSD Count}$$

> *Example*: On a 4-core database server with SSD storage:
> $\text{Optimal Pool Size} = (2 \times 4) + 1 = 9 \text{ to } 15 \text{ connections}$.
> Setting `max_connections = 500` causes CPU context-switching thrashing and degrades throughput.

---

## 2. PgBouncer Transaction Mode Pooling

For serverless deployments (AWS Lambda, Vercel, Cloudflare Workers) where thousands of ephemeral functions spin up concurrently:

```ini
; pgbouncer.ini
[databases]
app_db = host=127.0.0.1 port=5432 dbname=production_db

[pgbouncer]
listen_port = 6432
listen_addr = 0.0.0.0
auth_type = md5
auth_file = /etc/pgbouncer/userlist.txt

; CRITICAL: Transaction pooling returns connection immediately after query/tx completes
pool_mode = transaction
max_client_conn = 5000     ; Up to 5,000 incoming Lambda clients
default_pool_size = 20     ; Only 20 real connections to PostgreSQL backend
```

---

## 3. Node.js `pg.Pool` Configuration
```typescript
import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,                      // Maximum active connections in pool
  idleTimeoutMillis: 30000,     // Close idle connections after 30s
  connectionTimeoutMillis: 2000,// Abort with error if connection cannot be acquired in 2s
});
```
