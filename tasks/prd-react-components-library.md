# PRD: @dhruv-m-patel/react-components — Full Component Library

## Overview

Build a production-grade, themeable React component library at `packages/react-components/` (npm: `@dhruv-m-patel/react-components`). The library wraps shadcn/ui patterns with Tailwind CSS v4, provides a complete suite of ~50 components, and ships a default theme using OKLCH CSS custom properties with a `ThemeProvider` that lets consumers override the entire color palette via props or CSS variables.

Every component gets a Storybook story in CSF3 format. Every test file imports its sibling stories, composes them with `composeStories()` from `@storybook/react`, renders the composed stories in jsdom, and verifies assertions — ensuring stories and tests never drift apart.

The library integrates into the existing Yarn 3 + Lerna + Turborepo monorepo alongside `service`, `web-app`, and `express-app`.

## Goals

- Provide a full component suite covering forms, feedback, navigation, data display, layout, and overlays
- Ship a default theme (light + dark) with easy one-line override via `createTheme()` utility
- Follow shadcn/ui conventions: CVA variants, `cn()` merging, `forwardRef`, CSS variable tokens
- Use Radix UI primitives only where accessibility/behavior is complex (Dialog, Popover, Select, etc.)
- Every component has a CSF3 story and a test that renders the composed story
- Package is independently publishable to npm
- Integrate with existing monorepo tooling (Turborepo, Vitest workspace, ESLint, CI)
- After completion, create a `component-library-agent` skill for future library work

## Non-Goals

- No SSR/RSC support (client components only)
- No built-in data fetching or state management beyond theming
- No complex composite patterns (DataTable, Sidebar, DatePicker are deferred to a future phase)
- No animation library dependency (CSS transitions only)
- No change to existing `web-app` components until Phase 7 (integration)

## Quality Gates

These must pass for every user story:

```bash
yarn build                    # Full monorepo build
yarn lint                     # ESLint + Prettier
yarn test                     # Vitest across all packages
yarn typecheck                # TypeScript strict mode
```

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

- [ ] `packages/react-components/package.json` created with name `@dhruv-m-patel/react-components`, React 19 as peer dep, Vite/Vitest/Storybook/Testing Library/Radix as dev deps, `class-variance-authority`, `clsx`, `tailwind-merge`, `tailwindcss` as dependencies
- [ ] `packages/react-components/tsconfig.json` extends `../../tsconfig.base.json`, uses `module: "ESNext"`, `moduleResolution: "bundler"`, `jsx: "react-jsx"`, `paths: { "@ui/*": ["./src/*"] }`
- [ ] `packages/react-components/vite.config.ts` configures Vite library mode with React + Tailwind plugins, external `react`/`react-dom`, outputs ESM to `dist/`
- [ ] `packages/react-components/vitest.config.ts` uses jsdom environment, setupFiles, coverage config, `@ui/` alias
- [ ] `packages/react-components/src/setupTests.ts` imports `@testing-library/jest-dom/vitest`, mocks `matchMedia`, cleanup afterEach
- [ ] `packages/react-components/.storybook/main.ts` configured with `@storybook/react-vite`, stories glob, `@ui/` path alias
- [ ] `packages/react-components/.storybook/preview.ts` imports theme CSS, configures dark mode decorator
- [ ] Root `vitest.workspace.ts` updated to include `packages/react-components/vitest.config.ts`
- [ ] Root `eslint.config.mjs` updated with config block for `packages/react-components/`
- [ ] Root `package.json` workspaces already covers `packages/*` (verify, no change needed)
- [ ] `packages/react-components/src/lib/utils.ts` exports `cn()` utility
- [ ] `packages/react-components/src/index.ts` barrel export file created (initially empty, grows per phase)
- [ ] `yarn install` succeeds with new package linked
- [ ] `yarn build` passes
- [ ] `yarn lint` passes
- [ ] `yarn typecheck` passes

**Notes**: Use Vite library mode (not dual CJS/ESM like express-app) since this is a React library consumed only via bundlers. Path alias is `@ui/` (not `@/`) to avoid collision with web-app.

---

### US-002: Build theme engine with ThemeProvider and createTheme

