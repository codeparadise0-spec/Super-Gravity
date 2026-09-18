---
name: unit-test-strategy
description: Use when architecting unit test suites, determining mocking boundaries, designing table-driven tests, and establishing coverage targets.
---

# Unit Test Strategy & Mocking Boundaries

High-value unit test suites run in milliseconds, provide confident regression protection, and test behaviors rather than brittle implementation details.

---

## 1. What to Mock vs What to Run Real

| Component Type | Strategy | Reason |
| :--- | :--- | :--- |
| **Pure Functions / Business Logic** | **Never mock** | Fast, deterministic, zero side-effects. |
| **Domain Entities & Value Objects** | **Never mock** | Use real models with test factories. |
| **Database Repositories** | **Use in-memory / lightweight DB** | Avoid mocking query builders; test actual SQL execution when possible. |
| **External Third-Party APIs** (Stripe, Twilio) | **Mock at the network/client adapter boundary** | Network calls are slow, flaky, and cost money. |
| **System Clock / Timers** | **Mock with fake timers** | Prevents `sleep()` in tests; makes time-based logic instant and deterministic. |

---

## 2. Table-Driven (Parameterized) Testing Pattern

Avoid writing ten copy-pasted test functions for different inputs. Use parameterized table-driven tests:

```typescript
describe('calculateShippingFee', () => {
  const cases = [
    { weightKg: 0.5, country: 'US', isMember: false, expectedFee: 5.00, desc: 'lightweight domestic non-member' },
    { weightKg: 10.0, country: 'US', isMember: false, expectedFee: 15.00, desc: 'heavy domestic non-member' },
    { weightKg: 2.0, country: 'US', isMember: true, expectedFee: 0.00, desc: 'member free domestic shipping' },
    { weightKg: 1.0, country: 'CA', isMember: true, expectedFee: 12.00, desc: 'member international discounted' },
    { weightKg: 0, country: 'US', isMember: false, error: 'Weight must be greater than 0', desc: 'invalid zero weight' },
  ];

  test.each(cases)('$desc', ({ weightKg, country, isMember, expectedFee, error }) => {
    if (error) {
      expect(() => calculateShippingFee({ weightKg, country, isMember })).toThrow(error);
    } else {
      expect(calculateShippingFee({ weightKg, country, isMember })).toBe(expectedFee);
    }
  });
});
```

---

## 3. Code Coverage Targets & Anti-Patterns
- **Target 80-90% branch coverage** on core business logic and domain services.
- **Do not chase 100% vanity coverage** by testing auto-generated getters, setters, or standard library wrappers.
- **Focus on boundary conditions**:
  - Minimum and maximum allowable values.
  - Off-by-one indices.
  - Empty collections and null values.
