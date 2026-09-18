---
name: doc-sync
description: Use when changing code, APIs, CLI flags, or environment variables to keep READMEs, API specifications, and architecture docs in synchronization.
---

# Documentation Synchronization Protocol

Out-of-date documentation is actively harmful: it misleads developers, breaks onboarding, and generates false bug reports. Treat documentation changes as part of the code pull request.

---

## 1. Trigger Conditions for Doc Sync

Whenever a commit introduces:
- A new environment variable (`.env`).
- A new CLI command, argument, or flag.
- A changed or deprecated HTTP/GraphQL API endpoint.
- A change to installation, build, or database migration steps.
- A modified configuration file (`tsconfig.json`, `docker-compose.yml`).

You must synchronize corresponding documentation before completing the task.

---

## 2. Doc Sync Checklist

- [ ] **`README.md`**: Update quickstart instructions, prerequisites, or architecture diagrams.
- [ ] **`.env.example`**: Add the new environment variable with a safe placeholder and description comment.
- [ ] **API References / OpenAPI**: Update request payloads, query parameters, and response status codes.
- [ ] **Code Docstrings**: Update JSDoc, TSDoc, or docstrings to match modified parameters or return types.
- [ ] **Deprecation Notices**: Clearly mark superseded functions or endpoints with `@deprecated` tags explaining the migration path.

---

## 3. Verifying Doc Accuracy
- Run a fresh clone / setup test in a clean directory or container to verify that the README setup steps execute without missing dependencies or broken links.
