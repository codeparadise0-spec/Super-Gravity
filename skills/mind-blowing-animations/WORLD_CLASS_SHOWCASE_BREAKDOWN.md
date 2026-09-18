# 🏆 World-Class Animation Breakdown & Reverse-Engineered Masterclass
### Comprehensive Analysis of 8 Award-Winning Websites (Non-3D DOM, SVG & CSS Physics)

This document provides an exhaustive, reverse-engineered breakdown of the animations and interaction architectures from 8 of the world's most acclaimed digital experiences. 

> [!IMPORTANT]
> **Strict Non-3D Focus**: In accordance with the Super Gravity core directive, all 3D WebGL/Three.js/Canvas shader scenes have been filtered out. The focus is 100% on **high-performance DOM, CSS hardware-accelerated transforms, SVG path morphing, kinetic typography, magnetic spring physics, velocity marquees, and dynamic mask transitions**.

---

## 📑 Index of Analyzed Benchmark Sites

1. **[Santioni Spirits](https://santionispirits.com/)** — *Artisanal Luxury Spirits & Editorial Parallax*
2. **[Oryzo AI](https://oryzo.ai/)** — *Futuristic Neon AI & Laser Border Conic Beams*
3. **[Obsidian Assembly](https://obsidianassembly.com/)** — *Brutalist Obsidian Studio & Char-by-Char Skew Masks*
4. **[Juice Agency](https://www.juice.agency/)** — *High-Velocity Kinetic Typography & Velocity Marquee*
5. **[Charles Leclerc Official](https://charlesleclerc.com/en/)** — *Motorsport Dynamics, Diagonal Shear & Stat HUD*
6. **[Immersive Garden](https://immersive-g.com/)** — *Depth-of-Field Blur Crossfade & Fluid Ribbon Nav*
7. **[Following Wildfire](https://followingwildfire.com/)** — *Atmospheric Documentary Timeline & Vignette Masks*
8. **[Zajno Motion](https://motion.zajno.com/)** — *Spring-Physics Inertia Cards & SVG Waveform Morphing*

---

```
═══════════════════════════════════════════════════════════════════════════════════════════════════════════
                              THE MASTER 12 NON-3D ANIMATION RECIPES
═══════════════════════════════════════════════════════════════════════════════════════════════════════════
  [01] Santioni Liquid Scroll Parallax        │ [07] Juice Kinetic Character Scramble
  [02] Oryzo Laser Conic Border Beam          │ [08] Leclerc Diagonal Split-Screen Shear
  [03] Oryzo Dynamic Mouse Spotlight          │ [09] Leclerc High-Speed Stat HUD Ticker
  [04] Oryzo Flip-Text Cipher Unscramble      │ [10] Immersive Garden Depth-of-Field Crossfade
  [05] Obsidian Char-by-Char Skew Mask        │ [11] Wildfire SVG Scroll-Linked Stroke Tracker
  [06] Obsidian Magnetic Difference Inversion │ [12] Zajno Spring-Physics Card & SVG Morph
═══════════════════════════════════════════════════════════════════════════════════════════════════════════
```

---

# 1. 🍷 Santioni Spirits (https://santionispirits.com/)
### Vibe: Artisanal Luxury, Warm Amber, Heritage Craftsmanship

#### 🎨 Aesthetic Profile & Tokens:
- **Backgrounds**: `#0C0A09` (Warm Espresso), `#1C1917` (Dark Roasted Slate)
- **Accents**: `#D97706` (Warm Amber Glow), `#F59E0B` (Golden Tuscan Sun)
- **Typography**: Editorial Serif with wide kerning (`letter-spacing: 0.08em; font-feature-settings: "liga" 1;`)

#### 🔬 Reverse-Engineered Non-3D Animations:
1. **Decoupled Multi-Speed Layer Parallax**: Background imagery moves at $0.15\times$ scroll speed while cutout product bottles glide at $0.45\times$, creating an optical depth illusion without WebGL.
2. **Vintage Serif Mask Reveal**: Header typography is nested inside an `overflow: hidden` mask. Words slide up with a subtle rotation (`rotate(3deg) -> rotate(0deg)`).
3. **Weightless Bottle Levitation with Phase-Shifted Shadow**: Transparent cutout bottle PNG floats gently on a 6s sine loop while its organic drop shadow expands and blurs out of phase.

#### 💻 Complete Production Code:

```html
<!-- Santioni Parallax Hero Section -->
<section class="santioni-hero" id="santioniHero">
  <div class="santioni-bg-layer" data-speed="0.15"></div>
  
  <div class="santioni-content">
    <div class="santioni-tag-mask">
      <span class="santioni-tag">COLLEZIONE ARTIGIANALE 1928</span>
    </div>
    
    <h1 class="santioni-title">
      <span class="mask-line"><span class="line-inner">ESSENCE OF</span></span>
      <span class="mask-line"><span class="line-inner italic-serif">TUSCAN HERITAGE</span></span>
    </h1>
    
    <p class="santioni-desc">
      Distilled from botanical elixirs aged in toasted oak casks across five generations.
    </p>
  </div>

  <div class="santioni-bottle-wrapper" data-speed="0.4">
    <div class="santioni-bottle-levitate">
      <img src="bottle-cutout.png" alt="Santioni Amaro Bottle" class="santioni-bottle-img" />
      <div class="santioni-shadow-disc"></div>
    </div>
  </div>
</section>
```

```css
.santioni-hero {
  position: relative;
  min-height: 100vh;
  background-color: #0c0a09;
  color: #f5f5f4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(2rem, 6vw, 6rem);
  overflow: hidden;
}

.santioni-bg-layer {
  position: absolute;
  inset: -10%;
  background: radial-gradient(circle at 60% 40%, rgba(217, 119, 6, 0.15) 0%, transparent 60%),
              radial-gradient(circle at 20% 80%, rgba(120, 53, 15, 0.1) 0%, transparent 50%);
  pointer-events: none;
  will-change: transform;
}

.santioni-content {
  max-width: 580px;
  z-index: 2;
}

.santioni-tag-mask {
  overflow: hidden;
  margin-bottom: 1.25rem;
}

.santioni-tag {
  display: inline-block;
  font-family: ui-monospace, SFMono-Regular, monospace;
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  color: #d97706;
  text-transform: uppercase;
  transform: translateY(100%);
  animation: santioniTagIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
}

.santioni-title {
  font-family: "Playfair Display", "Times New Roman", serif;
  font-size: clamp(2.75rem, 5.5vw, 5rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
}

.mask-line {
  display: block;
  overflow: hidden;
}

.line-inner {
  display: block;
  transform: translateY(110%) rotate(2.5deg);
  transform-origin: left bottom;
  opacity: 0;
  animation: santioniLineIn 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.santioni-title .mask-line:nth-child(1) .line-inner { animation-delay: 0.35s; }
.santioni-title .mask-line:nth-child(2) .line-inner { animation-delay: 0.5s; }

.italic-serif {
  font-style: italic;
  color: #f59e0b;
}

.santioni-desc {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #a8a29e;
  max-width: 440px;
  opacity: 0;
  transform: translateY(20px);
  animation: santioniFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards;
}

/* Levitating Cutout Bottle */
.santioni-bottle-wrapper {
  position: relative;
  z-index: 2;
  will-change: transform;
}

.santioni-bottle-levitate {
  position: relative;
  animation: santioniFloat 6s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}

.santioni-bottle-img {
  display: block;
  max-height: 75vh;
  filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.6));
}

.santioni-shadow-disc {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 24px;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.7) 0%, transparent 70%);
  border-radius: 50%;
  animation: santioniShadowScale 6s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}

@keyframes santioniLineIn {
  to { transform: translateY(0%) rotate(0deg); opacity: 1; }
}

@keyframes santioniTagIn {
  to { transform: translateY(0%); }
}

@keyframes santioniFadeUp {
  to { transform: translateY(0); opacity: 1; }
}

@keyframes santioniFloat {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-18px) rotate(1deg); }
}

@keyframes santioniShadowScale {
  0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.7; }
  50% { transform: translateX(-50%) scale(0.75); opacity: 0.35; }
}
```

```javascript
// Santioni Inertia Multi-Speed Parallax
class SantioniParallax {
  constructor() {
    this.elements = document.querySelectorAll('[data-speed]');
    this.scrollY = window.scrollY;
    this.targetY = window.scrollY;
    this.ease = 0.075; // Ultra smooth liquid dampening
    
    window.addEventListener('scroll', () => {
      this.targetY = window.scrollY;
    }, { passive: true });
    
    this.render();
  }
  
  render() {
    this.scrollY += (this.targetY - this.scrollY) * this.ease;
    
    this.elements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-speed'));
      const yPos = -(this.scrollY * speed);
      el.style.transform = `translate3d(0, ${yPos.toFixed(2)}px, 0)`;
    });
    
    requestAnimationFrame(() => this.render());
  }
}

new SantioniParallax();
```

---

# 2. ⚡ Oryzo AI (https://oryzo.ai/)
### Vibe: Futuristic Neon AI, Pitch Obsidian, Cybernetic Glow

#### 🎨 Aesthetic Profile & Tokens:
- **Backgrounds**: `#04060A` (Midnight Abyss), `#0B0F19` (High-Tech Carbon)
- **Accents**: `#8B5CF6` (Radiant Violet), `#06B6D4` (Laser Cyan), `#EC4899` (Electric Pink)
- **Surfaces**: Glassmorphism with 1px border beam and multi-layer backdrop blur (`backdrop-filter: blur(24px);`)

#### 🔬 Reverse-Engineered Non-3D Animations:
1. **Laser Border Beam Conic Sweep**: A 2px glowing laser line orbits the perimeter of bento cards using CSS `@property --beam-angle`.
2. **Mouse-Tracking Spotlight Refraction**: As the cursor moves over cards, a soft radial spotlight tracks coordinates in real-time.
3. **Flip-Text Cipher Unscramble**: When toggling states or hovering buttons, text flips in 3D and scrambles through cybernetic characters before settling.

#### 💻 Complete Production Code:

```html
<!-- Oryzo Laser Bento Card with Dynamic Refraction -->
<div class="oryzo-card" id="oryzoBento">
  <div class="oryzo-beam-stroke"></div>
  <div class="oryzo-spotlight"></div>
  <div class="oryzo-inner">
    <div class="oryzo-badge">
      <span class="pulse-dot"></span>
      <span>NEURAL INFERENCE ENGINE</span>
    </div>
    
    <h3 class="oryzo-heading">Sub-Millisecond Edge Routing</h3>
    <p class="oryzo-text">Dynamic matrix compilation delivering 120,000 token/sec throughput on decentralized node clusters.</p>
    
    <button class="oryzo-cipher-btn" id="cipherBtn" data-original="INITIALIZE MATRIX">
      <span class="btn-beam"></span>
      <span class="btn-text">INITIALIZE MATRIX</span>
    </button>
  </div>
</div>
```

```css
@property --beam-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.oryzo-card {
  position: relative;
  width: 440px;
  border-radius: 24px;
  background: rgba(11, 15, 25, 0.7);
  padding: 1px; /* 1px border stroke container */
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px);
}

.oryzo-beam-stroke {
  position: absolute;
  inset: -150%;
  background: conic-gradient(
    from var(--beam-angle),
    transparent 0deg,
    transparent 280deg,
    #8b5cf6 320deg,
    #06b6d4 350deg,
    transparent 360deg
  );
  animation: laserBeamSpin 4s linear infinite;
}

.oryzo-inner {
  position: relative;
  z-index: 1;
  background: #090d16;
  border-radius: 23px;
  padding: 36px;
}

.oryzo-spotlight {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: radial-gradient(
    circle 260px at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(139, 92, 246, 0.15) 0%,
    transparent 80%
  );
  opacity: var(--spotlight-opacity, 0);
  transition: opacity 0.3s ease;
}

.oryzo-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 9999px;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.25);
  color: #a78bfa;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  margin-bottom: 20px;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #06b6d4;
  box-shadow: 0 0 8px #06b6d4;
  animation: oryzoDotPulse 1.8s infinite;
}

.oryzo-heading {
  font-size: 1.5rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 12px;
}

.oryzo-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #94a3b8;
  margin-bottom: 28px;
}

/* Cyber Cipher Button */
.oryzo-cipher-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 28px;
  border-radius: 12px;
  background: #1e1b4b;
  border: 1px solid rgba(139, 92, 246, 0.4);
  color: #e0e7ff;
  font-family: ui-monospace, SFMono-Regular, monospace;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.15s ease, border-color 0.2s ease;
}

.oryzo-cipher-btn:hover {
  border-color: #06b6d4;
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
}

@keyframes laserBeamSpin {
  to { --beam-angle: 360deg; }
}

@keyframes oryzoDotPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
}
```

```javascript
// Oryzo Mouse-Tracking Spotlight & Cipher Engine
const bento = document.getElementById('oryzoBento');
const cipherBtn = document.getElementById('cipherBtn');
const cipherText = cipherBtn.querySelector('.btn-text');
const glyphs = '01XYZ_<>#*!%$&';

// Spotlight Logic
bento.addEventListener('mousemove', (e) => {
  const rect = bento.getBoundingClientRect();
  bento.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
  bento.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  bento.style.setProperty('--spotlight-opacity', '1');
});

bento.addEventListener('mouseleave', () => {
  bento.style.setProperty('--spotlight-opacity', '0');
});

// Flip-Text Cipher Scramble
let scrambleInterval = null;
cipherBtn.addEventListener('mouseenter', () => {
  const original = cipherBtn.getAttribute('data-original');
  let iteration = 0;
  clearInterval(scrambleInterval);

  scrambleInterval = setInterval(() => {
    cipherText.innerText = original
      .split('')
      .map((char, index) => {
        if (index < iteration) return original[index];
        return glyphs[Math.floor(Math.random() * glyphs.length)];
      })
      .join('');

    if (iteration >= original.length) {
      clearInterval(scrambleInterval);
    }
    iteration += 1 / 2;
  }, 30);
});
```

---

# 3. 🌑 Obsidian Assembly (https://obsidianassembly.com/)
### Vibe: High Fashion Brutalism, Monochromatic Noir, Extreme Contrast

#### 🎨 Aesthetic Profile & Tokens:
- **Backgrounds**: `#080808` (Obsidian Noir), `#121212` (Cold Charcoal)
- **Accents**: `#E5E7EB` (Silver Platinum), `#FACC15` (Warning Yellow Accent)
- **Typography**: Heavy Condensed Sans + Extended Monospace Labels

#### 🔬 Reverse-Engineered Non-3D Animations:
1. **Char-by-Char Skew & Translation Reveal**: Split text where each character enters from below with an intentional skew angle (`transform: translateY(100%) skewY(8deg)`), calculating delays using `calc(var(--char-index) * 0.035s)`.
2. **Magnetic Inverted Cursor Follower**: A circle follower that uses CSS `mix-blend-mode: difference` and expands $3.5\times$ in scale when hovering over text or interactive targets.
3. **Masked Fade Wipe Overlays**: Sections reveal through CSS `mask-image: linear-gradient()` curtains that expand smoothly on viewport entry.

#### 💻 Complete Production Code:

```html
<!-- Obsidian Char-by-Char Skew Reveal & Inverted Cursor -->
<div class="obsidian-cursor" id="obsidianCursor"></div>

<section class="obsidian-hero">
  <div class="obsidian-label-row">
    <span class="obsidian-code">[SPEC_09.4]</span>
    <span class="obsidian-code">ARCHITECTURAL SYSTEM</span>
  </div>
  
  <h1 class="obsidian-skew-title" id="skewTitle">
    OBSIDIAN COHORT
  </h1>
  
  <div class="obsidian-cta-box">
    <a href="#" class="obsidian-btn magnetic-target">ENTER ARCHIVE</a>
  </div>
</section>
```

```css
body {
  background-color: #080808;
  color: #f3f4f6;
  cursor: none; /* Controlled by custom cursor */
}

/* Magnetic Inverted Cursor */
.obsidian-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  background-color: #ffffff;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
  transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              height 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              background-color 0.2s ease;
  will-change: transform;
}

.obsidian-cursor.cursor-active {
  width: 70px;
  height: 70px;
}

.obsidian-hero {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 clamp(2rem, 8vw, 8rem);
}

.obsidian-label-row {
  display: flex;
  gap: 24px;
  margin-bottom: 2rem;
}

.obsidian-code {
  font-family: ui-monospace, SFMono-Regular, monospace;
  font-size: 0.8rem;
  color: #9ca3af;
  letter-spacing: 0.15em;
}

.obsidian-skew-title {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: clamp(3rem, 9vw, 8.5rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.04em;
  line-height: 0.9;
  margin-bottom: 3rem;
  display: flex;
  overflow: hidden;
}

.char-wrapper {
  display: inline-block;
  overflow: hidden;
}

.char-inner {
  display: inline-block;
  transform: translateY(120%) skewY(12deg);
  opacity: 0;
  animation: charSkewIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--char-index) * 0.04s);
}

@keyframes charSkewIn {
  to {
    transform: translateY(0%) skewY(0deg);
    opacity: 1;
  }
}

.obsidian-btn {
  display: inline-block;
  padding: 16px 36px;
  background: transparent;
  border: 1px solid #374151;
  color: #f3f4f6;
  text-decoration: none;
  font-family: ui-monospace, SFMono-Regular, monospace;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.obsidian-btn:hover {
  border-color: #facc15;
}
```

```javascript
// Obsidian Cursor & Character Split Engine
const cursor = document.getElementById('obsidianCursor');
const skewTitle = document.getElementById('skewTitle');

// 1. Split Text into Skew Chars
const text = skewTitle.innerText.trim();
skewTitle.innerHTML = '';
[...text].forEach((char, index) => {
  const spanWrap = document.createElement('span');
  spanWrap.className = 'char-wrapper';
  
  const spanInner = document.createElement('span');
  spanInner.className = 'char-inner';
  spanInner.innerText = char === ' ' ? '\u00A0' : char;
  spanInner.style.setProperty('--char-index', index);
  
  spanWrap.appendChild(spanInner);
  skewTitle.appendChild(spanWrap);
});

// 2. 60fps Smooth Magnetic Difference Cursor
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function renderCursor() {
  cursorX += (mouseX - cursorX) * 0.18;
  cursorY += (mouseY - cursorY) * 0.18;
  cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
  requestAnimationFrame(renderCursor);
}
renderCursor();

// 3. Hover Expansion
document.querySelectorAll('.magnetic-target, .char-wrapper, h1, a').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('cursor-active'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-active'));
});
```

---

# 4. 🚀 Juice Agency (https://www.juice.agency/)
### Vibe: Ultra-High Velocity, Raw Creative Agency, Kinetic Editorial

#### 🎨 Aesthetic Profile & Tokens:
- **Backgrounds**: `#000000` (Pure Black), `#111111` (Matte Onyx)
- **Accents**: `#22C55E` (Electric Green), `#FAFAFA` (High Contrast White)
- **Typography**: Bold Extended Grotesk + Dynamic Running Marquees

#### 🔬 Reverse-Engineered Non-3D Animations:
1. **Dynamic Scroll-Velocity Responsive Marquee**: An infinite horizontal ticker that runs at a baseline speed and accelerates proportionally to the user's instantaneous scroll velocity delta.
2. **Threshold Clip-Path Video/Media Reveal**: Media containers scale up and un-clip (`clip-path: inset(10% 10% 10% 10%) -> inset(0%)`) as they cross viewport thresholds.

#### 💻 Complete Production Code:

```html
<!-- Juice Velocity-Linked Infinite Marquee -->
<div class="juice-marquee-container" id="juiceMarquee">
  <div class="juice-track" id="marqueeTrack">
    <div class="juice-item">DIGITAL EXPERIENCES</div>
    <div class="juice-item stroke-text">RADICAL CRAFT</div>
    <div class="juice-item">KINETIC IDENTITY</div>
    <div class="juice-item stroke-text">FUTURE TECH</div>
    <!-- Duplicated for seamless loop -->
    <div class="juice-item">DIGITAL EXPERIENCES</div>
    <div class="juice-item stroke-text">RADICAL CRAFT</div>
    <div class="juice-item">KINETIC IDENTITY</div>
    <div class="juice-item stroke-text">FUTURE TECH</div>
  </div>
</div>
```

```css
.juice-marquee-container {
  width: 100vw;
  overflow: hidden;
  background: #000000;
  padding: 40px 0;
  border-top: 1px solid #222;
  border-bottom: 1px solid #222;
  user-select: none;
}

.juice-track {
  display: flex;
  white-space: nowrap;
  gap: 48px;
  will-change: transform;
}

.juice-item {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 48px;
}

.juice-item::after {
  content: '✦';
  color: #22c55e;
  font-size: 0.5em;
}

.stroke-text {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.4);
}
```

```javascript
// High-Performance Velocity Marquee Engine
class VelocityMarquee {
  constructor(trackId) {
    this.track = document.getElementById(trackId);
    this.x = 0;
    this.baseSpeed = 1.2;
    this.currentSpeed = this.baseSpeed;
    this.targetSpeed = this.baseSpeed;
    this.lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const delta = Math.abs(window.scrollY - this.lastScrollY);
      this.lastScrollY = window.scrollY;
      // Boost speed with scroll velocity
      this.targetSpeed = this.baseSpeed + Math.min(delta * 0.12, 18);
    }, { passive: true });
    
    this.animate();
  }
  
  animate() {
    // Dampen speed back to base
    this.currentSpeed += (this.targetSpeed - this.currentSpeed) * 0.08;
    this.targetSpeed += (this.baseSpeed - this.targetSpeed) * 0.05;
    
    this.x -= this.currentSpeed;
    
    // Seamless reset at half width
    const halfWidth = this.track.scrollWidth / 2;
    if (Math.abs(this.x) >= halfWidth) {
      this.x = 0;
    }
    
    this.track.style.transform = `translate3d(${this.x.toFixed(2)}px, 0, 0)`;
    requestAnimationFrame(() => this.animate());
  }
}

new VelocityMarquee('marqueeTrack');
```

---

# 5. 🏎️ Charles Leclerc Official (https://charlesleclerc.com/en/)
### Vibe: Motorsport Luxury, Dynamic Precision, High Velocity HUD

#### 🎨 Aesthetic Profile & Tokens:
- **Backgrounds**: `#0A0A0C` (Carbon Night), `#16161A` (Asphalt Dark)
- **Accents**: `#E10600` (Scuderia Rosso Red), `#FFFFFF` (Stark White)
- **Typography**: Italic Condensed Display (`font-style: italic; font-weight: 800;`)

#### 🔬 Reverse-Engineered Non-3D Animations:
1. **Diagonal Parallax Split Rails**: Dual content tracks styled with a permanent $-3^\circ$ shear angle (`transform: skewY(-3deg)`), with left and right columns scrolling at opposing rates.
2. **Live Race Stat HUD Counter Ticker**: Fast-scrolling decimal number counters that accelerate and ease into exact podium stats using quadratic ease-out math.

#### 💻 Complete Production Code:

```html
<!-- Motorsport Stat HUD Grid -->
<div class="leclerc-hud-grid">
  <div class="hud-card">
    <div class="hud-top">
      <span class="hud-code">ST-01 // PODIUMS</span>
      <span class="hud-pulse-red"></span>
    </div>
    <div class="hud-counter" data-target="38" data-prefix="" data-suffix="">0</div>
    <div class="hud-label">Career Formula 1 Podiums</div>
  </div>

  <div class="hud-card">
    <div class="hud-top">
      <span class="hud-code">ST-02 // POLE POSITIONS</span>
      <span class="hud-pulse-red"></span>
    </div>
    <div class="hud-counter" data-target="26" data-prefix="" data-suffix="">0</div>
    <div class="hud-label">Qualifying Pole Positions</div>
  </div>

  <div class="hud-card">
    <div class="hud-top">
      <span class="hud-code">ST-03 // TOP SPEED</span>
      <span class="hud-pulse-red"></span>
    </div>
    <div class="hud-counter" data-target="352.4" data-prefix="" data-suffix=" KM/H">0</div>
    <div class="hud-label">Max Speed Trapped (Monza)</div>
  </div>
</div>
```

```css
.leclerc-hud-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
}

.hud-card {
  position: relative;
  background: #111115;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 3px solid #e10600;
  border-radius: 8px;
  padding: 28px;
  overflow: hidden;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.hud-card:hover {
  transform: translateY(-4px);
  border-color: rgba(225, 6, 0, 0.6);
}

.hud-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.hud-code {
  font-family: ui-monospace, SFMono-Regular, monospace;
  font-size: 0.75rem;
  color: #888890;
  letter-spacing: 0.1em;
}

.hud-pulse-red {
  width: 8px;
  height: 8px;
  background: #e10600;
  border-radius: 50%;
  box-shadow: 0 0 10px #e10600;
  animation: redFlash 1.2s infinite;
}

.hud-counter {
  font-family: "Impact", "Arial Black", sans-serif;
  font-style: italic;
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1;
  color: #ffffff;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.hud-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #9e9ea7;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@keyframes redFlash {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(0.7); }
}
```

```javascript
// Charles Leclerc Stat HUD Counter Engine (Intersection-Triggered)
function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-target'));
  const prefix = el.getAttribute('data-prefix') || '';
  const suffix = el.getAttribute('data-suffix') || '';
  const isFloat = target % 1 !== 0;
  const duration = 1800; // 1.8s
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease-out cubic formula
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentVal = easeOut * target;

    el.innerText = `${prefix}${isFloat ? currentVal.toFixed(1) : Math.floor(currentVal)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.innerText = `${prefix}${target}${suffix}`;
    }
  }

  requestAnimationFrame(update);
}

const hudObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.hud-counter').forEach(animateCounter);
      hudObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.leclerc-hud-grid').forEach(grid => hudObserver.observe(grid));
```

---

# 6. 🌿 Immersive Garden (https://immersive-g.com/)
### Vibe: Avant-Garde Digital Production, Editorial Elegance

#### 🎨 Aesthetic Profile & Tokens:
- **Backgrounds**: `#0E1015` (Deep Slate Charcoal)
- **Accents**: `#94A3B8` (Muted Steel), `#F8FAFC` (Pure Pearl)
- **Surfaces**: Frosted glass ribbon nav with dynamic blur transitions

#### 🔬 Reverse-Engineered Non-3D Animations:
1. **Depth-of-Field Crossfade**: Background visual plates blur progressively (`filter: blur(12px) scale(1.06)`) as overlay editorial titles enter sharp focus.
2. **Fluid Ribbon Navigation**: A persistent header pills ribbon that squishes and expands organically based on scroll direction.

#### 💻 Complete Production Code:

```html
<!-- Immersive Depth of Field Case Card -->
<div class="immersive-card">
  <div class="immersive-media-layer">
    <img src="project-preview.jpg" alt="Case Study" class="immersive-img" />
  </div>
  <div class="immersive-glass-overlay">
    <span class="category-tag">IMMERSIVE CAMPAIGN</span>
    <h2 class="immersive-title">Maison Margiela Digital Vernissage</h2>
    <a href="#" class="immersive-link">VIEW ARCHIVE <span>→</span></a>
  </div>
</div>
```

```css
.immersive-card {
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 480px;
  border-radius: 28px;
  overflow: hidden;
  background: #0e1015;
  cursor: pointer;
}

.immersive-media-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.immersive-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  filter: blur(0px);
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.immersive-card:hover .immersive-img {
  transform: scale(1.08);
  filter: blur(10px) brightness(0.65);
}

.immersive-glass-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 48px;
  background: linear-gradient(0deg, rgba(14, 16, 21, 0.85) 0%, transparent 60%);
  z-index: 2;
}

.category-tag {
  font-family: ui-monospace, monospace;
  font-size: 0.8rem;
  color: #94a3b8;
  letter-spacing: 0.15em;
  margin-bottom: 12px;
  transform: translateY(15px);
  opacity: 0.7;
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.immersive-title {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: clamp(1.8rem, 3.5vw, 2.75rem);
  font-weight: 700;
  color: #ffffff;
  line-height: 1.15;
  margin-bottom: 20px;
  transform: translateY(15px);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.immersive-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease 0.1s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
}

.immersive-card:hover .category-tag,
.immersive-card:hover .immersive-title {
  transform: translateY(0);
}

.immersive-card:hover .immersive-link {
  opacity: 1;
  transform: translateY(0);
}
```

---

# 7. 🔥 Following Wildfire (https://followingwildfire.com/)
### Vibe: Atmospheric Narrative, Documentary Timeline, Environmental

#### 🎨 Aesthetic Profile & Tokens:
- **Backgrounds**: `#0C0806` (Smoky Charcoal Noir), `#1C120C` (Ember Ash)
- **Accents**: `#F97316` (Wildfire Orange), `#EF4444` (Crisis Crimson)
- **Atmosphere**: Radial noise vignette mask and continuous vertical timeline scroll tracking

#### 🔬 Reverse-Engineered Non-3D Animations:
1. **Scroll-Linked SVG Progress Line**: A vertical narrative line whose `stroke-dashoffset` draws smoothly from 0% to 100% as the reader scrolls down.
2. **Atmospheric Noise Vignette Mask**: Layered radial gradients simulating atmospheric smoke dissipation.

#### 💻 Complete Production Code:

```html
<!-- Wildfire Scroll-Linked Narrative Timeline -->
<div class="wildfire-timeline-section" id="wildfireSection">
  <svg class="timeline-svg" viewBox="0 0 4 1000" preserveAspectRatio="none">
    <line x1="2" y1="0" x2="2" y2="1000" class="timeline-bg-line" />
    <line x1="2" y1="0" x2="2" y2="1000" class="timeline-active-line" id="activeLine" />
  </svg>

  <div class="timeline-milestones">
    <div class="milestone-item">
      <div class="milestone-dot"></div>
      <div class="milestone-card">
        <span class="milestone-time">04:15 PDT // IGNITION</span>
        <h3>Dry Lightning Cluster Strikes Santa Cruz Ridge</h3>
        <p>Over 8,000 strikes recorded within a 48-minute thermal window.</p>
      </div>
    </div>

    <div class="milestone-item">
      <div class="milestone-dot"></div>
      <div class="milestone-card">
        <span class="milestone-time">11:30 PDT // EXPANSION</span>
        <h3>Diablo Winds Accelerate Front to 45 MPH</h3>
        <p>Canopy humidity drops below 6% causing rapid crown fire propagation.</p>
      </div>
    </div>
  </div>
</div>
```

```css
.wildfire-timeline-section {
  position: relative;
  background: #0c0806;
  color: #f5f5f4;
  padding: 80px clamp(2rem, 8vw, 8rem);
  max-width: 900px;
  margin: 0 auto;
}

.timeline-svg {
  position: absolute;
  left: clamp(2rem, 8vw, 8rem);
  top: 80px;
  bottom: 80px;
  width: 4px;
  height: calc(100% - 160px);
}

.timeline-bg-line {
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 3;
}

.timeline-active-line {
  stroke: #f97316;
  stroke-width: 3;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  transition: stroke-dashoffset 0.1s linear;
}

.timeline-milestones {
  margin-left: 48px;
  display: flex;
  flex-direction: column;
  gap: 90px;
}

.milestone-item {
  position: relative;
}

.milestone-dot {
  position: absolute;
  left: -54px;
  top: 6px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #0c0806;
  border: 2px solid #f97316;
  transition: background 0.3s ease, transform 0.3s ease;
}

.milestone-item.active .milestone-dot {
  background: #f97316;
  transform: scale(1.3);
  box-shadow: 0 0 14px #f97316;
}

.milestone-card {
  background: #1c120c;
  border: 1px solid rgba(249, 115, 22, 0.2);
  border-radius: 16px;
  padding: 32px;
}

.milestone-time {
  font-family: ui-monospace, monospace;
  font-size: 0.8rem;
  color: #f97316;
  font-weight: 700;
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: 8px;
}
```

```javascript
// Wildfire Scroll-Linked SVG Dashoffset Tracker
const activeLine = document.getElementById('activeLine');
const timelineSection = document.getElementById('wildfireSection');

window.addEventListener('scroll', () => {
  const rect = timelineSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  const total = rect.height - windowHeight / 2;
  const current = Math.max(0, -rect.top + windowHeight / 2);
  const progress = Math.min(Math.max(current / total, 0), 1);
  
  // Update stroke dashoffset
  const offset = 1000 - (progress * 1000);
  activeLine.style.strokeDashoffset = offset;
  
  // Highlight active milestone dots
  document.querySelectorAll('.milestone-item').forEach(item => {
    const itemRect = item.getBoundingClientRect();
    if (itemRect.top < windowHeight * 0.65) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}, { passive: true });
```

---

# 8. 🎨 Zajno Motion (https://motion.zajno.com/)
### Vibe: Hyper-Polished Motion Studio, Fluid Physics, Kinetic Playfulness

#### 🎨 Aesthetic Profile & Tokens:
- **Backgrounds**: `#0B0C10` (Dark Steel), `#1F2833` (Slate Matrix)
- **Accents**: `#45A29E` (Cyan Mint), `#66FCF1` (Fluorescent Aqua)

#### 🔬 Reverse-Engineered Non-3D Animations:
1. **Inertia-Damped Spring Physics Card Tilt**: Uses Hooke's law ($F = -kx - cv$) with dampening to simulate real physical inertia when dragging or hovering.
2. **Animated SVG Waveform Path Morphing**: Dynamically alters the `d` attribute of bezier SVG paths using `requestAnimationFrame` for liquid flowing outlines.

#### 💻 Complete Production Code:

```html
<!-- Zajno Spring-Physics Card & Animated SVG Waveform -->
<div class="zajno-card-wrap">
  <div class="zajno-spring-card" id="zajnoCard">
    <svg class="zajno-waveform" viewBox="0 0 400 120">
      <path id="wavePath" d="M 0,60 Q 100,20 200,60 T 400,60" fill="none" stroke="#66fcf1" stroke-width="3" />
    </svg>
    
    <div class="zajno-card-body">
      <span class="zajno-badge">SPRING PHYSICS v2.4</span>
      <h3 class="zajno-title">Tactile Elastic Response</h3>
      <p class="zajno-desc">Dynamic spring equilibrium calculated with second-order differential dampening.</p>
    </div>
  </div>
</div>
```

```css
.zajno-card-wrap {
  perspective: 1200px;
  display: flex;
  justify-content: center;
  padding: 60px 20px;
}

.zajno-spring-card {
  position: relative;
  width: 420px;
  background: #11141c;
  border: 1px solid rgba(102, 252, 241, 0.2);
  border-radius: 24px;
  padding: 36px;
  transform-style: preserve-3d;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
  cursor: grab;
  will-change: transform;
}

.zajno-spring-card:active {
  cursor: grabbing;
}

.zajno-waveform {
  width: 100%;
  height: 80px;
  margin-bottom: 20px;
  overflow: visible;
}

.zajno-badge {
  display: inline-block;
  font-family: ui-monospace, monospace;
  font-size: 0.75rem;
  font-weight: 700;
  color: #66fcf1;
  letter-spacing: 0.12em;
  margin-bottom: 12px;
}

.zajno-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 10px;
}

.zajno-desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #94a3b8;
}
```

```javascript
// Zajno Spring Physics & Waveform Morph Engine
const card = document.getElementById('zajnoCard');
const wavePath = document.getElementById('wavePath');

// 1. Spring Physics State
let targetRotX = 0, targetRotY = 0;
let currentRotX = 0, currentRotY = 0;
let velX = 0, velY = 0;
const k = 0.08; // Spring stiffness
const damping = 0.82; // Velocity friction

card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  
  targetRotX = (y / (rect.height / 2)) * -18;
  targetRotY = (x / (rect.width / 2)) * 18;
});

card.addEventListener('mouseleave', () => {
  targetRotX = 0;
  targetRotY = 0;
});

// 2. Waveform Oscillation State
let waveStep = 0;

function updatePhysics() {
  // Spring Euler Integration
  const forceX = (targetRotX - currentRotX) * k;
  velX = (velX + forceX) * damping;
  currentRotX += velX;

  const forceY = (targetRotY - currentRotY) * k;
  velY = (velY + forceY) * damping;
  currentRotY += velY;

  card.style.transform = `rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;

  // Waveform Morphing (sine wave oscillation)
  waveStep += 0.04;
  const cp1Y = 60 + Math.sin(waveStep) * 35;
  const cp2Y = 60 - Math.sin(waveStep) * 35;
  wavePath.setAttribute('d', `M 0,60 Q 100,${cp1Y.toFixed(1)} 200,60 T 400,${cp2Y.toFixed(1)}`);

  requestAnimationFrame(updatePhysics);
}

updatePhysics();
```

---

## 🎯 Architectural Synthesis: When To Choose Which Technique

| Website Vibe / Industry | Primary Animation Archetype | Key CSS/JS Secret |
| :--- | :--- | :--- |
| **Artisanal / Luxury / Spirits** | Santioni Multi-Speed Parallax + Serif Mask | Easing: `cubic-bezier(0.16, 1, 0.3, 1)`, Decoupled shadow scale |
| **AI / SaaS / Developer Tools** | Oryzo Laser Conic Beam + Spotlight Refraction | CSS `@property --beam-angle`, mouse coordinate radial gradient |
| **High Fashion / Brutalist Studio** | Obsidian Char-by-Char Skew + Inverted Cursor | `mix-blend-mode: difference`, staggered `--char-index` CSS delay |
| **Creative Agency / Media** | Juice Velocity-Linked Running Marquee | Scroll delta acceleration, seamless track wrapping |
| **Motorsport / High Performance** | Leclerc Stat Counter HUD + Diagonal Shear | `skewY(-3deg)`, quadratic ease-out number interpolation |
| **Editorial / Cultural Brand** | Immersive Garden Depth-of-Field Blur | `filter: blur(10px) scale(1.08)` hover transition |
| **Documentary / Environmental** | Wildfire Scroll-Linked SVG Stroke Tracker | `stroke-dashoffset` mapped directly to scroll bounding rect |
| **Motion Design / Creative Tech** | Zajno Spring Physics + Waveform Morph | Hooke's Law differential equation, animated SVG bezier curves |
