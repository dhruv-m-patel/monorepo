# Claude AI Development Framework

## Project Overview

This is a **Yarn 3 monorepo** managed with **Lerna** (versioning) and **Turborepo** (task orchestration). It contains a Node.js/Express REST API service, a React SPA, and a shared Express utility package.

- **Package Manager**: Yarn 3.2.3 (`yarn@3.2.3` in `packageManager`)
- **Node.js**: >= 22 (see `.nvmrc` for exact LTS version)
- **TypeScript**: 5.x with `nodenext` module resolution (except web-app which uses `bundler`)
- **Monorepo tools**: Lerna (versioning/publishing), Turborepo (cached task orchestration)

## Architecture

```
lerna-monorepo-sample/
├── packages/
│   └── express-app/          # Shared Express REST API server package (@dhruv-m-patel/express-app)
│       ├── src/              # Source: middleware (health, tracing, errors), app config
│       ├── tests/            # Vitest unit tests
│       ├── tsconfig.json     # Extends ../../tsconfig.base.json
│       ├── tsconfig.cjs.json # CJS build config
│       └── tsconfig.esm.json # ESM build config
├── service/                  # Express REST API service (uses express-app)
│   ├── src/                  # Source: routes, API spec (OpenAPI YAML)
│   ├── tests/                # Vitest unit/integration + performance tests
│   ├── vitest.config.ts      # Unit/integration test config
│   └── vitest.perf.config.ts # Performance test config (autocannon)
├── web-app/                  # React 19 SPA (Vite + Tailwind CSS v4 + shadcn/ui)
│   ├── src/                  # Source: components, pages, context, lib
│   ├── .storybook/           # Storybook v8 config
│   ├── vite.config.ts        # Vite 6 + React + Tailwind
│   └── vitest.config.ts      # Vitest with jsdom
├── e2e/                      # Playwright E2E tests
├── .github/workflows/        # CI/CD: build, PR checks, package publishing
├── tsconfig.base.json        # Shared TypeScript base config
├── turbo.json                # Turborepo task graph
├── lerna.json                # Lerna config (independent versioning)
├── eslint.config.mjs         # ESLint v9 flat config (single root config)
├── vitest.workspace.ts       # Vitest workspace (all 3 packages)
└── playwright.config.ts      # Playwright E2E config
```

### Package Dependency Graph

```
web-app (standalone SPA)
service → @dhruv-m-patel/express-app (workspace:*)
```

## Code Conventions

### TypeScript

- **Base config**: All packages extend `tsconfig.base.json` (target: ES2022, module: nodenext, strict: true)
- **Import extensions**: Use `.js` extensions on all relative imports in `nodenext` packages (service, express-app)
- **web-app exception**: Uses `module: "ESNext"`, `moduleResolution: "bundler"` (Vite handles resolution)
- **Strict mode**: All packages use `strict: true`

### Testing

- **Framework**: Vitest 3.x across all packages (no Jest)
- **Imports**: Explicit `import { describe, it, expect } from 'vitest'` (no globals)
- **Web-app**: Uses `@testing-library/react` v16 with jsdom environment
- **E2E**: Playwright with Chromium, tests in `e2e/` directory
- **Performance**: Autocannon-based load tests in `service/tests/performance/`
- **Coverage**: v8 provider with text + lcov reporters

### Linting & Formatting

- **ESLint v9**: Single root `eslint.config.mjs` with flat config format
- **Prettier**: Configured via root `.prettierrc` (if exists) or defaults
- **lint-staged**: Runs prettier on all files, ESLint on `*.{ts,tsx,js,mjs}` with `--no-warn-ignored`

### Styling (web-app)

- **Tailwind CSS v4**: Theme in CSS `@theme {}` blocks, no `tailwind.config.js`
- **shadcn/ui**: Component library with CVA variants, `cn()` utility from `clsx` + `tailwind-merge`
- **Dark mode**: Class-based toggle via `ThemeContext`, `.dark` class on root element
- **Path alias**: `@/` maps to `web-app/src/` (configured in vite, vitest, and tsconfig)

### Package Structure Convention

New packages in `packages/` should follow this structure:

```
packages/<name>/
├── src/
│   └── index.ts          # Main entry point
├── tests/
│   └── index.test.ts     # Tests
├── package.json          # With build/test/typecheck scripts
├── tsconfig.json         # Extends ../../tsconfig.base.json
└── vitest.config.ts      # Vitest configuration
```

## Common Tasks

### Build all packages

```bash
yarn build                  # Turborepo-cached parallel build
```

### Run tests

```bash
yarn test                   # Unit/integration tests (all packages)
yarn test:e2e               # Playwright E2E tests
yarn test:perf              # API performance tests (service)
yarn test:size              # Bundle size check (web-app)
```

### Lint & Typecheck

```bash
yarn lint                   # ESLint + Swagger spec validation + Prettier check
yarn typecheck              # TypeScript type checking (all packages)
yarn prettier:format        # Auto-format all files
```

### Development

```bash
yarn dev                    # Start all packages in dev mode (Lerna streaming)
yarn storybook              # Start Storybook for web-app
```

### Package-specific commands

```bash
yarn workspace service run dev          # Dev server for service only
yarn workspace web-app run dev          # Dev server for web-app only
yarn workspace @dhruv-m-patel/express-app run test  # Test express-app only
```

### Adding a new workspace package

Use the `/new-package` Claude slash command, or manually:

1. Create directory under `packages/`
2. Add `package.json`, `tsconfig.json`, `vitest.config.ts`, `src/`, `tests/`
3. Package is auto-detected by Yarn workspaces (`packages/*` glob)
4. Run `yarn install` to link the new package

## Important Patterns & Gotchas

- **nodenext imports**: All `.ts` imports in service/express-app must use `.js` extensions
- **Hoisted types**: Package `typeRoots` must point to `../node_modules/@types` (Yarn hoisting)
- **Webpack 4 legacy**: web-app used to use Webpack 4; now uses Vite 6. Old webpack patterns no longer apply
- **Turborepo vs Lerna**: Use `turbo run` for cacheable tasks (build, test, typecheck). Use `lerna run` for streaming/interactive tasks (dev, start, storybook)
- **express-openapi-validator**: Pass file path to `apiSpec`, NOT YAML string content
- **Vitest workspace**: Root `vitest.workspace.ts` enables `vitest run` at root level for all packages
- **CI**: PR checks run in parallel jobs (lint+typecheck+build, unit tests, e2e, perf, bundle size, audit)

## Environment Setup

```bash
nvm use                     # Use correct Node version from .nvmrc
yarn install                # Install all dependencies (workspaces auto-linked)
yarn build                  # Build all packages (required before running service)
```

No `yarn bootstrap` needed - Yarn 3 workspaces handle package linking on `yarn install`.
