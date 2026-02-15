# PRD: Monorepo Modernization & AI-Assisted Development Framework

## Overview
Modernize the `lerna-monorepo-sample` from its current outdated stack (Node 14, React 16, TypeScript 4.3, Webpack 4, Lerna 6) to a cutting-edge monorepo showcasing best practices with Node 22, React 19, TypeScript 5.7+, Vite, Turborepo, and a full Claude AI development framework. The repo serves as a reference implementation for teams building monorepo-based applications with Express and React.

The existing external dependencies (`@dhruv-m-patel/express-app`, `@dhruv-m-patel/react-components`) will be replaced with local monorepo packages using the same `@dhruv-m-patel` scope. MUI v4 will be replaced with shadcn/ui + Tailwind CSS. Redux will be replaced with React Context + hooks. A comprehensive Claude AI framework will enable developers to create agents, skills, and slash commands for AI-assisted development.

## Goals
- Upgrade all dependencies to latest stable versions (Node 22, React 19, TS 5.7+, Express 5 or latest 4.x)
- Migrate from Lerna to Turborepo for monorepo orchestration
- Migrate from Webpack 4 to Vite for bundling, Jest to Vitest for testing
- Replace MUI v4 with shadcn/ui + Tailwind CSS
- Replace Redux with React Context + hooks
- Replace external `@dhruv-m-patel` packages with local monorepo packages
- Upgrade React Router v5 to v7
- Upgrade Storybook 6 to Storybook 8
- Add API response time performance testing (p50/p95/p99)
- Add bundle size tracking and reporting
- Add E2E testing with Playwright
- Build a complete Claude AI development framework with developer guide
- Enhance CI/CD with PR checks, perf gates, dependency audits, bundle size reporting, and independent package publishing
- Maintain all existing working behavior throughout the migration

## Quality Gates

These commands must pass for every user story:
- `yarn build` - Full build across all packages
- `yarn lint` - Linting (ESLint 9 flat config)
- `yarn test` - Unit and integration tests (Vitest)

CI additionally enforces:
- Performance tests (API response times, bundle size tracking)
- E2E tests (Playwright)
- Dependency audit
- Bundle size reporting on PRs

## User Stories

### US-001: Migrate monorepo tooling from Lerna to Turborepo
As a developer, I want the monorepo to use Turborepo so that builds are faster with intelligent caching and task orchestration.

**Acceptance Criteria:**
- [ ] Remove Lerna configuration (`lerna.json`, lerna dependency)
- [ ] Add `turbo.json` with pipeline configuration for build, lint, test, typecheck tasks
- [ ] Configure Yarn 4 (Berry) workspaces in root `package.json`
- [ ] Set `.yarnrc.yml` with `nodeLinker: node-modules` for compatibility
- [ ] All existing packages (`service`, `web-app`) are recognized as Turborepo workspaces
- [ ] `yarn build`, `yarn lint`, `yarn test` execute across all packages via Turborepo
- [ ] Task dependency graph is correct (e.g., packages build before dependents)
- [ ] `.gitignore` updated for `.turbo` cache directory
- [ ] Root `package.json` scripts updated to use `turbo run`

### US-002: Upgrade Node.js and TypeScript
As a developer, I want the project to use Node 22 LTS and TypeScript 5.7+ so that I have access to modern language features and long-term support.

**Acceptance Criteria:**
- [ ] `.nvmrc` updated to Node 22 LTS (specify exact version e.g., `22.x`)
- [ ] Root `package.json` `engines` field updated to `>=22`
- [ ] TypeScript upgraded to 5.7+ across all packages
- [ ] `tsconfig.json` files updated to use modern compiler options (`module: "nodenext"`, `moduleResolution: "nodenext"`, `target: "ES2022"` or later)
- [ ] A shared `tsconfig.base.json` at root is used by all packages
- [ ] All existing code compiles without type errors
- [ ] `yarn typecheck` script added to root and each package

### US-003: Create local `@dhruv-m-patel/express-app` package
As a developer, I want a local monorepo package that replaces the external `@dhruv-m-patel/express-app` dependency so that we control the code and can evolve it alongside the monorepo.

