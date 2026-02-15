# @dhruv-m-patel/react-components

A production-grade, themeable React component library built with **shadcn/ui** patterns, **Tailwind CSS v4**, and **Radix UI** primitives. Documented with **Storybook v8**.

## Tech Stack

- **React 19** with TypeScript
- **Tailwind CSS v4** with OKLCH theme system
- **Radix UI** headless primitives for accessibility
- **Class Variance Authority (CVA)** for component variants
- **Storybook v8** for documentation and visual testing
- **Vitest** + **@testing-library/react** for unit tests

## Components

### Foundation
- **Button** - Primary, secondary, destructive, outline, ghost, link variants with sizes
- **Badge** - Status indicators with variant styles
- **Avatar** - User avatars with image and fallback support
- **Separator** - Visual dividers (horizontal/vertical)
- **Skeleton** - Loading placeholder animations

### Form
- **Input** - Text input with validation states
- **Textarea** - Multi-line text input
- **Checkbox** - Toggle control with label support
- **Switch** - On/off toggle
- **Select** - Dropdown selection (Radix-based)
- **Slider** - Range input control
- **Label** - Form field labels

### Display
- **Card** - Content container with header, content, footer sections
- **Alert** - Contextual feedback messages (default, destructive)
- **Progress** - Determinate progress indicator
- **Accordion** - Collapsible content sections

### Overlay
- **Dialog** - Modal dialogs
- **AlertDialog** - Confirmation dialogs
- **Sheet** - Slide-out panel
- **Tooltip** - Hover information
- **Popover** - Click-triggered floating content
- **HoverCard** - Rich hover previews
- **Toast / Sonner** - Notification system

### Navigation
- **Tabs** - Tabbed content navigation
- **Breadcrumb** - Page hierarchy navigation
- **NavigationMenu** - Site navigation
- **Pagination** - Page navigation controls
- **Command** - Command palette (cmdk-based)

### Layout
- **FlexGrid** - 12-column responsive flex grid with gutter pattern
- **ResizablePanelGroup** - Draggable split panels
- **ScrollArea** - Custom scrollbar container
- **AspectRatio** - Fixed aspect ratio container
- **Collapsible** - Toggle content visibility

### Data Display
- **Table** - Data tables with header, body, footer
- **DataTable** - Feature-rich table with sorting, filtering, pagination (TanStack Table)

## Installation

This package is used as a workspace dependency within the monorepo:

```json
{
  "dependencies": {
    "@dhruv-m-patel/react-components": "workspace:*"
  }
}
```

## Usage

```tsx
import { Button, Card, FlexGrid } from '@dhruv-m-patel/react-components';

function MyPage() {
  return (
    <FlexGrid gap="4">
      <FlexGrid.Column xs={12} md={6}>
        <Card>
          <Card.Header>
            <Card.Title>Hello</Card.Title>
          </Card.Header>
          <Card.Content>
            <Button variant="primary">Click me</Button>
          </Card.Content>
        </Card>
      </FlexGrid.Column>
    </FlexGrid>
  );
}
```

## Theming

The library uses an **OKLCH color space** theme system defined in CSS:

- **Light and dark modes** via `.dark` class on root element
- **CSS custom properties** for all colors (primary, secondary, muted, destructive, etc.)
- **Tailwind CSS v4** `@theme {}` blocks for theme configuration
- See `src/styles/theme.css` for the full theme definition

## Development

```bash
# From monorepo root
yarn storybook                        # Start Storybook dev server
yarn workspace @dhruv-m-patel/react-components run test    # Run tests
yarn workspace @dhruv-m-patel/react-components run build   # Build library
```

## Scripts

| Command | Description |
|---------|-------------|
| `yarn build` | Build library with Vite (ESM) + generate TypeScript declarations |
| `yarn test` | Run Vitest unit tests |
| `yarn typecheck` | TypeScript type checking |
| `yarn lint` | ESLint with flat config |
| `yarn storybook` | Start Storybook dev server (port 6006) |
| `yarn build-storybook` | Build static Storybook site |

## Storybook Documentation

Storybook includes:
- **Component stories** with interactive controls and source code
- **Component Catalog** - overview of all available components organized by category
- **Getting Started** guide for new users
- **Theming** documentation for OKLCH color system
- **Component Patterns** guide covering CVA variants, Radix UI, and compound components
- **Testing** guide with composeStories patterns
- **Adoption Guide** for migrating existing React apps
