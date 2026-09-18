---
name: opentelemetry-tracing
description: Use when instrumenting distributed tracing with OpenTelemetry (OTel), creating manual child spans, context propagation, and exporting traces to Jaeger/Datadog.
---

# OpenTelemetry (OTel) Distributed Tracing

Distributed tracing connects the lifecycle of a single user request as it traverses across microservices, database queries, Redis caches, and message queues.

---

## 1. Initializing OpenTelemetry SDK (`tracer.ts`)

```typescript
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const exporter = new OTLPTraceExporter({
  url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
});

export const otelSDK = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'order-service',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
  }),
  traceExporter: exporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

otelSDK.start();
```

---

## 2. Creating Custom Manual Child Spans

```typescript
import { trace, SpanStatusCode } from '@opentelemetry/api';

const tracer = trace.getTracer('order-service');

export async function processPayment(orderId: string, amount: number) {
  return tracer.startActiveSpan('processPayment', async (span) => {
    span.setAttribute('order.id', orderId);
    span.setAttribute('payment.amount', amount);

    try {
      const result = await stripeClient.charges.create({ amount, currency: 'usd' });
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (err: any) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: err.message });
      span.recordException(err);
      throw err;
    } finally {
      span.end();
    }
  });
}
```
