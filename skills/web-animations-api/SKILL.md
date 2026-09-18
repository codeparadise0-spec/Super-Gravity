---
name: web-animations-api
description: Use when authoring programmatic JavaScript animations with the Web Animations API (WAAPI), managing timeline states, and synchronizing multiple animated elements.
---

# Web Animations API (WAAPI) Protocol

The Web Animations API combines the performance of CSS transitions (running on the browser's compositor thread) with the dynamic control and event scripting of JavaScript.

---

## 1. Basic `element.animate()` Pattern

```javascript
const card = document.querySelector('.card');

const animation = card.animate(
  [
    { opacity: 0, transform: 'translateY(20px) scale(0.95)' },
    { opacity: 1, transform: 'translateY(0) scale(1)' },
  ],
  {
    duration: 350,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    fill: 'forwards',
  }
);

// Programmatic control
animation.pause();
animation.play();
animation.reverse();

// Await completion via Promise
await animation.finished;
console.log('Card entrance animation finished!');
```

---

## 2. Staggered Group Animation Helper

```javascript
function animateStaggeredList(elements, keyframes, options = {}) {
  const baseDelay = options.staggerDelay || 60; // 60ms between items

  return elements.map((el, index) => {
    return el.animate(keyframes, {
      duration: options.duration || 400,
      delay: index * baseDelay,
      easing: options.easing || 'cubic-bezier(0.16, 1, 0.3, 1)',
      fill: 'forwards',
    });
  });
}
```

---

## 3. Advantages Over Legacy `requestAnimationFrame`
- **Compositor Acceleration**: WAAPI runs on the compositor thread and will not stutter even if the main thread has short JavaScript spikes.
- **Native Promises**: Includes `.finished` promises for effortless `async/await` chaining.
- **Zero Library Bloat**: Built directly into all modern web browsers; requires 0 KB of external animation libraries.