**Acceptance Criteria:**
- [ ] New package at `packages/express-app` with name `@dhruv-m-patel/express-app`
- [ ] Package provides an Express app factory function with middleware setup (error handling, request logging, health check)
- [ ] Replicates the API surface of the original external package (study existing usage in `service/`)
- [ ] Written in TypeScript with proper type exports
- [ ] Express upgraded to latest stable version (v4.21+ or v5 if stable)
- [ ] Has its own `package.json`, `tsconfig.json`, build script
- [ ] Exports both CJS and ESM formats
- [ ] Includes unit tests for the factory function and middleware
- [ ] Package is structured so it could be extracted to its own repo with minimal changes

### US-004: Create local `@dhruv-m-patel/react-components` package
As a developer, I want a local monorepo package for shared React components using shadcn/ui and Tailwind CSS so that the web-app has modern, maintainable UI components.

**Acceptance Criteria:**
- [ ] New package at `packages/react-components` with name `@dhruv-m-patel/react-components`
- [ ] Uses shadcn/ui component primitives with Tailwind CSS styling
- [ ] Includes equivalent components to what `web-app` currently uses (Page layout, Header, navigation elements)
- [ ] Written in TypeScript with proper type exports
- [ ] React 19 as peer dependency
- [ ] Has its own `package.json`, `tsconfig.json`, Vite library build config
- [ ] Includes Tailwind CSS configuration that consumers can extend
- [ ] Includes unit tests for each component using Vitest + React Testing Library
- [ ] Package is structured so it could be extracted to its own repo with minimal changes

### US-005: Migrate `service` package to modern stack
As a developer, I want the Express service to use the latest packages and the local `@dhruv-m-patel/express-app` package so that it demonstrates modern backend patterns.

**Acceptance Criteria:**
- [ ] `service` depends on local `@dhruv-m-patel/express-app` (workspace dependency)
- [ ] All dependencies upgraded to latest versions
- [ ] TypeScript configuration uses shared `tsconfig.base.json`
- [ ] Build output uses modern module format
- [ ] Existing routes and middleware continue to work identically
- [ ] Health check endpoint responds correctly
- [ ] All existing tests migrated to Vitest and passing
- [ ] Dev mode uses `tsx` or similar for fast TypeScript execution with watch mode

### US-006: Migrate `web-app` to Vite + React 19
As a developer, I want the web-app to use Vite for bundling and React 19 so that the development experience is fast and the app uses the latest React features.

**Acceptance Criteria:**
- [ ] Webpack 4 configuration removed entirely
- [ ] Vite configuration added (`vite.config.ts`) with React plugin
- [ ] React upgraded to v19 with new JSX transform
- [ ] React Router upgraded to v7
- [ ] All route definitions migrated to React Router v7 API
- [ ] Redux removed; state management replaced with React Context + hooks
- [ ] `index.html` moved to project root (Vite convention)
- [ ] Dev server starts and all pages render correctly
- [ ] Build produces optimized production bundle
- [ ] Hot Module Replacement (HMR) works in development

### US-007: Migrate `web-app` styling to Tailwind CSS + shadcn/ui
As a developer, I want the web-app to use Tailwind CSS and shadcn/ui instead of Material-UI so that the styling is modern, utility-first, and lightweight.

**Acceptance Criteria:**
- [ ] Material-UI v4 (`@material-ui/*`) dependencies removed
- [ ] Tailwind CSS v4 installed and configured
- [ ] shadcn/ui components initialized
- [ ] All existing pages restyled using Tailwind CSS utility classes
- [ ] Theme (colors, spacing, typography) configured in Tailwind config
- [ ] Responsive design maintained (mobile, tablet, desktop)
- [ ] Dark mode support via Tailwind's dark mode utilities
- [ ] Visual parity with original app (similar layout, navigation, content structure)
- [ ] Uses components from local `@dhruv-m-patel/react-components` package

### US-008: Upgrade ESLint to v9 with flat config
As a developer, I want ESLint upgraded to v9 with the new flat config format so that linting follows the latest standards.

