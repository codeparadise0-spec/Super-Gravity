---
name: observability-setup
description: Use when instrumenting applications with structured logging, metrics (Prometheus/StatsD), distributed tracing (OpenTelemetry), and health dashboards.
---

# Observability & Telemetry Protocol

You cannot optimize, debug, or ensure reliability for a system you cannot observe. Build observability into every service from day one.

---

## 1. The Three Pillars of Observability

### A. Structured Logging (JSON)
Never output plain text strings via `console.log` or `print()`. Output structured JSON objects with contextual metadata:

```json
{
  "timestamp": "2026-09-17T21:00:00.123Z",
  "level": "error",
  "message": "Payment processing failed",
  "service": "billing-service",
  "traceId": "4bf92f3577b34da6a3ce929d0e0e4736",
  "spanId": "00f067aa0ba902b7",
  "userId": "usr_99812",
  "errorCode": "CARD_EXPIRED",
  "httpStatus": 402
}
```

### B. Metrics (RED & USE Methods)
- **RED Method (For Request-Driven Services)**:
  - **Rate**: Requests per second ($RPS$).
  - **Errors**: Number of failed requests.
  - **Duration**: Latency distributions ($p50, p95, p99$).
- **USE Method (For Infrastructure Resources)**:
  - **Utilization**: % time resource is busy (CPU, Disk, Memory).
  - **Saturation**: Degree of queued work (Load average, Thread pool backlog).
  - **Errors**: Hardware / network drop counts.

### C. Distributed Tracing (OpenTelemetry)
- Propagate W3C trace context headers (`traceparent`, `tracestate`) across all HTTP and message broker boundaries.
- Ensure all downstream calls (DB queries, Redis operations, third-party APIs) are enclosed in child spans with execution duration.

---

## 2. Health & Readiness Probes Standards

Implement standardized endpoints:
- **`GET /healthz` (Liveness)**: Returns 200 if the process is alive. If this fails, the orchestrator (Kubernetes/ECS) restarts the container.
- **`GET /ready` (Readiness)**: Returns 200 only if database connections, caches, and dependent services are initialized and ready to serve traffic.
