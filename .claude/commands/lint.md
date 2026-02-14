# /lint - Lint and format check

Run ESLint, Prettier, and TypeScript type checking across the monorepo.

## What this does

1. Runs `nvm use` to ensure correct Node.js version
2. Runs ESLint v9 with flat config (`eslint.config.mjs`)
3. Validates OpenAPI specs with swagger-cli
4. Checks Prettier formatting
5. Runs TypeScript type checking (`tsc --noEmit`) on all packages

## Usage

```
/lint              # Run lint + typecheck
/lint fix          # Auto-fix lint and formatting issues
```

## Instructions

**Check only** (default):

```bash
nvm use && yarn lint && yarn typecheck
```

**Auto-fix** (`fix` argument):

```bash
nvm use && yarn prettier:format && eslint . --fix && yarn typecheck
```

If there are lint errors:

- ESLint uses a single root `eslint.config.mjs` (flat config format)
- React files (web-app) have `react/react-in-jsx-scope: off` for React 19
- CommonJS files need `globals.node` + `globals.commonjs`
- Test files have relaxed `@typescript-eslint/no-explicit-any`
- Use `--no-warn-ignored` flag with lint-staged

If there are type errors:

- Check `tsconfig.base.json` for shared settings
- Service/express-app use `nodenext` - requires `.js` import extensions
- Web-app uses `bundler` moduleResolution - extensionless imports OK
- `typeRoots` must point to `../node_modules/@types` for hoisted types

Report all issues found with file locations and suggested fixes.
