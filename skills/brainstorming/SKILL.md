---
name: brainstorming
description: Use before any creative work, building new features, scaffolding projects, or designing components to explore user intent, clarify requirements, and present structured designs before implementation.
---

# Brainstorming & Collaborative Design Protocol

Transform initial ideas and requirements into clear, validated technical designs through structured, collaborative dialogue before writing code.

---

## 1. The Hard Gate Rule

> **HARD GATE**: Do NOT write production code, scaffold projects, or take implementation actions until you have presented your technical design and your human partner has explicitly approved it.

---

## 2. The Three Brainstorming Paths

Before your first question, classify the request out loud:

### Path A: Spike (Feasibility Probe)
- **When**: *"Is it possible to...?"*, *"Can we integrate with X?"*, quick feasibility checks.
- **Protocol**:
  1. Present the probe question and lightweight plan in 2-3 sentences.
  2. Get quick approval.
  3. Investigate as cheaply and safely as possible.
  4. Report findings and clear recommendations (label any exploratory code as throwaway).

### Path B: Bounded (Scoped Existing Flow)
- **When**: Well-defined change or feature added to an existing, readable codebase.
- **Protocol**:
  1. Explore current project files and existing patterns.
  2. Ask essential clarifying questions (one at a time).
  3. Present a concise technical design in chat (approach, files touched, testing strategy).
  4. **STOP and wait for explicit approval**.
  5. Implement following TDD and verification workflows.

### Path C: Architectural (New Subsystems & Projects)
- **When**: New repositories, major subsystems, full-stack architectures, framework swaps.
- **Protocol**:
  1. **Explore Project Context & Visual References**: Inspect `assets/examples/` (`websites/`, `apps/`, `dashboards/`, `components/`) to understand the target visual and interaction standards.
  2. **Clarifying Questions**: Ask focused questions **one at a time** (purpose, constraints, scale, success criteria).
  3. **Propose 2-3 Approaches**: Present trade-offs with your recommended approach and rationale.
  4. **Sectioned Design Presentation**: Present architecture, data flow, component hierarchy, error handling, and testing in modular sections.
  5. **Obtain Approval**: Wait for user confirmation after each major design section.
  6. **Transition to Implementation Plan**: Document the design into an implementation plan artifact.

---

## 3. The One-Question-At-A-Time Rule
- Avoid dumping 10 bulleted questions in a single wall of text.
- Ask the single most critical clarifying question first.
- Prefer structured multiple-choice options when possible to make answering fast and effortless.

---

## 4. Visual Asset Integration during Brainstorming
When designing UI screens or user journeys:
1. Inspect the relevant directory in `assets/examples/` (`websites/`, `apps/`, `dashboards/`, `components/`).
2. Calibrate layout density, section whitespace ($64\text{px}-96\text{px}$), and typography scale against the visual references.
3. Eliminate clutter and decorative noise before presenting the component outline.
