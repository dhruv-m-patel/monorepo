# /test - Run tests

Run the test suite across all workspace packages using Vitest.

## What this does

1. Runs `nvm use` to ensure correct Node.js version
2. Runs `yarn test` which executes `turbo run test` across all packages
3. Each package runs its own Vitest configuration
4. Reports test results and any failures

## Usage

```
/test              # Run all unit/integration tests
/test e2e          # Run Playwright E2E tests
/test perf         # Run API performance tests
/test size         # Run bundle size checks
/test all          # Run all test suites
```

## Instructions

Based on the argument provided (default: unit tests only):

**Unit/Integration tests** (default):

```bash
nvm use && yarn test
```

**E2E tests** (`e2e` argument):

```bash
nvm use && yarn test:e2e
```

**Performance tests** (`perf` argument):

```bash
nvm use && yarn test:perf
```

**Bundle size** (`size` argument):

```bash
nvm use && yarn test:size
```

**All tests** (`all` argument):

```bash
nvm use && yarn test && yarn test:e2e && yarn test:perf && yarn test:size
```

If tests fail, analyze the failures and suggest fixes. Common issues:

- Missing `window.matchMedia` mock in jsdom tests (web-app)
- Service tests need `bundle:api` to run first (handled by `pretest` script)
- E2E tests need both service (port 4000) and web-app (port 3000) running
- Performance tests use autocannon - `p97_5` not `p95` for percentiles
