---
name: devtools-storage-and-cookies
description: Use when inspecting client-side persistence in Chrome DevTools Application panel, managing IndexedDB, LocalStorage, Service Workers, and Cookie security flags.
---

# Chrome DevTools Storage, Cookies & PWA Diagnostics

The **Application** panel provides full transparency into client-side storage mechanisms, caching layers, and offline Service Worker lifecycles.

---

## 1. Cookie Security Attributes Audit

Inspect every cookie in DevTools -> **Application** -> **Cookies**:

- **`HttpOnly`**: Must be checked (`true`) for session tokens and refresh tokens to block JavaScript XSS access.
- **`Secure`**: Must be checked (`true`) so the cookie is only transmitted over HTTPS.
- **`SameSite`**: Must be set to `Lax` or `Strict` to prevent Cross-Site Request Forgery (CSRF).
- **`Domain` & `Path`**: Keep scoped to the smallest possible boundary (avoid broad `.domain.com` if not necessary).

---

## 2. IndexedDB & Cache Storage Inspection

- **IndexedDB**: Used for heavy offline client databases (e.g. Dexie.js, RxDB, SQLite WASM).
  - DevTools allows inspecting object stores, indexes, and running ad-hoc queries directly from the UI.
- **Cache Storage (Service Workers)**:
  - Verify precached static assets (`workbox` cache entries).
  - Clear cache state with one click using the **Clear site data** button during debugging.

---

## 3. Service Worker Lifecycle Debugging
- Enable **Update on reload**: Forces the browser to install new Service Worker scripts immediately on refresh without waiting for all existing tabs to close.
- Check **Bypass for network**: Temporarily disables Service Worker caching to test live server updates.