**Acceptance Criteria:**
- [ ] ESLint upgraded to v9+
- [ ] `.eslintrc.*` files replaced with `eslint.config.mjs` (flat config)
- [ ] TypeScript-ESLint v8+ configured
- [ ] React-specific lint rules configured (react-hooks, jsx-a11y)
- [ ] Shared ESLint config at root, extended by each package
- [ ] Prettier integration maintained
- [ ] `yarn lint` passes across all packages with zero errors
- [ ] Any auto-fixable issues resolved

### US-009: Upgrade Storybook to v8 with Vite
As a developer, I want Storybook upgraded to v8 using the Vite builder so that component development and documentation uses modern tooling.

**Acceptance Criteria:**
- [ ] Storybook upgraded to v8 with `@storybook/react-vite` framework
- [ ] All existing stories migrated to CSF3 format
- [ ] Storybook uses Vite as its builder (not Webpack)
- [ ] Tailwind CSS works within Storybook
- [ ] shadcn/ui components render correctly in Storybook
- [ ] `yarn storybook` starts without errors
- [ ] Storybook build (`yarn build-storybook`) succeeds
- [ ] Stories exist for components in `@dhruv-m-patel/react-components`

### US-010: Add Vitest unit and integration testing
As a developer, I want all tests migrated from Jest to Vitest with expanded coverage so that testing is fast and consistent with the Vite toolchain.

**Acceptance Criteria:**
- [ ] Jest removed from all packages
- [ ] Vitest configured at root with workspace support
- [ ] All existing tests migrated to Vitest (API, syntax differences handled)
- [ ] React Testing Library configured for component tests
- [ ] `service` has unit tests for routes, middleware, and utilities
- [ ] `web-app` has unit tests for components, hooks, and context providers
- [ ] `packages/express-app` has unit tests
- [ ] `packages/react-components` has unit tests
- [ ] Code coverage reporting configured (lcov + text summary)
- [ ] `yarn test` runs all tests via Turborepo

### US-011: Add E2E testing with Playwright
As a developer, I want end-to-end tests using Playwright so that critical user flows are verified in a real browser.

**Acceptance Criteria:**
- [ ] Playwright installed and configured at root level
- [ ] Playwright config set up for the web-app (base URL, browser config)
- [ ] E2E test for: home page loads correctly
- [ ] E2E test for: navigation between pages works
- [ ] E2E test for: API health check endpoint responds
- [ ] E2E test for: web-app communicates with service (if applicable)
- [ ] `yarn test:e2e` script runs Playwright tests
- [ ] Tests can run in CI (headless Chrome)
- [ ] Playwright report generated on failure

### US-012: Add API performance testing
As a developer, I want automated API performance tests so that response time regressions are caught in CI.

**Acceptance Criteria:**
- [ ] Performance test framework chosen and configured (e.g., `autocannon`, `k6`, or custom Vitest bench)
- [ ] Performance tests for each API endpoint in `service`
- [ ] Metrics captured: p50, p95, p99 response times
- [ ] Baseline thresholds established and documented
- [ ] Tests fail if response times exceed thresholds
- [ ] `yarn test:perf` script runs performance tests
- [ ] Results output in a CI-parseable format (JSON or JUnit)
- [ ] Performance test results reported on PRs

### US-013: Add bundle size tracking
As a developer, I want automated bundle size tracking so that bundle bloat is caught before merging.

**Acceptance Criteria:**
- [ ] Bundle size analysis tool configured (e.g., `size-limit` or `bundlesize`)
- [ ] Baseline bundle sizes established for `web-app` production build
- [ ] Limits set for: total JS bundle, individual chunks, CSS
- [ ] `yarn test:size` script checks bundle sizes against limits
- [ ] Bundle size comparison reported on PRs (shows delta)
- [ ] CI fails if bundle size exceeds threshold
- [ ] Configuration documented in README or dedicated doc

### US-014: Enhance CI/CD pipeline
As a developer, I want a comprehensive CI/CD pipeline with PR checks, performance gates, dependency audits, and independent package publishing so that quality is enforced and packages can be released independently.

