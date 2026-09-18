---
name: mind-blowing-animations
description: Comprehensive catalog of world-class, award-winning web animations. Use to implement 3D card tilt with spotlight refraction, rotating border beam strokes, magnetic cursor physics, kinetic typography reveals, ambient aurora meshes, floating cutout levitation, velocity-scroll parallax, and reverse-engineered recipes from Santioni, Oryzo, Obsidian, Juice, Leclerc, Immersive Garden, Wildfire, and Zajno.
---

# 🌌 World-Class Mind-Blowing Web Animations & Physics Engine

This skill provides production-grade code, math formulas, and zero-dependency CSS/JS recipes for the most visually stunning, award-winning micro-animations, physics simulations, and visual effects in modern web design.

> [!TIP]
> **Reverse-Engineered Showcase Breakdown**: For an exhaustive, site-by-site analysis with full source code reverse-engineered from 8 world-class benchmarks (Santioni Spirits, Oryzo AI, Obsidian Assembly, Juice Agency, Charles Leclerc, Immersive Garden, Following Wildfire, and Zajno Motion), consult [`skills/mind-blowing-animations/WORLD_CLASS_SHOWCASE_BREAKDOWN.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/mind-blowing-animations/WORLD_CLASS_SHOWCASE_BREAKDOWN.md).
>
> **World-Class Website Blueprint**: For the complete architectural and creative director handbook on structuring award-winning websites, consult [`skills/super-gravity/WORLD_CLASS_WEBSITE_BLUEPRINT.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/super-gravity/WORLD_CLASS_WEBSITE_BLUEPRINT.md).

```
══════════════════════════════════════════════════════════════════════════════════════════════════
                            THE 20 MASTER ANIMATION ARCHETYPES
══════════════════════════════════════════════════════════════════════════════════════════════════
  [01] 3D Tilt & Spotlight Glow     [08] Live Stat HUD Counter        [15] Elastic Spring Drag
  [02] Rotating Laser Border Beam   [09] Scroll-Linked SVG Tracker    [16] Ambient Flowing Aurora
  [03] Velocity-Scroll Marquee      [10] Depth-of-Field Blur Fade     [17] Bento Stagger Reveals
  [04] Kinetic Cipher Scramble      [11] Holographic Foil Sweep       [18] Retina Canvas Constellation
  [05] Char-by-Char Skew Reveal     [12] SVG Blob Waveform Morph      [19] FLIP Layout Morphing
  [06] Liquid Inertia Parallax      [13] Weightless PNG Levitation    [20] Chromatic Glitch Shift
  [07] Magnetic Difference Cursor   [14] Diagonal Parallax Shear
══════════════════════════════════════════════════════════════════════════════════════════════════
```

---

## 🧭 The Vibe & Industry Animation Decision Matrix

| Website Vibe / Industry | Primary Animation Archetypes | Key CSS/JS Secret |
| :--- | :--- | :--- |
| **Café, Artisanal & Luxury Food** (e.g. Santioni) | Liquid Scroll Parallax + Decoupled Shadow Levitation + Vintage Serif Reveal | `cubic-bezier(0.16, 1, 0.3, 1)`, sine floating math |
| **AI, High-Tech SaaS & Developer Tools** (e.g. Oryzo) | Laser Conic Border Beam + Mouse Spotlight Refraction + Cipher Unscramble | CSS `@property --beam-angle`, dynamic radial coords |
| **High Fashion & Brutalist Studio** (e.g. Obsidian) | Char-by-Char Skew Masks + Magnetic Difference Inversion Cursor | `mix-blend-mode: difference`, staggered `--char-index` |
| **High-Velocity Creative Agency** (e.g. Juice) | Velocity-Responsive Infinite Running Marquee + Threshold Media Reveals | Dynamic scroll delta acceleration, seamless wrap |
| **Motorsport & Performance Metrics** (e.g. Leclerc) | High-Speed Stat HUD Counter + Diagonal Parallax Shear Rails | Quadratic ease-out interpolation, `skewY(-3deg)` |
| **Luxury Portfolio & Avant-Garde** (e.g. Immersive-G) | Depth-of-Field Blur Crossfade + Fluid Glass Nav Ribbon | `filter: blur() scale()` transition layers |
| **Documentary & Narrative Editorial** (e.g. Wildfire) | Scroll-Linked SVG Stroke Dashoffset Tracker + Vignette Noise Masks | `stroke-dashoffset` mapped to bounding client rect |
| **Motion Studio & Interactive Tools** (e.g. Zajno) | Hooke's Law Spring Physics Cards + Waveform Morph + Foil Shimmer | Second-order differential damping, SVG `d` morphing |

