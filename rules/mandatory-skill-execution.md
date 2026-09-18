---
trigger: always_on
description: Strictly mandates that the AI agent must actively read (view_file) benchmark images in assets/examples/, WORLD_CLASS_SHOWCASE_BREAKDOWN.md, and relevant Super Gravity skills throughout every phase of the development journey.
---

# Mandatory Continuous Skill Activation & Execution Rule

The agent is **strictly prohibited from developing in isolation without reading and executing the relevant Super Gravity skills, benchmark images, and showcase breakdowns**. Progressive disclosure means skill contents are not pre-loaded into context; therefore, the agent **MUST actively inspect relevant skill and image files (`view_file`) throughout the development journey** before and during code generation.

---

## 1. The Continuous Skill Invocation Mandate

A development journey consists of distinct phases. At **each phase**, the agent must explicitly read and apply the designated skills:

```
[Phase 1: Design Tokens & Visual Images] ──> MUST view benchmark image in `assets/examples/`, read `WORLD_CLASS_SHOWCASE_BREAKDOWN.md`, `frontend-design` & `vanilla-css-tokens`
                    │
                    ▼
[Phase 2: Layout & Cutout Assets]        ──> MUST read `glassmorphism-and-depth`, `css-grid-and-subgrid`, `responsive-images-and-media`
                    │
                    ▼
[Phase 3: Micro-Interactions]            ──> MUST read `mind-blowing-animations`, `micro-interactions` & `web-animations-api`
                    │
                    ▼
[Phase 4: DevTools QA & A11y]            ──> MUST read `responsive-devtools-inspection` & `accessibility-a11y-audit`
                    │
                    ▼
[Phase 5: Final Verification Gate]       ──> MUST read `verification-before-completion` & run automated audit scripts
```

---

## 2. Phase-by-Phase Mandatory Skill Checklist

### 🎨 Phase 1: Multimodal Benchmark Vision & Styling Foundation
Before authoring `index.css`, layout blueprints, or root styles:
- [ ] **Inspect Benchmark Image(s) with `view_file`**: [MANDATORY MULTIMODAL GATE] Call `view_file` directly on 1-3 image files in [`assets/examples/`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/assets/examples/) (e.g. `assets/examples/websites/example-1.jpg`), load the visual pixels into context, and write the visual deconstruction in `design-notes.md`.
- [ ] **Inspect [`skills/mind-blowing-animations/WORLD_CLASS_SHOWCASE_BREAKDOWN.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/mind-blowing-animations/WORLD_CLASS_SHOWCASE_BREAKDOWN.md)**: [MANDATORY GATE] Study the 8 award-winning sites for typography scale, lighting, and animation DNA.
- [ ] **Inspect [`skills/frontend-design/SKILL.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/frontend-design/SKILL.md)**: Enforce curated palette, dark mode elevation, and typography scale.
- [ ] **Inspect [`skills/vanilla-css-tokens/SKILL.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/vanilla-css-tokens/SKILL.md)**: Enforce fluid typography (`clamp()`), semantic color tokens, and CSS variables.
- [ ] **Inspect [`skills/minimalist-ui-composition/SKILL.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/minimalist-ui-composition/SKILL.md)**: Enforce $80\text{px}-120\text{px}$ whitespace and single focal points.

### 🖼️ Phase 2: Layouts, Glass Cards & Cutout Assets
Before structuring components, cards, or hero sections:
- [ ] **Inspect [`skills/glassmorphism-and-depth/SKILL.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/glassmorphism-and-depth/SKILL.md)**: Apply layered translucent surfaces, backdrop blur, and glow lighting.
- [ ] **Inspect [`skills/css-grid-and-subgrid/SKILL.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/css-grid-and-subgrid/SKILL.md)** or **[`skills/css-flexbox-deep-dive/SKILL.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/css-flexbox-deep-dive/SKILL.md)**: Multi-column bento grids and wrapping layouts.
- [ ] **Inspect [`skills/responsive-images-and-media/SKILL.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/responsive-images-and-media/SKILL.md)**: Wire real imagery and removed-background cutout assets with drop shadows.

### ✨ Phase 3: Interactive Polish & Animations
Before finalizing interactive elements:
- [ ] **Inspect [`skills/mind-blowing-animations/SKILL.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/mind-blowing-animations/SKILL.md)**: Apply the 12 master animation recipes (laser border beams, spotlight refractions, magnetic buttons, velocity marquees, char skew reveals).
- [ ] **Inspect [`skills/micro-interactions/SKILL.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/micro-interactions/SKILL.md)**: 60fps hover lifts, spring physics, button shimmers, and active states.

### ⚛️ Phase 4: React / Framework Architecture (If Applicable)
When building React / Next.js / Backend applications:
- [ ] **Inspect [`skills/react-component-patterns/SKILL.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/react-component-patterns/SKILL.md)** or **[`skills/nextjs-app-router-patterns/SKILL.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/nextjs-app-router-patterns/SKILL.md)**.
- [ ] **Inspect [`skills/backend-clean-architecture/SKILL.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/backend-clean-architecture/SKILL.md)** & **[`skills/data-validation/SKILL.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/data-validation/SKILL.md)**.

### 🔬 Phase 5: QA, DevTools Inspection & Verification Gate
Before claiming the task is complete:
- [ ] **Inspect [`skills/responsive-devtools-inspection/SKILL.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/responsive-devtools-inspection/SKILL.md)**.
- [ ] **Inspect [`skills/accessibility-a11y-audit/SKILL.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/accessibility-a11y-audit/SKILL.md)**: Verify touch targets ($\ge 44\times 44\text{px}$) and keyboard navigation.
- [ ] **Inspect [`skills/verification-before-completion/SKILL.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/verification-before-completion/SKILL.md)**: Evidence before assertions.
- [ ] **Run Automated QA Scripts**:
  ```bash
  node "skills/responsive-devtools-inspection/scripts/check-overflow.js" --url http://localhost:3000
  node "skills/responsive-devtools-inspection/scripts/devtools-audit.js" --url http://localhost:3000
  ```

---

## 3. Prohibited Behaviors

| ❌ Prohibited (Violates Rule) | ✅ Required (Super Gravity Standard) |
| :--- | :--- |
| Merely running `list_dir` on `assets/examples/` without viewing image files. | Calling `view_file` directly on `.jpg`/`.png` image files to analyze visual pixels. |
| Writing CSS/HTML from memory without inspecting `WORLD_CLASS_SHOWCASE_BREAKDOWN.md` or `frontend-design`. | Calling `view_file` on `skills/mind-blowing-animations/WORLD_CLASS_SHOWCASE_BREAKDOWN.md` before authoring frontend styles. |
| Using generic plain styles or grey boxes. | Using `glassmorphism-and-depth` and real cutout transparent images. |
| Claiming code is responsive without running `check-overflow.js` or inspecting `responsive-devtools-inspection`. | Running automated overflow detection and citing exact terminal evidence. |
| Skipping skills because "I already know how to code". | Actively consulting skills at each phase to guarantee senior-grade perfection. |
