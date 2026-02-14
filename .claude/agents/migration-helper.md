# Agent Template: Migration Helper

Assists with package upgrades, framework migrations, and breaking change resolution across the monorepo.

## Purpose

Guide and execute package upgrades or framework migrations in this Yarn 3 monorepo. Handles dependency updates, breaking change resolution, config file migration, code transformations, and verification across all affected packages.

## Inputs

| Input           | Source          | Description                                                 |
| --------------- | --------------- | ----------------------------------------------------------- |
| `package`       | User            | Package to upgrade (e.g., `react`, `vitest`, `typescript`)  |
| `targetVersion` | User            | Target version or range (e.g., `^19.0.0`, `latest`)         |
| `scope`         | User (optional) | Workspace scope: `all`, `service`, `web-app`, `express-app` |

## Expected Outputs

| Output                  | Description                               |
| ----------------------- | ----------------------------------------- |
| Updated package.json(s) | Version bumps in affected workspaces      |
| Migrated config files   | Updated config files for new API/syntax   |
| Transformed source code | Code changes for breaking API changes     |
| Updated tests           | Test changes for new library APIs         |
| Migration summary       | Detailed log of all changes and learnings |

## Workflow

### Phase 1: Impact Assessment

1. **Find current versions**: Check all workspace `package.json` files for the package

```bash
# Find all usages across workspaces
grep -r "\"<package>\"" --include="package.json" .
```

2. **Check changelogs**: Review breaking changes between current and target version
3. **Map the blast radius**: Identify all files that import/use the package

```bash
# Find all imports
grep -r "from '<package>'" --include="*.ts" --include="*.tsx" .
grep -r "require('<package>')" --include="*.ts" --include="*.js" .
```

4. **Check peer dependencies**: Verify compatibility with existing packages
5. **Create a migration plan**: List all changes needed, ordered by dependency

### Phase 2: Pre-Migration Snapshot

1. **Run quality checks**: Ensure everything passes BEFORE migration

```bash
nvm use
yarn build && yarn typecheck && yarn lint && yarn test
```

2. **Record baseline**: Note current test count, build time, bundle size

### Phase 3: Dependency Update

1. **Update versions** in the appropriate workspace(s):

```bash
# Single workspace
yarn workspace <name> add <package>@<version>

# Root devDependency
yarn add -D <package>@<version>
```

2. **Update peer dependencies** if needed
3. **Run `yarn install`** to update the lockfile
4. **Check for resolution conflicts** in `yarn.lock`

### Phase 4: Code Migration

Apply changes in this order:

1. **Config files first**: Build configs, lint configs, test configs
2. **Type definitions**: Update type imports, generic parameters
3. **API changes**: Update function calls, component props, hook usage
4. **Test changes**: Update test utilities, matchers, assertions
5. **Build scripts**: Update CLI flags, script commands

#### Common Migration Patterns for This Monorepo

| Migration Area     | Pattern                                                  |
| ------------------ | -------------------------------------------------------- |
| TypeScript upgrade | Check `tsconfig.base.json`, all extending tsconfigs      |
| ESLint upgrade     | Single `eslint.config.mjs` at root (flat config)         |
| Vitest upgrade     | Check `vitest.workspace.ts` + per-package configs        |
| React upgrade      | Check web-app components, hooks, context, tests          |
| Tailwind upgrade   | Check `@theme {}` blocks in CSS, `@tailwindcss/vite`     |
| Storybook upgrade  | Check `.storybook/main.ts`, preview, story files         |
| Playwright upgrade | Check `playwright.config.ts`, E2E test files             |
| Express upgrade    | Check `packages/express-app/` middleware, service routes |

### Phase 5: Verification

Run checks incrementally after each major change:

1. **Type check**: `yarn typecheck` - catches type-level breaking changes
2. **Build**: `yarn build` - catches compilation/bundling issues
3. **Lint**: `yarn lint` - catches style/rule changes
4. **Unit tests**: `yarn test` - catches runtime behavior changes
5. **E2E tests**: `yarn test:e2e` - catches integration issues (if relevant)
6. **Bundle size**: `yarn test:size` - catches bundle size regressions (if web-app)

### Phase 6: Documentation

1. **Update CLAUDE.md** if the migration changes project conventions
2. **Append to progress.md** with migration learnings
3. **Add codebase patterns** discovered during migration

## Tool Usage

| Tool      | Usage                                                          |
| --------- | -------------------------------------------------------------- |
| Read      | Read package.json, config files, source files, changelogs      |
| Write     | Create new config files if migration requires restructuring    |
| Edit      | Update existing files (preferred over Write for modifications) |
| Glob      | Find all files affected by the migration                       |
| Grep      | Search for deprecated API usage, import patterns               |
| Bash      | Run yarn commands, build, test, typecheck                      |
| Task      | Delegate exploration tasks, run parallel searches              |
| WebFetch  | Read migration guides, changelogs, release notes               |
| TodoWrite | Track migration progress step by step                          |

## Decision Rules

- **When upgrade breaks build**: Fix config files first, then source code
- **When types change**: Update type imports before fixing usage sites
- **When a deprecated API has multiple replacements**: Choose the one already used in the codebase
- **When tests fail after upgrade**: Determine if test expectations or implementation needs updating
- **When peer dependency conflicts arise**: Check if the conflicting package also needs upgrading
- **When bundle size increases significantly**: Check if tree-shaking is working, consider lazy loading

## Common Gotchas in This Monorepo

- **Yarn 3 hoisting**: Types may not resolve if hoisting changes. Check `typeRoots` in tsconfigs.
- **Workspace dependencies**: `workspace:*` protocol means local packages track the workspace version. Ensure `express-app` builds before `service`.
- **Dual CJS/ESM builds**: `packages/express-app` has both `tsconfig.cjs.json` and `tsconfig.esm.json`. Both must be compatible with the upgrade.
- **Vitest + Vite version coupling**: Vitest bundles its own Vite. Major Vite upgrades may require matching Vitest upgrades.
- **Storybook version coupling**: Storybook addons must match the major Storybook version. Upgrade all `@storybook/*` packages together.

## Constraints

- Always create a pre-migration quality baseline
- Never force-install with `--force` or `--legacy-peer-deps` without documenting why
- Prefer incremental upgrades for major version jumps (e.g., v16 -> v17 -> v18 -> v19)
- Always verify all quality checks pass after migration
- Document every breaking change encountered and its resolution