**Acceptance Criteria:**
- [ ] GitHub Actions workflows rewritten with modern action versions
- [ ] Turborepo remote caching configured (or local CI caching via actions/cache)
- [ ] PR check workflow includes: lint, typecheck, build, unit tests, E2E tests
- [ ] PR check workflow includes: performance tests with threshold enforcement
- [ ] PR check workflow includes: bundle size reporting as PR comment
- [ ] PR check workflow includes: dependency audit (`yarn audit`)
- [ ] Independent package publishing workflow (triggered per-package via tags or manual dispatch)
- [ ] Each package in `packages/` can be published to npm independently
- [ ] `package.json` for publishable packages includes proper `files`, `main`, `types`, `exports` fields
- [ ] CI uses Node 22 and Yarn 4
- [ ] Workflow uses Turborepo for task orchestration in CI

### US-015: Build Claude AI development framework - Core setup
As a developer, I want a Claude AI framework with `CLAUDE.md`, slash commands, and MCP server configs so that AI-assisted development is built into the repo.

**Acceptance Criteria:**
- [ ] `CLAUDE.md` at repo root with project context, architecture overview, code conventions, and common tasks
- [ ] `.claude/commands/` directory with slash commands for common workflows: `/build`, `/test`, `/lint`, `/new-package` (scaffolds a new workspace package)
- [ ] `.claude/settings.json` or equivalent MCP server configuration
- [ ] Commands are documented with descriptions and usage examples
- [ ] `/new-package` command scaffolds a package with correct structure (package.json, tsconfig.json, src/, tests/)

### US-016: Build Claude AI development framework - Custom skills
As a developer, I want custom Claude skills for domain-specific tasks so that AI agents can perform specialized operations within this monorepo.

**Acceptance Criteria:**
- [ ] `.claude/skills/` directory with skill definitions
- [ ] Skill: `code-reviewer` - reviews code changes for monorepo best practices
- [ ] Skill: `test-writer` - generates Vitest tests for a given module
- [ ] Skill: `perf-analyzer` - analyzes performance test results and suggests improvements
- [ ] Skill: `component-generator` - scaffolds a new React component with shadcn/ui + Tailwind + tests + story
- [ ] Each skill has a clear description, trigger conditions, and instructions
- [ ] Skills follow a consistent template format

### US-017: Build Claude AI development framework - Agent templates & PRD tools
As a developer, I want agent templates and PRD tools so that teams can orchestrate complex multi-step tasks with AI agents.

**Acceptance Criteria:**
- [ ] PRD generator skill/command that creates structured PRDs (ralph-tui compatible format)
- [ ] PRD-to-JSON converter skill for ralph-tui execution
- [ ] Agent template: `feature-implementer` - takes a user story and implements it
- [ ] Agent template: `migration-helper` - assists with package upgrades
- [ ] Agent template: `pr-creator` - creates well-structured PRs from completed work
- [ ] Templates stored in `.claude/agents/` with clear documentation
- [ ] Each template defines: purpose, inputs, expected outputs, tool usage

### US-018: Build Claude AI developer guide with architecture docs
As a developer, I want comprehensive documentation explaining how to create new agents, skills, and slash commands so that any team member can extend the AI framework.

**Acceptance Criteria:**
- [ ] `docs/` directory created at repo root
- [ ] `docs/ai-framework/getting-started.md` - overview and quick start
- [ ] `docs/ai-framework/creating-skills.md` - step-by-step guide with examples
- [ ] `docs/ai-framework/creating-commands.md` - slash command creation guide
- [ ] `docs/ai-framework/creating-agents.md` - agent template creation guide
- [ ] `docs/ai-framework/architecture.md` - architecture overview with diagrams (Mermaid)
- [ ] `docs/ai-framework/best-practices.md` - patterns and anti-patterns
- [ ] Architecture diagram showing: skill → agent → command → MCP server relationships
- [ ] Each guide includes at least one complete worked example
- [ ] Docs reference actual files in the repo (not hypothetical examples)

