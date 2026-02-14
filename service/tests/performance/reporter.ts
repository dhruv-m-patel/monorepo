import fs from 'fs';
import path from 'path';
import {
  PerfTestResult,
  PerformanceThresholds,
  DEFAULT_THRESHOLDS,
  validateThresholds,
} from './helpers.js';

/**
 * JSON report structure for CI parsing.
 */
interface PerfReport {
  timestamp: string;
  summary: {
    totalEndpoints: number;
    passed: number;
    failed: number;
    allPassed: boolean;
  };
  results: Array<{
    endpoint: string;
    method: string;
    duration: number;
    latency: {
      p50: number;
      p97_5: number;
      p99: number;
      average: number;
      min: number;
      max: number;
    };
    thresholds: {
      p50: number;
      p95: number;
      p99: number;
      minRps: number;
      maxErrorRate: number;
    };
    requests: {
      total: number;
      averagePerSecond: number;
    };
    throughput: {
      averageBytesPerSecond: number;
      totalBytes: number;
    };
    errors: number;
    timeouts: number;
    non2xx: number;
    statusCodes: Record<string, number>;
    passed: boolean;
    violations: string[];
  }>;
}

/**
 * Generate a CI-parseable JSON report from performance test results.
 */
export function generateReport(
  results: PerfTestResult[],
  thresholdsMap: Record<string, PerformanceThresholds>
): PerfReport {
  const reportResults = results.map((result) => {
    const thresholds = thresholdsMap[result.endpoint] || DEFAULT_THRESHOLDS;
    const violations = validateThresholds(result, thresholds);

    return {
      endpoint: result.endpoint,
      method: result.method,
      duration: result.duration,
      latency: {
        p50: result.latency.p50,
        p97_5: result.latency.p97_5,
        p99: result.latency.p99,
        average: Math.round(result.latency.average * 100) / 100,
        min: result.latency.min,
        max: result.latency.max,
      },
      thresholds: {
        p50: thresholds.p50,
        p95: thresholds.p95,
        p99: thresholds.p99,
        minRps: thresholds.minRps,
        maxErrorRate: thresholds.maxErrorRate,
      },
      requests: {
        total: result.requests.total,
        averagePerSecond: result.requests.average,
      },
      throughput: {
        averageBytesPerSecond: Math.round(result.throughput.average),
        totalBytes: result.throughput.total,
      },
      errors: result.errors,
      timeouts: result.timeouts,
      non2xx: result.non2xx,
      statusCodes: result.statusCodes,
      passed: violations.length === 0,
      violations,
    };
  });

  const passed = reportResults.filter((r) => r.passed).length;
  const failed = reportResults.filter((r) => !r.passed).length;

  return {
    timestamp: new Date().toISOString(),
    summary: {
      totalEndpoints: reportResults.length,
      passed,
      failed,
      allPassed: failed === 0,
    },
    results: reportResults,
  };
}

/**
 * Write performance results to a JSON file.
 * File is placed in the service perf-results directory for CI access.
 */
export function writeResultsToFile(
  results: PerfTestResult[],
  thresholdsMap: Record<string, PerformanceThresholds>
): void {
  const report = generateReport(results, thresholdsMap);
  const outputDir = path.join(process.cwd(), 'perf-results');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'perf-report.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`\n  Performance report written to: ${outputPath}`);
}

/**
 * Generate a markdown summary suitable for PR comments.
 */
export function generateMarkdownSummary(
  results: PerfTestResult[],
  thresholdsMap: Record<string, PerformanceThresholds>
): string {
  const report = generateReport(results, thresholdsMap);

  const statusEmoji = report.summary.allPassed ? 'PASS' : 'FAIL';
  const lines = [
    `## ${statusEmoji} - API Performance Test Results`,
    '',
    `**${report.summary.passed}/${report.summary.totalEndpoints}** endpoints within thresholds`,
    '',
    '| Endpoint | p50 (ms) | p97.5 (ms) | p99 (ms) | Avg RPS | Errors | Status |',
    '|----------|----------|------------|----------|---------|--------|--------|',
  ];

  for (const result of report.results) {
    const status = result.passed ? 'Pass' : 'FAIL';
    lines.push(
      `| \`${result.method} ${result.endpoint}\` | ${result.latency.p50} / ${result.thresholds.p50} | ${result.latency.p97_5} / ${result.thresholds.p95} | ${result.latency.p99} / ${result.thresholds.p99} | ${result.requests.averagePerSecond} | ${result.errors} | ${status} |`
    );
  }

  if (report.summary.failed > 0) {
    lines.push('', '### Violations');
    for (const result of report.results) {
      if (result.violations.length > 0) {
        lines.push(
          `- **${result.method} ${result.endpoint}**: ${result.violations.join(
            ', '
          )}`
        );
      }
    }
  }

  lines.push('', `> Generated at ${report.timestamp}`);
  return lines.join('\n');
}
