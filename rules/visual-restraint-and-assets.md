---
trigger: always_on
description: Strictly enforces visual restraint, mandates calling view_file directly on benchmark images in assets/examples/ with explicit tool metadata and user-facing visual deconstructions, requires real cutout transparent imagery, and enforces vibe-tailored color schemes.
---

# UI Restraint, Multimodal Visual Benchmark Deep-Study & Vibe Aesthetics

AI-generated interfaces often suffer from **"Element Overload"** and **"Generic Boilerplate Syndrome"**: cluttering every square inch with unnecessary cards, redundant metric badges, busy icons, and default grey boxes. Great design is defined by restraint, intentional whitespace, real imagery, world-class animation physics, and a color scheme that perfectly captures the aesthetic vibe of the product.

---

## 1. The Mandatory Multimodal Image Deep-Study Protocol

The agent is **STRICTLY FORBIDDEN** from inventing generic layouts from memory, merely listing directory paths, or performing silent unverified image skims. The agent **MUST explicitly call `view_file` directly on 1 to 3 relevant benchmark image files** in `assets/examples/` to load their visual pixels into its multimodal vision context:

```text
assets/examples/
├── websites/       # e.g., example-1.jpg (editorial arch cards), example-3.jpg, example-5.jpg
├── apps/           # e.g., clean interaction flows, floating modals, refined toolbars
├── dashboards/     # e.g., uncluttered metric cards, elegant dark data visualizations
└── components/     # e.g., frosted glass navigation pills, modern cards, luxury buttons
```

### 👁️ Mandatory Vision Execution, Tool Metadata & UI Evidence:
Whenever designing or building a web interface, the agent **MUST**:
1. **Call `view_file` on the relevant image(s) with Explicit Tool Metadata**:
   - `toolAction`: `"Analyzing visual benchmark image"`
   - `toolSummary`: `"Visual benchmark analysis"`
   - Examples: `view_file(AbsolutePath=".../assets/examples/websites/example-1.jpg")`
2. **Explicitly Display the Visual Benchmark Deconstruction in the User Response & `design-notes.md`**:
   The agent MUST visibly output the following structured block so it is 100% apparent in the Antigravity UI that the image was checked:
   ```markdown
   ### 👁️ Visual Benchmark Analysis
   - **Inspected Image**: `assets/examples/websites/example-1.jpg`
   - **Visual Focal Point**: (e.g. Arched photo portals, central hero product cutout, floating glass card).
   - **Typographic Scale & Weight**: (e.g. Massive bold display header with `-0.03em` tracking, monospace tags).
   - **Surface Elevation & Lighting**: (e.g. Pure black `#080808` base, translucent pill nav `rgba(255,255,255,0.06)`, radial aura).
   - **Whitespace & Breathing Room**: (e.g. $96\text{px}$ vertical section padding, single clear CTA pill).
   - **Application to Current Project**: How these exact visual principles will be applied.
   ```

---

## 2. The Vibe-Engineered Color Palette Matrix

The agent **MUST** craft a bespoke `color-scheme.json` that captures the exact industry mood, emotional atmosphere, and aesthetic vibe of the user's prompt:

| Industry / Domain Vibe | Surface & Background | Primary & Accent Glow | Aesthetic Atmosphere |
| :--- | :--- | :--- | :--- |
| **Café, Artisanal & Food** | Deep warm espresso `#0C0A09`, dark chocolate slate `#1C1917` | Warm amber `#D97706`, golden roast `#F59E0B`, terracotta glow | Cozy, organic, premium artisanal texture |
| **Luxury & High Fashion** | Obsidian velvet `#08080A`, deep charcoal `#121216` | Champagne gold `#E5C07B`, pale platinum `#F3F4F6`, delicate warm glow | Editorial elegance, high-contrast serif/sans, extreme whitespace |
| **Fintech & Web3** | Deep night slate `#090D16`, midnight blue `#0F172A` | Electric emerald `#10B981`, neon cyan `#06B6D4`, purple aurora glow | Precise, secure, high-tech financial authority |
| **AI, SaaS & Developer Tools** | Pitch black `#000000`, dark slate `#0B0F19` | Radiant violet `#8B5CF6`, indigo `#6366F1`, cyan laser highlight | Futuristic, lightning-fast, high-density clarity |
| **Health, Wellness & Nature** | Dark forest obsidian `#06120E`, muted slate `#0F2119` | Sage green `#34D399`, mint crystal `#6EE7B7`, soft dawn glow | Clean, rejuvenating, tranquil negative space |

---

## 3. The Principle of Visual Restraint

1. **Generous Breathing Room (Whitespace)**:
   - Use generous padding ($80\text{px}-120\text{px}$ section padding on desktop, $32\text{px}-48\text{px}$ on mobile).
   - Give text and cards room to breathe. Density does not equal quality.
2. **One Primary Focal Point**:
   - Each view or card should have exactly **one** primary call-to-action or focal point.
   - Remove decorative clutter that distracts from the core user task.
3. **Typography Hierarchy Over Extra Boxes**:
   - Establish structure using font weight, scale, and subtle color contrast (`text-slate-900` vs `text-slate-500`) instead of wrapping every label in its own pill badge or bordered box.

---

## 4. Real Imagery & Transparent Cutout Assets Protocol

- **Never Use Plain Placeholders**: Prohibit generic grey boxes or empty rectangles.
- **Removed-Background Cutout PNGs**: For hero sections, floating product cards, 3D icons, and feature highlights, harvest or generate real high-res images with **removed/transparent backgrounds** (PNG/WebP with alpha transparency).
- **Seamless Layering**: Cutout assets must sit directly over dark elevation surfaces, glass cards, and ambient radial glow effects without ugly rectangular white bounding boxes.
- **Drop Shadows & Motion**: Apply organic CSS drop shadows (`filter: drop-shadow(0 20px 30px rgba(0,0,0,0.4))`) and subtle floating micro-animations.

---

## 5. The Clutter-Prevention Checklist
Before finalizing any UI layout, verify:
- [ ] Has `view_file` been executed on benchmark image(s) with explicit tool metadata and deconstructed visibly?
- [ ] Has [`skills/mind-blowing-animations/WORLD_CLASS_SHOWCASE_BREAKDOWN.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/mind-blowing-animations/WORLD_CLASS_SHOWCASE_BREAKDOWN.md) been inspected for animation DNA?
- [ ] Does the color scheme match the unique aesthetic vibe of the domain?
- [ ] Is every single element, badge, and button strictly necessary for the user's primary goal?
- [ ] Are real cutout transparent images utilized instead of placeholder boxes?
- [ ] Is there at least $64\text{px}-120\text{px}$ of vertical breathing room between major sections?
- [ ] Are badges and pill tags used sparingly (only for true status alerts, not decorative labels)?
