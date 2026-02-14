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

Scaffold a new React component in the `web-app/` package with all supporting files: component, tests, and Storybook story.

## Trigger Conditions

Use this skill when:

- The user asks to "create a component", "scaffold a component", "generate a component"
- The user asks to "add a new UI component" or "add a component to web-app"
- The user provides a component name and wants the full file setup

## Arguments

`$ARGUMENTS` should contain the component name (e.g., `Dialog`, `Input`, `Badge`).
Optionally, the user can specify:

- Component type: `ui` (reusable primitive) or `feature` (page-level composition)
- Whether it needs variants (for CVA)
- Whether it needs context/providers

## Instructions

### 1. Determine Component Location

| Type             | Directory                    | Example                  |
| ---------------- | ---------------------------- | ------------------------ |
| UI primitive     | `web-app/src/components/ui/` | `button.tsx`, `card.tsx` |
| Layout component | `web-app/src/components/`    | `Layout.tsx`             |
| Page component   | `web-app/src/pages/`         | `HomePage.tsx`           |

Default to `ui` type if not specified.

### 2. File Naming Conventions

- UI primitives: **lowercase** (`dialog.tsx`, `input.tsx`, `badge.tsx`)
- Layout/feature components: **PascalCase** (`Layout.tsx`, `SearchBar.tsx`)
- Tests: same name + `.test.tsx` (`dialog.test.tsx`, `Layout.test.tsx`)
- Stories: same name + `.stories.tsx` (`dialog.stories.tsx`, `Layout.stories.tsx`)

### 3. Generate Component File

#### UI Primitive (with CVA variants)

```tsx
import { type HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const componentNameVariants = cva(
  // Base classes
  'base-utility-classes',
  {
    variants: {
      variant: {
        default: 'default-variant-classes',
        // Add more variants as needed
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
  }
);

export interface ComponentNameProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentNameVariants> {}

const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(componentNameVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </div>
  )
);
ComponentName.displayName = 'ComponentName';

export { ComponentName, componentNameVariants };
```

#### UI Primitive (without variants - simple wrapper)

```tsx
import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ComponentNameProps extends HTMLAttributes<HTMLDivElement> {}

const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('base-utility-classes', className)} {...props}>
      {children}
    </div>
  )
);
ComponentName.displayName = 'ComponentName';

export { ComponentName };
```

### 4. Generate Test File

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from './component-name';

describe('ComponentName', () => {
  it('should render with default props', () => {
    render(<ComponentName>Content</ComponentName>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  // For components with variants:
  it('should render with each variant', () => {
    const { rerender } = render(
      <ComponentName variant="default">Test</ComponentName>
    );
    expect(screen.getByText('Test').className).toContain('default-class');

    rerender(<ComponentName variant="secondary">Test</ComponentName>);
    expect(screen.getByText('Test').className).toContain('secondary-class');
  });

  // For components with sizes:
  it('should render with each size', () => {
    const { rerender } = render(<ComponentName size="sm">Test</ComponentName>);
    expect(screen.getByText('Test').className).toContain('sm-class');

    rerender(<ComponentName size="lg">Test</ComponentName>);
    expect(screen.getByText('Test').className).toContain('lg-class');
  });

  it('should merge custom className', () => {
    render(<ComponentName className="custom-class">Test</ComponentName>);
    expect(screen.getByText('Test').className).toContain('custom-class');
  });

  it('should forward ref', () => {
    const ref = { current: null };
    render(<ComponentName ref={ref}>Test</ComponentName>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('should spread additional props', () => {
    render(<ComponentName data-testid="custom">Test</ComponentName>);
    expect(screen.getByTestId('custom')).toBeInTheDocument();
  });

  // For interactive components:
  it('should handle click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<ComponentName onClick={handleClick}>Click</ComponentName>);

    await user.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 5. Generate Storybook Story

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './component-name';

const meta = {
  title: 'UI/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // For components with variants:
    variant: {
      control: 'select',
      options: ['default', 'secondary' /* other variants */],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Component',
  },
};

// Add a story for each variant
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Variant',
  },
};

// Add a story for each meaningful size
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
};
```

### 6. Critical Conventions

- **Imports**: Use `@/` path alias for imports within web-app (e.g., `@/lib/utils`)
- **cn() utility**: ALWAYS use `cn()` from `@/lib/utils` for className merging (combines `clsx` + `tailwind-merge`)
- **forwardRef**: ALL UI primitives must use `forwardRef` for ref forwarding
- **displayName**: Set `ComponentName.displayName = 'ComponentName'` after `forwardRef`
- **Explicit children**: Destructure `children` from props and render as `{children}` - do NOT rely on `{...props}` for children (breaks `jsx-a11y/heading-has-content`)
- **Tailwind v4**: Use semantic color tokens from `@theme {}` (e.g., `bg-primary`, `text-muted-foreground`, `border-border`)
- **Dark mode**: Colors automatically switch via CSS custom properties defined in `index.css` `.dark {}` selector - no need for `dark:` prefix on most colors
- **Test imports**: Use explicit `import { describe, it, expect, vi } from 'vitest'`
- **userEvent**: Use `userEvent.setup()` pattern, NOT direct `userEvent.click()`
- **Story format**: Use CSF3 with `satisfies Meta<typeof Component>` and `StoryObj<typeof meta>`

### 7. Post-Generation Checklist

After creating all files:

1. Run tests to verify:

   ```bash
   yarn workspace web-app run test
   ```

2. Run typecheck:

   ```bash
   yarn workspace web-app run typecheck
   ```

3. Run lint:

   ```bash
   yarn lint
   ```

4. Verify Storybook builds (optional):
   ```bash
   yarn workspace web-app run build-storybook
   ```

Report which checks passed and any issues found.