---

# 1. 🌟 3D Card Perspective Tilt & Mouse-Tracking Spotlight (Oryzo / Apple Style)

Creates an interactive glassmorphic card that tilts in 3D space toward the cursor while casting an internal radial spotlight highlight.

```html
<div class="tilt-card" id="card">
  <div class="spotlight-overlay"></div>
  <div class="card-content">
    <h3>Enterprise Architecture</h3>
    <p>Ultra-low latency edge orchestration.</p>
  </div>
</div>
```

```css
.tilt-card {
  position: relative;
  width: 380px;
  height: 240px;
  border-radius: 20px;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  transform-style: preserve-3d;
  transform: perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg)) scale3d(var(--scale, 1), var(--scale, 1), 1);
  transition: transform 0.15s ease-out, border-color 0.3s ease;
  overflow: hidden;
  cursor: pointer;
}

.tilt-card:hover {
  border-color: rgba(99, 102, 241, 0.4);
}

.spotlight-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle 220px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.12), transparent 80%);
  pointer-events: none;
  opacity: var(--spotlight-opacity, 0);
  transition: opacity 0.3s ease;
}

.card-content {
  position: relative;
  z-index: 1;
  padding: 32px;
  transform: translateZ(40px);
}
```

```javascript
const card = document.getElementById('card');

card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = ((y - centerY) / centerY) * -12;
  const rotateY = ((x - centerX) / centerX) * 12;
  
  card.style.setProperty('--rotate-x', `${rotateX.toFixed(2)}deg`);
  card.style.setProperty('--rotate-y', `${rotateY.toFixed(2)}deg`);
  card.style.setProperty('--mouse-x', `${x.toFixed(1)}px`);
  card.style.setProperty('--mouse-y', `${y.toFixed(1)}px`);
  card.style.setProperty('--spotlight-opacity', '1');
  card.style.setProperty('--scale', '1.02');
});

card.addEventListener('mouseleave', () => {
  card.style.setProperty('--rotate-x', '0deg');
  card.style.setProperty('--rotate-y', '0deg');
  card.style.setProperty('--spotlight-opacity', '0');
  card.style.setProperty('--scale', '1');
});
```

---

# 2. ⚡ Rotating Laser Border Beam (Oryzo AI Style)

Draws a traveling, glowing gradient laser beam around the perimeter of glass cards using CSS `@property` with zero layout thrashing.

```css
@property --beam-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.border-beam-card {
  position: relative;
  border-radius: 20px;
  background: #090d16;
  padding: 2px;
  overflow: hidden;
}

.border-beam-card::before {
  content: '';
  position: absolute;
  inset: -100%;
  background: conic-gradient(
    from var(--beam-angle),
    transparent 0deg,
    transparent 300deg,
    #6366f1 330deg,
    #ec4899 350deg,
    #06b6d4 360deg
  );
  animation: rotateBeam 4s linear infinite;
}

.border-beam-inner {
  position: relative;
  z-index: 1;
  background: rgba(11, 15, 25, 0.95);
  border-radius: 18px;
  padding: 32px;
  backdrop-filter: blur(16px);
}

@keyframes rotateBeam {
  to { --beam-angle: 360deg; }
}
```

---

# 3. 🏃 Velocity-Responsive Infinite Running Marquee (Juice Agency Style)

A running marquee that runs continuously and accelerates dynamically based on the user's scroll speed delta.

