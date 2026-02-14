import { defineConfig } from 'vitest/config';

/**
 * Vitest configuration for performance tests.
 *
 * Separate from the main vitest.config.ts to avoid running perf tests
 * during regular `yarn test`. Performance tests use autocannon for
 * load testing and have longer timeouts.
 *
 * Run with: yarn test:perf
 */
export default defineConfig({
  test: {
    globals: false,
    environment: 'node',
    include: ['tests/performance/**/*.perf.test.ts'],
    // Performance tests need longer timeouts
    testTimeout: 120_000,
    hookTimeout: 60_000,
    // Run tests serially - load tests should not compete for resources
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    // JSON reporter for CI
    reporters: ['default', 'json'],
    outputFile: {
      json: 'perf-results/vitest-report.json',
    },
  },
});
