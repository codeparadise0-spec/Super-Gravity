---
name: changelog-writing
description: Use when authoring release notes, generating CHANGELOG.md entries from git commits, and adhering to Keep a Changelog standards.
---

# Changelog Writing & Release Notes Protocol

A good changelog communicates value, highlights breaking changes, and helps consumers upgrade with confidence. Adhere strictly to the [Keep a Changelog](https://keepachangelog.com/) standard.

---

## 1. Keep a Changelog Structure

Every `CHANGELOG.md` must organize entries into standardized subheadings:

```markdown
# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.0] - 2026-09-17
### Added
- Multi-viewport DevTools responsive inspection script.
- Support for cursor-based pagination on `/api/v1/feed`.

### Changed
- Improved error handling for expired OAuth2 refresh tokens.
- Upgraded Playwright to version 1.45.

### Deprecated
- `GET /api/v1/items?offset=N` will be removed in v2.0.0. Use cursor pagination.

### Removed
- Deprecated legacy XML export endpoint.

### Fixed
- Fixed horizontal scrollbar defect on mobile viewports below 375px (#402).
- Resolved race condition during optimistic cart updates.

### Security
- Sanitized markdown rendering to prevent stored XSS attacks (CVE-XXXX).
```

---

## 2. Converting Conventional Commits to Changelog
- `feat:` -> **Added**
- `fix:` -> **Fixed**
- `perf:` -> **Changed** (Performance optimization)
- `refactor:` -> **Changed** (Internal refactoring)
- `BREAKING CHANGE:` -> **Changed** with explicit upgrade callout

---

## 3. Guiding Principles
- **Write for Humans**: Describe the impact on users, not just internal function renames.
- **Always Highlight Breaking Changes**: Never hide breaking changes under "Minor improvements".
- **Link Issues & PRs**: Include references to pull requests and issue numbers.
