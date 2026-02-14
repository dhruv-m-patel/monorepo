# Ralph Progress Log

This file tracks progress across iterations. Agents update this file
after each iteration and it's included in prompts for context.

## Codebase Patterns (Study These First)

- **nodenext + Jest**: When using `module: "nodenext"` with `.js` extensions in imports, Jest/ts-jest needs `moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1' }` to resolve `.js` back to `.ts` files.
- **Webpack 4 + ES2022 target**: Webpack 4's parser (acorn 6.x) only supports up to ES2019 syntax. Use a separate `tsconfig.webpack.json` with `target: "ES2017"` and configure ts-loader's `configFile` option. Also need `NODE_OPTIONS=--openssl-legacy-provider` for the MD4 hash issue.
- **Hoisted types in Yarn workspaces**: With `node-modules` linker, `@types/*` packages are hoisted to root `node_modules/@types`. Package tsconfig `typeRoots` must point to `../node_modules/@types` (relative to package dir) to find them.
- **express-openapi-validator v5**: Expects `apiSpec` to be a file path or parsed object, NOT a YAML string content. Passing file content as string causes "spec could not be read" errors.
- **ESLint v9 flat config in monorepos**: Use a single root `eslint.config.mjs` with file-pattern-based config objects instead of per-package `.eslintrc` files. CommonJS config files (jest.config.js, etc.) need `globals.node` + `globals.commonjs` to avoid `no-undef` errors for `module`, `require`, `__dirname`.
- **ESLint v9 + lint-staged**: In lint-staged, use `eslint --no-warn-ignored` flag and match only lintable file extensions (`**/*.{ts,tsx,js,mjs}`) instead of running `eslint .` on all files.
- **Vitest + nodenext**: Vitest natively handles `.js` -> `.ts` module resolution via Vite, unlike Jest/ts-jest which needs `moduleNameMapper`. Use explicit imports (`import { describe, it, expect } from 'vitest'`) instead of globals for cleaner type safety.
- **tsx watch for dev mode**: `tsx watch --clear-screen=false -r dotenv/config src/index.ts` replaces nodemon + ts-node with zero config (no nodemon.json needed).

---

## 2026-02-13 - US-002
- What was implemented:
  - Updated .nvmrc from 14.17.0 to 22.13.1 (Node 22 LTS)
  - Updated engines field to `>= 22` in root and express-app package.json
  - Upgraded TypeScript from 4.3.4 to ^5.7.3 (resolved to 5.9.3) across all packages
  - Upgraded @types/node to ^22.13.0 in root and web-app
  - Created shared `tsconfig.base.json` at root with modern options (target: ES2022, module: nodenext, moduleResolution: nodenext)
  - Updated all package tsconfigs to extend from tsconfig.base.json
  - Added `.js` extensions to all relative imports in service/ and packages/express-app/ for nodenext compatibility
  - Created `tsconfig.webpack.json` for web-app's Webpack 4 build (targets ES2017)
  - Updated webpack.config.js to use tsconfig.webpack.json via ts-loader configFile option
  - Added `typecheck` script (`tsc --noEmit`) to root and all 3 packages
  - Upgraded service Jest from 27.x to 29.x (27.x incompatible with Node 22)
  - Upgraded service @types/jest, @types/supertest, ts-jest to match
  - Added `moduleNameMapper` to Jest configs for .js -> .ts resolution
  - Fixed express-openapi-validator v5 bug (was passing YAML string instead of file path)
  - Added .ralph-tui, .turbo, tasks to .prettierignore
