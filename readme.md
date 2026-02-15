# Node React Monorepo

A full-stack monorepo with frontend and backend projects managed with **Yarn 3 workspaces** and **Turborepo** task orchestration.

![CI Status](https://github.com/dhruv-m-patel/lerna-monorepo-sample/workflows/build/badge.svg)

## Tech Stack

- **Node.js** >= 22 | **TypeScript** 5.x | **Yarn 3** workspaces
- **Turborepo** for cached parallel builds, tests, and dev servers
- **React 19** + **Vite 6** + **Tailwind CSS v4** (web-app)
- **Express** REST API with OpenAPI validation (service)
- **Vitest 3** unit/integration tests | **Playwright** E2E tests
- **Storybook v8** component documentation
- **ESLint v9** flat config | **Prettier** formatting

## Setup

```bash
nvm use                     # Node 22 (from .nvmrc)
yarn install                # Install all workspace dependencies
yarn build                  # Build all packages
yarn dev                    # Start all dev servers (Turborepo)
```

Access the React app at http://localhost:3000

Access the backend API at http://localhost:4000/api/message

## Architecture

```
lerna-monorepo-sample/
├── web-app/                    # React 19 SSR app (Vite + Express + Tailwind v4)
├── service/                    # Express REST API (OpenAPI + Swagger UI)
├── packages/
│   ├── express-app/            # Shared Express server package (middleware, health, tracing)
│   └── react-components/       # Component library (shadcn/ui + Radix UI + Storybook)
├── e2e/                        # Playwright E2E tests
├── .github/workflows/          # CI/CD pipelines
├── turbo.json                  # Turborepo task orchestration
└── vitest.workspace.ts         # Vitest workspace (all packages)
```

### Dependency Graph

```
web-app  ──depends on──▷  @dhruv-m-patel/react-components
service  ──depends on──▷  @dhruv-m-patel/express-app
```

## Packages

| Package | Description |
|---------|-------------|
| [`web-app/`](web-app/) | React 19 SSR app with Vite 6, Tailwind CSS v4, and shadcn/ui components |
| [`service/`](service/) | Express REST API with OpenAPI validation, Swagger UI, and health checks |
| [`packages/express-app/`](packages/express-app/) | Shared Express server package with middleware (health, tracing, errors) |
| [`packages/react-components/`](packages/react-components/) | Production-grade React component library with theming and Storybook v8 |
| [`e2e/`](e2e/) | Playwright end-to-end tests |

## Common Commands

```bash
yarn build                  # Build all packages (Turborepo-cached)
yarn test                   # Run all unit/integration tests
yarn lint                   # ESLint + Prettier + OpenAPI spec validation
yarn typecheck              # TypeScript type checking
yarn dev                    # Start all dev servers
yarn storybook              # Start Storybook
yarn test:e2e               # Playwright E2E tests
yarn test:perf              # API performance tests
```

## CI/CD

GitHub Actions workflows run on every PR:
- **Lint + Typecheck + Build** (parallel)
- **Unit tests** (all packages via Vitest workspace)
- **E2E tests** (Playwright with Chromium)
- **Performance tests** (autocannon load tests)
- **Bundle size check** (size-limit)
- **Security audit** (yarn npm audit)
