# PRD: @dhruv-m-patel/react-components — Full Component Library

## Overview

Build a production-grade, themeable React component library at `packages/react-components/` (npm: `@dhruv-m-patel/react-components`). The library wraps shadcn/ui patterns with Tailwind CSS v4, provides a complete suite of ~50+ components, and ships a default theme using OKLCH CSS custom properties with a `ThemeProvider` that lets consumers override the entire color palette via props or CSS variables.

Every component gets a Storybook story in CSF3 format. Every test file imports its sibling stories, composes them with `composeStories()` from `@storybook/react`, renders the composed stories in jsdom, and verifies assertions — ensuring stories and tests never drift apart.

The library integrates into the existing Yarn 3 + Lerna + Turborepo monorepo alongside `service`, `web-app`, and `express-app`.

## Goals

- Provide a full component suite covering forms, feedback, navigation, data display, layout (including a responsive 12-column FlexGrid system), and overlays
- Ship a default theme (light + dark) with easy one-line override via `createTheme()` utility
- Follow shadcn/ui conventions: CVA variants, `cn()` merging, `forwardRef`, CSS variable tokens
- Use Radix UI primitives only where accessibility/behavior is complex (Dialog, Popover, Select, etc.)
- Every component has a CSF3 story and a test that renders the composed story
- Package is independently publishable to npm
- Integrate with existing monorepo tooling (Turborepo, Vitest workspace, ESLint, CI)
- Achieve >80% test coverage on all component source files
- Full SSR and React Server Components compatibility (`'use client'` directives, SSR-safe defaults, hydration safety)
- web-app fully migrated to use library components as a practical adoption showcase
- Comprehensive MDX documentation with getting-started guide, theming guide, component catalog, and adoption strategy
- Full AI-assisted development support: component-library-agent skill, slash commands, CLAUDE.md integration
- After completion, a future developer can add a new component using AI tools without reading the PRD

## Non-Goals

- No built-in data fetching or state management beyond theming
- No complex composite patterns (DataTable, Sidebar, DatePicker are deferred to a future phase)
- No animation library dependency (CSS transitions only)

## Quality Gates

These must pass for every user story:

```bash
yarn build                    # Full monorepo build
yarn lint                     # ESLint + Prettier
yarn test                     # Vitest across all packages
yarn typecheck                # TypeScript strict mode
```

**Test Coverage Requirement**: Every component story (US-003 through US-012) must achieve **>80% test coverage** on all component source files. Coverage is measured via Vitest v8 provider and enforced in the `vitest.config.ts` coverage thresholds. The `composeStories()` test pattern naturally drives high coverage since every story variant is rendered and asserted.

## Agent Team Orchestration

This PRD is designed for execution by a **team of parallel agents** using the existing agent and skill infrastructure in `.claude/agents/` and `.claude/skills/`. The orchestration strategy maximizes throughput by running independent stories concurrently while respecting dependency ordering.

### Available Agents & Skills

| Agent / Skill | Role in This PRD | Used In |
|--------------|-----------------|---------|
| **feature-implementer** (`.claude/agents/feature-implementer.md`) | Primary agent — takes a user story, implements it end-to-end (code + stories + tests), runs quality gates, updates progress log | US-001 through US-013, US-016 |
| **test-writer** (`.claude/skills/test-writer/SKILL.md`) | Delegated by feature-implementer to generate comprehensive Vitest tests with >80% coverage for each component | US-003 through US-012 |
| **component-generator** (`.claude/skills/component-generator/SKILL.md`) | Delegated by feature-implementer to scaffold component file structure (component + story + test + index) | US-003 through US-012 |
| **code-reviewer** (`.claude/skills/code-reviewer/SKILL.md`) | Run after each phase completes to review all changes against monorepo conventions before committing | After each phase |
| **pr-creator** (`.claude/agents/pr-creator.md`) | Creates the final PR after all stories are complete | After US-016 |

### Agent Execution Plan

```
PHASE 1 — Sequential (foundation, 1 agent)
  Agent A: US-001 (scaffold) → US-002 (theme engine)
  ↓ commit after each

PHASE 2 — Parallel (3 agents, after Phase 1)
  Agent A: US-003 (Button, Badge, Input, Label, Textarea)
  Agent B: US-004 (Separator, Skeleton, Avatar, Spinner, Typography)
  Agent C: US-005 (Alert, Progress, Toast)
  ↓ code-reviewer skill validates all 3 → commit each

PHASE 3 — Parallel (3 agents, after Phase 2)
  Agent A: US-006 (Dialog, Sheet, Tooltip, Popover, HoverCard)
  Agent B: US-007 (Checkbox, RadioGroup, Switch, Select)
  Agent C: US-008 (Slider, Toggle, ToggleGroup, InputOTP)
  ↓ code-reviewer skill validates all 3 → commit each

PHASE 4 — Parallel (4 agents, after Phase 1 — only needs theme)
  Agent A: US-009 (Tabs, Accordion, Collapsible, Breadcrumb, Pagination)
  Agent B: US-010 (Card, AspectRatio, ScrollArea, Resizable, FlexGrid)
  Agent C: US-011 (DropdownMenu, ContextMenu, Menubar)
  Agent D: US-012 (Table, Command)
  ↓ code-reviewer skill validates all 4 → commit each

PHASE 5 — Sequential (1 agent, after all component phases)
  Agent A: US-013 (barrel exports, full web-app adoption, verification)
  ↓ commit

PHASE 6 — Sequential (1 agent, after Phase 5)
  Agent A: US-016 (SSR/RSC compatibility, 'use client' directives, SSR tests)
  ↓ commit

PHASE 7 — Parallel (2 agents, after Phase 6)
  Agent A: US-014 (AI-assisted development framework)
  Agent B: US-015 (documentation, MDX docs, adoption guide)
  ↓ code-reviewer validates → commit each

FINAL — Sequential (1 agent)
  pr-creator agent: Creates PR from all commits
```

### Agent Workflow Per Story

Each **feature-implementer** agent follows this workflow for component stories:

1. **Read PRD** → extract target story acceptance criteria
2. **Scaffold** → invoke `component-generator` skill for each component in the story
3. **Implement** → write component logic, Tailwind styling, CVA variants, Radix wiring
4. **Stories** → write CSF3 stories with `tags: ['autodocs']`, comprehensive argTypes, MDX doc links
5. **Tests** → invoke `test-writer` skill, then enhance with `composeStories()` pattern, ensure >80% coverage
6. **Docs** → write JSDoc on all exported types/props, add `@example` tags, write MDX companion doc
7. **Quality gates** → `yarn build && yarn typecheck && yarn lint && yarn test`
8. **Coverage check** → verify >80% on all new component files
9. **Update barrel** → add exports to `src/index.ts`
10. **Update PRD** → check off completed acceptance criteria in this document

## Technical Context

### Existing Stack

| Aspect | Current |
|--------|---------|
| Package manager | Yarn 3.2.3 |
| Monorepo tools | Lerna (versioning) + Turborepo (task orchestration) |
| TypeScript | 5.7+ with `strict: true` |
| React | 19.x |
| Styling | Tailwind CSS v4 with `@theme {}` OKLCH variables |
| Component patterns | shadcn/ui (CVA + cn() + forwardRef) |
| Testing | Vitest 3.x + @testing-library/react 16 + jsdom |
| Storybook | v8 with @storybook/react-vite |
| CI | GitHub Actions (lint, typecheck, build, test, e2e, perf, bundle size) |