- Files changed:
  - `.nvmrc` - Node version
  - `package.json` - engines, typescript, @types/node, typecheck script
  - `tsconfig.base.json` (new) - shared base config
  - `tsconfig.json` - extends base
  - `service/package.json` - typescript, jest upgrades, typecheck script
  - `service/tsconfig.json` - extends base, nodenext
  - `service/jest.config.js` - moduleNameMapper, transform
  - `service/src/index.ts` - .js import extension
  - `service/src/app.ts` - .js import extensions
  - `packages/express-app/package.json` - engines, typecheck script
  - `packages/express-app/tsconfig.json` - extends base
  - `packages/express-app/tsconfig.cjs.json` - extends base, commonjs override
  - `packages/express-app/tsconfig.esm.json` - extends base, nodenext
  - `packages/express-app/jest.config.js` - moduleNameMapper
  - `packages/express-app/src/index.ts` - .js import extensions, removed fs import, fixed openapi validator
  - `packages/express-app/src/middleware/index.ts` - .js import extensions
  - `packages/express-app/src/middleware/errorHandler.ts` - .js import extension
  - `packages/express-app/src/middleware/requestTracing.ts` - .js import extension
  - `packages/express-app/src/middleware/healthCheck.ts` - .js import extension
  - `web-app/package.json` - typescript, @types/node, typecheck script, build script (openssl-legacy-provider)
  - `web-app/tsconfig.json` - extends base, overrides module/moduleResolution for Webpack 4
  - `web-app/tsconfig.webpack.json` (new) - ES2017 target for Webpack 4
  - `web-app/webpack.config.js` - ts-loader configFile override
  - `.prettierignore` - added .ralph-tui, .turbo, tasks
- **Learnings:**
  - Jest 27.x is incompatible with Node 22 (`testEnvironmentOptions` undefined error in jest-environment-node). Must upgrade to Jest 29.x.
  - `module: "nodenext"` requires `.js` extensions on all relative imports in source code. This is a significant migration effort in large codebases.
  - web-app with Webpack 4 cannot use ES2022 target directly because Webpack 4's acorn parser doesn't support optional chaining (`?.`). Need separate tsconfig for webpack bundling.
  - Webpack 4 on Node 22 requires `NODE_OPTIONS=--openssl-legacy-provider` due to removal of legacy MD4 hash algorithm.
  - When `types` field is specified in tsconfig, TypeScript only looks for those specific type packages in `typeRoots`. If they're hoisted, `typeRoots` must point to root.
  - web-app still uses `module: "commonjs"` / `moduleResolution: "node"` since it's bundled with Webpack 4. Full nodenext migration will happen with Vite migration (US-006).
---

## 2026-02-13 - US-008
- What was implemented:
  - Upgraded ESLint from v8.34.0 to v9.39.2
  - Upgraded from @typescript-eslint/eslint-plugin v5 + @typescript-eslint/parser v5 to typescript-eslint v8 (unified package)
  - Replaced all .eslintrc (JSON) files with a single root eslint.config.mjs (flat config format)
  - Removed .eslintignore (ignores now in flat config)
  - Installed and configured: @eslint/js, typescript-eslint, eslint-config-prettier v10, eslint-plugin-react (latest), eslint-plugin-react-hooks (latest), eslint-plugin-jsx-a11y (latest), globals
  - Removed old packages: @typescript-eslint/eslint-plugin, @typescript-eslint/parser, eslint-plugin-import, eslint-plugin-jest, eslint-plugin-node, eslint-plugin-promise, eslint-plugin-standard
  - Removed eslint-plugin-react from web-app devDependencies (now at root)
  - Configured React-specific lint rules (react, react-hooks, jsx-a11y) for web-app
  - Prettier integration maintained via eslint-config-prettier v10
  - Updated lint-staged config to use `--no-warn-ignored` flag and target specific file extensions
  - Fixed auto-fixable issues (unused eslint-disable directives in errorHandler.ts and client/index.ts)
  - Fixed root jest.config.js circular self-require (unused `baseConfig` variable)
  - Fixed web-app/jest.config.js duplicate `rootDir` key
  - Renamed destructured unused `projects` to `_projects` in service and web-app jest configs
  - Added eslint-disable for react-hooks/immutability in renderApp.tsx (legitimate SSR pattern)
- Files changed:
  - `package.json` - devDependencies (ESLint v9, typescript-eslint v8, new plugins), lint-staged config
  - `eslint.config.mjs` (new) - root flat config replacing all .eslintrc files
  - `.eslintrc` (deleted) - old root config
  - `.eslintignore` (deleted) - moved to flat config ignores
  - `service/.eslintrc` (deleted) - replaced by root flat config
  - `web-app/.eslintrc` (deleted) - replaced by root flat config
  - `web-app/package.json` - removed eslint-plugin-react devDependency
  - `jest.config.js` - removed unused `baseConfig` require
  - `service/jest.config.js` - renamed `projects` to `_projects` in destructuring
  - `web-app/jest.config.js` - renamed `projects` to `_projects`, removed duplicate `rootDir`
  - `web-app/src/client/renderApp.tsx` - added eslint-disable for react-hooks/immutability
  - `packages/express-app/src/middleware/errorHandler.ts` - prettier auto-fixed (removed stale eslint-disable)
  - `web-app/src/client/index.ts` - prettier auto-fixed (removed stale eslint-disable)
