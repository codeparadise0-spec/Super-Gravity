---
name: docker-multi-stage-builds
description: Use when authoring minimal, secure Docker images using multi-stage builds, non-root users, distroless/Alpine runtimes, and layer caching.
---

# Docker Multi-Stage Builds & Container Hardening

Multi-stage builds separate the compile-time toolchain (Node.js SDK, TypeScript compiler, devDependencies) from the lean, secure production runtime.

---

## 1. Hardened Production `Dockerfile` (Node.js / Next.js)

```dockerfile
# syntax=docker/dockerfile:1.4

# Stage 1: Dependencies Cache
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

# Stage 3: Minimal Production Runner
FROM gcr.io/distroless/nodejs20-debian12 AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Copy only production bundle and standalone output
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Run as non-root user (UID 10001 in distroless)
USER nonroot

EXPOSE 3000
CMD ["dist/server.js"]
```

---

## 2. Container Hardening Rules
- **Non-Root Execution**: Never run containers as `USER root`. An attacker who escapes a root container gains root on the host node.
- **Distroless Base**: Use Google Distroless images (`gcr.io/distroless/nodejs20`) which omit shells (`bash`/`sh`), package managers (`apt`/`apk`), and utilities, neutralizing remote shell execution attacks.
- **`.dockerignore`**: Always exclude `.git`, `node_modules`, `.env`, and test artifacts.
