# Claude AI Development Framework

## Project Overview

This is a **Yarn 3 monorepo** managed with **Turborepo** for task orchestration. It contains a Node.js/Express REST API service, a React SPA, a shared Express utility package, and a production-grade React component library.

- **Package Manager**: Yarn 3.2.3 (`yarn@3.2.3` in `packageManager`)
- **Node.js**: >= 22 (see `.nvmrc` for exact LTS version)
- **TypeScript**: 5.x with `nodenext` module resolution (except web-app which uses `bundler`)
- **Monorepo tools**: Turborepo (cached task orchestration, dev/build/test/start)

## Architecture

```
monorepo/
├── packages/
│   ├── express-app/          # Shared Express REST API server package (@dhruv-m-patel/express-app)
│   │   ├── src/              # Source: middleware (health, tracing, errors), app config
│   │   ├── tests/            # Vitest unit tests
│   │   ├── tsconfig.json     # Extends ../../tsconfig.base.json
│   │   ├── tsconfig.cjs.json # CJS build config
│   │   └── tsconfig.esm.json # ESM build config
│   └── react-components/     # Shared React component library (@dhruv-m-patel/react-components)
│       ├── src/              # Components, theme engine, utilities
│       ├── tests/            # SSR tests (renderToString in node env)
│       ├── docs/             # MDX documentation for Storybook
│       ├── .storybook/       # Storybook v8 config
│       ├── vitest.config.ts  # jsdom + node (SSR) environments
│       └── tailwind.config.ts # Tailwind CSS v4 config
├── service/                  # Express REST API service (uses express-app)
│   ├── src/                  # Source: routes, API spec (OpenAPI YAML)
│   ├── tests/                # Vitest unit/integration + performance tests
│   ├── vitest.config.ts      # Unit/integration test config
│   └── vitest.perf.config.ts # Performance test config (autocannon)
├── web-app/                  # React 19 SPA (Vite + Tailwind CSS v4)
│   ├── src/                  # Source: components, pages, context, lib
│   ├── .storybook/           # Storybook v8 config
│   ├── vite.config.ts        # Vite 6 + React + Tailwind
│   └── vitest.config.ts      # Vitest with jsdom
├── e2e/                      # Playwright E2E tests
├── .github/workflows/        # CI/CD: build, PR checks, package publishing
├── tsconfig.base.json        # Shared TypeScript base config
├── turbo.json                # Turborepo task graph
├── eslint.config.mjs         # ESLint v9 flat config (single root config)
├── vitest.workspace.ts       # Vitest workspace (all packages)
└── playwright.config.ts      # Playwright E2E config
```

### Package Dependency Graph

```
web-app → @dhruv-m-patel/react-components (workspace:*)
service → @dhruv-m-patel/express-app (workspace:*)
```

## Code Conventions

### TypeScript

- **Base config**: All packages extend `tsconfig.base.json` (target: ES2022, module: nodenext, strict: true)
- **Import extensions**: Use `.js` extensions on all relative imports in `nodenext` packages (service, express-app)
- **web-app exception**: Uses `module: "ESNext"`, `moduleResolution: "bundler"` (Vite handles resolution)
- **react-components**: Uses `moduleResolution: "bundler"` with `@ui` path alias mapping to `src/`
- **Strict mode**: All packages use `strict: true`

### Testing

- **Framework**: Vitest 3.x across all packages (no Jest)
- **Imports**: Explicit `import { describe, it, expect } from 'vitest'` (no globals)
- **Web-app**: Uses `@testing-library/react` v16 with jsdom environment
- **E2E**: Playwright with Chromium, tests in `e2e/` directory
- **Performance**: Autocannon-based load tests in `service/tests/performance/`
- **react-components**: Uses `composeStories` from `@storybook/react` for story-driven tests + SSR tests with `renderToString`
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
yarn dev                    # Start all packages in dev mode (Turborepo)
yarn storybook              # Start Storybook for web-app
```

### Package-specific commands

```bash
yarn workspace service run dev          # Dev server for service only
yarn workspace web-app run dev          # Dev server for web-app only
yarn workspace @dhruv-m-patel/express-app run test  # Test express-app only
yarn workspace @dhruv-m-patel/react-components run test      # Test component library
yarn workspace @dhruv-m-patel/react-components run storybook # Storybook dev server
```

### Adding a new workspace package

Use the `/new-package` Claude slash command, or manually:

1. Create directory under `packages/`
2. Add `package.json`, `tsconfig.json`, `vitest.config.ts`, `src/`, `tests/`
3. Package is auto-detected by Yarn workspaces (`packages/*` glob)
4. Run `yarn install` to link the new package

## React Component Library (`@dhruv-m-patel/react-components`)

Production-grade, themeable component library used by `web-app`. Located at `packages/react-components/`.

### Key Patterns

- **Component structure**: Each component in `src/components/<Name>/` with `<Name>.tsx`, `index.ts`, `<Name>.test.tsx`, `<Name>.stories.tsx`
- **CVA variants**: Use `class-variance-authority` for variant/size props (see `Button.tsx`)
- **Radix UI wrappers**: Import from `@radix-ui/react-*`, wrap with `React.forwardRef`, set `displayName`
- **Compound components**: Use `Object.assign(Root, { Sub })` pattern (see `FlexGrid.tsx`)
- **Path alias**: `@ui` maps to `src/` (e.g., `import { cn } from '@ui/lib/utils'`)
- **`'use client'`**: Required for all Radix-based and interactive components; omit for pure presentational
- **Theme engine**: `ThemeProvider` + `useTheme()` + `createTheme()` with OKLCH color tokens
- **Story format**: CSF3 with `satisfies Meta`, `tags: ['autodocs']`, `composeStories` in tests

### Commands

```bash
yarn workspace @dhruv-m-patel/react-components run build       # Build library
yarn workspace @dhruv-m-patel/react-components run test        # Run tests
yarn workspace @dhruv-m-patel/react-components run test:ci     # Tests with coverage
yarn workspace @dhruv-m-patel/react-components run typecheck   # Type checking
yarn workspace @dhruv-m-patel/react-components run storybook   # Storybook dev
yarn workspace @dhruv-m-patel/react-components run build-storybook  # Build Storybook
```

### Adding a New Component

Use the `/new-component` Claude slash command, or see the `component-generator` skill for manual steps. Key files to update:

1. `src/components/<Name>/<Name>.tsx` — Component implementation
2. `src/components/<Name>/index.ts` — Re-export
3. `src/components/<Name>/<Name>.stories.tsx` — Storybook story
4. `src/components/<Name>/<Name>.test.tsx` — Tests with `composeStories`
5. `src/index.ts` — Add barrel export

## Important Patterns & Gotchas

- **nodenext imports**: All `.ts` imports in service/express-app must use `.js` extensions
- **Hoisted types**: Package `typeRoots` must point to `../node_modules/@types` (Yarn hoisting)
- **Webpack 4 legacy**: web-app used to use Webpack 4; now uses Vite 6. Old webpack patterns no longer apply
- **Turborepo**: All tasks (build, test, typecheck, dev, start, storybook) run through `turbo run`. Dev and storybook tasks use `persistent: true`
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