- **Learnings:**
  - ESLint v9 flat config uses file-pattern-based objects instead of cascading `.eslintrc` files. A single root config can handle the entire monorepo by using `files` patterns like `['web-app/src/**/*.tsx']`.
  - The `typescript-eslint` v8 package is a unified replacement for the separate `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin` packages. Import as `import tseslint from 'typescript-eslint'` and use `tseslint.config()` helper.
  - CommonJS config files (jest.config.js, etc.) need both `globals.node` and `globals.commonjs` in the flat config to avoid `no-undef` errors for `module`, `require`, `__dirname`.
  - In flat config, `.eslintignore` is replaced by an ignores-only config object at the start of the config array.
  - `eslint-config-prettier` v10 works with flat config by simply including it in the config array (no more `"extends": ["prettier"]`).
  - `eslint-plugin-react-hooks` in v5+ includes a new `immutability` rule that flags mutations of external variables (like `delete window.__PRELOADED_STATE__`). This is a legitimate SSR cleanup pattern that needs an inline disable.
  - lint-staged with ESLint v9 should use `eslint --no-warn-ignored` and match specific file extensions rather than running `eslint .` which tries to lint non-JS files.
  - Old plugins like `eslint-plugin-node`, `eslint-plugin-standard`, `eslint-plugin-promise` are no longer needed - their useful rules are covered by `@eslint/js` recommended config.
---

## 2026-02-13 - US-005
- What was implemented:
  - Migrated service package from Jest to Vitest for testing
  - Replaced nodemon with tsx watch for dev mode (faster TypeScript execution)
  - Upgraded dependencies: supertest 6.x -> 7.x, rimraf 3.x -> 5.x, removed ts-node, ts-jest, @types/jest, @types/supertest
  - Added tsx as dev dependency for fast TS execution
  - Added vitest as dev dependency (v3.x) with vitest.config.ts
  - Added engines field (`>= 22`) to service package.json
  - Removed service/jest.config.js (replaced by vitest.config.ts)
  - Removed service/nodemon.json (replaced by tsx watch in dev script)
  - Updated root jest.config.js to remove service project reference
  - Updated eslint.config.mjs to remove `globals.jest` from service-specific config and include test files
  - Migrated test file to use explicit Vitest imports (`import { describe, it, expect } from 'vitest'`)
  - Added `.js` extension to test import path for nodenext compatibility
  - Service already used local `@dhruv-m-patel/express-app` workspace dependency (from US-003)
  - Service already used shared tsconfig.base.json (from US-002)
- Files changed:
  - `service/package.json` - upgraded deps, removed Jest/nodemon/ts-node, added vitest/tsx, updated scripts
  - `service/vitest.config.ts` (new) - Vitest configuration with node environment
  - `service/jest.config.js` (deleted) - replaced by vitest.config.ts
  - `service/nodemon.json` (deleted) - replaced by tsx watch script
  - `service/tests/integration/routes/health.test.ts` - migrated to Vitest imports
  - `jest.config.js` - removed service project reference
  - `eslint.config.mjs` - removed jest globals from service config, added test files glob
- **Learnings:**
  - Vitest works seamlessly with `module: "nodenext"` TypeScript configs - no special `moduleNameMapper` needed unlike Jest/ts-jest. Vitest handles `.js` -> `.ts` resolution natively via Vite's module resolution.
  - When migrating from Jest to Vitest, explicit imports (`import { describe, it, expect } from 'vitest'`) are cleaner than `globals: true` because they don't require type augmentation in tsconfig and make dependencies explicit.
  - tsx watch mode (`tsx watch --clear-screen=false -r dotenv/config src/index.ts`) is a drop-in replacement for nodemon + ts-node that's significantly faster and requires zero configuration (no nodemon.json needed).
  - When a package in a monorepo switches from Jest to Vitest, remember to update the root jest.config.js to remove the package's project reference, and clean up `globals.jest` from the ESLint config for that package.
  - Vitest v3.x pulls in Vite as a dependency - this is expected and doesn't conflict with the rest of the monorepo.
---

