---
name: context-window-hygiene
description: Use when managing long coding sessions, complex multi-file refactors, large command outputs, and preventing LLM context window bloat.
---

# Context Window Hygiene & Token Stewardship

Large context windows can suffer from "lost in the middle" phenomena, higher latency, and degradation of reasoning quality if cluttered with massive raw terminal outputs or entire files.

---

## 1. Principles of Token Conservation

1. **Progressive Disclosure**:
   - Inspect file structure and symbol outlines before dumping thousands of lines into context.
   - Use sliced line reading (`StartLine`, `EndLine`) to inspect the relevant 50-100 lines rather than the entire 1,500-line file.
2. **Compact Command Outputs**:
   - Avoid running unfiltered commands that dump megabytes of text (e.g. `npm list`, raw build logs).
   - Pipe or filter to relevant error lines: `npm test -- --bail` or `grep -E "(FAIL|Error:)"`.
3. **Structured Working Memory (Artifacts)**:
   - Offload persistent architecture notes, task lists, and complex data schemas to markdown artifacts.
   - Update existing artifacts rather than recreating redundant summaries in conversation turns.

---

## 2. Preventing Context Rot During Deep Refactors
- **Clean the state between milestones**: When completing a major sub-task, summarize the verified outcome concisely.
- **Never paste entire raw stack traces repetitively**: Extract the failing assertion, file path, and line number.
- **Delegate independent explorations to subagents**: Dispatch isolated tasks to child subagents so their raw exploration tokens do not pollute the parent context.
