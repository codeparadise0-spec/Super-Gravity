---
name: api-design
description: Use when designing, reviewing, or implementing HTTP, REST, GraphQL, or RPC APIs for robustness, consistency, and backward compatibility.
---

# API Design Standards & Conventions

This skill provides standards for designing elegant, secure, and evolvable APIs.

---

## 1. RESTful URL & Method Standards

### Resource Naming
- Use plural nouns for resources: `/api/v1/users`, `/api/v1/projects/{id}/tasks`.
- Use lowercase with hyphens for multi-word paths: `/api/v1/user-profiles`.
- Avoid verbs in paths: Use `POST /api/v1/orders/{id}/cancellation` instead of `POST /api/v1/cancelOrder`.

### HTTP Methods
| Method | Idempotent | Safe | Semantic Meaning |
| :--- | :--- | :--- | :--- |
| `GET` | Yes | Yes | Retrieve resource(s). Never mutate state. |
| `POST` | No | No | Create new resource or trigger non-idempotent action. |
| `PUT` | Yes | No | Full replacement of resource state. |
| `PATCH`| No | No | Partial update of resource fields. |
| `DELETE`| Yes | No | Remove resource. |

---

## 2. Standardized Status Codes

- **200 OK**: Successful read or synchronous update.
- **201 Created**: Resource successfully created (include `Location` header).
- **204 No Content**: Successful action with no response body (e.g. `DELETE`).
- **400 Bad Request**: Malformed payload or validation failure.
- **401 Unauthorized**: Missing or invalid authentication credentials.
- **403 Forbidden**: Authenticated, but lacking permission for this resource.
- **404 Not Found**: Resource does not exist.
- **409 Conflict**: State conflict (e.g. duplicate email, version mismatch).
- **422 Unprocessable Entity**: Semantic validation failure.
- **429 Too Many Requests**: Rate limit exceeded (include `Retry-After` header).
- **500 Internal Server Error**: Unhandled server exception (mask internal stack traces).

---

## 3. Error Response Format (RFC 7807 / Problem Details)

All error payloads must follow a consistent structure:

```json
{
  "type": "https://api.example.com/errors/validation-failed",
  "title": "Validation Failed",
  "status": 422,
  "detail": "The request body failed schema validation.",
  "instance": "/api/v1/users/123",
  "errors": [
    {
      "field": "email",
      "message": "Must be a valid email address."
    }
  ]
}
```

---

## 4. Pagination & Filtering Conventions

- Use cursor-based pagination for large/real-time datasets:
  `GET /api/v1/items?limit=50&starting_after=cursor_xyz`
- Use offset-based pagination only for static/admin tables:
  `GET /api/v1/items?page=2&page_size=25`
- Return standardized pagination metadata:
  ```json
  {
    "data": [...],
    "pagination": {
      "has_more": true,
      "next_cursor": "cursor_abc123",
      "total_count": 482
    }
  }
  ```
