---
name: component-generator
description: Scaffolds a new React component in web-app with shadcn/ui patterns, Tailwind CSS v4 styling, Vitest tests, and Storybook stories. Follows established conventions for this monorepo.
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - Task
---

# Component Generator

Scaffold a new React component with all supporting files: component, tests, and Storybook story.

## Trigger Conditions

Use this skill when:

- The user asks to "create a component", "scaffold a component", "generate a component"
- The user asks to "add a new UI component"
- The user provides a component name and wants the full file setup

## Arguments

`$ARGUMENTS` should contain the component name (e.g., `Dialog`, `Input`, `Badge`).
Optionally, the user can specify:

- Target package: `library` (default) or `web-app`
- Component type: `ui` (reusable primitive) or `feature` (page-level composition)
- Whether it needs variants (for CVA)
- Whether it wraps a Radix primitive

## Instructions

### 1. Determine Component Location

**For the component library** (default — shared, reusable components):

| Target  | Directory                                          | Example             |
| ------- | -------------------------------------------------- | ------------------- |
| Library | `packages/react-components/src/components/<Name>/` | `Button/Button.tsx` |

**For web-app only** (app-specific, non-reusable):

| Type             | Directory                 | Example        |
| ---------------- | ------------------------- | -------------- |
| Layout component | `web-app/src/components/` | `Layout.tsx`   |
| Page component   | `web-app/src/pages/`      | `HomePage.tsx` |

Default to the **library** package if not specified. New reusable UI primitives should always go in the library.

### 2. File Naming Conventions (Library)

- Component directory: **PascalCase** (`Button/`, `DropdownMenu/`)
- Component file: **PascalCase** matching directory (`Button.tsx`)
- Index re-export: `index.ts` per component directory
- Test: `ComponentName.test.tsx` (co-located)
- Story: `ComponentName.stories.tsx` (co-located)

### 3. Generate Component File (Library)

#### With CVA Variants

````tsx
'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const componentNameVariants = cva('base-utility-classes', {
  variants: {
    variant: {
      default: 'default-variant-classes',
    },
    size: {
      default: 'default-size-classes',
      sm: 'small-size-classes',
      lg: 'large-size-classes',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

/**
 * ComponentName component props
 *
 * @example
 * ```tsx
 * <ComponentName variant="default" size="sm">Content</ComponentName>
 * ```
 */
export interface ComponentNameProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentNameVariants> {}

export const ComponentName = React.forwardRef<
  HTMLDivElement,
  ComponentNameProps
>(({ className, variant, size, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(componentNameVariants({ variant, size, className }))}
    {...props}
  >
    {children}
  </div>
));

ComponentName.displayName = 'ComponentName';
````

#### Radix UI Primitive Wrapper

```tsx
'use client';

import * as React from 'react';
import * as PrimitiveName from '@radix-ui/react-primitive-name';
import { cn } from '@ui/lib/utils';

const ComponentRoot = PrimitiveName.Root;

const ComponentContent = React.forwardRef<
  React.ElementRef<typeof PrimitiveName.Content>,
  React.ComponentPropsWithoutRef<typeof PrimitiveName.Content>
>(({ className, children, ...props }, ref) => (
  <PrimitiveName.Content
    ref={ref}
    className={cn('tailwind-classes', className)}
    {...props}
  >
    {children}
  </PrimitiveName.Content>
));
ComponentContent.displayName = PrimitiveName.Content.displayName;

export { ComponentRoot as Component, ComponentContent };
```

#### Pure Presentational (no 'use client')

```tsx
import * as React from 'react';
import { cn } from '@ui/lib/utils';

export interface ComponentNameProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const ComponentName = React.forwardRef<
  HTMLDivElement,
  ComponentNameProps
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('base-classes', className)} {...props}>
    {children}
  </div>
));

ComponentName.displayName = 'ComponentName';
```

### 4. Generate Index Re-export

```ts
export { ComponentName, type ComponentNameProps } from './ComponentName';
```

### 5. Generate Test File

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
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<ComponentName ref={ref}>Test</ComponentName>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('merges custom className', () => {
    render(<ComponentName className="custom">Test</ComponentName>);
    expect(screen.getByText('Test')).toHaveClass('custom');
  });
});
```

### 6. Generate Storybook Story

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default'],
      description: 'Visual style variant',
    },
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};
```

### 7. Update Barrel Export

Add to `packages/react-components/src/index.ts`:

```ts
export {
  ComponentName,
  type ComponentNameProps,
} from './components/ComponentName';
```

### 8. Critical Conventions

- **Path alias**: Use `@ui/` for library imports (e.g., `@ui/lib/utils`), `@/` for web-app imports
- **cn() utility**: ALWAYS use `cn()` for className merging
- **forwardRef**: ALL components must use `React.forwardRef`
- **displayName**: ALWAYS set after `forwardRef`
- **Explicit children**: Destructure `children` from props and render as `{children}`
- **JSDoc**: Add `@example` tags to all props interfaces
- **'use client'**: Add for any component using Radix, hooks, or browser APIs
- **Tailwind v4**: Use semantic tokens (`bg-primary`, `text-muted-foreground`)
- **Test imports**: Explicit `import { describe, it, expect } from 'vitest'`
- **Story format**: CSF3 with `satisfies Meta<typeof Component>`, `tags: ['autodocs']`
- **composeStories**: Use in tests to validate all story variants render correctly

### 9. Post-Generation Checklist

After creating all files:

1. Run tests:

   ```bash
   yarn workspace @dhruv-m-patel/react-components run test
   ```

2. Run typecheck:

   ```bash
   yarn workspace @dhruv-m-patel/react-components run typecheck
   ```

3. Run lint:

   ```bash
   yarn lint
   ```

4. Verify Storybook builds (optional):
   ```bash
   yarn workspace @dhruv-m-patel/react-components run build-storybook
   ```

Report which checks passed and any issues found.
