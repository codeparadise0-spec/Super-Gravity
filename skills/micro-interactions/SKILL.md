---
name: micro-interactions
description: Use when designing or implementing animations, transitions, hover/focus feedback, gestures, and fluid UI micro-interactions.
---

# Micro-Interactions & Animation Guidelines

Smooth, purposeful animations elevate an interface from static to premium. Poor animations cause lag, jank, disorientation, and cognitive fatigue.

---

## 1. Principles of Purposeful Motion

1. **Performant (60 FPS minimum)**:
   - Only animate `transform` and `opacity`.
   - Never animate layout properties: `width`, `height`, `top`, `left`, `margin`, `padding` (these trigger expensive browser reflows and repaints).
2. **Snappy & Responsive**:
   - Micro-interactions (hover, active, toggle): **100ms - 200ms**.
   - Medium transitions (modal pop, drawer slide, tab switch): **250ms - 350ms**.
   - Complex full-page reveals: **400ms - 500ms max**. Anything slower feels sluggish.
3. **Natural Physics & Easing**:
   - Never use linear easing (`ease-linear`) for UI elements.
   - Use cubic-bezier ease-out for entrances: `cubic-bezier(0.16, 1, 0.3, 1)` (snappy spring deceleration).
   - Use ease-in for exits: `cubic-bezier(0.7, 0, 0.84, 0)`.

---

## 2. Accessibility: Reduced Motion Compliance

Always respect the user's OS-level motion preferences. Any animated interface must include `@media (prefers-reduced-motion)` overrides:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 3. High-Performance CSS Interaction Examples

### Button Press Micro-Interaction
```css
.btn-primary {
  transition: transform 0.15s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.15s ease;
  will-change: transform;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary:active {
  transform: translateY(1px) scale(0.98);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

### Modal Entrance Animation
```css
@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-dialog {
  animation: modalEnter 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```
