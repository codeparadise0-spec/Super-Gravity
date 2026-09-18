---
name: prompt-enhancement-orchestration
description: Use when receiving user prompts to spawn a prompt-enhancement agent, harvest workspace resources, generate color-scheme.json, and formulate enriched technical briefs before execution.
---

# Prompt Enhancement & Subagent Orchestration Protocol

When a user submits a prompt, this protocol defines how the main Antigravity agent delegates to a specialized **Prompt Enhancement Subagent** to harvest project resources, generate `color-scheme.json`, and formulate comprehensive technical briefs.

---

## 1. The Multi-Agent Enhancement Flow

1. **User Prompt Ingestion**:
   - The user inputs their prompt in Antigravity and presses Enter.
2. **Spawning the Prompt Enhancement Agent**:
   - The main agent invokes the subagent with the raw user prompt and current workspace context.
3. **Resource Harvesting & `color-scheme.json`**:
   - The subagent scans the project for existing assets, logos, or tokens.
   - If missing, the subagent writes a tailored `color-scheme.json` defining palette, surfaces, and gradients.
4. **5-Dimension Analysis by the Enhancer Agent**:
   - The subagent evaluates explicit goals, unearths hidden technical requirements, identifies edge cases, selects appropriate Super Gravity skills, and outlines verification criteria.
5. **Handoff Back to Antigravity**:
   - The enhancer agent passes `color-scheme.json` and the structured technical brief back to Antigravity.
6. **Main Agent Benchmark Analysis & `layout.json`**:
   - Antigravity analyzes examples in `assets/examples/` and drafts `layout.json`.
7. **Masterpiece Execution**:
   - Antigravity builds the application using the visual examples, `color-scheme.json`, and `layout.json`.