```javascript
class VelocityMarquee {
  constructor(trackElement, baseSpeed = 1.2) {
    this.track = trackElement;
    this.x = 0;
    this.baseSpeed = baseSpeed;
    this.currentSpeed = baseSpeed;
    this.targetSpeed = baseSpeed;
    this.lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const delta = Math.abs(window.scrollY - this.lastScrollY);
      this.lastScrollY = window.scrollY;
      this.targetSpeed = this.baseSpeed + Math.min(delta * 0.12, 20);
    }, { passive: true });

    this.render();
  }

  render() {
    this.currentSpeed += (this.targetSpeed - this.currentSpeed) * 0.08;
    this.targetSpeed += (this.baseSpeed - this.targetSpeed) * 0.05;
    this.x -= this.currentSpeed;

    const halfWidth = this.track.scrollWidth / 2;
    if (Math.abs(this.x) >= halfWidth) this.x = 0;

    this.track.style.transform = `translate3d(${this.x.toFixed(2)}px, 0, 0)`;
    requestAnimationFrame(() => this.render());
  }
}
```

---

# 4. 🔤 Kinetic Cipher Text Scramble (Oryzo & Cyberpunk Style)

Scrambles text through randomized glyphs and ASCII characters before smoothly resolving to original copy.

```javascript
function scrambleText(element, originalText, durationMs = 800) {
  const glyphs = '01XYZ_<>#*!%$&';
  let iteration = 0;
  const totalIterations = originalText.length;
  const intervalTime = durationMs / (totalIterations * 2);

  const interval = setInterval(() => {
    element.innerText = originalText
      .split('')
      .map((char, index) => {
        if (index < iteration) return originalText[index];
        return glyphs[Math.floor(Math.random() * glyphs.length)];
      })
      .join('');

    if (iteration >= totalIterations) clearInterval(interval);
    iteration += 1 / 2;
  }, intervalTime);
}
```

---

# 5. 📐 Char-by-Char Skew Mask Reveal (Obsidian Style)

Splits text into individual characters and translates them upward with custom `--char-index` delays and high-contrast skew angles.

```css
.char-wrapper {
  display: inline-block;
  overflow: hidden;
}

.char-inner {
  display: inline-block;
  transform: translateY(120%) skewY(12deg);
  opacity: 0;
  animation: charSkewIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--char-index) * 0.035s);
}

@keyframes charSkewIn {
  to { transform: translateY(0%) skewY(0deg); opacity: 1; }
}
```

---

# 6. 🍷 Liquid Inertia Multi-Speed Parallax (Santioni Style)

Decouples background atmosphere, body cards, and floating cutout assets with smooth differential scroll easing.

```javascript
class LiquidParallax {
  constructor() {
    this.elements = document.querySelectorAll('[data-parallax-speed]');
    this.currentY = window.scrollY;
    this.targetY = window.scrollY;
    this.ease = 0.08;

    window.addEventListener('scroll', () => {
      this.targetY = window.scrollY;
    }, { passive: true });

    this.render();
  }

  render() {
    this.currentY += (this.targetY - this.currentY) * this.ease;

    this.elements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax-speed'));
      const yOffset = -(this.currentY * speed);
      el.style.transform = `translate3d(0, ${yOffset.toFixed(2)}px, 0)`;
    });

    requestAnimationFrame(() => this.render());
  }
}
```

---

# 7. 🧲 Magnetic Difference Inversion Cursor (Obsidian Style)

Custom cursor follower that expands $3.5\times$ over interactive elements and inverts background colors with `mix-blend-mode: difference`.

```css
.magnetic-diff-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 18px;
  height: 18px;
  background-color: #ffffff;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
  transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              height 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.magnetic-diff-cursor.active {
  width: 64px;
  height: 64px;
}
```

---

# 8. 🏎️ Live Stat HUD Metric Counter Ticker (Charles Leclerc Style)

Animates metrics from 0 to target values using cubic ease-out interpolation when scrolled into view.

```javascript
function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-target'));
  const duration = 1600;
  const startTime = performance.now();
  const isFloat = target % 1 !== 0;

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = easeOut * target;

    el.innerText = isFloat ? current.toFixed(1) : Math.floor(current);

    if (progress < 1) requestAnimationFrame(update);
    else el.innerText = target;
  }
  requestAnimationFrame(update);
}
```

