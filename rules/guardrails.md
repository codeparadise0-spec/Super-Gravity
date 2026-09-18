---
trigger: always_on
description: Non-negotiable safety guardrails for repository health, secret hygiene, git workflow, destructive operations, mandatory skill execution, and strict visual benchmark & showcase matching.
---

# Always-On Safety Guardrails

These rules are permanent constraints applied to all agent turns and actions. They cannot be bypassed.

## 1. Secrets & Sensitive Data Hygiene
- **Never hardcode secrets**: Never write API keys, database passwords, private keys, access tokens, or sensitive credentials into source code, comments, test fixtures, or configuration files.
- **Diff scanning**: Before proposing any git commit, verify that no `.env`, credential files, or raw secrets are staged.
- **Masked variables**: Always use environment variables (`process.env.VAR`, `os.environ.get("VAR")`) and supply a sanitized `.env.example` with dummy placeholders.

## 2. Git & Version Control Hygiene
- **Never force-push (`--force`, `-f`)** to `main`, `master`, or any shared branches.
- **Atomic, semantic commits**: Commit messages must follow Conventional Commits format (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`).
- **Never skip hooks or verification**: Do not bypass pre-commit hooks (`--no-verify`) unless explicitly directed by the user with documented justification.

## 3. Test & Verification Gates
- **Green tests before ship**: Never propose merging, shipping, or finalizing a feature branch if any unit, integration, or build test is failing.
- **Evidence before assertion**: When claiming a bug is fixed or a feature works, cite exact command output, test run status, or browser inspection evidence.

## 4. Destructive & Irreversible Operations
- **Human confirmation gate**: Any command or script that performs data destruction (`DROP TABLE`, `DELETE FROM` without WHERE, `rm -rf`, destructive migrations, infra teardown) requires explicit human confirmation before execution.
- **Safe defaults**: Always run migration dry-runs (`--dry-run`, `terraform plan`, `prisma migrate diff`) before executing schema alterations.

## 5. Architectural Integrity
- Maintain existing project conventions and linting rules. Do not introduce new formatting or style rules that conflict with the project's existing linter (`eslint`, `biome`, `prettier`, `flake8`, `ruff`, etc.).
- Never silently swallow errors with empty `catch {}` blocks or bare `except:` statements. Always log, handle, or rethrow with contextual information.

## 6. Mandatory Continuous Skill & Rule Execution
- **Skills are NOT optional**: The agent must actively inspect (`view_file`) and execute the specialized skills from `skills/` at each stage of development (design tokens $\rightarrow$ layout $\rightarrow$ components $\rightarrow$ micro-interactions $\rightarrow$ DevTools QA $\rightarrow$ verification).
- **No unguided coding**: Writing code without reading the governing skill files is a strict guardrail violation.

## 7. Mandatory Multimodal Benchmark Vision, Showcase Deep-Study & Vibe Alignment
- **Strict Prohibition on Generic AI Templates**: The agent is strictly forbidden from creating generic, cookie-cutter, or plain boilerplate UI (basic 3-card grey columns, plain blue buttons, centered empty headers).
- **Mandatory Multimodal Image Viewing with Visible Proof**: The agent MUST call `view_file` directly on 1 to 3 benchmark image files from [`assets/examples/`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/assets/examples/) (with `toolAction: "Analyzing visual benchmark image"` and `toolSummary: "Visual benchmark analysis"`), and MUST visibly output the visual deconstruction breakdown in `design-notes.md` and the user response. Merely listing directory paths or silent skims without visible deconstruction is a guardrail violation.
- **Mandatory Showcase Benchmark Inspection**: Before authoring frontend styles, layouts, or components, the agent MUST inspect [`skills/mind-blowing-animations/WORLD_CLASS_SHOWCASE_BREAKDOWN.md`](file:///c:/Users/gyrog/Desktop/websites/Super%20Gravity/skills/mind-blowing-animations/WORLD_CLASS_SHOWCASE_BREAKDOWN.md) to absorb world-class animation mechanics, layout restraint, and lighting.
- **Vibe-Engineered Color Schemes**: The agent MUST generate a custom `color-scheme.json` specifically engineered to match the industry, atmosphere, and aesthetic vibe of the prompt (e.g. coffee $\rightarrow$ warm espresso/amber; luxury $\rightarrow$ obsidian/gold; fintech $\rightarrow$ slate/emerald/cyan).
- **Zero Placeholder Tolerance**: Real cutout transparent PNGs with organic drop shadows must be used.
