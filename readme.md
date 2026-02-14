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

## Packages

| Package | Description |
|---------|-------------|
| `web-app/` | React 19 SPA with Vite, Tailwind CSS v4, and shadcn/ui components |
| `service/` | Express REST API with OpenAPI validation and health checks |
| `packages/express-app/` | Shared Express server package with middleware (health, tracing, errors) |
| `packages/react-components/` | Production-grade React component library with theming and Storybook |

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
