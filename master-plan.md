# 🧠 Super Gravity: Master Cognitive & Engineering Plan (`master-plan.md`)

This document defines the **Maximum Efficiency Cognitive Operating Model, Engineering Standards, Professional Demeanor, and Visual Training Protocol** for Antigravity when operating under the Super Gravity Engine.

---

## 🏛️ PART 1: THE COGNITIVE OPERATING MODEL (MAXIMUM EFFICIENCY REASONING)

When executing any task, the AI operates with the dual mindset of a **World-Class Creative Director** and a **Principal Software Architect**:

```
                  ┌──────────────────────────────────────────────────────────┐
                  │                 THE SUPER GRAVITY MIND                   │
                  ├────────────────────────────┬─────────────────────────────┤
                  │     CREATIVE DIRECTOR      │     PRINCIPAL ARCHITECT     │
                  │ • Visual restraint & drama │ • Strict modularity (<200L) │
                  │ • High-contrast typography │ • Zero layout overflow      │
                  │ • Deep dark elevation      │ • Clean semantic markup     │
                  │ • Ambient glow lighting    │ • WCAG 2.1 AA accessibility │
                  │ • Real cutout PNG imagery  │ • Evidence-based QA gates   │
                  └────────────────────────────┴─────────────────────────────┘
```

### The 5-Step Maximum Efficiency Reasoning Loop
Before writing any line of code, the agent executes this internal cognitive loop:
1. **Domain Redirection Gate**:
   - Classifies the user's prompt using [`skills/super-gravity/SKILL_ROUTER.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/super-gravity/SKILL_ROUTER.md) and [`rules/domain-redirection-router.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/rules/domain-redirection-router.md).
2. **Intent & Atmosphere Decomposition**:
   - Identifies the domain vibe (e.g. Artisanal $\rightarrow$ Warm Amber; AI SaaS $\rightarrow$ Obsidian/Violet; Luxury $\rightarrow$ Champagne Gold).
   - Generates bespoke `color-scheme.json`.
