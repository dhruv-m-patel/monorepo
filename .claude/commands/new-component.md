# /new-component - Scaffold a new component in the library

Create a new component in `packages/react-components/` with all supporting files following established conventions.

## Usage

```
/new-component $ARGUMENTS
```

Where `$ARGUMENTS` is the component name (e.g., `Chip`, `DatePicker`, `Stepper`).

## Instructions

Use the `component-generator` skill to scaffold the component. The skill will guide you through generating:

1. **Component file**: `packages/react-components/src/components/<Name>/<Name>.tsx`
2. **Index re-export**: `packages/react-components/src/components/<Name>/index.ts`
3. **Storybook story**: `packages/react-components/src/components/<Name>/<Name>.stories.tsx`
4. **Test file**: `packages/react-components/src/components/<Name>/<Name>.test.tsx`
5. **Barrel export**: Add export to `packages/react-components/src/index.ts`

### Key Decisions to Make

Before generating, determine:

1. **Does it wrap a Radix primitive?** If yes, install the Radix package and use the Radix wrapper pattern
2. **Does it need CVA variants?** If yes (buttons, badges, alerts), use the CVA pattern
3. **Is it purely presentational?** If yes, omit `'use client'` directive
4. **Is it a compound component?** If yes (like FlexGrid), use `Object.assign` pattern

### Post-Generation Steps

After creating all files, run these commands sequentially:

```bash
nvm use

# Run tests
yarn workspace @dhruv-m-patel/react-components run test

# Run typecheck
yarn workspace @dhruv-m-patel/react-components run typecheck

# Run lint
yarn lint
```

Report results of each step. Fix any failures before completing.

### Reference Files

When in doubt, look at these existing components as patterns:

- **CVA + Radix**: `src/components/Button/Button.tsx`
- **Radix overlay**: `src/components/Dialog/Dialog.tsx`
- **Compound component**: `src/components/FlexGrid/FlexGrid.tsx`
- **Pure presentational**: `src/components/Badge/Badge.tsx`
- **Test with composeStories**: `src/components/Button/Button.test.tsx`
- **Storybook CSF3**: `src/components/Button/Button.stories.tsx`
