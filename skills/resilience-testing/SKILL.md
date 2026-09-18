---
name: resilience-testing
description: Use when verifying system behavior under network latency, packet loss, API outages, rate limits, and chaotic failure modes.
---

# Resilience & Chaos Engineering Protocol

Production software will inevitably experience slow networks, flaky third-party APIs, database connection pool exhaustion, and server restarts. Test for graceful degradation before shipping.

---

## 1. Network Simulation Scenarios

Verify the application under adverse network profiles using Chrome DevTools or Playwright:

| Profile | Download / Upload | Latency | Target Behavior |
| :--- | :--- | :--- | :--- |
| **Fast 3G** | 1.6 Mbps / 750 Kbps | 150 ms | Skeleton loaders appear smoothly; no flickering |
| **Slow 3G** | 400 Kbps / 400 Kbps | 400 ms | Clear progress feedback; non-blocking interactions |
| **Offline Mode** | 0 Kbps | Infinite | Offline banner, queued operations, cached local reads |

```typescript
// Playwright network throttling
await client.send('Network.emulateNetworkConditions', {
  offline: false,
  downloadThroughput: (400 * 1024) / 8,
  uploadThroughput: (400 * 1024) / 8,
  latency: 400,
});
```

---

## 2. Circuit Breaker & Timeout Patterns

Never let a hanging downstream call lock up application worker threads:

```typescript
// Resilience pattern with timeout and fallback
async function fetchWeatherWithTimeout(city: string): Promise<WeatherData> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2500); // 2.5s ceiling

  try {
    const res = await fetch(`https://api.weather.com/v1?city=${city}`, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err: any) {
    if (err.name === 'AbortError') {
      console.warn('Weather API timed out. Falling back to cached data.');
      return getStaleCachedWeather(city);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}
```

---

## 3. Resilience Verification Checklist
- [ ] Are all external network requests wrapped in strict timeouts?
- [ ] Does the UI present user-friendly error banners with retry buttons on failure?
- [ ] Are retries backed by exponential backoff with jitter to avoid thundering herds?
- [ ] Are database operations protected by connection pool limits and statement timeouts?