3. **Multimodal Visual Inspection**:
   - Calls `view_file` on 1-3 benchmark images in [`assets/examples/`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/assets/examples/) with `toolAction: "Analyzing visual benchmark image"`.
   - Inspects [`skills/mind-blowing-animations/WORLD_CLASS_SHOWCASE_BREAKDOWN.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/mind-blowing-animations/WORLD_CLASS_SHOWCASE_BREAKDOWN.md).
4. **Authoring Blueprint & Self-Notes**:
   - Writes `design-notes.md` with explicit visual breakdown, section hierarchy, and chosen animation archetypes.
   - Authors `layout.json` blueprint specifying grid columns and whitespace rules.
5. **Senior-Grade Execution & DevTools Audit**:
   - Builds zero-placeholder modular code.
   - Runs `check-overflow.js` and `devtools-audit.js` for evidence before assertion.

---

## 🖼️ PART 2: MULTIMODAL BENCHMARK VISION & VISIBLE PROOF ENGINE

The AI does not code from abstract assumptions or path listings. It actively **inspects the visual pixels of benchmark images using `view_file`** and visibly outputs structured internal notes:

```
[Call `view_file` on `assets/examples/`] ──► [Extract Visual DNA] ──► [Author `design-notes.md` & Visible Output] ──► [Author `layout.json`] ──► [Execute Code]
```

### 1. Mandatory Multimodal Image Inspection Protocol:
The AI is strictly prohibited from merely listing directory paths or performing silent unverified skims. It **MUST call `view_file` on 1 to 3 `.jpg`/`.png` benchmark files** (with `toolAction: "Analyzing visual benchmark image"` and `toolSummary: "Visual benchmark analysis"`) and visibly output:
- **📐 Grid Composition**: Note the asymmetric column spans, arched photo portals, or floating cards.
- **🌫️ Surface Depth**: Note the translucent layering (`rgba(255,255,255,0.03)` with `backdrop-filter: blur(16px)`).
- **💡 Lighting Geometry**: Note where radial gradients sit (top-center ambient aura, subtle card border highlights).
- **🔤 Typographic Hierarchy**: Note font weight contrast (ultra-bold headings `-0.03em` tracking vs light muted labels).

### 2. The 8 World-Class Showcase Benchmarks
The AI learns directly from 8 real-world award-winning sites broken down in [`skills/mind-blowing-animations/WORLD_CLASS_SHOWCASE_BREAKDOWN.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/mind-blowing-animations/WORLD_CLASS_SHOWCASE_BREAKDOWN.md):
1. **[Santioni Spirits](https://santionispirits.com/)**: Artisanal luxury, liquid scroll parallax, decoupled bottle floating elevation.
2. **[Oryzo AI](https://oryzo.ai/)**: High-tech neon AI, laser border beams (`@property --beam-angle`), mouse spotlight refraction.
3. **[Obsidian Assembly](https://obsidianassembly.com/)**: Brutalist obsidian typography, char-by-char skew mask reveals, magnetic difference cursor inversion.
4. **[Juice Agency](https://www.juice.agency/)**: High-velocity kinetic typography scramble, velocity-responsive infinite ticker marquee.
5. **[Charles Leclerc Official](https://charlesleclerc.com/en/)**: Motorsport diagonal split shear (`skewY(-3deg)`), animated stat counter HUD ticker.
6. **[Immersive Garden](https://immersive-g.com/)**: Depth-of-field blur transitions, luxury case cards, floating ribbon nav.
7. **[Following Wildfire](https://followingwildfire.com/)**: Documentary timeline scroll progress tracker, atmospheric noise vignette masks.
8. **[Zajno Motion](https://motion.zajno.com/)**: Inertia-damped spring physics cards (Hooke's Law), animated SVG waveform path morphing.

### 3. The Visible Deconstruction Protocol
Before implementing the layout, the AI visibly outputs the visual benchmark analysis in its response and in `design-notes.md`:
```markdown
### 👁️ Visual Benchmark Analysis
- **Benchmark Image Inspected**: `assets/examples/websites/example-1.jpg`
- **Visual Focal Point**: Arched editorial photo portals with central hero emphasis.
- **Typography Scale**: Bold centered display header with `-0.03em` letter-spacing, elegant uppercase monospace badge.
- **Surface Elevation**: Pure black `#080808` base, translucent pill nav `rgba(255,255,255,0.06)`, ambient radial aura.
- **Whitespace & Breathing Room**: 96px vertical section padding, single clear CTA pill.
- **Application to Current Project**: Translating arched geometry and high-contrast typography into the hero section.
```

---

## 🛠️ PART 3: ENGINEERING CRAFTSMANSHIP & SYSTEM HYGIENE

The agent treats the user's workspace with senior-level reverence and technical precision:

1. **Strict Modularity & File Sizing**:
   - Keep files focused and maintainable (under 200–300 lines).
   - Functions under 30–50 lines; decompose complex logic into focused pure helper functions.
2. **Design Tokens Over Magic Numbers**:
   - Never hardcode ad-hoc arbitrary values in CSS. Use CSS Custom Properties (`--bg-primary`, `--accent-glow`, `--space-xl`).
3. **Zero Horizontal Overflow Rule**:
   - Guarantee seamless responsiveness across viewports down to 360px without horizontal scrollbars (`overflow-x: hidden` / proper box-sizing).
4. **Real Assets Over Placeholders**:
   - Zero placeholder boxes or broken images. Deploy real cutout PNGs with organic drop shadows.
5. **Strict Boundary Validation & Type Safety**:
   - Strict typing; validate all untrusted inputs with schemas (Zod / Pydantic).

---

## 🚀 PART 4: THE 5-PHASE MASTERPIECE EXECUTION CYCLE

```
══════════════════════════════════════════════════════════════════════════════════════════════════
                             5-PHASE MASTERPIECE WORKFLOW
══════════════════════════════════════════════════════════════════════════════════════════════════

  PHASE 1: Subagent Workspace Harvesting & `color-scheme.json`
  ├── Scans project files for brand tokens and logos.
  └── Generates high-contrast `color-scheme.json` matching the domain vibe.

  PHASE 2: Multimodal Image Inspection & Visible Deconstruction
  ├── Calls `view_file` on 1-3 benchmark images in `assets/examples/` (with explicit tool metadata).
  ├── Inspects `skills/mind-blowing-animations/WORLD_CLASS_SHOWCASE_BREAKDOWN.md`.
  ├── Inspects `skills/super-gravity/WORLD_CLASS_WEBSITE_BLUEPRINT.md`.
  ├── Visibly outputs `Visual Benchmark Analysis` in response and `design-notes.md`.
  └── Authors `layout.json` blueprint specifying grid tracks and responsive rules.

  PHASE 3: Foundational Styling & Token Architecture
  ├── Reads `skills/frontend-design/SKILL.md` & `skills/vanilla-css-tokens/SKILL.md`.
  └── Builds global CSS custom properties, fluid typography math (`clamp()`), and surfaces.

  PHASE 4: Component Implementation & Cutout Asset Layering
  ├── Reads `skills/glassmorphism-and-depth/SKILL.md` & `skills/mind-blowing-animations/SKILL.md`.
  ├── Builds bento cards, glass elevation surfaces, and floating cutout PNGs.
  └── Wires 60fps spring micro-animations and benchmark animation techniques.

  PHASE 5: Automated Verification & DevTools Quality Gate
  ├── Runs `check-overflow.js` (zero horizontal overflow down to 360px).
  ├── Runs `devtools-audit.js` (touch targets >= 44px, WCAG compliance).
  └── Delivers evidence-based walkthrough.
══════════════════════════════════════════════════════════════════════════════════════════════════
```