## Functional Requirements
- FR-1: The monorepo must use Turborepo for task orchestration with correct dependency graph
- FR-2: All packages must build independently and as part of the full monorepo build
- FR-3: The `service` must start and respond to HTTP requests identically to the current behavior
- FR-4: The `web-app` must render all existing pages with equivalent functionality
- FR-5: Yarn 4 Berry must be used as the package manager with `node_modules` linker
- FR-6: All local `@dhruv-m-patel/*` packages must be consumable as workspace dependencies
- FR-7: Each package in `packages/` must be independently publishable to npm
- FR-8: Vite dev server must support HMR for the web-app
- FR-9: Storybook must render all shared components with Tailwind styling
- FR-10: Performance tests must enforce response time thresholds in CI
- FR-11: Bundle size must be tracked and reported on every PR
- FR-12: Claude AI framework must be functional and documented with working examples
- FR-13: CI pipeline must block merges that fail quality gates or performance thresholds
- FR-14: All packages must compile with zero TypeScript errors under strict mode

## Non-Goals (Out of Scope)
- Server-side rendering (SSR) or migration to Next.js
- Deployment infrastructure (Docker, Kubernetes, cloud provider configs)
- Authentication or authorization implementation
- Database integration
- Internationalization (i18n)
- Migration to a different programming language
- Mobile app support
- GraphQL or gRPC - REST only
- Custom design system beyond what shadcn/ui provides
- Monorepo-wide state management (each app manages its own state)
- Automated dependency update bots (Renovate/Dependabot) - can be added later

## Technical Considerations
- **Migration order matters:** Turborepo + Node/TS upgrades first, then package creation, then app migration, then testing/CI, then AI framework. Each phase depends on the previous.
- **Yarn 4 Berry with `nodeLinker: node-modules`** avoids PnP compatibility issues while still getting Yarn 4 features.
- **React 19 compatibility:** Verify all dependencies support React 19 before upgrading. `react-router` v7 and `@testing-library/react` latest both support React 19.
- **shadcn/ui is not a package** - it's a CLI that copies component source into your project. The `react-components` package should contain the generated component source.
- **Express 5** is now released (v5.1.0) but evaluate stability. Fall back to Express 4.21+ if issues arise.
- **Turborepo remote caching** can use Vercel's free tier for open-source or local file-based caching in CI.
- **Performance baselines** should be established after migration is complete, not before, since the stack is changing significantly.
- **Agent execution order for optimal parallelism:**
  - Phase 1 (sequential): US-001 (Turborepo), US-002 (Node/TS)
  - Phase 2 (parallel): US-003 (express-app pkg) + US-004 (react-components pkg) + US-008 (ESLint)
  - Phase 3 (parallel after Phase 2): US-005 (service migration) + US-006 (web-app Vite/React) + US-007 (web-app styling)
  - Phase 4 (parallel): US-009 (Storybook) + US-010 (Vitest) + US-011 (Playwright)
  - Phase 5 (parallel after Phase 4): US-012 (perf tests) + US-013 (bundle size)
  - Phase 6 (sequential): US-014 (CI/CD)
  - Phase 7 (parallel): US-015 + US-016 + US-017 + US-018 (AI framework)

## Success Metrics
- All 18 user stories completed with acceptance criteria met
- `yarn build` succeeds across all packages
- `yarn lint` reports zero errors
- `yarn test` passes all unit and integration tests
- `yarn test:e2e` passes all Playwright tests
- `yarn test:perf` passes with response times under established thresholds
- `yarn test:size` passes with bundle sizes under established limits
- CI pipeline runs in under 10 minutes with Turborepo caching
- Storybook builds and displays all shared components
- Claude AI slash commands execute correctly
- A new developer can scaffold a new package using `/new-package` command
- Documentation is complete and references real files in the repo

## Open Questions
- Should Express 5 (v5.1.0) be used, or should we stay on Express 4.21+ for stability? (Evaluate during US-003)
- What specific API response time thresholds should be set? (Establish baselines during US-012)
- Should Turborepo remote caching use Vercel's hosted solution or self-hosted? (Decide during US-014)
- Should publishable packages use `changesets` for version management? (Decide during US-014)