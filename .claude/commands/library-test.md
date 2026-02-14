# /library-test - Run react-components library tests

Run tests for the `@dhruv-m-patel/react-components` package with coverage reporting.

## Usage

```
/library-test              # Run all tests with coverage
/library-test watch        # Run tests in watch mode
/library-test ssr          # Run only SSR tests
/library-test <pattern>    # Run tests matching pattern
```

## Instructions

Based on the argument provided:

**All tests with coverage** (default):

```bash
nvm use && yarn workspace @dhruv-m-patel/react-components run test:ci
```

**Watch mode** (`watch` argument):

```bash
nvm use && yarn workspace @dhruv-m-patel/react-components run test:watch
```

**SSR tests only** (`ssr` argument):

```bash
nvm use && npx vitest run --config packages/react-components/vitest.config.ts tests/ssr/
```

**Pattern match** (any other argument):

```bash
nvm use && npx vitest run --config packages/react-components/vitest.config.ts $ARGUMENTS
```

## Coverage Thresholds

The library enforces 80% coverage thresholds for:

- Statements
- Branches
- Functions
- Lines

If coverage drops below these thresholds, the test run will fail.

## Common Issues

- **SSR tests fail**: SSR tests use `@vitest-environment node` (not jsdom). Ensure `setupTests.ts` guards browser-specific code behind `typeof window !== 'undefined'`.
- **Radix component tests**: Overlay components (Dialog, Sheet, Popover) need trigger clicks to open before asserting content.
- **composeStories import**: Import from `@storybook/react`, not `@storybook/testing-react`.
- **Missing matchMedia mock**: The `setupTests.ts` provides a mock — if tests fail with matchMedia errors, check that `setupFiles` is configured in `vitest.config.ts`.

Report test results, coverage numbers, and any failures with suggested fixes.
