---
name: responsive-devtools-inspection
description: Use when building, modifying, or auditing web UI to verify responsiveness, viewport layouts, Chrome DevTools console errors, network waterfalls, and mobile touch ergonomics.
---

# Responsive DevTools Inspection Protocol

This skill enforces a rigorous, multi-viewport Chrome DevTools inspection workflow. Agents must never assume a layout works simply because it looks acceptable in a desktop browser or renders without compile errors.

## When to Activate
Activate this skill whenever:
- Creating or editing CSS/HTML/React/Vue/Svelte frontend components.
- Investigating layout shifts, horizontal scrolling bugs (`overflow-x`), or clipping.
- Verifying mobile navigation drawers, modal overlays, or responsive tables.
- Conducting pre-ship UI verification or visual regression testing.

---

## The 5-Phase DevTools QA Protocol

```
Phase 1: Viewport Matrix Testing
          ↓
Phase 2: Horizontal Overflow & Layout Clipping Audit
          ↓
Phase 3: DevTools Console & Network Tab Inspection
          ↓
Phase 4: Mobile Ergonomics & Touch Target Verification
          ↓
Phase 5: Evidence Capture & Sign-off
```

---

### Phase 1: Viewport Matrix Testing

Test all interactive screens against the canonical responsive matrix:

| Device Tier | Viewport Dimensions | Target Testing Purpose |
| :--- | :--- | :--- |
| **Mobile Compact** | 375 × 667 (iPhone SE) | Narrowest supported phone, header wrapping, compact forms |
| **Mobile Standard** | 390 × 844 (iPhone 14/15) | Standard modern phone, sticky navigation, card grids |
| **Tablet Portrait** | 768 × 1024 (iPad Mini) | Breakpoint transition from single column to multi-column |
| **Tablet Landscape** | 1024 × 768 / 1180 × 820 | Wide tablet, sidebar collapse/expand behavior |
| **Laptop / Desktop** | 1280 × 800 / 1440 × 900 | Standard desktop grid, multi-column navigation, max-width containers |
| **Ultra-wide / FHD** | 1920 × 1080 | Container constraints, centered content, background stretching |

#### Browser Subagent / Playwright Action:
When using Antigravity's `browser_subagent`, resize the window to each target width:
```javascript
// Mobile test
await page.setViewportSize({ width: 375, height: 667 });
// Tablet test
await page.setViewportSize({ width: 768, height: 1024 });
// Desktop test
await page.setViewportSize({ width: 1440, height: 900 });
```

---

### Phase 2: Horizontal Overflow & Layout Clipping Audit

A horizontal scrollbar on mobile is considered a critical defect. Run the automated detector script:

1. **Inject and execute**: Run [`check-overflow.js`](./scripts/check-overflow.js) in the page context.
2. **Interpret output**:
   - If `pass: true`: Proceed to Phase 3.
   - If `pass: false`: Examine the identified culprits. Common root causes:
     - Fixed pixel widths (e.g., `width: 500px` instead of `max-width: 100%` or `min(500px, 100%)`).
     - Unconstrained images, SVGs, or iframes lacking `max-width: 100%; height: auto`.
     - Negative margins on full-width containers without adequate parent padding.
     - Unbroken long strings or URLs lacking `word-break: break-word` or `overflow-wrap: anywhere`.
     - CSS Grid with `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))` where `300px` exceeds container width minus padding.

3. **Remediation**:
   ```css
   /* Global safeguards */
   *, *::before, *::after {
     box-sizing: border-box;
   }
   img, svg, video, canvas, audio, iframe {
     max-width: 100%;
     height: auto;
     display: block;
   }
   ```

---

### Phase 3: DevTools Console & Network Tab Inspection

#### 1. Console Verification
Inspect the browser console logs across all interactions (clicks, tab switches, form submits):
- **Zero Errors Allowed**:
  - `Uncaught TypeError` or `ReferenceError`
  - React Hydration Mismatches (`Warning: Text content did not match`)
  - 404s on static assets (fonts, images, icons, favicons)
  - Unhandled Promise Rejections
  - CORS policy violations

#### 2. Network Tab Inspection
- Check all XHR/Fetch network requests:
  - Every API endpoint called must return `2xx` or expected `3xx`.
  - No unexpected `400 Bad Request`, `401 Unauthorized`, `404 Not Found`, or `500 Server Error`.
- Inspect asset payloads:
  - Font files should be preloaded or subsetted.
  - Image files should be served in modern formats (WebP/AVIF) with appropriate `srcset` attributes.

---

### Phase 4: Mobile Ergonomics & Touch Target Verification

Run [`devtools-audit.js`](./scripts/devtools-audit.js) to inspect mobile ergonomics:

1. **Touch Target Size**:
   - All interactive controls (buttons, links, form inputs, toggle switches, icon buttons) must have a clickable area of at least **$44 \times 44\text{px}$** (WCAG 2.5.5 recommends $48 \times 48\text{px}$).
   - If an icon is visually $20\text{px}$, apply padding or an invisible pseudo-element (`::after`) to expand the hit area to $48\text{px}$.

2. **iOS Safari Zoom Prevention**:
   - Form inputs (`<input>`, `<select>`, `<textarea>`) must have `font-size: 16px` or larger on mobile viewports. Font sizes below 16px trigger automatic screen zoom on iOS.

3. **Drawer & Modal Scroll Locking**:
   - When a mobile navigation drawer or dialog is opened:
     - The background `<body>` must be locked against scrolling (`overflow: hidden`).
     - Tapping the backdrop overlay must close the drawer/modal.
     - Pressing `Escape` must close the dialog and return focus to the trigger element.

---

### Phase 5: Evidence Capture & Sign-off

Never mark a UI task complete without verifiable visual proof:

1. **Capture Breakpoint Screenshots**:
   - `mobile-375px.png` (iPhone SE)
   - `tablet-768px.png` (iPad)
   - `desktop-1440px.png` (Laptop/Desktop)
2. **Review Checkpoints**:
   - [ ] No horizontal scrolling at 375px.
   - [ ] Navigation transitions smoothly between mobile hamburger and desktop navbar.
   - [ ] Console has zero unhandled exceptions or 404 errors.
   - [ ] Buttons and touch targets meet size thresholds.
   - [ ] Text remains readable and does not overlap or truncate awkwardly.
