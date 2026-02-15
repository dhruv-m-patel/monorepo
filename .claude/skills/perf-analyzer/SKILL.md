---
name: perf-analyzer
description: Analyzes API performance test results from autocannon/Vitest and suggests improvements. Reads perf-results/ reports and identifies latency bottlenecks, threshold violations, and optimization opportunities.
allowed-tools:
  - Read
  - Glob
  - Grep
  - Bash
  - Task
---

# Performance Analyzer

Analyze performance test results and provide actionable optimization suggestions for this monorepo's Express API service.

## Trigger Conditions

Use this skill when:

- The user asks to "analyze performance", "check perf results", "optimize API"
- After running `yarn test:perf` and wanting to understand results
- When performance thresholds are failing and need investigation
- The user asks "why is this endpoint slow?" or "how can I improve latency?"

## Instructions

### 1. Gather Performance Data

Collect results from multiple sources:

```bash
# Run performance tests if not already run
nvm use && yarn test:perf

# Read the JSON report
cat service/perf-results/perf-report.json

# Read the Vitest output
cat service/perf-results/vitest-report.json
```

If no results exist, run `yarn test:perf` first (requires `yarn build` for the service).

### 2. Understand the Test Infrastructure

This monorepo uses:

- **Autocannon** for HTTP load testing (programmatic API)
- **Vitest** as the test runner with a separate `vitest.perf.config.ts`
- **Test config**: `service/vitest.perf.config.ts` (isolated from unit tests)
- **Helpers**: `service/tests/performance/helpers.ts` (server lifecycle, load runner, threshold validation)
- **Reporter**: `service/tests/performance/reporter.ts` (JSON + markdown output)

Key autocannon details:

- Percentiles available: p50, p75, p90, **p97_5** (NOT p95), p99
- p97.5 is used as the p95 approximation throughout the codebase
- Default config: 10 connections, 5-second duration, no pipelining

### 3. Analyze Results

For each tested endpoint, evaluate:

#### Latency Analysis

| Metric             | What It Tells You                                 |
| ------------------ | ------------------------------------------------- |
| p50                | Median response time - what most users experience |
| p97.5 (p95 proxy)  | Tail latency - what 1 in 40 users experience      |
| p99                | Extreme tail - outlier latency                    |
| Spread (p99 - p50) | Consistency - lower is better                     |

#### Throughput Analysis

| Metric      | What It Tells You             |
| ----------- | ----------------------------- |
| Average RPS | Sustained throughput capacity |
| Max RPS     | Peak handling capability      |
| Errors      | Any failures under load       |
| Non-2xx     | Application-level errors      |

#### Current Thresholds

```
Endpoint        | p50   | p95 (p97.5) | p99   | Min RPS
/health         | 20ms  | 50ms        | 100ms | 500
/api/health     | 30ms  | 75ms        | 150ms | 200
/api/message    | 50ms  | 100ms       | 200ms | 100
```

### 4. Identify Issues

Look for these common performance problems:

#### High Latency Indicators

- **p50 > threshold**: Core processing is too slow

  - Check middleware chain in `packages/express-app/src/index.ts`
  - Look for synchronous operations blocking the event loop
  - Check for unnecessary JSON parsing or serialization

- **p99 >> p50 (high spread)**: Intermittent slowdowns

  - GC pauses (check heap allocation patterns)
  - Connection pool exhaustion (if using databases)
  - DNS resolution (should be cached)

- **p97.5 spikes but p50 is fine**: Tail latency issues
  - Request queuing under concurrent load
  - Middleware running expensive operations occasionally

#### Low Throughput Indicators

- **RPS below threshold**: Server can't handle expected load
  - Check `express-openapi-validator` overhead (spec validation on every request)
  - Check middleware order (health checks should bypass validation)
  - Look for blocking I/O in route handlers

#### Error Indicators

- **Non-zero errors**: Connection failures under load
  - Server may be running out of file descriptors
  - Express may be timing out connections
- **Non-2xx responses**: Application errors
  - Route validation failures
  - Missing error handling in route handlers

### 5. Suggest Improvements

Based on findings, recommend specific code changes:

#### Middleware Optimization

- Health check endpoints should bypass API validation middleware
- Request tracing should use lightweight UUID generation
- Error handler should not log full stack traces in production

#### Route-Level Optimizations

- Cache static responses (e.g., health check responses)
- Use `res.json()` directly instead of constructing response objects
- Avoid redundant `async` on synchronous route handlers

#### Infrastructure Suggestions

- Connection keep-alive configuration
- Response compression (gzip/brotli)
- HTTP/2 for multiplexed connections
- Cluster mode for multi-core utilization

#### Threshold Adjustments

- If thresholds are too strict/loose based on sustained results, suggest new values
- Base recommendations on p50 being 50% of threshold, p99 being 80%

### 6. Output Format

```
## Performance Analysis Report

### Summary
- **Endpoints tested**: <count>
- **Overall status**: PASS / FAIL
- **Threshold violations**: <count>

### Per-Endpoint Results

#### GET /health
- p50: Xms (threshold: 20ms) - PASS/FAIL
- p97.5: Xms (threshold: 50ms) - PASS/FAIL
- p99: Xms (threshold: 100ms) - PASS/FAIL
- RPS: X (minimum: 500) - PASS/FAIL
- **Assessment**: <brief assessment>

[Repeat for each endpoint]

### Threshold Violations
1. `<endpoint>` - <metric> exceeded by X% (actual: Xms, threshold: Xms)
   - **Root cause**: <analysis>
   - **Fix**: <specific code change suggestion with file:line reference>

### Optimization Recommendations
1. **<Priority>**: <description>
   - Impact: <expected improvement>
   - Effort: <low/medium/high>
   - Files to change: <list>

### Threshold Adjustment Suggestions
- <endpoint>: <current> -> <suggested> (reason)
```
