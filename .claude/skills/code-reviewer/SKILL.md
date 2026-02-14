---
name: code-reviewer
description: Reviews code changes for monorepo best practices, TypeScript conventions, testing patterns, and common gotchas specific to this Yarn 3 + Lerna + Turborepo monorepo.
allowed-tools:
  - Read
  - Glob
  - Grep
  - Bash
  - Task
---

# Code Reviewer

Review code changes against this monorepo's established conventions and best practices. Provide actionable feedback with file:line references.

## Trigger Conditions

Use this skill when:

- The user asks to review code, a PR, or recent changes
- The user asks "review this", "check my code", "is this correct?"
- After significant code modifications to verify quality

## Review Process

### 1. Gather Changes

Identify what to review:

- If a PR number is given: use `gh pr diff <number>` to get the diff
- If files are specified: read those files
- Otherwise: run `git diff` and `git diff --staged` to see uncommitted changes

### 2. Review Checklist

Apply these monorepo-specific checks:

#### TypeScript Conventions

- [ ] **nodenext imports**: All `.ts` imports in `service/` and `packages/express-app/` MUST use `.js` extensions on relative imports
- [ ] **web-app exception**: `web-app/` uses `moduleResolution: "bundler"` so extensionless imports are OK
- [ ] **Strict mode**: No `any` types unless explicitly justified (test files are exempt)
- [ ] **Base config**: Package tsconfigs extend `../../tsconfig.base.json` (target: ES2022, strict: true)

#### Testing Patterns

- [ ] **Framework**: All tests use Vitest (NOT Jest). Check for accidental `jest.fn()`, `@types/jest`, etc.
- [ ] **Imports**: Tests must have explicit `import { describe, it, expect } from 'vitest'` (no globals)
- [ ] **Web-app tests**: Use `@testing-library/react` v16 with jsdom environment
- [ ] **Service tests**: Use `supertest` with node environment
- [ ] **User events**: Use `userEvent.setup()` pattern (v14+), not direct `userEvent.click()`
- [ ] **Cleanup**: Web-app tests rely on explicit `afterEach(() => cleanup())` in setupTests.ts

#### Styling (web-app)

- [ ] **Tailwind CSS v4**: Uses `@theme {}` blocks in CSS, NO `tailwind.config.js`
- [ ] **shadcn/ui**: Components use `cn()` utility from `@/lib/utils`, CVA for variants
- [ ] **Dark mode**: Class-based toggle via `ThemeContext`, `.dark` class on root
- [ ] **Path alias**: `@/` maps to `web-app/src/` - must be configured in vite, vitest, AND tsconfig

#### Package Structure

- [ ] **Dual build**: Packages in `packages/` must support CJS (`tsconfig.cjs.json`) and ESM (`tsconfig.esm.json`)
- [ ] **Workspace deps**: Use `workspace:*` protocol for internal dependencies
- [ ] **Engines**: All packages specify `"node": ">= 22"`

#### ESLint & Formatting

- [ ] **Single config**: All lint rules in root `eslint.config.mjs` (flat config), no per-package configs
- [ ] **Prettier**: Run through Prettier before committing
- [ ] **lint-staged**: Uses `--no-warn-ignored` flag for ESLint v9

#### Performance & Build

- [ ] **Turborepo**: Cacheable tasks (build, test, typecheck) use `turbo run`, NOT `lerna run`
- [ ] **Lerna**: Only for interactive/streaming tasks (dev, start, storybook)
- [ ] **Bundle size**: web-app changes should consider impact on bundle size (tracked via size-limit)

### 3. Common Gotchas to Watch For

- `express-openapi-validator`: `apiSpec` must be a **file path**, NOT YAML string content
- Autocannon has `p97_5` not `p95` - don't access `result.latency.p95`
- `@testing-library/dom` must be explicitly in devDependencies for Yarn 3
- `window.matchMedia` needs a mock in jsdom tests (setupTests.ts)
- Storybook `.js` config files shadow `.ts` files - remove legacy configs
- `jsx-a11y/heading-has-content` doesn't detect children via spread props - destructure explicitly

### 4. Output Format

Structure your review as:

```
## Code Review Summary

**Files reviewed**: <count>
**Issues found**: <count critical> critical, <count warning> warnings, <count info> info

### Critical Issues
- `file.ts:42` - Description of issue and how to fix it

### Warnings
- `file.ts:15` - Description of potential problem

### Suggestions
- `file.ts:88` - Optional improvement suggestion

### What Looks Good
- Brief mention of well-written patterns observed
```
