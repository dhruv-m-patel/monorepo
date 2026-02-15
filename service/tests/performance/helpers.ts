import { Server, AddressInfo } from 'net';
import autocannon, { Result } from 'autocannon';
import app from '../../src/app.js';

/**
 * Performance thresholds per endpoint.
 * All times are in milliseconds.
 *
 * Note: autocannon provides p50, p75, p90, p97_5, p99 percentiles.
 * We use p97.5 as the "p95" threshold (slightly stricter than true p95).
 */
export interface PerformanceThresholds {
  p50: number;
  /** Threshold for p97.5 latency (autocannon's closest to p95) */
  p95: number;
  p99: number;
  /** Minimum requests per second */
  minRps: number;
  /** Maximum acceptable error rate (0-1) */
  maxErrorRate: number;
}

/**
 * Result of a single performance test run, with extracted metrics.
 */
export interface PerfTestResult {
  endpoint: string;
  method: string;
  duration: number;
  requests: {
    total: number;
    average: number;
    mean: number;
    min: number;
    max: number;
    p50: number;
    p97_5: number;
    p99: number;
  };
  latency: {
    average: number;
    mean: number;
    min: number;
    max: number;
    p50: number;
    p97_5: number;
    p99: number;
  };
  throughput: {
    average: number;
    mean: number;
    min: number;
    max: number;
    total: number;
  };
  errors: number;
  timeouts: number;
  non2xx: number;
  statusCodes: Record<string, number>;
}

/**
 * Default thresholds for API endpoints.
 * These serve as baselines - adjust based on your environment.
 */
export const DEFAULT_THRESHOLDS: PerformanceThresholds = {
  p50: 50, // 50ms for p50
  p95: 100, // 100ms for p97.5 (mapped as p95)
  p99: 200, // 200ms for p99
  minRps: 100, // at least 100 req/s
  maxErrorRate: 0, // no errors allowed
};

/**
 * Start the Express app on a random available port.
 * Returns the server instance and the URL to use for testing.
 */
export function startServer(): Promise<{ server: Server; url: string }> {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, () => {
      const address = server.address() as AddressInfo;
      const url = `http://localhost:${address.port}`;
      resolve({ server, url });
    });
    server.on('error', reject);
  });
}

/**
 * Stop the Express server.
 */
export function stopServer(server: Server): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

/**
 * Run autocannon load test against an endpoint.
 */
export async function runLoadTest(
  baseUrl: string,
  path: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    duration?: number;
    connections?: number;
    pipelining?: number;
  } = {}
): Promise<PerfTestResult> {
  const {
    method = 'GET',
    duration = 5, // 5 seconds default
    connections = 10,
    pipelining = 1,
  } = options;

  const result: Result = await autocannon({
    url: `${baseUrl}${path}`,
    method,
    duration,
    connections,
    pipelining,
  });

  return extractMetrics(result, path, method);
}

/**
 * Extract relevant metrics from autocannon result.
 *
 * Autocannon provides: p50, p75, p90, p97_5, p99, p99_9, p99_99, p99_999
 * We map p97_5 as the "p95" equivalent for reporting.
 */
function extractMetrics(
  result: Result,
  endpoint: string,
  method: string
): PerfTestResult {
  const statusCodes: Record<string, number> = {};
  if (result['1xx']) statusCodes['1xx'] = result['1xx'];
  if (result['2xx']) statusCodes['2xx'] = result['2xx'];
  if (result['3xx']) statusCodes['3xx'] = result['3xx'];
  if (result['4xx']) statusCodes['4xx'] = result['4xx'];
  if (result['5xx']) statusCodes['5xx'] = result['5xx'];

  return {
    endpoint,
    method,
    duration: result.duration,
    requests: {
      total: result.requests.total,
      average: result.requests.average,
      mean: result.requests.mean,
      min: result.requests.min,
      max: result.requests.max,
      p50: result.requests.p50,
      p97_5: result.requests.p97_5,
      p99: result.requests.p99,
    },
    latency: {
      average: result.latency.average,
      mean: result.latency.mean,
      min: result.latency.min,
      max: result.latency.max,
      p50: result.latency.p50,
      p97_5: result.latency.p97_5,
      p99: result.latency.p99,
    },
    throughput: {
      average: result.throughput.average,
      mean: result.throughput.mean,
      min: result.throughput.min,
      max: result.throughput.max,
      total: result.throughput.total,
    },
    errors: result.errors,
    timeouts: result.timeouts,
    non2xx: result.non2xx,
    statusCodes,
  };
}

/**
 * Validate performance metrics against thresholds.
 * Returns an array of violation messages (empty = all passed).
 */
export function validateThresholds(
  result: PerfTestResult,
  thresholds: PerformanceThresholds
): string[] {
  const violations: string[] = [];

  if (result.latency.p50 > thresholds.p50) {
    violations.push(
      `p50 latency ${result.latency.p50}ms exceeds threshold ${thresholds.p50}ms`
    );
  }
  if (result.latency.p97_5 > thresholds.p95) {
    violations.push(
      `p97.5 latency ${result.latency.p97_5}ms exceeds threshold ${thresholds.p95}ms`
    );
  }
  if (result.latency.p99 > thresholds.p99) {
    violations.push(
      `p99 latency ${result.latency.p99}ms exceeds threshold ${thresholds.p99}ms`
    );
  }
  if (result.requests.average < thresholds.minRps) {
    violations.push(
      `Average RPS ${result.requests.average} below threshold ${thresholds.minRps}`
    );
  }

  const totalRequests = result.requests.total;
  const errorRate = totalRequests > 0 ? result.errors / totalRequests : 0;
  if (errorRate > thresholds.maxErrorRate) {
    violations.push(
      `Error rate ${(errorRate * 100).toFixed(2)}% exceeds threshold ${(
        thresholds.maxErrorRate * 100
      ).toFixed(2)}%`
    );
  }

  return violations;
}

/**
 * Format a PerfTestResult as a human-readable summary string.
 */
export function formatResultSummary(result: PerfTestResult): string {
  const lines = [
    `\n  Endpoint: ${result.method} ${result.endpoint}`,
    `  Duration: ${result.duration}s`,
    `  Requests: ${result.requests.total} total, ${result.requests.average} avg/s`,
    `  Latency:`,
    `    p50:    ${result.latency.p50}ms`,
    `    p97.5:  ${result.latency.p97_5}ms`,
    `    p99:    ${result.latency.p99}ms`,
    `    avg:    ${result.latency.average.toFixed(2)}ms`,
    `    min:    ${result.latency.min}ms`,
    `    max:    ${result.latency.max}ms`,
    `  Throughput: ${(result.throughput.average / 1024).toFixed(2)} KB/s avg`,
    `  Errors: ${result.errors}, Timeouts: ${result.timeouts}`,
    `  Status codes: ${JSON.stringify(result.statusCodes)}`,
  ];
  return lines.join('\n');
}
