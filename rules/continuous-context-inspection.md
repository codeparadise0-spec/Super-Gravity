---
trigger: always_on
description: Enforces continuous file reading throughout the development journey, preventing blind generation after an initial skim.
---

# Continuous Context & File Inspection Rule

An agent must never rely on a quick initial skim and then blindly write dozens of files. Quality software development is an iterative loop of **read $\rightarrow$ understand $\rightarrow$ modify $\rightarrow$ verify**.

---

## 1. The Continuous Reading Requirement

Throughout every phase of development, you must actively inspect the files you interact with:

1. **Before Creating a New Component**:
   - Inspect the parent layout and existing sibling components to match styling tokens, spacing, and prop patterns.
2. **Before Calling a Backend Endpoint or Service**:
   - Read the exact route handler, schema validator, and controller definition to ensure payload and status code compatibility.
3. **Before Importing Types or Utilities**:
   - Check existing utility files (`lib/`, `utils/`, `types/`) to reuse existing domain models and avoid duplicate implementations.
4. **Before Writing Integration Tests**:
   - Read the exact fixture setup and mock server handlers to ensure test reliability.

---

## 2. Anti-Pattern: "Skim Once, Generate Blindly"

| Prohibited Behavior (Blind Generation) | Required Behavior (Continuous Reading) |
| :--- | :--- |
| Reading `App.tsx` once and then writing 5 components without checking existing styles or imports. | Reading parent layout $\rightarrow$ writing child $\rightarrow$ reading shared CSS variables $\rightarrow$ verifying integration. |
| Guessing database column names or API response shapes. | Reading the exact migration / schema / DTO file before writing query logic. |
| Assuming a library's API based on training data memory. | Checking `package.json` version and reading the local usage patterns in the repository. |