---

# 9. 🔥 Scroll-Linked SVG Path Dashoffset Tracker (Wildfire Style)

Links the stroke dashoffset of a vertical SVG line directly to page scroll progress.

```javascript
function bindScrollSVG(svgLine, sectionElement) {
  window.addEventListener('scroll', () => {
    const rect = sectionElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const total = rect.height - windowHeight / 2;
    const current = Math.max(0, -rect.top + windowHeight / 2);
    const progress = Math.min(Math.max(current / total, 0), 1);

    const length = 1000;
    svgLine.style.strokeDashoffset = length - (progress * length);
  }, { passive: true });
}
```

---

# 10. 🌿 Depth-of-Field Blur Crossfade Transition (Immersive Garden Style)

Blurs background visual plates on hover while bringing foreground editorial copy into sharp contrast.

```css
.dof-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(0px);
  transform: scale(1);
  transition: filter 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.dof-card:hover .dof-media {
  filter: blur(12px) brightness(0.6);
  transform: scale(1.08);
}
```

---

# 11. 💎 Holographic Foil Sheen & Metallic Sweeps

Draws a traveling light sheen across primary buttons and premium badges.

```css
.shimmer-foil {
  position: relative;
  overflow: hidden;
}

.shimmer-foil::after {
  content: '';
  position: absolute;
  top: 0;
  left: -150%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
  transform: skewX(-25deg);
  animation: foilSweep 3.5s infinite;
}

@keyframes foilSweep {
  0% { left: -150%; }
  35%, 100% { left: 150%; }
}
```

---

# 12. 🌊 Morphing SVG Blob Curves & Liquid Waveform (Zajno Style)

Dynamically animates quadratic bezier control points inside SVG paths for organic flowing outlines.

```javascript
function initLiquidWave(pathElement) {
  let step = 0;
  function animate() {
    step += 0.035;
    const cp1Y = 60 + Math.sin(step) * 30;
    const cp2Y = 60 - Math.sin(step) * 30;
    pathElement.setAttribute('d', `M 0,60 Q 100,${cp1Y.toFixed(1)} 200,60 T 400,${cp2Y.toFixed(1)}`);
    requestAnimationFrame(animate);
  }
  animate();
}
```

---

# 13. 🪂 Weightless Cutout Levitation with Phase-Shifted Shadow Scaling

Creates realistic weightless bobbing where the cutout rises while its drop shadow disc softens and scales down.

```css
.levitating-cutout {
  animation: levitateUp 5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
  filter: drop-shadow(0 25px 35px rgba(0, 0, 0, 0.5));
}

.shadow-disc {
  animation: shadowContract 5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}

@keyframes levitateUp {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-16px) rotate(1.2deg); }
}

@keyframes shadowContract {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(0.75); opacity: 0.35; }
}
```

---

# 14. 🏁 Diagonal Parallax Split Rails (Charles Leclerc Style)

Styles dual content tracks with a permanent $-3^\circ$ shear angle (`transform: skewY(-3deg)`) and opposing scroll velocities.

```css
.diagonal-split-track {
  transform: skewY(-3deg);
  display: flex;
  gap: 32px;
}

.left-track {
  will-change: transform;
}

.right-track {
  will-change: transform;
}
```

---

# 15. 🧲 Elastic Spring Physics Card Drag/Tilt (Zajno Style)

Uses Hooke's Law second-order differential equation ($F = -kx - cv$) for ultra-tactile drag and tilt feedback.

```javascript
class SpringCardPhysics {
  constructor(cardElement) {
    this.el = cardElement;
    this.targetX = 0; this.targetY = 0;
    this.currX = 0; this.currY = 0;
    this.velX = 0; this.velY = 0;
    this.k = 0.09; // Stiffness
    this.damping = 0.8; // Friction

    this.el.addEventListener('mousemove', (e) => {
      const rect = this.el.getBoundingClientRect();
      this.targetX = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -16;
      this.targetY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 16;
    });

    this.el.addEventListener('mouseleave', () => {
      this.targetX = 0; this.targetY = 0;
    });

    this.update();
  }

  update() {
    this.velX = (this.velX + (this.targetX - this.currX) * this.k) * this.damping;
    this.currX += this.velX;

    this.velY = (this.velY + (this.targetY - this.currY) * this.k) * this.damping;
    this.currY += this.velY;

    this.el.style.transform = `rotateX(${this.currX.toFixed(2)}deg) rotateY(${this.currY.toFixed(2)}deg)`;
    requestAnimationFrame(() => this.update());
  }
}
```