As a developer, I want a theme engine with CSS variables, a ThemeProvider, and a createTheme utility so that consumers can use the default theme or override it with a custom color palette.

**Priority**: 1 (Critical — all components depend on theme tokens)

**Dependencies**: US-001

**Acceptance Criteria**:

- [ ] `src/styles/theme.css` defines full OKLCH color token set in `@theme {}` block: background, foreground, card, popover, primary, secondary, muted, accent, destructive, border, input, ring (each with `-foreground` counterpart), plus radius-sm/md/lg/xl, font-sans
- [ ] `.dark` selector overrides all color tokens for dark mode
- [ ] `src/theme/types.ts` exports `ThemeConfig` type (theme mode + overrides), `ColorPalette` type (all token names as optional string fields)
- [ ] `src/theme/ThemeProvider.tsx` accepts `defaultTheme?: 'light' | 'dark' | 'system'`, `overrides?: Partial<ColorPalette>`, persists to localStorage, toggles `.dark` class, injects CSS variable overrides as inline styles
- [ ] `src/theme/useTheme.ts` exports `useTheme()` hook returning `{ theme, setTheme, toggleTheme }`
- [ ] `src/theme/create-theme.ts` exports `createTheme(palette: Partial<ColorPalette>): Record<string, string>` that maps palette keys to CSS variable names (e.g., `{ primary: 'oklch(...)' }` → `{ '--color-primary': 'oklch(...)' }`)
- [ ] ThemeProvider story demonstrates light/dark toggle and custom override
- [ ] ThemeProvider test verifies: default theme applied, toggle works, custom overrides injected as CSS vars, system preference detection
- [ ] `src/index.ts` exports ThemeProvider, useTheme, createTheme, and all theme types
- [ ] `yarn build` passes
- [ ] `yarn test` passes
- [ ] `yarn typecheck` passes

**Notes**: The theme CSS is the foundation. Components reference tokens like `bg-primary`, `text-muted-foreground` etc. The `createTheme` utility is the primary consumer API for customization — keep it simple (object in, CSS var map out).

---

### US-003: Build foundation components — Button, Badge, Input, Label, Textarea

As a developer, I want foundational form and display primitives so that consumers have the basic building blocks for any UI.

**Priority**: 2 (High — core components used everywhere)

**Dependencies**: US-002

**Acceptance Criteria**:

- [ ] **Button**: 6 variants (default, destructive, outline, secondary, ghost, link), 4 sizes (default, sm, lg, icon), loading state with inline spinner, `asChild` support via Radix Slot, disabled styling. CVA-based.
- [ ] **Badge**: 4 variants (default, secondary, destructive, outline). Simple span with CVA.
- [ ] **Input**: Standard text input with `type` support, error state (red border + aria-invalid), disabled state, className merge. Uses forwardRef on `<input>`.
- [ ] **Label**: Accessible `<label>` element, peer-disabled styling, htmlFor binding. Based on `@radix-ui/react-label`.
- [ ] **Textarea**: Multi-line input, rows prop, error state, disabled state, auto-resize option via CSS.
- [ ] Each component in `src/components/{name}/` with `{name}.tsx`, `{name}.stories.tsx`, `{name}.test.tsx`, `index.ts`
- [ ] Stories use CSF3 format with `satisfies Meta`, `tags: ['autodocs']`, argTypes for all variants/sizes
- [ ] Tests import stories via `composeStories()` from `@storybook/react`, render each composed story, assert it renders without error, verify key variant classes, verify accessibility attributes
- [ ] All components exported from `src/index.ts`
- [ ] `yarn build` passes
- [ ] `yarn test` passes (all new tests green)
- [ ] `yarn typecheck` passes
- [ ] `yarn lint` passes

**Notes**: Button is the most complex. Use `@radix-ui/react-slot` for `asChild` pattern. Input/Textarea share error state pattern (border-destructive + aria-invalid). Tests should use `composeStories` to render the Default story then assert, render each variant story and assert class presence.

---

### US-004: Build foundation components — Separator, Skeleton, Avatar, Spinner, Typography

As a developer, I want additional display primitives for loading states, content structure, and visual separation.

**Priority**: 2

**Dependencies**: US-002

**Acceptance Criteria**:

- [ ] **Separator**: Horizontal/vertical orientations using `@radix-ui/react-separator`, decorative prop, themed border color
- [ ] **Skeleton**: Animated pulse placeholder, supports `className` for custom width/height/rounded
- [ ] **Avatar**: Image with fallback (initials or icon), 3 sizes (sm, default, lg), uses `@radix-ui/react-avatar` for image loading states
- [ ] **Spinner**: CSS-only animated loading indicator, 3 sizes (sm, default, lg), inherits text color, `aria-label="Loading"`
- [ ] **Typography**: Semantic prose helpers — `H1`, `H2`, `H3`, `H4`, `P`, `Lead`, `Large`, `Small`, `Muted`, `InlineCode`, `Blockquote`. Each renders the appropriate HTML element with pre-styled Tailwind classes and accepts `className` override.
- [ ] Each component in `src/components/{name}/` directory with full file set
- [ ] CSF3 stories with autodocs for each
- [ ] Tests use `composeStories()` pattern
- [ ] All components exported from `src/index.ts`
- [ ] `yarn build` passes
- [ ] `yarn test` passes
- [ ] `yarn typecheck` passes

**Notes**: Typography components are simple — no CVA needed, just styled HTML elements with className merge. Skeleton is a single div with `animate-pulse`. Spinner uses CSS `@keyframes` or Tailwind's `animate-spin`.

---

### US-005: Build feedback components — Alert, Progress, Toast

As a developer, I want feedback components for user notifications and status indication.

**Priority**: 2

**Dependencies**: US-002

**Acceptance Criteria**:

- [ ] **Alert**: 2 variants (default, destructive), icon slot, `AlertTitle` + `AlertDescription` sub-components, `role="alert"` for accessibility
- [ ] **Progress**: Determinate progress bar (0-100), animated fill transition, uses `@radix-ui/react-progress`, `aria-valuenow`/`aria-valuemax`
- [ ] **Toast**: Toast notification system — `ToastProvider` context, `useToast()` hook returning `{ toast, dismiss, toasts }`, auto-dismiss with configurable duration, variants (default, destructive, success), stacking, `Toast` + `ToastTitle` + `ToastDescription` + `ToastClose` + `ToastAction` sub-components, `Toaster` render component
- [ ] Each with full file set (component, stories, tests, index)
- [ ] Toast story demonstrates programmatic toast via `useToast` hook with play function
- [ ] Tests use `composeStories()` pattern; Toast tests verify toast appears and auto-dismisses
- [ ] All exported from `src/index.ts`
- [ ] `yarn build` passes
- [ ] `yarn test` passes
- [ ] `yarn typecheck` passes

**Notes**: Toast is the most complex here — needs a provider/context pattern. Consider a simple custom implementation using React state + portal rather than pulling in Sonner, to keep the library dependency-light.

---

### US-006: Build overlay components — Dialog, Sheet, Tooltip, Popover, HoverCard

As a developer, I want overlay/floating components for modals, slide-in panels, and contextual information.

**Priority**: 2

**Dependencies**: US-002

**Acceptance Criteria**:

- [ ] **Dialog**: Modal overlay using `@radix-ui/react-dialog` — `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`. Animated open/close with CSS transitions. Focus trap, escape-to-close, overlay click-to-close.
- [ ] **Sheet**: Slide-in panel built on `@radix-ui/react-dialog` — `Sheet`, `SheetTrigger`, `SheetContent` (side: top/right/bottom/left), `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter`, `SheetClose`. CSS translate animations.
- [ ] **Tooltip**: Hover/focus tooltip using `@radix-ui/react-tooltip` — `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent`. Configurable delay, side, align.
- [ ] **Popover**: Click-triggered floating content using `@radix-ui/react-popover` — `Popover`, `PopoverTrigger`, `PopoverContent`. Configurable side, align.
- [ ] **HoverCard**: Hover-triggered preview card using `@radix-ui/react-hover-card` — `HoverCard`, `HoverCardTrigger`, `HoverCardContent`.
- [ ] Each with full file set (component, stories, tests, index)
- [ ] Stories demonstrate open/close interaction with play functions where applicable
- [ ] Tests use `composeStories()` pattern; overlay tests verify content visibility toggling
- [ ] All exported from `src/index.ts`
- [ ] `yarn build` passes
- [ ] `yarn test` passes
- [ ] `yarn typecheck` passes

