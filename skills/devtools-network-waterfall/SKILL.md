---
name: devtools-network-waterfall
description: Use when diagnosing slow page loads in Chrome DevTools Network panel, analyzing TTFB, DNS resolution, HTTP/2 multiplexing, caching headers, and payload sizes.
---

# Chrome DevTools Network Waterfall & Timing Diagnostics

The Network panel waterfall displays the exact microsecond breakdown of every HTTP request made by the browser.

---

## 1. Anatomy of a Request Waterfall

```
┌──────────┬───────────┬─────────────┬──────────────────────────┬──────────────────┐
│ Queueing │ DNS Lookup│ TCP Connect │ Initial Connection (TLS) │ Waiting for TTFB │ Content Download │
└──────────┴───────────┴─────────────┴──────────────────────────┴──────────────────┘
```

| Phase | Bottleneck Cause | Remediation |
| :--- | :--- | :--- |
| **Queueing / Stalled** | $>6$ concurrent HTTP/1.1 connections to same domain | Upgrade to HTTP/2 or HTTP/3 multiplexing |
| **DNS Lookup** | Slow DNS resolver / cold domain | Add `<link rel="dns-prefetch" href="//api.example.com">` |
| **Initial Connection (TLS)**| High round-trip time (RTT) for SSL handshake | Add `<link rel="preconnect" href="https://api.example.com">` |
| **Waiting (TTFB)** | Slow backend processing or unindexed DB queries | Optimize server execution time, use edge CDN caching |
| **Content Download** | Oversized payload, uncompressed JSON, raw images | Enable Brotli/Gzip compression, resize image dimensions |

---

## 2. HTTP Caching Verification Checklist
Inspect response headers in DevTools:
- **`Cache-Control: public, max-age=31536000, immutable`**: Correct for hashed static assets (`bundle.a8b1c.js`, `logo.98df2.webp`).
- **`Cache-Control: no-cache` / `ETag`**: Correct for dynamic HTML pages (forces 304 revalidation).
- **`Status: 304 Not Modified`**: Confirms cached asset was validated without re-downloading bytes.
