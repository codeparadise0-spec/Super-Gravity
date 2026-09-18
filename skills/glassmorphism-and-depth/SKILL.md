---
name: glassmorphism-and-depth
description: Use when building frosted-glass UI cards, multi-layered dark mode elevation surfaces, translucent modal overlays, and glow lighting effects.
---

# Glassmorphism & Visual Depth Architecture

Glassmorphism and layered surface elevation create an immersive, tactile sense of depth when built with modern CSS backdrop filters and ambient lighting.

---

## 1. The Anatomy of True Glassmorphism

Authentic frosted glass requires 4 synchronized CSS layers:
1. **Semi-transparent Surface Background**: `rgba(255, 255, 255, 0.05)` (dark) or `rgba(255, 255, 255, 0.7)` (light).
2. **Backdrop Blur Filter**: `backdrop-filter: blur(16px) saturate(180%)`.
3. **Subtle Frosted Border**: `1px solid rgba(255, 255, 255, 0.12)`.
4. **Inner Specular Highlight**: `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.15)`.

```css
.glass-panel {
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(20px) saturate(190%);
  -webkit-backdrop-filter: blur(20px) saturate(190%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 
    0 20px 40px -15px rgba(0, 0, 0, 0.5),
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.15);
}
```

---

## 2. Ambient Radial Glow Backdrop

Give life to dark glass cards with multi-colored ambient gradient backdrops:

```css
.hero-glow-wrapper {
  position: relative;
  overflow: hidden;
}

.hero-glow-wrapper::before {
  content: '';
  position: absolute;
  top: -20%;
  left: 30%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(217, 70, 239, 0.15) 50%, transparent 70%);
  filter: blur(60px);
  z-index: 0;
  pointer-events: none;
}
```

---

## 3. Fallback for Unsupported Browsers
```css
@supports not (backdrop-filter: blur(10px)) {
  .glass-panel {
    background: rgb(15, 23, 42); /* Solid opaque fallback */
  }
}
```