### Key Conventions

- **Imports in packages/**: Use `.js` extensions (nodenext module resolution)
- **cn() utility**: `clsx` + `tailwind-merge` for class merging
- **forwardRef**: All UI primitives must forward refs
- **displayName**: Set after forwardRef for DevTools
- **Test imports**: Explicit `import { describe, it, expect } from 'vitest'`
- **Story format**: CSF3 with `satisfies Meta<typeof Component>` and `StoryObj<typeof meta>`
- **Test pattern**: Import stories → `composeStories()` → render composed story → assert

### Package Conventions (from express-app)

- Scoped name: `@dhruv-m-patel/react-components`
- Dual concern: Vite library build (ESM) + type declarations
- Scripts: `build`, `test`, `test:ci`, `typecheck`, `storybook`, `build-storybook`
- `package.json` exports field with proper conditions

---

## User Stories

### US-001: Scaffold package and configure tooling

As a developer, I want the `packages/react-components` directory created with all configuration files so that I can start building components in a properly integrated monorepo package.

**Priority**: 1 (Critical — blocks all other stories)

**Dependencies**: none

**Acceptance Criteria**:

- [x] `packages/react-components/package.json` created with name `@dhruv-m-patel/react-components`, React 19 as peer dep, Vite/Vitest/Storybook/Testing Library/Radix as dev deps, `class-variance-authority`, `clsx`, `tailwind-merge`, `tailwindcss` as dependencies
- [x] `packages/react-components/tsconfig.json` extends `../../tsconfig.base.json`, uses `module: "ESNext"`, `moduleResolution: "bundler"`, `jsx: "react-jsx"`, `paths: { "@ui/*": ["./src/*"] }`
- [x] `packages/react-components/vite.config.ts` configures Vite library mode with React + Tailwind plugins, external `react`/`react-dom`, outputs ESM to `dist/`
- [x] `packages/react-components/vitest.config.ts` uses jsdom environment, setupFiles, coverage config, `@ui/` alias
- [x] `packages/react-components/src/setupTests.ts` imports `@testing-library/jest-dom/vitest`, mocks `matchMedia`, cleanup afterEach
- [x] `packages/react-components/.storybook/main.ts` configured with `@storybook/react-vite`, stories glob, `@ui/` path alias
- [x] `packages/react-components/.storybook/preview.ts` imports theme CSS, configures dark mode decorator
- [x] Root `vitest.workspace.ts` updated to include `packages/react-components/vitest.config.ts`
- [x] Root `eslint.config.mjs` updated with config block for `packages/react-components/`
- [x] Root `package.json` workspaces already covers `packages/*` (verify, no change needed)
- [x] `packages/react-components/src/lib/utils.ts` exports `cn()` utility
- [x] `packages/react-components/src/index.ts` barrel export file created (initially empty, grows per phase)
- [x] `yarn install` succeeds with new package linked
- [x] `yarn build` passes
- [x] `yarn lint` passes
- [x] `yarn typecheck` passes

**Notes**: Use Vite library mode (not dual CJS/ESM like express-app) since this is a React library consumed only via bundlers. Path alias is `@ui/` (not `@/`) to avoid collision with web-app.

---

### US-002: Build theme engine with ThemeProvider and createTheme

As a developer, I want a theme engine with CSS variables, a ThemeProvider, and a createTheme utility so that consumers can use the default theme or override it with a custom color palette.

**Priority**: 1 (Critical — all components depend on theme tokens)

**Dependencies**: US-001

**Acceptance Criteria**:

- [x] `src/styles/theme.css` defines the full default theme (see **Default Theme Specification** below)
- [x] `.dark` selector overrides all color tokens for dark mode (see spec below)
- [x] `src/theme/types.ts` exports `ThemeConfig` type (theme mode + overrides), `ColorPalette` type (all token names as optional string fields)
- [x] `src/theme/ThemeProvider.tsx` accepts `defaultTheme?: 'light' | 'dark' | 'system'`, `overrides?: Partial<ColorPalette>`, persists to localStorage, toggles `.dark` class, injects CSS variable overrides as inline styles
- [x] `src/theme/useTheme.ts` exports `useTheme()` hook returning `{ theme, setTheme, toggleTheme }`
- [x] `src/theme/create-theme.ts` exports `createTheme(palette: Partial<ColorPalette>): Record<string, string>` that maps palette keys to CSS variable names (e.g., `{ primary: 'oklch(...)' }` → `{ '--color-primary': 'oklch(...)' }`)
- [x] ThemeProvider story demonstrates light/dark toggle and custom override
- [x] ThemeProvider test verifies: default theme applied, toggle works, custom overrides injected as CSS vars, system preference detection
- [x] `src/index.ts` exports ThemeProvider, useTheme, createTheme, and all theme types
- [x] `yarn build` passes
- [x] `yarn test` passes
- [x] `yarn typecheck` passes

#### Default Theme Specification

The default theme is inspired by the [Cruip Mosaic](https://cruip.com/demos/mosaic/) dashboard template — a clean, professional SaaS aesthetic with a violet primary accent, warm-neutral gray scale, and polished light/dark variants. All color values use OKLCH for perceptual uniformity.

**Design principles:**
- Warm-neutral gray scale (not blue-tinted slate) for backgrounds and text
- Violet primary accent — rich and saturated, works for buttons, links, focus rings, and data visualization
- Sky blue secondary accent — for informational elements and chart complements
- Minimal shadows, generous spacing, rounded corners
- Dark mode uses deep gray backgrounds (not pure black) with slightly elevated card surfaces
- Form accent colors (checkboxes, toggles, focus rings) always use the violet primary

**Font:**
```css
--font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
```

**Typography scale** (matches Mosaic's tight letter-spacing for larger sizes):
```css
--text-xs: 0.75rem;     /* line-height: 1.5 */
--text-sm: 0.875rem;    /* line-height: 1.5715 */
--text-base: 1rem;      /* line-height: 1.5, letter-spacing: -0.01em */
--text-lg: 1.125rem;    /* line-height: 1.5, letter-spacing: -0.01em */
--text-xl: 1.25rem;     /* line-height: 1.5, letter-spacing: -0.01em */
--text-2xl: 1.5rem;     /* line-height: 1.33, letter-spacing: -0.01em */
--text-3xl: 1.88rem;    /* line-height: 1.33, letter-spacing: -0.01em */
--text-4xl: 2.25rem;    /* line-height: 1.25, letter-spacing: -0.02em */
```

**Border radius:**
```css
--radius-sm: 0.25rem;   /* small elements: badges, tags */
--radius-md: 0.375rem;  /* inputs, buttons */
--radius-lg: 0.5rem;    /* cards, dialogs */
--radius-xl: 0.75rem;   /* large containers, sheets */
```

**Shadow:**
```css
--shadow-sm: 0 1px 1px 0 rgb(0 0 0 / 0.05), 0 1px 2px 0 rgb(0 0 0 / 0.02);
```

##### Light Mode Tokens (default)

```css
@theme {
  /* Semantic surface colors */
  --color-background: oklch(0.985 0.002 247);     /* #f9fafb — warm off-white page bg */
  --color-foreground: oklch(0.175 0.015 250);      /* #111827 — near-black text */

  --color-card: oklch(1 0 0);                      /* #ffffff — white card surface */
  --color-card-foreground: oklch(0.175 0.015 250); /* #111827 — dark text on cards */

  --color-popover: oklch(1 0 0);                   /* #ffffff — white popover surface */
  --color-popover-foreground: oklch(0.175 0.015 250);

  /* Primary — Violet (Mosaic violet-500 #8470ff) */
  --color-primary: oklch(0.592 0.19 292);          /* #8470ff — rich violet */
  --color-primary-foreground: oklch(0.985 0 0);    /* #ffffff — white text on primary */

  /* Secondary — Sky blue (Mosaic sky-500 #67bfff) */
  --color-secondary: oklch(0.78 0.12 230);         /* #67bfff — informational blue */
  --color-secondary-foreground: oklch(0.175 0.015 250);

  /* Muted — Light gray for subdued backgrounds and text */
  --color-muted: oklch(0.965 0.002 247);           /* #f3f4f6 — gray-100 */
  --color-muted-foreground: oklch(0.506 0.015 250); /* #6b7280 — gray-500 */

  /* Accent — Violet-tinted highlight for hover states */
  --color-accent: oklch(0.955 0.03 292);           /* #f1eeff — violet-50 tint */
  --color-accent-foreground: oklch(0.175 0.015 250);

  /* Destructive — Red (Mosaic red-500 #ff5656) */
  --color-destructive: oklch(0.592 0.22 25);       /* #ff5656 — attention red */
  --color-destructive-foreground: oklch(0.985 0 0);

  /* Success — Green (Mosaic green-500 #3ec972) */
  --color-success: oklch(0.70 0.18 155);           /* #3ec972 — positive green */
  --color-success-foreground: oklch(0.985 0 0);

  /* Warning — Yellow (Mosaic yellow-500 #f0bb33) */
  --color-warning: oklch(0.82 0.15 85);            /* #f0bb33 — caution yellow */
  --color-warning-foreground: oklch(0.175 0.015 250);

  /* Borders and inputs */
  --color-border: oklch(0.905 0.005 250);          /* #e5e7eb — gray-200 */
  --color-input: oklch(0.905 0.005 250);           /* #e5e7eb — gray-200 */
  --color-ring: oklch(0.592 0.19 292);             /* violet primary — focus rings */

  /* Extended palette for direct use in charts, data viz, status badges */
  --color-violet-50: oklch(0.955 0.03 292);        /* #f1eeff */
  --color-violet-100: oklch(0.93 0.045 292);       /* #e6e1ff */
  --color-violet-200: oklch(0.87 0.07 292);        /* #d2cbff */
  --color-violet-300: oklch(0.80 0.10 292);        /* #b7acff */
  --color-violet-400: oklch(0.70 0.15 292);        /* #9c8cff */
  --color-violet-500: oklch(0.592 0.19 292);       /* #8470ff */
  --color-violet-600: oklch(0.545 0.19 292);       /* #755ff8 */
  --color-violet-700: oklch(0.46 0.18 292);        /* #5d47de */
  --color-violet-800: oklch(0.38 0.15 292);        /* #4634b1 */
  --color-violet-900: oklch(0.30 0.12 292);        /* #2f227c */

  --color-sky-50: oklch(0.94 0.04 230);            /* #e3f3ff */
  --color-sky-500: oklch(0.78 0.12 230);           /* #67bfff */
  --color-sky-700: oklch(0.55 0.12 230);           /* #3193da */

  --color-green-500: oklch(0.70 0.18 155);         /* #3ec972 */
  --color-red-500: oklch(0.592 0.22 25);           /* #ff5656 */
  --color-yellow-500: oklch(0.82 0.15 85);         /* #f0bb33 */

  /* Gray scale (warm neutral — Mosaic custom) */
  --color-gray-50: oklch(0.985 0.002 247);         /* #f9fafb */
  --color-gray-100: oklch(0.965 0.002 247);        /* #f3f4f6 */
  --color-gray-200: oklch(0.905 0.005 250);        /* #e5e7eb */
  --color-gray-300: oklch(0.82 0.01 250);          /* #bfc4cd */
  --color-gray-400: oklch(0.70 0.015 250);         /* #9ca3af */
  --color-gray-500: oklch(0.506 0.015 250);        /* #6b7280 */
  --color-gray-600: oklch(0.42 0.015 250);         /* #4b5563 */
  --color-gray-700: oklch(0.35 0.015 250);         /* #374151 */
  --color-gray-800: oklch(0.26 0.015 250);         /* #1f2937 */
  --color-gray-900: oklch(0.175 0.015 250);        /* #111827 */
  --color-gray-950: oklch(0.10 0.01 250);          /* #030712 */
}
```

##### Dark Mode Tokens

```css
.dark {
  --color-background: oklch(0.175 0.015 250);     /* #111827 — gray-900 deep bg */
  --color-foreground: oklch(0.965 0.002 247);      /* #f3f4f6 — near-white text */

  --color-card: oklch(0.26 0.015 250);             /* #1f2937 — gray-800 elevated surface */
  --color-card-foreground: oklch(0.965 0.002 247);

  --color-popover: oklch(0.26 0.015 250);          /* #1f2937 — gray-800 */
  --color-popover-foreground: oklch(0.965 0.002 247);

  --color-primary: oklch(0.592 0.19 292);          /* #8470ff — violet stays vivid */
  --color-primary-foreground: oklch(0.985 0 0);

  --color-secondary: oklch(0.78 0.12 230);         /* #67bfff — sky stays vivid */
  --color-secondary-foreground: oklch(0.175 0.015 250);

  --color-muted: oklch(0.35 0.015 250);            /* #374151 — gray-700 */
  --color-muted-foreground: oklch(0.70 0.015 250); /* #9ca3af — gray-400 */

  --color-accent: oklch(0.30 0.04 292);            /* dark violet-tinted surface */
  --color-accent-foreground: oklch(0.965 0.002 247);

  --color-destructive: oklch(0.592 0.22 25);       /* #ff5656 — red stays vivid */
  --color-destructive-foreground: oklch(0.985 0 0);

  --color-success: oklch(0.70 0.18 155);           /* #3ec972 — green stays vivid */
  --color-success-foreground: oklch(0.985 0 0);

  --color-warning: oklch(0.82 0.15 85);            /* #f0bb33 — yellow stays vivid */
  --color-warning-foreground: oklch(0.175 0.015 250);

  --color-border: oklch(0.35 0.01 250);            /* #374151 with 60% opacity feel — gray-700/60 */
  --color-input: oklch(0.35 0.01 250);
  --color-ring: oklch(0.592 0.19 292);             /* violet focus ring */
}
```

##### Design Token Mapping Reference

| Semantic Token | Light Value | Dark Value | Usage |
|---------------|-------------|------------|-------|
| `background` | Off-white `#f9fafb` | Deep gray `#111827` | Page background |
| `foreground` | Near-black `#111827` | Near-white `#f3f4f6` | Default body text |
| `card` | White `#ffffff` | Elevated gray `#1f2937` | Cards, panels |
| `primary` | Violet `#8470ff` | Violet `#8470ff` | Buttons, links, active states |
| `secondary` | Sky `#67bfff` | Sky `#67bfff` | Info badges, chart accents |
| `muted` | Light gray `#f3f4f6` | Dark gray `#374151` | Subdued backgrounds |
| `accent` | Violet tint `#f1eeff` | Dark violet `~` | Hover highlights |
| `destructive` | Red `#ff5656` | Red `#ff5656` | Error states, delete actions |
| `success` | Green `#3ec972` | Green `#3ec972` | Positive indicators |
| `warning` | Yellow `#f0bb33` | Yellow `#f0bb33` | Caution states |
| `border` | Gray-200 `#e5e7eb` | Gray-700 `#374151` | Borders, dividers |
| `ring` | Violet `#8470ff` | Violet `#8470ff` | Focus indicators |