**Notes**: All overlay components use Radix primitives for proper accessibility (focus management, aria attributes, keyboard interactions). Sheet is essentially Dialog with directional slide animations. Tooltip needs a TooltipProvider wrapper at the app root.

---

### US-007: Build form components — Checkbox, RadioGroup, Switch, Select

As a developer, I want form control components for building complete forms with proper accessibility.

**Priority**: 2

**Dependencies**: US-003 (uses Label)

**Acceptance Criteria**:

- [ ] **Checkbox**: Using `@radix-ui/react-checkbox` — controlled/uncontrolled, indeterminate state, check icon animation, disabled styling, pairs with Label
- [ ] **RadioGroup**: Using `@radix-ui/react-radio-group` — `RadioGroup` + `RadioGroupItem`, vertical/horizontal layout, disabled items, pairs with Label
- [ ] **Switch**: Using `@radix-ui/react-switch` — toggle switch with thumb animation, 2 sizes (default, sm), disabled state, pairs with Label
- [ ] **Select**: Using `@radix-ui/react-select` — `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`, `SelectSeparator`. Scrollable content, disabled items, placeholder.
- [ ] Each with full file set
- [ ] Stories include form composition examples (checkbox with label, radio group with options)
- [ ] Tests use `composeStories()` pattern; form tests verify checked/selected state changes
- [ ] All exported from `src/index.ts`
- [ ] `yarn build` passes
- [ ] `yarn test` passes
- [ ] `yarn typecheck` passes

**Notes**: All form components use Radix primitives for proper keyboard navigation and ARIA. Select is the most complex — has many sub-components and scroll behavior.

---

### US-008: Build form components — Slider, Toggle, ToggleGroup, InputOTP

As a developer, I want additional form controls for specialized input scenarios.

**Priority**: 3

**Dependencies**: US-002

**Acceptance Criteria**:

- [ ] **Slider**: Using `@radix-ui/react-slider` — range slider, min/max/step, single value, disabled state, themed track/thumb colors
- [ ] **Toggle**: Using `@radix-ui/react-toggle` — pressed/unpressed state, 2 variants (default, outline), 3 sizes (default, sm, lg), disabled
- [ ] **ToggleGroup**: Using `@radix-ui/react-toggle-group` — single/multiple selection, shares Toggle variants/sizes
- [ ] **InputOTP**: Segmented OTP input — `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator`. Configurable length, pattern validation, auto-advance.
- [ ] Each with full file set
- [ ] Tests use `composeStories()` pattern
- [ ] All exported from `src/index.ts`
- [ ] `yarn build` passes
- [ ] `yarn test` passes
- [ ] `yarn typecheck` passes

**Notes**: InputOTP can be built with a custom implementation using hidden input + visual slots pattern (no external dep needed). Slider/Toggle/ToggleGroup use Radix.

---

### US-009: Build navigation components — Tabs, Accordion, Collapsible, Breadcrumb, Pagination

As a developer, I want navigation and content organization components.

**Priority**: 2

**Dependencies**: US-002

**Acceptance Criteria**:

- [ ] **Tabs**: Using `@radix-ui/react-tabs` — `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`. Horizontal layout, active indicator styling, disabled tabs.
- [ ] **Accordion**: Using `@radix-ui/react-accordion` — `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`. Single/multiple open modes, animated expand/collapse with CSS, chevron rotation.
- [ ] **Collapsible**: Using `@radix-ui/react-collapsible` — `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`. Simple open/close with animation.
- [ ] **Breadcrumb**: `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`. Semantic `<nav aria-label="breadcrumb">` + `<ol>`.
- [ ] **Pagination**: `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationPrevious`, `PaginationNext`, `PaginationLink`, `PaginationEllipsis`. Uses button/link variants.
- [ ] Each with full file set
- [ ] Tests use `composeStories()` pattern
- [ ] All exported from `src/index.ts`
- [ ] `yarn build` passes
- [ ] `yarn test` passes
- [ ] `yarn typecheck` passes

**Notes**: Breadcrumb and Pagination are pure HTML/CSS components (no Radix needed). Accordion animation uses `grid-template-rows: 0fr` → `1fr` trick or Radix's built-in animation support.

