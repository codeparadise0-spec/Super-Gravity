---
name: api-contract-mocking
description: Use when building, mocking, or testing API contracts using OpenAPI, Mock Service Worker (MSW), Prism, or contract-first schemas.
---

# API Contract First & Mocking Protocol

Decouple frontend and backend development by establishing OpenAPI contracts and network-level mock servers before implementing backend logic.

---

## 1. The Contract-First Workflow

```
1. Author OpenAPI / Schema Spec  ──>  2. Generate TypeScript Types / MSW Handlers  ──>  3. Frontend & Backend Develop in Parallel
```

1. **Author the Contract**: Define request parameters, response schemas, and error shapes in OpenAPI (Swagger) or tRPC router.
2. **Spin up Network Mocks**: Frontend developers develop against Mock Service Worker (MSW) or Prism mock servers without waiting for backend deployment.
3. **Automated Contract Testing**: Run contract tests in CI (Pact / Dredd) to ensure backend implementation does not drift from the OpenAPI spec.

---

## 2. Mock Service Worker (MSW) Example

MSW intercepts requests at the network layer (Service Worker in browser, interceptor in Node):

```typescript
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Intercept GET /api/v1/user/profile
  http.get('/api/v1/user/profile', () => {
    return HttpResponse.json({
      id: 'usr_mock_123',
      name: 'Alice Developer',
      email: 'alice@example.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    });
  }),

  // Simulate server error or network delay
  http.post('/api/v1/checkout', async () => {
    // Simulate 400ms network latency
    await new Promise(res => setTimeout(res, 400));
    return new HttpResponse(null, { status: 201 });
  }),
];
```

---

## 3. Benefits of Contract Mocking
- **Zero Frontend Blockers**: UI development starts on Day 1.
- **High-Fidelity Offline Testing**: Tests run without internet or spinning up external Docker containers.
- **Edge-Case Simulation**: Easy testing of rare HTTP responses (502 Bad Gateway, 429 Rate Limit, network timeout).