**Notes**: The theme CSS is the foundation. Components reference semantic tokens like `bg-primary`, `text-muted-foreground`, `border-border`, etc. The Mosaic-inspired default provides a professional SaaS look out of the box. The `createTheme` utility is the primary consumer API for customization — keep it simple (object in, CSS var map out). Note: `success` and `warning` tokens are additions beyond the standard shadcn/ui set — they're essential for a full dashboard component library. The extended violet/sky/green/red/yellow palette scales are available for charts, data visualization, and status badges. OKLCH values are approximate conversions of the Mosaic hex values — fine-tune during implementation to ensure perceptual accuracy.

---

### US-003: Build foundation components — Button, Badge, Input, Label, Textarea

As a developer, I want foundational form and display primitives so that consumers have the basic building blocks for any UI.

**Priority**: 2 (High — core components used everywhere)

**Dependencies**: US-002

**Acceptance Criteria**:

- [x] **Button**: 6 variants (default, destructive, outline, secondary, ghost, link), 4 sizes (default, sm, lg, icon), loading state with inline spinner, `asChild` support via Radix Slot, disabled styling. CVA-based.
- [x] **Badge**: 4 variants (default, secondary, destructive, outline). Simple span with CVA.
- [x] **Input**: Standard text input with `type` support, error state (red border + aria-invalid), disabled state, className merge. Uses forwardRef on `<input>`.
- [x] **Label**: Accessible `<label>` element, peer-disabled styling, htmlFor binding. Based on `@radix-ui/react-label`.
- [x] **Textarea**: Multi-line input, rows prop, error state, disabled state, auto-resize option via CSS.
- [x] Each component in `src/components/{name}/` with `{name}.tsx`, `{name}.stories.tsx`, `{name}.test.tsx`, `index.ts`
- [x] Stories use CSF3 format with `satisfies Meta`, `tags: ['autodocs']`, argTypes for all variants/sizes
- [x] Tests import stories via `composeStories()` from `@storybook/react`, render each composed story, assert it renders without error, verify key variant classes, verify accessibility attributes
- [x] **>80% test coverage** on all component source files (statements, branches, functions, lines)
- [x] Each component has JSDoc on exported interface/props with `@example` usage snippet
- [x] All components exported from `src/index.ts`
- [x] `yarn build` passes
- [x] `yarn test` passes (all new tests green)
- [x] `yarn typecheck` passes
- [x] `yarn lint` passes

