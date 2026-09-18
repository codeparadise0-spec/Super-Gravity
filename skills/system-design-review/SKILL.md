---
name: system-design-review
description: Use when designing or evaluating distributed systems, high-scale architectures, fault tolerance, and data consistency models.
---

# System Design & Scalability Review

This skill provides a structured framework for evaluating system architectures before implementation.

---

## 1. The Core Design Review Lenses

### A. Scalability & Bottleneck Identification
- **State vs Statelessness**: Are application servers stateless so they can scale horizontally behind a load balancer?
- **Data Partitioning**: How is data partitioned or sharded when tables exceed single-instance memory or disk capacity?
- **Read/Write Ratios**: Is the system read-heavy (leverage CDNs, read replicas, Redis caches) or write-heavy (leverage append-only logs, message queues, LSM trees)?

### B. Reliability & Failure Modes
- **Single Points of Failure (SPOF)**: Does the failure of a single instance, zone, or third-party API bring down the entire system?
- **Blast Radius**: Are failures contained via Circuit Breakers, Bulkheads, and graceful degradation?
- **Backpressure**: How do consumers handle traffic spikes? Are workers overwhelmed, or are jobs safely queued?

### C. Consistency & Data Integrity
- **CAP / PACELC Tradeoffs**: In the presence of network partitions, does the system prioritize strong consistency (ACID, distributed locks) or high availability (eventual consistency, CRDTs)?
- **Idempotency**: Are write APIs idempotent (using `Idempotency-Key` headers) to prevent duplicate processing on client retries?

---

## 2. Review Checklist

- [ ] **Capacity Estimation**: Throughput ($QPS$), storage growth per year, and network bandwidth calculated.
- [ ] **Data Model**: Primary keys, indexes, foreign key constraints, and access patterns documented.
- [ ] **APIs**: Interface contracts clearly specified with idempotency and rate limiting.
- [ ] **Observability**: Metrics (Latency, Traffic, Errors, Saturation), distributed tracing, and alerts defined.
- [ ] **Disaster Recovery**: RPO (Recovery Point Objective) and RTO (Recovery Time Objective) established.
