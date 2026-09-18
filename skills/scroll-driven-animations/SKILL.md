---
name: scroll-driven-animations
description: Use when building scroll-linked animations, reading progress indicators, sticky header transitions, and CSS view-timeline parallax effects.
---

# Modern CSS Scroll-Driven Animations

Modern browsers support linking CSS keyframe animations directly to the scroll progress of a page or container using `animation-timeline: scroll()` or `view()`. Zero JavaScript scroll listeners needed!

---

## 1. Page Reading Progress Bar

```css
@keyframes scaleProgress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.reading-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #6366f1, #d946ef);
  transform-origin: 0% 50%;
  z-index: 1000;

  /* Native CSS Scroll Timeline */
  animation: scaleProgress auto linear;
  animation-timeline: scroll(root);
}
```

---

## 2. Reveal Elements on Viewport Entry (`view()`)

Animate cards and section headers as they enter the screen:

```css
@keyframes revealCard {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.scroll-reveal {
  animation: revealCard linear both;
  animation-timeline: view();
  /* Start animation when 10% enters viewport; finish at 35% */
  animation-range: entry 10% cover 35%;
}
```

---

## 3. Benefits Over JavaScript `window.addEventListener('scroll')`
- **Main-Thread Independence**: CSS scroll timelines execute directly on the browser's compositor thread. Even if JavaScript is executing heavy computations, scrolling and animations remain a locked $60\text{FPS}$.
- **Zero Event Loop Lag**: Eliminates debounce/throttle math.
