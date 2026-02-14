import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Server } from 'net';
import {
  startServer,
  stopServer,
  runLoadTest,
  validateThresholds,
  formatResultSummary,
  PerfTestResult,
  PerformanceThresholds,
  DEFAULT_THRESHOLDS,
} from './helpers.js';
import { writeResultsToFile } from './reporter.js';

/**
 * API Performance Tests
 *
 * These tests use autocannon to send concurrent HTTP requests and measure
 * response time percentiles (p50, p95, p99). Tests fail if latency exceeds
 * established thresholds.
 *
 * Run with: yarn test:perf
 */

let server: Server;
let baseUrl: string;
const allResults: PerfTestResult[] = [];

/** Per-endpoint threshold overrides */
const ENDPOINT_THRESHOLDS: Record<string, PerformanceThresholds> = {
  '/api/health': {
    ...DEFAULT_THRESHOLDS,
    // Health checks should be very fast
    p50: 30,
    p95: 75,
    p99: 150,
    minRps: 200,
  },
  '/api/message': {
    ...DEFAULT_THRESHOLDS,
    p50: 50,
    p95: 100,
    p99: 200,
    minRps: 100,
  },
  '/health': {
    ...DEFAULT_THRESHOLDS,
    // Express-app level health check
    p50: 20,
    p95: 50,
    p99: 100,
    minRps: 500,
  },
};

/** Load test configuration */
const LOAD_TEST_CONFIG = {
  duration: 5, // 5 seconds per endpoint
  connections: 10, // 10 concurrent connections
  pipelining: 1, // No pipelining for realistic latency
};

beforeAll(async () => {
  const result = await startServer();
  server = result.server;
  baseUrl = result.url;
}, 30_000);

afterAll(async () => {
  // Write results to JSON file for CI parsing
  if (allResults.length > 0) {
    writeResultsToFile(allResults, ENDPOINT_THRESHOLDS);
  }

  if (server) {
    await stopServer(server);
  }
}, 10_000);

describe('API Performance Tests', () => {
  describe('GET /health (express-app health check)', () => {
    it('should meet performance thresholds', async () => {
      const result = await runLoadTest(baseUrl, '/health', LOAD_TEST_CONFIG);
      allResults.push(result);

      console.log(formatResultSummary(result));

      const thresholds = ENDPOINT_THRESHOLDS['/health'] || DEFAULT_THRESHOLDS;
      const violations = validateThresholds(result, thresholds);

      // Verify no errors occurred
      expect(result.errors).toBe(0);
      expect(result.non2xx).toBe(0);

      // Verify all threshold checks passed
      if (violations.length > 0) {
        console.error(
          `  Threshold violations:\n    ${violations.join('\n    ')}`
        );
      }
      expect(violations).toEqual([]);
    }, 60_000);
  });

  describe('GET /api/health', () => {
    it('should meet performance thresholds', async () => {
      const result = await runLoadTest(
        baseUrl,
        '/api/health',
        LOAD_TEST_CONFIG
      );
      allResults.push(result);

      console.log(formatResultSummary(result));

      const thresholds =
        ENDPOINT_THRESHOLDS['/api/health'] || DEFAULT_THRESHOLDS;
      const violations = validateThresholds(result, thresholds);

      expect(result.errors).toBe(0);
      expect(result.non2xx).toBe(0);

      if (violations.length > 0) {
        console.error(
          `  Threshold violations:\n    ${violations.join('\n    ')}`
        );
      }
      expect(violations).toEqual([]);
    }, 60_000);
  });

  describe('GET /api/message', () => {
    it('should meet performance thresholds', async () => {
      const result = await runLoadTest(
        baseUrl,
        '/api/message',
        LOAD_TEST_CONFIG
      );
      allResults.push(result);

      console.log(formatResultSummary(result));

      const thresholds =
        ENDPOINT_THRESHOLDS['/api/message'] || DEFAULT_THRESHOLDS;
      const violations = validateThresholds(result, thresholds);

      expect(result.errors).toBe(0);
      expect(result.non2xx).toBe(0);

      if (violations.length > 0) {
        console.error(
          `  Threshold violations:\n    ${violations.join('\n    ')}`
        );
      }
      expect(violations).toEqual([]);
    }, 60_000);
  });
});
