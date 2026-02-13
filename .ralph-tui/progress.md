# Ralph Progress Log

This file tracks progress across iterations. Agents update this file
after each iteration and it's included in prompts for context.

## Codebase Patterns (Study These First)

- **Yarn 3 (Berry) with node-modules linker**: Despite `.nvmrc` pointing to node 14, the project uses Yarn 3.2.3 (`yarn set version` is available). The `.yarnrc.yml` has `nodeLinker: node-modules` so it works like classic yarn with hoisting. Use `workspace:*` for local package references.
- **Dual CJS/ESM build pattern**: For packages that need both formats, use separate `tsconfig.cjs.json` and `tsconfig.esm.json` with `outDir: ./build/cjs` and `./build/esm`. Use `exports` field in package.json with `import`/`require` conditions.
- **@types/express v4 required**: Use `@types/express@^4.17.21` (not v5) when targeting Express 4.x. The v5 types have breaking changes to middleware type signatures.
- **Root jest.config.js has circular self-reference**: `jest.config.js` requires itself (`require('./jest.config')`) - this is likely a bug but doesn't break things because the destructured `projects` is undefined.
- **Service jest 27 incompatible with node 18+**: The service's jest 27 setup fails under node 18 with `testEnvironmentOptions` error. This is pre-existing and unrelated to new packages.
- **web-app webpack build fails on node 18**: Due to OpenSSL `ERR_OSSL_EVP_UNSUPPORTED` with older webpack. Pre-existing issue.
- **New packages go in packages/ directory**: Add `"packages/*"` to root workspace config. The original repo only had `service` and `web-app` as workspaces.

---

## 2026-02-13 - US-003
- **What was implemented**: Created local `@dhruv-m-patel/express-app` package at `packages/express-app/` that replaces the external npm dependency
- **Files changed**:
  - `packages/express-app/package.json` - Package config with dual CJS/ESM exports, Express 4.21, modern dependencies
  - `packages/express-app/tsconfig.json` - Base TypeScript config
  - `packages/express-app/tsconfig.cjs.json` - CJS build config (CommonJS output)
  - `packages/express-app/tsconfig.esm.json` - ESM build config (ES2020 module output)
  - `packages/express-app/jest.config.js` - Jest config for the package
  - `packages/express-app/src/index.ts` - Main entry: `configureApp()` and `runApp()` functions
  - `packages/express-app/src/types.ts` - TypeScript interfaces: `AppConfigOptions`, `ApiStartupOptions`, `ApiRequest`, `ApiError`, `ApiSpecType`
  - `packages/express-app/src/middleware/errorHandler.ts` - Final error handler middleware
  - `packages/express-app/src/middleware/requestTracing.ts` - UUID-based request tracing middleware
  - `packages/express-app/src/middleware/healthCheck.ts` - Health check endpoint factory
  - `packages/express-app/src/middleware/index.ts` - Middleware barrel export
  - `packages/express-app/tests/configureApp.test.ts` - 7 tests for app factory
  - `packages/express-app/tests/middleware.test.ts` - 8 tests for middleware
  - `packages/express-app/tests/runApp.test.ts` - 4 tests for app runner
  - `package.json` - Added `"packages/*"` to workspaces
  - `jest.config.js` - Added express-app to projects and coverage
  - `service/package.json` - Changed dependency to `workspace:*`
- **Learnings:**
  - The original package source is at `github.com/dhruv-m-patel/packages` - was used as reference for API surface
  - Removed `useBabel` option (deprecated pattern), `swagger-express-validator` (obsolete), and `swagger-ui-dist` (bundled with swagger-ui-express now)
  - Middleware was refactored into separate files under `src/middleware/` for better testability and separation of concerns
  - The `express-openapi-validator` package was upgraded from v4 to v5
  - The error handler uses `.json()` instead of `.send()` for consistent JSON API responses
  - Package is structured as standalone with its own tsconfig, jest config, and no dependency on root tsconfig - making it extractable to its own repo
---