**Notes**: Button is the most complex. Use `@radix-ui/react-slot` for `asChild` pattern. Input/Textarea share error state pattern (border-destructive + aria-invalid). Tests should use `composeStories` to render the Default story then assert, render each variant story and assert class presence.

---

### US-004: Build foundation components — Separator, Skeleton, Avatar, Spinner, Typography

As a developer, I want additional display primitives for loading states, content structure, and visual separation.

**Priority**: 2

**Dependencies**: US-002

**Acceptance Criteria**:

- [x] **Separator**: Horizontal/vertical orientations using `@radix-ui/react-separator`, decorative prop, themed border color
- [x] **Skeleton**: Animated pulse placeholder, supports `className` for custom width/height/rounded
- [x] **Avatar**: Image with fallback (initials or icon), 3 sizes (sm, default, lg), uses `@radix-ui/react-avatar` for image loading states
- [x] **Spinner**: CSS-only animated loading indicator, 3 sizes (sm, default, lg), inherits text color, `aria-label="Loading"`
- [x] **Typography**: Semantic prose helpers — `H1`, `H2`, `H3`, `H4`, `P`, `Lead`, `Large`, `Small`, `Muted`, `InlineCode`, `Blockquote`. Each renders the appropriate HTML element with pre-styled Tailwind classes and accepts `className` override.
- [x] Each component in `src/components/{name}/` directory with full file set
- [x] CSF3 stories with autodocs for each
- [x] Tests use `composeStories()` pattern
- [x] **>80% test coverage** on all component source files (statements, branches, functions, lines)
- [x] Each component has JSDoc on exported interface/props with `@example` usage snippet
- [x] All components exported from `src/index.ts`
- [x] `yarn build` passes
- [x] `yarn test` passes
- [x] `yarn typecheck` passes

**Notes**: Typography components are simple — no CVA needed, just styled HTML elements with className merge. Skeleton is a single div with `animate-pulse`. Spinner uses CSS `@keyframes` or Tailwind's `animate-spin`.

---

### US-005: Build feedback components — Alert, Progress, Toast

As a developer, I want feedback components for user notifications and status indication.

**Priority**: 2

**Dependencies**: US-002

**Acceptance Criteria**:

- [x] **Alert**: 2 variants (default, destructive), icon slot, `AlertTitle` + `AlertDescription` sub-components, `role="alert"` for accessibility
- [x] **Progress**: Determinate progress bar (0-100), animated fill transition, uses `@radix-ui/react-progress`, `aria-valuenow`/`aria-valuemax`
- [x] **Toast**: Toast notification system — `ToastProvider` context, `useToast()` hook returning `{ toast, dismiss, toasts }`, auto-dismiss with configurable duration, variants (default, destructive, success), stacking, `Toast` + `ToastTitle` + `ToastDescription` + `ToastClose` + `ToastAction` sub-components, `Toaster` render component
- [x] Each with full file set (component, stories, tests, index)
- [x] Toast story demonstrates programmatic toast via `useToast` hook with play function
- [x] Tests use `composeStories()` pattern; Toast tests verify toast appears and auto-dismisses
- [x] **>80% test coverage** on all component source files (statements, branches, functions, lines)
- [x] Each component has JSDoc on exported interface/props with `@example` usage snippet
- [x] All exported from `src/index.ts`
- [x] `yarn build` passes
- [x] `yarn test` passes
- [x] `yarn typecheck` passes

**Notes**: Toast is the most complex here — needs a provider/context pattern. Consider a simple custom implementation using React state + portal rather than pulling in Sonner, to keep the library dependency-light.

---

### US-006: Build overlay components — Dialog, Sheet, Tooltip, Popover, HoverCard

As a developer, I want overlay/floating components for modals, slide-in panels, and contextual information.

**Priority**: 2

**Dependencies**: US-002

**Acceptance Criteria**:

- [x] **Dialog**: Modal overlay using `@radix-ui/react-dialog` — `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`. Animated open/close with CSS transitions. Focus trap, escape-to-close, overlay click-to-close.
- [x] **Sheet**: Slide-in panel built on `@radix-ui/react-dialog` — `Sheet`, `SheetTrigger`, `SheetContent` (side: top/right/bottom/left), `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter`, `SheetClose`. CSS translate animations.
- [x] **Tooltip**: Hover/focus tooltip using `@radix-ui/react-tooltip` — `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent`. Configurable delay, side, align.
- [x] **Popover**: Click-triggered floating content using `@radix-ui/react-popover` — `Popover`, `PopoverTrigger`, `PopoverContent`. Configurable side, align.
- [x] **HoverCard**: Hover-triggered preview card using `@radix-ui/react-hover-card` — `HoverCard`, `HoverCardTrigger`, `HoverCardContent`.
- [x] Each with full file set (component, stories, tests, index)
- [x] Stories demonstrate open/close interaction with play functions where applicable
- [x] Tests use `composeStories()` pattern; overlay tests verify content visibility toggling
- [x] **>80% test coverage** on all component source files (statements, branches, functions, lines)
- [x] Each component has JSDoc on exported interface/props with `@example` usage snippet
- [x] All exported from `src/index.ts`
- [x] `yarn build` passes
- [x] `yarn test` passes
- [x] `yarn typecheck` passes

**Notes**: All overlay components use Radix primitives for proper accessibility (focus management, aria attributes, keyboard interactions). Sheet is essentially Dialog with directional slide animations. Tooltip needs a TooltipProvider wrapper at the app root.



### US-007: Build form components — Checkbox, RadioGroup, Switch, Select

As a developer, I want form control components for building complete forms with proper accessibility.

**Priority**: 2

**Dependencies**: US-003 (uses Label)

**Acceptance Criteria**:

- [x] **Checkbox**: Using `@radix-ui/react-checkbox` — controlled/uncontrolled, indeterminate state, check icon animation, disabled styling, pairs with Label
- [x] **RadioGroup**: Using `@radix-ui/react-radio-group` — `RadioGroup` + `RadioGroupItem`, vertical/horizontal layout, disabled items, pairs with Label
- [x] **Switch**: Using `@radix-ui/react-switch` — toggle switch with thumb animation, 2 sizes (default, sm), disabled state, pairs with Label
- [x] **Select**: Using `@radix-ui/react-select` — `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`, `SelectSeparator`. Scrollable content, disabled items, placeholder.
- [x] Each with full file set
- [x] Stories include form composition examples (checkbox with label, radio group with options)
- [x] Tests use `composeStories()` pattern; form tests verify checked/selected state changes
- [x] **>80% test coverage** on all component source files (statements, branches, functions, lines)
- [x] Each component has JSDoc on exported interface/props with `@example` usage snippet
- [x] All exported from `src/index.ts`
- [x] `yarn build` passes
- [x] `yarn test` passes
- [x] `yarn typecheck` passes
- [x] `yarn lint` passes

**Notes**: All form components use Radix primitives for proper keyboard navigation and ARIA. Select is the most complex — has many sub-components and scroll behavior.



### US-008: Build form components — Slider, Toggle, ToggleGroup, InputOTP

As a developer, I want additional form controls for specialized input scenarios.

**Priority**: 3

**Dependencies**: US-002

**Acceptance Criteria**:

- [x] **Slider**: Using `@radix-ui/react-slider` — range slider, min/max/step, single value, disabled state, themed track/thumb colors
- [x] **Toggle**: Using `@radix-ui/react-toggle` — pressed/unpressed state, 2 variants (default, outline), 3 sizes (default, sm, lg), disabled
- [x] **ToggleGroup**: Using `@radix-ui/react-toggle-group` — single/multiple selection, shares Toggle variants/sizes
- [x] **InputOTP**: Segmented OTP input — `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator`. Configurable length, pattern validation, auto-advance.
- [x] Each with full file set
- [x] Tests use `composeStories()` pattern
- [x] **>80% test coverage** on all component source files (statements, branches, functions, lines)
- [x] Each component has JSDoc on exported interface/props with `@example` usage snippet
- [x] All exported from `src/index.ts`
- [x] `yarn build` passes
- [x] `yarn test` passes
- [x] `yarn typecheck` passes
- [x] `yarn lint` passes

**Notes**: InputOTP can be built with a custom implementation using hidden input + visual slots pattern (no external dep needed). Slider/Toggle/ToggleGroup use Radix.



### US-009: Build navigation components — Tabs, Accordion, Collapsible, Breadcrumb, Pagination

As a developer, I want navigation and content organization components.

**Priority**: 2

**Dependencies**: US-002

**Acceptance Criteria**:

- [x] **Tabs**: Using `@radix-ui/react-tabs` — `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`. Horizontal layout, active indicator styling, disabled tabs.
- [x] **Accordion**: Using `@radix-ui/react-accordion` — `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`. Single/multiple open modes, animated expand/collapse with CSS, chevron rotation.
- [x] **Collapsible**: Using `@radix-ui/react-collapsible` — `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`. Simple open/close with animation.
- [x] **Breadcrumb**: `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`. Semantic `<nav aria-label="breadcrumb">` + `<ol>`.
- [x] **Pagination**: `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationPrevious`, `PaginationNext`, `PaginationLink`, `PaginationEllipsis`. Uses button/link variants.
- [x] Each with full file set
- [x] Tests use `composeStories()` pattern
- [x] **>80% test coverage** on all component source files (statements, branches, functions, lines)
- [x] Each component has JSDoc on exported interface/props with `@example` usage snippet
- [x] All exported from `src/index.ts`
- [x] `yarn build` passes
- [x] `yarn test` passes
- [x] `yarn typecheck` passes
- [x] `yarn lint` passes

**Notes**: Breadcrumb and Pagination are pure HTML/CSS components (no Radix needed). Accordion animation uses `grid-template-rows: 0fr` → `1fr` trick or Radix's built-in animation support.



### US-010: Build layout components — Card, AspectRatio, ScrollArea, Resizable, FlexGrid

As a developer, I want layout and container components for content structure, including a responsive flex-based grid system.

**Priority**: 2

**Dependencies**: US-002

**Acceptance Criteria**:

- [x] **Card**: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`. Styled container with border, shadow, rounded corners. All sub-components use forwardRef + cn().
- [x] **AspectRatio**: Using `@radix-ui/react-aspect-ratio` — maintains width:height ratio for media content.
- [x] **ScrollArea**: Using `@radix-ui/react-scroll-area` — `ScrollArea`, `ScrollBar`. Custom-styled scrollbar, horizontal/vertical, auto-hide.
- [x] **Resizable**: `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle`. Draggable resize handle between panels, horizontal/vertical directions. Uses `react-resizable-panels` library.
- [x] **FlexGrid**: Responsive flex-based 12-column grid system with compound component API:
  - `FlexGrid` — container component. Props: `gap?: string` (Tailwind gap token, default `'4'`), `alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'`, `justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'`, `wrap?: boolean` (default `true`), `className`. Renders a `<div>` with `display: flex; flex-wrap: wrap` and negative margin technique for gutters (or Tailwind gap). All children are `FlexGrid.Column`.
  - `FlexGrid.Column` — column component exposed as static property on FlexGrid. Props: `xs?: 1-12` (required — mobile-first base), `sm?: 1-12` (≥640px, tablets), `md?: 1-12` (≥768px, laptops/desktops), `lg?: 1-12` (≥1024px, desktops/wide monitors), `xl?: 1-12` (≥1280px, wider viewports), `offset?: { xs?, sm?, md?, lg?, xl? }` (column offsets per breakpoint), `order?: { xs?, sm?, md?, lg?, xl? }` (flex order per breakpoint), `className`. Column widths calculated as `(span / 12) * 100%` using CSS classes.
  - Breakpoints use Tailwind v4 default breakpoints: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`. The `xs` prop applies with no media query (mobile-first base).
  - Column width classes generated via Tailwind responsive prefixes (e.g., `xs={6}` → `w-6/12`, `md={4}` → `md:w-4/12`, `lg={3}` → `lg:w-3/12`).
  - Grid supports nesting: a `FlexGrid.Column` can contain a nested `FlexGrid`.
  - Both components use `forwardRef` and `cn()` for className merging.
  - TypeScript: Column span props typed as `1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12` (literal union, not just `number`).