---

### US-010: Build layout components — Card, AspectRatio, ScrollArea, Resizable

As a developer, I want layout and container components for content structure.

**Priority**: 2

**Dependencies**: US-002

**Acceptance Criteria**:

- [ ] **Card**: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`. Styled container with border, shadow, rounded corners. All sub-components use forwardRef + cn().
- [ ] **AspectRatio**: Using `@radix-ui/react-aspect-ratio` — maintains width:height ratio for media content.
- [ ] **ScrollArea**: Using `@radix-ui/react-scroll-area` — `ScrollArea`, `ScrollBar`. Custom-styled scrollbar, horizontal/vertical, auto-hide.
- [ ] **Resizable**: `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle`. Draggable resize handle between panels, horizontal/vertical directions. Uses `react-resizable-panels` library.
- [ ] Each with full file set
- [ ] Tests use `composeStories()` pattern
- [ ] All exported from `src/index.ts`
- [ ] `yarn build` passes
- [ ] `yarn test` passes
- [ ] `yarn typecheck` passes

**Notes**: Card is pure HTML/CSS. Resizable needs `react-resizable-panels` as a dependency — evaluate if this should be a peer dep or direct dep.

---

### US-011: Build menu components — DropdownMenu, ContextMenu, Menubar

As a developer, I want menu components for actions, context menus, and application menubars.

**Priority**: 3

**Dependencies**: US-002

**Acceptance Criteria**:

- [ ] **DropdownMenu**: Using `@radix-ui/react-dropdown-menu` — `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuGroup`, `DropdownMenuSub`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent`.
- [ ] **ContextMenu**: Using `@radix-ui/react-context-menu` — mirrors DropdownMenu API surface with `ContextMenu*` prefix. Triggered by right-click.
- [ ] **Menubar**: Using `@radix-ui/react-menubar` — `Menubar`, `MenubarMenu`, `MenubarTrigger`, `MenubarContent`, `MenubarItem`, `MenubarSeparator`, `MenubarShortcut`, `MenubarCheckboxItem`, `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarSub`, `MenubarSubTrigger`, `MenubarSubContent`.
- [ ] Each with full file set
- [ ] Stories demonstrate nested sub-menus, checkbox items, radio groups, keyboard shortcuts
- [ ] Tests use `composeStories()` pattern
- [ ] All exported from `src/index.ts`
- [ ] `yarn build` passes
- [ ] `yarn test` passes
- [ ] `yarn typecheck` passes

**Notes**: These three share very similar patterns — build DropdownMenu first, then derive ContextMenu and Menubar from it. Each has ~12-15 sub-components but they follow identical patterns.

---

### US-012: Build data display — Table, Command

As a developer, I want data display components for tabular data and command palettes.

**Priority**: 3

**Dependencies**: US-002

**Acceptance Criteria**:

- [ ] **Table**: `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`, `TableCell`, `TableCaption`. Semantic HTML table elements with Tailwind styling, responsive overflow handling, striped rows option.
- [ ] **Command**: Using `cmdk` library — `Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandShortcut`, `CommandSeparator`. Keyboard-navigable command palette / searchable list.
- [ ] Each with full file set
- [ ] Table story demonstrates a realistic data table with headers, rows, and footer
- [ ] Command story demonstrates searchable command palette with grouped items
- [ ] Tests use `composeStories()` pattern
- [ ] All exported from `src/index.ts`
- [ ] `yarn build` passes
- [ ] `yarn test` passes
- [ ] `yarn typecheck` passes

**Notes**: Table is pure HTML/CSS. Command needs `cmdk` as a dependency. Command is one of shadcn/ui's most popular components — used for search, command palettes, and comboboxes.

---

### US-013: Barrel exports, web-app integration, and full verification

As a developer, I want the library fully exported, integrated into web-app as a proof-of-concept, and all quality gates passing.

**Priority**: 2

**Dependencies**: US-003 through US-012

**Acceptance Criteria**:

