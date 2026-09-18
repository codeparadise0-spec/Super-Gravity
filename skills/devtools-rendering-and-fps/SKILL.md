---
name: devtools-rendering-and-fps
description: Use when analyzing browser paint operations, layer compositing, layout shift regions, and frame rate (FPS) meter in Chrome DevTools Rendering drawer.
---

# Chrome DevTools Rendering & 60 FPS Diagnostics

The DevTools **Rendering** drawer provides visual overlays to inspect repaint zones, GPU compositing layers, and layout shifts in real time.

---

## 1. Opening the Rendering Drawer

1. Open Chrome DevTools -> Press `Ctrl + Shift + P` (or `Cmd + Shift + P`).
2. Type **`Show Rendering`** and press Enter.

---

## 2. Key Diagnostic Overlays

### A. Paint Flashing (Green Rectangles)
- Highlights every region of the screen repainted by the browser in bright green.
- **Goal**: Scrolling a page or hovering over a button should NOT repaint the entire page. Only the micro-element changing state should flash green.
- **Remediation**: Isolate animated elements onto their own GPU layer using `will-change: transform` or `transform: translateZ(0)`.

### B. Layout Shift Regions (Blue Rectangles)
- Flashes blue on any element that suddenly shifts position during rendering.
- Pinpoints the exact culprit causing CLS score degradation.

### C. Frame Rate (FPS) Meter
- Displays a real-time HUD in the top-right corner showing current FPS and GPU memory usage.
- Target: A consistent **$60\text{FPS}$** (or $120\text{FPS}$ on ProMotion displays) without dips below $50\text{FPS}$ during scroll.

### D. Emulate CSS media feature `prefers-reduced-motion`
- Tests whether your animations cleanly disable themselves for users who request reduced motion.