- [x] FlexGrid stories demonstrate:
  - Equal columns (3x `xs={4}`)
  - Responsive layout (`xs={12} md={6} lg={4}` — stacks on mobile, 2-col on tablet, 3-col on desktop)
  - Mixed widths (sidebar + main: `md={3}` + `md={9}`)
  - Nested grids
  - With gap and alignment variations
- [x] FlexGrid tests verify:
  - Default rendering with `composeStories()` pattern
  - Column width classes applied correctly for each breakpoint prop
  - Responsive class combinations (e.g., `xs={12} md={6}` produces `w-full md:w-6/12`)
  - Offset and order classes when specified
  - FlexGrid.Column compound component access pattern works
  - Ref forwarding on both FlexGrid and FlexGrid.Column
  - Nesting renders correctly
- [x] Each with full file set
- [x] Tests use `composeStories()` pattern
- [x] **>80% test coverage** on all component source files (statements, branches, functions, lines)
- [x] Each component has JSDoc on exported interface/props with `@example` usage snippet
- [x] All exported from `src/index.ts`
- [x] `yarn build` passes
- [x] `yarn test` passes
- [x] `yarn typecheck` passes
- [x] `yarn lint` passes

**Notes**: Card is pure HTML/CSS. Resizable needs `react-resizable-panels` as a dependency — evaluate if this should be a peer dep or direct dep. FlexGrid is pure CSS/Tailwind — no external dependencies. Use the `FlexGrid.Column` compound component pattern (static property assignment) so consumers write `<FlexGrid><FlexGrid.Column xs={12} md={6}>...</FlexGrid.Column></FlexGrid>`. Column width mapping is straightforward: span 1 = `w-1/12`, span 6 = `w-6/12` (which Tailwind aliases as `w-1/2`), span 12 = `w-full`. Use Tailwind's fraction utilities where available, fall back to `basis-[percentage]` or `w-[percentage]` if needed for exact 12-column math.



### US-011: Build menu components — DropdownMenu, ContextMenu, Menubar

As a developer, I want menu components for actions, context menus, and application menubars.

**Priority**: 3

**Dependencies**: US-002

**Acceptance Criteria**:

- [x] **DropdownMenu**: Using `@radix-ui/react-dropdown-menu` — `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuGroup`, `DropdownMenuSub`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent`.
- [x] **ContextMenu**: Using `@radix-ui/react-context-menu` — mirrors DropdownMenu API surface with `ContextMenu*` prefix. Triggered by right-click.
- [x] **Menubar**: Using `@radix-ui/react-menubar` — `Menubar`, `MenubarMenu`, `MenubarTrigger`, `MenubarContent`, `MenubarItem`, `MenubarSeparator`, `MenubarShortcut`, `MenubarCheckboxItem`, `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarSub`, `MenubarSubTrigger`, `MenubarSubContent`.
- [x] Each with full file set
- [x] Stories demonstrate nested sub-menus, checkbox items, radio groups, keyboard shortcuts
- [x] Tests use `composeStories()` pattern
- [x] **>80% test coverage** on all component source files (statements, branches, functions, lines)
- [x] Each component has JSDoc on exported interface/props with `@example` usage snippet
- [x] All exported from `src/index.ts`
- [x] `yarn build` passes
- [x] `yarn test` passes
- [x] `yarn typecheck` passes
- [x] `yarn lint` passes

**Notes**: These three share very similar patterns — build DropdownMenu first, then derive ContextMenu and Menubar from it. Each has ~12-15 sub-components but they follow identical patterns.



### US-012: Build data display — Table, Command

As a developer, I want data display components for tabular data and command palettes.

**Priority**: 3

**Dependencies**: US-002

**Acceptance Criteria**:

- [x] **Table**: `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`, `TableCell`, `TableCaption`. Semantic HTML table elements with Tailwind styling, responsive overflow handling, striped rows option.
- [x] **Command**: Using `cmdk` library — `Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandShortcut`, `CommandSeparator`. Keyboard-navigable command palette / searchable list.
- [x] Each with full file set
- [x] Table story demonstrates a realistic data table with headers, rows, and footer
- [x] Command story demonstrates searchable command palette with grouped items
- [x] Tests use `composeStories()` pattern
- [x] **>80% test coverage** on all component source files (statements, branches, functions, lines)
- [x] Each component has JSDoc on exported interface/props with `@example` usage snippet
- [x] All exported from `src/index.ts`
- [x] `yarn build` passes
- [x] `yarn test` passes
- [x] `yarn typecheck` passes
- [x] `yarn lint` passes

**Notes**: Table is pure HTML/CSS. Command needs `cmdk` as a dependency. Command is one of shadcn/ui's most popular components — used for search, command palettes, and comboboxes.



### US-013: Barrel exports, full web-app adoption, and verification

As a developer, I want the library fully exported and the existing web-app fully migrated to use library components — demonstrating a practical, real-world adoption use case.

**Priority**: 2

**Dependencies**: US-003 through US-012

**Acceptance Criteria**:

- [x] `src/index.ts` exports ALL components, theme provider, hooks, types, and utilities
- [x] Package builds successfully with Vite library mode (ESM output in `dist/`)
- [x] No circular dependencies in the barrel export
- [x] Package `exports` field in `package.json` correctly maps to built artifacts
- [x] `web-app/package.json` adds `@dhruv-m-patel/react-components: "workspace:*"` as dependency
- [x] **Full web-app migration** — replace ALL local UI components with library imports:
  - `web-app/src/components/ui/button.tsx` replaced by `Button` from `@dhruv-m-patel/react-components`
  - `web-app/src/components/ui/card.tsx` replaced by `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter` from `@dhruv-m-patel/react-components`
  - Local `web-app/src/components/ui/` directory removed (or emptied) — all UI primitives come from the library
- [x] **ThemeProvider migration** — `web-app/src/context/ThemeContext.tsx` replaced by the library's `ThemeProvider` and `useTheme` hook:
  - `App.tsx` wraps with library's `<ThemeProvider>` instead of local `<ThemeProvider>`
  - Dark mode toggle in `Layout` uses library's `useTheme()` hook
  - Existing theme CSS variables in `web-app/src/index.css` remain (or merge with library's theme CSS)
- [x] **HomePage migration** — `web-app/src/pages/HomePage.tsx` uses library components exclusively (Card, Button, Typography, FlexGrid where applicable)
- [x] **Layout migration** — `web-app/src/components/Layout.tsx` uses library components where applicable (Button for theme toggle, Typography for headings)
- [x] web-app renders identically before and after migration (visual parity — no regressions)
- [x] web-app existing tests still pass after migration
- [x] `packages/react-components` Storybook builds: `yarn workspace @dhruv-m-patel/react-components run build-storybook`
- [x] All tests pass: `yarn test`
- [x] Full build passes: `yarn build`
- [x] Typecheck passes: `yarn typecheck`
- [x] Lint passes: `yarn lint`

**Notes**: This is the flagship adoption demonstration. The web-app should look and behave identically after migration — proving the library is a drop-in replacement. Remove local UI component files after migration to avoid confusion. The ThemeProvider migration is key — it proves the library's theming system works as a complete replacement for custom theme implementations.

---

### US-014: Build AI-assisted development framework for the component library

As a developer, I want a comprehensive AI-assisted development setup for the `@dhruv-m-patel/react-components` package — including a specialized Claude skill, slash commands, and updated project instructions — so that future component work is fully AI-augmented and follows established patterns automatically.

**Priority**: 3

**Dependencies**: US-013

**Acceptance Criteria**:

- [ ] `.claude/skills/component-library-agent/SKILL.md` created with full knowledge capture:
  - Package structure and file naming conventions
  - Component patterns (forwardRef, CVA, cn(), displayName)
  - Theming tokens and CSS variable conventions
  - Story format (CSF3 + `satisfies Meta` + `tags: ['autodocs']` + composeStories test pattern)
  - Radix UI integration guidelines (when to use, how to wrap, Radix + Tailwind v4 selectors)
  - Dependency decisions (direct dep vs peer dep for Radix packages)
  - FlexGrid and compound component patterns
- [ ] Skill includes ready-to-use templates for: new component, new story, new test (with composeStories)
- [ ] Skill includes post-generation checklist with correct workspace commands (`yarn workspace @dhruv-m-patel/react-components run ...`)
- [ ] Skill references actual files in `packages/react-components/` as concrete examples for each pattern
- [ ] Skill covers theme extension patterns (createTheme, ThemeProvider overrides, OKLCH token system)
- [ ] `.claude/commands/new-component.md` slash command created — scaffolds a new component in the library with all files (component, story, test, index) using the component-generator skill
- [ ] `.claude/commands/library-test.md` slash command created — runs tests for the react-components package with coverage report
- [ ] Root `CLAUDE.md` updated with `react-components` package section: build commands, test commands, key patterns, path alias (`@ui/`), relationship to web-app
- [ ] `yarn lint` passes (markdown/skill files have no lint impact — verify no regressions)

**Notes**: This story captures all institutional knowledge from the PRD execution. The skill, slash commands, and CLAUDE.md updates together form a complete AI-assisted development experience. A future developer (or agent) should be able to add a new component to the library by invoking `/new-component` and following the skill's guidance without reading this PRD.

---

### US-015: Documentation, Storybook MDX docs, and adoption guide

As a developer adopting the library, I want comprehensive documentation linked to Storybook stories with clear examples so that I can quickly understand, adopt, and extend the component library.

**Priority**: 3

**Dependencies**: US-013

**Acceptance Criteria**:

- [ ] `packages/react-components/docs/getting-started.mdx` — Quick start guide: install, wrap with ThemeProvider, import first component, verify rendering
- [ ] `packages/react-components/docs/theming.mdx` — Theming guide: default theme tokens, `createTheme()` usage, dark mode toggle, OKLCH color system explanation, CSS variable override patterns, custom palette examples
- [ ] `packages/react-components/docs/component-patterns.mdx` — Architecture guide: CVA variants, `cn()` merging, forwardRef pattern, compound component pattern (FlexGrid.Column), Radix primitive integration, when to use which pattern
- [ ] `packages/react-components/docs/testing.mdx` — Testing guide: composeStories pattern explanation, how to test new components, coverage requirements, example test walkthrough
- [ ] Each component story file includes inline MDX documentation via `tags: ['autodocs']` with:
  - Component description and purpose
  - Props table (auto-generated from TypeScript types)
  - Usage examples matching `@example` JSDoc tags
  - Variant/size visual grid where applicable
- [ ] `packages/react-components/docs/adoption-guide.mdx` — Migration/adoption guide: how to add the library to an existing app, ThemeProvider setup, gradual adoption strategy (use alongside existing components), web-app integration example
- [ ] `packages/react-components/docs/component-catalog.mdx` — Full component catalog: organized by category (foundation, form, feedback, overlay, navigation, layout, menu, data), with links to individual Storybook stories
- [ ] All MDX docs are linked from Storybook via `.storybook/main.ts` stories glob (e.g., `../docs/**/*.mdx`)
- [ ] Storybook sidebar organizes docs: Introduction → Getting Started → Theming → Components (by category) → Testing → Adoption
- [ ] `yarn build` passes
- [ ] `yarn typecheck` passes
- [ ] `yarn lint` passes

**Notes**: MDX docs serve dual purpose — they render in Storybook as documentation pages AND can be read as standalone markdown. The adoption guide is the key deliverable for developer onboarding. Keep examples realistic and copy-pasteable. The component catalog provides a high-level map that links to individual component stories for detailed exploration.

---

### US-016: SSR and React Server Components compatibility

As a developer using Next.js or another SSR framework, I want every component in the library to work correctly in server-side rendering and React Server Component environments so that I can adopt the library in any React application regardless of rendering strategy.

**Priority**: 2

**Dependencies**: US-013 (all components must exist and pass quality gates first)

**Acceptance Criteria**:

- [x] **`'use client'` directive**: Every component file that uses React hooks, event handlers, `useRef`, `useEffect`, `useState`, `useContext`, or browser APIs has `'use client'` at the top of the file. This includes:
  - All Radix-based components (Dialog, Select, Tooltip, Popover, etc.)
  - ThemeProvider, useTheme
  - Toast system (ToastProvider, useToast, Toaster)
  - InputOTP (uses internal state)
  - Toggle, ToggleGroup (uses Radix state)
  - Components with `forwardRef` that also use hooks internally
- [x] **Pure presentational components** that do NOT need `'use client'` (they can render on the server):
  - Badge, Separator, Skeleton, Typography (H1-H4, P, Lead, etc.), Card sub-components, Table sub-components, Breadcrumb, Pagination, FlexGrid, FlexGrid.Column
  - Verify these render correctly without `'use client'` directive
- [x] **Barrel export compatibility**: `src/index.ts` re-exports both client and server-safe components — consumers can import any component and the bundler (Next.js, Remix, etc.) handles the client boundary correctly
- [x] **No `window`/`document` access at module scope**: All browser API access (localStorage, matchMedia, document.documentElement) is guarded behind `useEffect`, event handlers, or `typeof window !== 'undefined'` checks
  - ThemeProvider: localStorage access only in useEffect, not during SSR render
  - Toast: portal rendering only in useEffect
  - System theme detection (matchMedia) only in useEffect
- [x] **SSR-safe defaults**: Components that depend on client state (theme, toast) render a sensible default on the server (e.g., light theme, no toasts) without hydration mismatch warnings
- [x] **Hydration safety**: No React hydration mismatches — server-rendered HTML matches initial client render for all components
- [x] **SSR test suite**: `packages/react-components/tests/ssr/` directory with tests that:
  - Use `renderToString` from `react-dom/server` to render each component
  - Verify no errors or warnings during server render
  - Verify ThemeProvider renders with default theme on server
  - Verify components with Radix primitives render their closed/default state on server
  - Verify no `window is not defined` or `document is not defined` errors
- [x] **Package.json exports** updated to support both ESM and SSR bundlers:
  - `"type": "module"` in package.json
  - `exports` field with proper conditions (`import`, `types`)
- [x] `yarn build` passes
- [x] `yarn test` passes (including new SSR tests)
- [x] `yarn typecheck` passes
- [x] `yarn lint` passes

**Notes**: The key principle is **progressive enhancement** — the library works in SSR environments by default, and components that need client-side interactivity declare themselves with `'use client'`. This does NOT require the library to be a Next.js-specific package — `'use client'` is a React convention that bundlers understand. The SSR test suite using `renderToString` is lightweight and runs in Node.js (no browser needed). Radix primitives generally handle SSR well since they render in their closed/default state on the server and hydrate on the client.

---

## Execution Order

Respecting dependencies and maximizing parallelism (aligned with Agent Execution Plan above):

```
Phase 1 — Sequential (foundation, 1 agent):
  └── US-001: Package scaffold
  └── US-002: Theme engine
  ↓ commit after each