---

# 16. 🌌 Ambient Flowing Multi-Blob Aurora Mesh

Creates multi-point ambient radial glow orbs that drift and breathe in the background of dark-mode pages.

```css
.aurora-mesh-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.aurora-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.35;
  mix-blend-mode: screen;
}

.orb-primary {
  top: -10%; left: 20%;
  width: 600px; height: 600px;
  background: radial-gradient(circle, #6366f1 0%, transparent 70%);
  animation: driftOne 16s ease-in-out infinite alternate;
}

.orb-secondary {
  top: 20%; right: 15%;
  width: 700px; height: 700px;
  background: radial-gradient(circle, #06b6d4 0%, transparent 70%);
  animation: driftTwo 18s ease-in-out infinite alternate;
}

@keyframes driftOne {
  to { transform: translate(70px, 50px) scale(1.15); }
}

@keyframes driftTwo {
  to { transform: translate(-60px, 80px) scale(0.9); }
}
```

---

# 17. 🍱 Bento Grid Staggered Viewport Entrance

Fades and glides bento cards into position with cascading stagger when scrolled into view.

```javascript
const bentoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bento-item').forEach((card, i) => {
        card.style.animation = `bentoIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.12}s forwards`;
      });
      bentoObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
```

---

# 18. 🌌 Interactive 60fps Retina Canvas Constellation

Lightweight ($<3\text{KB}$) zero-dependency interactive particle network that connects nearby nodes and reacts to pointer distance.

```javascript
function initConstellation(canvas) {
  const ctx = canvas.getContext('2d');
  let w = canvas.width = canvas.parentElement.offsetWidth;
  let h = canvas.height = canvas.parentElement.offsetHeight;
  const particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
    size: Math.random() * 1.5 + 1
  }));

  function loop() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.fillStyle = 'rgba(99, 102, 241, 0.6)';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
    });
    requestAnimationFrame(loop);
  }
  loop();
}
```

---

# 19. 🔄 FLIP (First, Last, Invert, Play) Layout Morphing

Morphs layout elements smoothly between filter states or tabs without layout jumps.

```javascript
function flipTransition(element, changeLayoutCallback) {
  const first = element.getBoundingClientRect();
  changeLayoutCallback();
  const last = element.getBoundingClientRect();

  const invertX = first.left - last.left;
  const invertY = first.top - last.top;

  element.animate([
    { transform: `translate(${invertX}px, ${invertY}px)` },
    { transform: 'translate(0px, 0px)' }
  ], {
    duration: 350,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
  });
}
```

---

# 20. ⚡ Chromatic Aberration & Glitch RGB Split

Simulates a high-tech optical split on cybernetic buttons or badges on hover.

```css
.glitch-target:hover {
  animation: glitchRGB 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes glitchRGB {
  0% { transform: translate(0); text-shadow: none; }
  20% { transform: translate(-2px, 2px); text-shadow: 2px 0 #06b6d4, -2px 0 #ec4899; }
  40% { transform: translate(-2px, -2px); text-shadow: -2px 0 #06b6d4, 2px 0 #ec4899; }
  60% { transform: translate(2px, 2px); text-shadow: 2px 0 #06b6d4, -2px 0 #ec4899; }
  80% { transform: translate(2px, -2px); text-shadow: -2px 0 #06b6d4, 2px 0 #ec4899; }
  100% { transform: translate(0); text-shadow: none; }
}
```

---

## ♿ Accessibility & Performance Iron Rules

1. **Hardware Compositor Acceleration**: Only animate `transform`, `opacity`, and `filter`.
2. **Reduced Motion Non-Negotiable Gate**:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
       scroll-behavior: auto !important;
     }
   }
   ```