- [ ] `src/index.ts` exports ALL components, theme provider, hooks, types, and utilities
- [ ] Package builds successfully with Vite library mode (ESM output in `dist/`)
- [ ] `web-app/package.json` adds `@dhruv-m-patel/react-components: "workspace:*"` as dependency
- [ ] `web-app` imports `Button` and `Card` from `@dhruv-m-patel/react-components` in at least one page to prove integration works (does NOT need to replace all existing components — proof of concept only)
- [ ] `packages/react-components` Storybook builds: `yarn workspace @dhruv-m-patel/react-components run build-storybook`
- [ ] All tests pass: `yarn test`
- [ ] Full build passes: `yarn build`
- [ ] Typecheck passes: `yarn typecheck`
- [ ] Lint passes: `yarn lint`
- [ ] No circular dependencies in the barrel export
- [ ] Package `exports` field in `package.json` correctly maps to built artifacts

**Notes**: Integration is intentionally light — just prove the workspace link works and components render. Full migration of web-app to use the library is out of scope for this PRD.

---

### US-014: Build component-library-agent skill

As a developer, I want a Claude skill specialized for working with the `@dhruv-m-patel/react-components` package so that future component work follows established patterns automatically.

**Priority**: 3

**Dependencies**: US-013

**Acceptance Criteria**:

- [ ] `.claude/skills/component-library-agent/SKILL.md` created
- [ ] Skill documents: package structure, file naming conventions, component patterns (forwardRef, CVA, cn()), theming tokens, story format (CSF3 + composeStories test pattern), Radix usage guidelines
- [ ] Skill includes templates for: new component, new story, new test (with composeStories)
- [ ] Skill includes post-generation checklist with correct workspace commands
- [ ] Skill references actual files in `packages/react-components/` as examples
- [ ] Skill covers theme extension patterns (createTheme, ThemeProvider overrides)
- [ ] Skill covers Radix UI integration patterns (when to use, how to wrap)
- [ ] Skill covers dependency decisions (direct dep vs peer dep for Radix packages)
- [ ] `yarn lint` passes (skill file is markdown, no lint impact — verify no regressions)

**Notes**: This skill is a knowledge capture artifact. It should encode everything learned during this PRD execution so a future agent can add components without re-discovering conventions. Structure it like the existing `component-generator` skill but scoped to the `react-components` package.

---

## Execution Order

Respecting dependencies and maximizing parallelism:

```
Phase 1 (sequential):
  └── US-001: Package scaffold

Phase 2 (sequential, after Phase 1):
  └── US-002: Theme engine

Phase 3 (parallel, after Phase 2):
  ├── US-003: Button, Badge, Input, Label, Textarea
  ├── US-004: Separator, Skeleton, Avatar, Spinner, Typography
  └── US-005: Alert, Progress, Toast

Phase 4 (parallel, after Phase 3 — US-003 for Label dep):
  ├── US-006: Dialog, Sheet, Tooltip, Popover, HoverCard
  ├── US-007: Checkbox, RadioGroup, Switch, Select
  └── US-008: Slider, Toggle, ToggleGroup, InputOTP

Phase 5 (parallel, after Phase 2):
  ├── US-009: Tabs, Accordion, Collapsible, Breadcrumb, Pagination
  ├── US-010: Card, AspectRatio, ScrollArea, Resizable
  ├── US-011: DropdownMenu, ContextMenu, Menubar
  └── US-012: Table, Command

Phase 6 (sequential, after all above):
  └── US-013: Barrel exports, integration, verification

Phase 7 (sequential, after Phase 6):
  └── US-014: Component library agent skill
```

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
| US-010 | `feat(react-components): add Card, AspectRatio, ScrollArea, Resizable` |
| US-011 | `feat(react-components): add DropdownMenu, ContextMenu, Menubar` |
| US-012 | `feat(react-components): add Table, Command` |
| US-013 | `feat(react-components): barrel exports, web-app integration, verification` |
| US-014 | `feat(ai-framework): add component-library-agent skill` |

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

## Success Metrics

- All 14 user stories completed with acceptance criteria checked off
- ~50 components built with consistent patterns
- Every component has a story and a test
- Full quality gates pass: `yarn build && yarn lint && yarn test && yarn typecheck`
- Storybook builds and renders all components
- web-app successfully imports from the library
- component-library-agent skill captures all patterns for future use
- Zero TypeScript errors under strict mode
