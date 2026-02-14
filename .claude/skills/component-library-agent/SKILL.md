---
name: component-library-agent
description: Full knowledge base for the @dhruv-m-patel/react-components library. Covers package structure, component patterns, theming, testing, and Storybook conventions. Use for adding components, debugging, or understanding the library.
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - Task
---

# Component Library Agent

Comprehensive knowledge base for developing in `packages/react-components/` — the `@dhruv-m-patel/react-components` shared component library.

## Trigger Conditions

Use this skill when:

- The user asks to add, modify, or debug a component in `packages/react-components/`
- The user asks about library conventions, patterns, or architecture
- The user wants to extend the theme, add Radix primitives, or create compound components

## Package Structure

```
packages/react-components/
├── src/
│   ├── index.ts                           # Barrel exports (ALL public API)
│   ├── setupTests.ts                      # Vitest setup (environment-aware: jsdom + node)
│   ├── lib/
│   │   └── utils.ts                       # cn() utility (clsx + tailwind-merge)
│   ├── styles/
│   │   └── theme.css                      # OKLCH design tokens (@theme {} blocks)
│   ├── theme/
│   │   ├── index.ts                       # Theme barrel
│   │   ├── types.ts                       # ThemeMode, ColorPalette, ThemeContextValue
│   │   ├── ThemeProvider.tsx              # Context provider (light/dark/system)
│   │   ├── useTheme.ts                    # useTheme() hook
│   │   └── create-theme.ts               # createTheme() palette override utility
│   └── components/
│       ├── Button/
│       │   ├── index.ts                   # Re-export from Button.tsx
│       │   ├── Button.tsx                 # Component implementation
│       │   ├── Button.test.tsx            # Tests (composeStories pattern)
│       │   └── Button.stories.tsx         # Storybook CSF3 story
│       └── ...                            # Same structure for all components
├── tests/
│   └── ssr/
│       └── ssr.test.tsx                   # SSR renderToString tests (@vitest-environment node)
├── docs/                                  # MDX documentation for Storybook
├── .storybook/
│   ├── main.ts                            # Stories glob: src/**/*.mdx, src/**/*.stories.*, docs/**/*.mdx
│   └── preview.ts                         # Theme CSS import, dark mode decorator
├── package.json                           # @dhruv-m-patel/react-components
├── tsconfig.json                          # Extends ../../tsconfig.base.json, bundler resolution
├── vitest.config.ts                       # jsdom env, @ui path alias, 80% coverage thresholds
└── tailwind.config.ts                     # Tailwind v4 config
```

### File Naming Convention

- Component directory: **PascalCase** (`Button/`, `DropdownMenu/`, `FlexGrid/`)
- Component file: **PascalCase** matching directory (`Button.tsx`)
- Index re-export: `index.ts` in each component directory
- Test file: `ComponentName.test.tsx` (co-located)
- Story file: `ComponentName.stories.tsx` (co-located)

### Path Alias

- `@ui` maps to `packages/react-components/src/` (configured in vitest.config.ts, .storybook/main.ts, tsconfig.json)
- Use `@ui/lib/utils` for the `cn()` utility
- Use `@ui/theme/types` for theme types

## Component Patterns

### Pattern 1: Simple Component with CVA Variants

Reference: `src/components/Button/Button.tsx`

```tsx
'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const componentVariants = cva('base-utility-classes', {
  variants: {
    variant: {
      default: 'default-classes',
      outline: 'outline-classes',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 px-3',
      lg: 'h-11 px-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface ComponentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof componentVariants> {}

export const Component = React.forwardRef<HTMLButtonElement, ComponentProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  )
);

Component.displayName = 'Component';
```

### Pattern 2: Radix UI Primitive Wrapper

Reference: `src/components/Dialog/Dialog.tsx`, `src/components/Tabs/Tabs.tsx`

```tsx
'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@ui/lib/utils';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className={cn('overlay-classes')} />
    <DialogPrimitive.Content
      ref={ref}
      className={cn('content-classes', className)}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;
```

**Key rules for Radix wrappers:**

- Always add `'use client'` directive (Radix uses hooks/state internally)
- Export the Radix root as-is (e.g., `const Dialog = DialogPrimitive.Root`)
- Wrap styled sub-components with `React.forwardRef`
- Set `displayName` to the Radix primitive's displayName
- Use `React.ElementRef<typeof Primitive>` for ref type
- Use `React.ComponentPropsWithoutRef<typeof Primitive>` for props type

### Pattern 3: Compound Component (Object.assign)

Reference: `src/components/FlexGrid/FlexGrid.tsx`

```tsx
import * as React from 'react';
import { cn } from '@ui/lib/utils';

const FlexGridRoot = React.forwardRef<HTMLDivElement, FlexGridProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex', className)} {...props}>
      {children}
    </div>
  )
);
FlexGridRoot.displayName = 'FlexGrid';

const FlexGridColumn = React.forwardRef<HTMLDivElement, FlexGridColumnProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex-shrink-0', className)} {...props}>
      {children}
    </div>
  )
);
FlexGridColumn.displayName = 'FlexGrid.Column';

const FlexGrid = Object.assign(FlexGridRoot, { Column: FlexGridColumn });

export { FlexGrid };
```

### Pattern 4: Pure Presentational (No 'use client')

Reference: `src/components/Badge/Badge.tsx`, `src/components/Card/Card.tsx`

Components that only use `React.forwardRef`, `cn()`, and `cva()` without any hooks, event handlers, or browser APIs do NOT need `'use client'`. These can render on the server without issues.

## 'use client' Decision Guide

Add `'use client'` when the component:

- Imports from `@radix-ui/*` (all Radix primitives use internal state)
- Imports from `cmdk` or `react-resizable-panels`
- Uses `useState`, `useEffect`, `useContext`, `useReducer`, `useCallback`, `useMemo`
- Accesses `window`, `document`, `localStorage`, or other browser APIs
- Has event handler logic beyond simple prop forwarding

Do NOT add `'use client'` when:

- The component only uses `React.forwardRef`, `cn()`, `cva()`
- It's purely presentational with no interactivity

## Theming System

### OKLCH Color Tokens

Colors are defined in `src/styles/theme.css` using Tailwind CSS v4 `@theme {}` blocks with OKLCH color space:

```css
@theme {
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.145 0 0);
  --color-primary: oklch(0.205 0 0);
  --color-primary-foreground: oklch(0.985 0 0);
  /* ... */
}

.dark {
  --color-background: oklch(0.145 0 0);
  --color-foreground: oklch(0.985 0 0);
  /* ... */
}
```

### Theme Extension with createTheme()

```tsx
import { ThemeProvider, createTheme } from '@dhruv-m-patel/react-components';

<ThemeProvider
  defaultTheme="system"
  overrides={{ primary: 'oklch(0.6 0.2 280)' }}
>
  <App />
</ThemeProvider>;
```

### ColorPalette Interface

All overridable tokens: `background`, `foreground`, `card`, `card-foreground`, `popover`, `popover-foreground`, `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `muted`, `muted-foreground`, `accent`, `accent-foreground`, `destructive`, `destructive-foreground`, `success`, `success-foreground`, `warning`, `warning-foreground`, `border`, `input`, `ring`.

## Story Format (CSF3)

Reference: `src/components/Button/Button.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta = {
  title: 'Components/ComponentName', // Category/Name format
  component: ComponentName,
  tags: ['autodocs'], // REQUIRED: enables auto-generated docs
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      description: 'Visual style variant',
    },
  },
} satisfies Meta<typeof ComponentName>; // REQUIRED: satisfies (not "as const")

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};
```

**Story title categories**: `Components/`, `Theme/`, `Layout/`, `Forms/`, `Navigation/`, `Data Display/`, `Overlay/`, `Feedback/`

## Test Format (composeStories)

Reference: `src/components/Button/Button.test.tsx`

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './ComponentName.stories';
import { ComponentName } from './ComponentName';

const composed = composeStories(stories);

describe('ComponentName', () => {
  it('renders default story', () => {
    render(<composed.Default />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  // Test each story/variant
  it('renders outline variant', () => {
    render(<composed.Outline />);
    expect(screen.getByRole('button')).toHaveClass('border');
  });

  // Direct component tests for edge cases
  it('forwards ref', () => {
    const ref = { current: null };
    render(<ComponentName ref={ref}>Test</ComponentName>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
```

**Key testing rules:**

- Always `import { describe, it, expect } from 'vitest'` — no globals
- Use `composeStories` from `@storybook/react` to test all story variants
- Use `@testing-library/react` with `screen` queries
- Use `userEvent.setup()` pattern (not direct `userEvent.click()`)
- Use `vi.fn()` for mocks (not `jest.fn()`)
- For Radix overlay components (Dialog, Sheet, etc.), test open/close via trigger click

## Dependency Decisions

### Direct Dependencies (in `dependencies`)

- `@radix-ui/*` — Each Radix primitive is a direct dependency
- `class-variance-authority` — CVA for variant management
- `clsx` — Conditional className utility
- `tailwind-merge` — Tailwind class conflict resolution
- `cmdk` — Command palette primitive
- `react-resizable-panels` — Resizable panel primitive
- `input-otp` — OTP input primitive
- `lucide-react` — Icons (used in Breadcrumb, etc.)

### Peer Dependencies

- `react` >= 18
- `react-dom` >= 18

## Templates

### New Component Template

When creating a new component, generate these files:

1. `src/components/ComponentName/ComponentName.tsx` — Implementation
2. `src/components/ComponentName/index.ts` — Re-export
3. `src/components/ComponentName/ComponentName.stories.tsx` — Storybook story
4. `src/components/ComponentName/ComponentName.test.tsx` — Tests
5. Update `src/index.ts` — Add barrel export

### index.ts Re-export Template

```ts
export { ComponentName, type ComponentNameProps } from './ComponentName';
```

## Workspace Commands

```bash
# Build the library
yarn workspace @dhruv-m-patel/react-components run build

# Run tests
yarn workspace @dhruv-m-patel/react-components run test

# Run tests with coverage
yarn workspace @dhruv-m-patel/react-components run test:ci

# Type checking
yarn workspace @dhruv-m-patel/react-components run typecheck

# All quality gates (from repo root)
yarn build && yarn test && yarn typecheck && yarn lint

# Storybook development
yarn workspace @dhruv-m-patel/react-components run storybook

# Build Storybook
yarn workspace @dhruv-m-patel/react-components run build-storybook
```

## Post-Generation Checklist

After adding a new component:

1. [ ] Component file with JSDoc `@example` tags
2. [ ] `'use client'` directive (if interactive/uses Radix)
3. [ ] `React.forwardRef` with proper ref type
4. [ ] `displayName` set
5. [ ] `cn()` used for all className merging
6. [ ] CVA variants (if applicable)
7. [ ] Props interface exported with descriptive JSDoc
8. [ ] `index.ts` re-export in component directory
9. [ ] Barrel export added to `src/index.ts`
10. [ ] Storybook story with `tags: ['autodocs']`, `satisfies Meta`, all variants
11. [ ] Tests using `composeStories` pattern
12. [ ] `yarn workspace @dhruv-m-patel/react-components run test` passes
13. [ ] `yarn workspace @dhruv-m-patel/react-components run typecheck` passes
14. [ ] `yarn lint` passes
