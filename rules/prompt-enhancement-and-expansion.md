---
trigger: always_on
description: Mandates that whenever a user submits a prompt, the main agent spawns a prompt-enhancement subagent to analyze workspace resources, generate color-scheme.json if needed, and decompose the prompt into an in-depth technical brief.
---

# Automatic Subagent Prompt Enhancement & Resource Harvesting Rule

Whenever the user enters a prompt in Antigravity and presses Enter, the main agent activates a dedicated **Prompt Enhancement & Resource Harvesting Subagent** to analyze, deepen, and prepare the project foundation before execution begins.

---

## 1. The Subagent Enhancement & Resource Loop

```
                  ┌─────────────────────────────────┐
                  │   User Enters Prompt & Enters   │
                  └────────────────┬────────────────┘
                                   │
                                   ▼
                  ┌─────────────────────────────────┐
                  │    Main Antigravity Agent       │
                  │   (Receives Raw User Prompt)    │
                  └────────────────┬────────────────┘
                                   │ Spawns / Invokes
                                   ▼
          ┌─────────────────────────────────────────────────┐
          │      Prompt Enhancement & Expansion Agent       │
          │   1. Scans workspace for existing resources     │
          │   2. If none exist: generates color-scheme.json │
          │   3. Deconstructs implicit goals & edge cases   │
          │   4. Maps relevant Super Gravity skills         │
          │   5. Formulates concrete Acceptance Criteria    │
          └────────────────┬────────────────────────────────┘
                                   │ Returns Enhanced Brief +
                                   │ color-scheme.json
                                   ▼
                  ┌─────────────────────────────────┐
                  │    Main Antigravity Agent       │
                  │   1. Analyzes assets/examples/  │
                  │   2. Generates layout.json      │
                  │   3. Executes Masterpiece Code  │
                  └─────────────────────────────────┘
```

---

## 2. Resource Harvesting & `color-scheme.json`

- **Workspace Scan**: The subagent inspects the project directory for existing design tokens, CSS variables, or images.
- **Auto-Generate `color-scheme.json`**: If no established color palette exists, the subagent generates a high-contrast, polished `color-scheme.json` file defining backgrounds, surface cards, primary/secondary/accent tones, and ambient glow gradients.

---

## 3. Main Agent Layout Blueprinting (`layout.json`)

The main agent reads `color-scheme.json`, inspects the visual benchmarks in `assets/examples/`, and authors a structured `layout.json` blueprint before writing code, guaranteeing visual restraint ($48\text{px}-80\text{px}$ whitespace) and clean responsive hierarchy.
