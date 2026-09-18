---
name: svg-and-canvas-graphics
description: Use when building vector graphics, custom charts, interactive SVG icons, animated path morphing, and HTML5 Canvas 2D data visualizations.
---

# Scalable SVG & HTML5 Canvas Graphics

Vector graphics scale infinitely without pixelation, while HTML5 Canvas provides $60\text{FPS}$ performance for rendering thousands of animated data points.

---

## 1. Clean Inline SVG Icon Protocol

- **`viewBox`**: Always specify `viewBox="0 0 24 24"`.
- **`currentColor`**: Use `fill="none" stroke="currentColor"` so the SVG inherits CSS color from its parent text/button.
- **Accessibility**: Include `<title>` or `aria-hidden="true"`.

```svg
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width="24"
  height="24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  <path d="M5 12h14" />
  <path d="m12 5 7 7-7 7" />
</svg>
```

---

## 2. Animated SVG Stroke Dasharray (Draw-On Animation)

```css
@keyframes drawPath {
  to {
    stroke-dashoffset: 0;
  }
}

.animated-checkmark {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: drawPath 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

---

## 3. High-DPI (Retina) HTML5 Canvas Scaling

Never render canvas at `width` and `height` CSS dimensions without multiplying by `window.devicePixelRatio`:

```javascript
function initCrispCanvas(canvas, cssWidth, cssHeight) {
  const dpr = window.devicePixelRatio || 1;
  const ctx = canvas.getContext('2d');

  // Scale internal buffer
  canvas.width = cssWidth * dpr;
  canvas.height = cssHeight * dpr;

  // Keep display size identical
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;

  // Scale coordinate system
  ctx.scale(dpr, dpr);
  return ctx;
}
```
