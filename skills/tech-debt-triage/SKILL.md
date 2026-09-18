---
name: tech-debt-triage
description: Use when auditing, categorizing, prioritizing, and systematically repaying technical debt without stalling product velocity.
---

# Technical Debt Triage & Repayment Protocol

Unmanaged technical debt acts as compound interest on engineering velocity. Use this protocol to measure, categorize, and prioritize debt rationally.

---

## 1. Technical Debt Quadrant

Classify debt into one of four quadrants to decide remediation priority:

| | **Deliberate** | **Inadvertent** |
| :--- | :--- | :--- |
| **Prudent** | *"We must ship now to validate PMF; we will refactor the billing adapter in Sprint 4."* | *"Now we know how we should have modeled this domain."* |
| **Reckless** | *"We don't have time for tests or type checking."* | *"What's a layered architecture?"* |

---

## 2. Debt Scoring Metric (Impact vs Effort)

Score each item on a 1-5 scale across two dimensions:

$$\text{Priority Score} = \frac{\text{Drag Factor} \times \text{Risk Factor}}{\text{Effort}}$$

- **Drag Factor (1-5)**: How often does this code slow down daily feature development? (1 = rare, 5 = every sprint).
- **Risk Factor (1-5)**: What is the probability and severity of a production outage or security flaw?
- **Effort (1-5)**: Complexity to resolve (1 = 1 hour, 5 = multi-week migration).

---

## 3. Repayment Strategies

1. **The Boy Scout Rule**: Leave any file edited cleaner than you found it. Small refactorings belong in standard feature branches.
2. **20% Allocation**: Allocate 20% of every sprint capacity to top-ranked debt tickets.
3. **Dedicated Paydown Spike**: For structural migrations (e.g. upgrading major framework version), schedule an isolated spike with clear boundary goals.
