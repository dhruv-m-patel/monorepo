---
name: test-writer
description: Generates Vitest tests for a given module following this monorepo's testing conventions - explicit imports, proper environment configuration, and package-specific patterns.
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - Task
---

# Test Writer

Generate comprehensive Vitest tests for any module in this monorepo. Tests follow established conventions for each package.

## Trigger Conditions

Use this skill when:

- The user asks to "write tests for", "add tests to", "test this module"
- The user asks to "increase coverage" for a file or package
- A new module is created and needs test coverage

## Instructions

### 1. Analyze the Target Module

Read the source file and understand:

- What package it belongs to (`service/`, `web-app/`, `packages/express-app/`)
- Its exports (functions, classes, components, types)
- Its dependencies and imports
- Any side effects or async behavior

### 2. Determine Test Environment

Choose the correct configuration based on the package:

| Package                 | Environment | Test Library                                            | Path Convention                                       |
| ----------------------- | ----------- | ------------------------------------------------------- | ----------------------------------------------------- |
| `service/`              | `node`      | `supertest` for routes, plain Vitest for units          | `service/tests/unit/` or `service/tests/integration/` |
| `web-app/`              | `jsdom`     | `@testing-library/react`, `@testing-library/user-event` | Co-located `*.test.tsx` next to source                |
| `packages/express-app/` | `node`      | `supertest` for middleware, plain Vitest for utils      | `packages/express-app/tests/`                         |

### 3. Test File Template

#### For Node.js modules (service, express-app)

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
// Import the module under test - use .js extension for nodenext packages
import { myFunction } from '../path/to/module.js';

describe('myFunction', () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should handle the happy path', () => {
    const result = myFunction(validInput);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle edge cases', () => {
    // ...
  });

  it('should throw on invalid input', () => {
    expect(() => myFunction(invalidInput)).toThrow();
  });
});
```

#### For React components (web-app)

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected text')).toBeInTheDocument();
  });

  it('should handle user interaction', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<MyComponent onClick={handleClick} />);

    await user.click(screen.getByRole('button', { name: 'Click me' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply correct CSS classes', () => {
    render(<MyComponent variant="primary" />);
    const element = screen.getByRole('button');
    expect(element.className).toContain('bg-primary');
  });
});
```

#### For React components with context

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { MyComponent } from './MyComponent';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>{ui}</ThemeProvider>
    </BrowserRouter>
  );
};

describe('MyComponent', () => {
  it('should render within providers', () => {
    renderWithProviders(<MyComponent />);
    // assertions...
  });
});
```

### 4. Critical Rules

- **ALWAYS** use explicit imports: `import { describe, it, expect, vi } from 'vitest'`
- **NEVER** use Jest APIs (`jest.fn()`, `jest.spyOn()`, `@types/jest`)
- **ALWAYS** use `.js` extensions in imports for `service/` and `packages/express-app/` tests
- **NEVER** use `.js` extensions in `web-app/` tests (uses `moduleResolution: "bundler"`)
- **ALWAYS** use `userEvent.setup()` pattern, NOT direct `userEvent.click()`
- **ALWAYS** use `vi.fn()` and `vi.spyOn()` for mocking
- **ALWAYS** use `vi.restoreAllMocks()` in `afterEach` if spying on anything
- **NEVER** use `done` callback pattern - use `async/await` or `return new Promise<void>()`
- For `forwardRef` components, test ref forwarding: `const ref = { current: null }; render(<Comp ref={ref} />); expect(ref.current).toBeInstanceOf(HTMLElement);`

### 5. Test Coverage Goals

Generate tests that cover:

- Happy path / default behavior
- All exported functions and components
- All variants/props (for UI components with CVA variants)
- Error handling and edge cases
- Async operations (loading, success, error states)
- User interactions (clicks, form submissions, keyboard events)
- Accessibility (using `getByRole`, `getByLabelText` queries)
- Ref forwarding (for `forwardRef` components)
- Custom className merging (for shadcn/ui style components)

### 6. After Writing Tests

Run the tests to verify they pass:

```bash
# For service
yarn workspace service run test

# For web-app
yarn workspace web-app run test

# For express-app
yarn workspace @dhruv-m-patel/express-app run test

# All packages
yarn test
```

Report test results and coverage numbers.
