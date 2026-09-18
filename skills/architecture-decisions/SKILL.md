---
name: architecture-decisions
description: Use when making significant architectural choices, evaluating technical tradeoffs, or documenting Architecture Decision Records (ADRs).
---

# Architecture Decision Records (ADR) Protocol

Architecture Decision Records capture critical architectural choices, their motivation, and consequences so future engineers understand *why* the system is designed the way it is.

---

## 1. When to Write an ADR

Write an ADR whenever a decision has lasting impact:
- Adopting or replacing a core framework, database, or library.
- Choosing between architectural paradigms (e.g. Monolith vs Event-Driven).
- Defining cross-cutting patterns (authentication strategy, caching topology, API protocol).
- Introducing breaking changes or deprecating a major subsystem.

---

## 2. The Canonical ADR Template

Store ADRs in `docs/adr/NNNN-title-in-kebab-case.md`:

```markdown
# ADR-0012: Adoption of Cursor-Based Pagination for Feed APIs

- **Status**: Proposed | Accepted | Deprecated | Superseded by ADR-XXXX
- **Date**: 2026-09-17
- **Deciders**: Engineering Lead, Backend Team
- **Technical Story**: Issue #402 (Database load spikes under deep offset pagination)

## Context & Problem Statement
Our current feed API uses `OFFSET` and `LIMIT`. As users scroll past 10,000 items, query latency increases from 12ms to over 1,400ms due to sequential index scanning. Additionally, new items inserted while users scroll cause duplicate items in the viewport.

## Decision Drivers
- Read latency must remain under 50ms at $p95$ regardless of feed depth.
- Prevent duplicate and skipped items during active ingestion.
- Minimal migration overhead for mobile and web clients.

## Considered Options
1. Keyset / Cursor-Based Pagination on `(created_at, id)`.
2. Elasticsearch offload for deep offset queries.
3. Caching entire user feeds in Redis sorted sets.

## Decision Outcome
Chosen option: **Option 1: Keyset / Cursor-Based Pagination**.
Because it leverages existing Postgres composite indexes without introducing a new infrastructure cluster (Elasticsearch) or large memory footprint (Redis).

### Positive Consequences
- Query performance becomes $O(1)$ constant time with respect to feed depth.
- Clean cursor strings (`opaque base64`) prevent clients from depending on internal DB column names.

### Negative Consequences / Tradeoffs
- Cannot jump directly to arbitrary page numbers (e.g. "Go to Page 47"). Acceptable since feed UI is infinite scroll.
```