Phase 2 — Parallel (3 agents, after Phase 1):
  ├── Agent A: US-003 (Button, Badge, Input, Label, Textarea)
  ├── Agent B: US-004 (Separator, Skeleton, Avatar, Spinner, Typography)
  └── Agent C: US-005 (Alert, Progress, Toast)
  ↓ code-reviewer validates → commit each

Phase 3 — Parallel (3 agents, after Phase 2):
  ├── Agent A: US-006 (Dialog, Sheet, Tooltip, Popover, HoverCard)
  ├── Agent B: US-007 (Checkbox, RadioGroup, Switch, Select)
  └── Agent C: US-008 (Slider, Toggle, ToggleGroup, InputOTP)
  ↓ code-reviewer validates → commit each

Phase 4 — Parallel (4 agents, after Phase 1 — only needs theme):
  ├── Agent A: US-009 (Tabs, Accordion, Collapsible, Breadcrumb, Pagination)
  ├── Agent B: US-010 (Card, AspectRatio, ScrollArea, Resizable, FlexGrid)
  ├── Agent C: US-011 (DropdownMenu, ContextMenu, Menubar)
  └── Agent D: US-012 (Table, Command)
  ↓ code-reviewer validates → commit each

Phase 5 — Sequential (1 agent, after all component phases):
  └── US-013: Barrel exports, full web-app adoption, verification
  ↓ commit

Phase 6 — Sequential (1 agent, after Phase 5):
  └── US-016: SSR and React Server Components compatibility
  ↓ commit

Phase 7 — Parallel (2 agents, after Phase 6):
  ├── Agent A: US-014 (AI-assisted development framework)
  └── Agent B: US-015 (documentation, MDX docs, adoption guide)
  ↓ code-reviewer validates → commit each

FINAL — Sequential (1 agent):
  └── pr-creator agent: Creates PR from all commits
```

**Note**: Phases 2-4 can overlap if dependencies allow. Phase 3 depends on Phase 2 (US-003 provides Label for US-007). Phase 4 only depends on Phase 1 (theme engine). US-016 runs after US-013 because it adds `'use client'` directives and SSR tests across all existing components. The orchestrator should schedule phases to maximize agent utilization.

## Commit Strategy

Each user story produces a conventional commit upon completion:

| Story | Commit message |
|-------|---------------|
| US-001 | `feat(react-components): scaffold package with tooling and configuration` |
| US-002 | `feat(react-components): implement theme engine with ThemeProvider and createTheme` |
| US-003 | `feat(react-components): add Button, Badge, Input, Label, Textarea` |
| US-004 | `feat(react-components): add Separator, Skeleton, Avatar, Spinner, Typography` |
| US-005 | `feat(react-components): add Alert, Progress, Toast` |
| US-006 | `feat(react-components): add Dialog, Sheet, Tooltip, Popover, HoverCard` |
| US-007 | `feat(react-components): add Checkbox, RadioGroup, Switch, Select` |
| US-008 | `feat(react-components): add Slider, Toggle, ToggleGroup, InputOTP` |
| US-009 | `feat(react-components): add Tabs, Accordion, Collapsible, Breadcrumb, Pagination` |
| US-010 | `feat(react-components): add Card, AspectRatio, ScrollArea, Resizable, FlexGrid` |
| US-011 | `feat(react-components): add DropdownMenu, ContextMenu, Menubar` |
| US-012 | `feat(react-components): add Table, Command` |
| US-013 | `feat(react-components): barrel exports, full web-app adoption, verification` |
| US-014 | `feat(ai-framework): add component-library-agent skill, slash commands, CLAUDE.md` |
| US-015 | `docs(react-components): add MDX documentation, adoption guide, component catalog` |
| US-016 | `feat(react-components): add SSR/RSC compatibility with 'use client' directives` |

**Update this plan document** before each commit to reflect completed checkboxes.

## Risk Assessment

- **Risk**: Radix UI + Tailwind v4 compatibility issues
  - **Mitigation**: Verify with a simple Dialog component early (US-006). If issues arise, use `data-[state=open]` selectors which Radix supports.

- **Risk**: `composeStories()` from `@storybook/react` may need specific portable stories config
  - **Mitigation**: Test the pattern early in US-003. May need `@storybook/test` or `@storybook/react/portable-stories` import path.

- **Risk**: Vite library mode tree-shaking may not work well with barrel exports
  - **Mitigation**: Use named exports only. Verify bundle size impact in US-013. Consider per-component entry points if needed.

- **Risk**: Too many Radix peer dependencies for consumers
  - **Mitigation**: Bundle Radix packages as direct dependencies (not peer deps). They're small and tree-shake well.

- **Risk**: Storybook v8 + Vitest + composeStories integration may require specific setup
  - **Mitigation**: Research `@storybook/experimental-addon-test` or `@storybook/react/portable-stories-vitest` early in US-001.

- **Risk**: SSR compatibility may break Radix-based components that access browser APIs at render time
  - **Mitigation**: All browser API access (localStorage, matchMedia, document) must be in `useEffect` or guarded by `typeof window !== 'undefined'`. Radix primitives are generally SSR-safe. Validate early with Dialog + ThemeProvider `renderToString` test.

- **Risk**: Full web-app migration may introduce visual regressions
  - **Mitigation**: Run web-app dev server before and after migration to verify visual parity. Run existing web-app tests and E2E tests to catch regressions. Component API should be a superset of web-app's current usage.

## Success Metrics

- All 16 user stories completed with acceptance criteria checked off
- ~50+ components built with consistent patterns (including FlexGrid layout system)
- Every component has a story and a test
- **>80% test coverage** on all component source files (statements, branches, functions, lines)
- Full quality gates pass: `yarn build && yarn lint && yarn test && yarn typecheck`
- Storybook builds and renders all components with autodocs
- MDX documentation covers getting started, theming, patterns, testing, and adoption
- Component catalog organizes all components by category with Storybook links
- **web-app fully migrated** to use library components — no local UI primitives remain, visual parity preserved
- **SSR/RSC compatible** — all components render without errors via `renderToString`, proper `'use client'` directives, no hydration mismatches
- AI-assisted development framework complete: component-library-agent skill, slash commands, CLAUDE.md updates
- Every exported component/type has JSDoc with `@example` tags
- Zero TypeScript errors under strict mode
- Future developer can add a new component using `/new-component` slash command without reading the PRD
