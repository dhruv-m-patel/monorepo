# Ralph Progress Log

This file tracks progress across iterations. Agents update this file
after each iteration and it's included in prompts for context.

## Codebase Patterns (Study These First)

- **nodenext + Jest**: When using `module: "nodenext"` with `.js` extensions in imports, Jest/ts-jest needs `moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1' }` to resolve `.js` back to `.ts` files.
- **Webpack 4 + ES2022 target**: Webpack 4's parser (acorn 6.x) only supports up to ES2019 syntax. Use a separate `tsconfig.webpack.json` with `target: "ES2017"` and configure ts-loader's `configFile` option. Also need `NODE_OPTIONS=--openssl-legacy-provider` for the MD4 hash issue.
- **Hoisted types in Yarn workspaces**: With `node-modules` linker, `@types/*` packages are hoisted to root `node_modules/@types`. Package tsconfig `typeRoots` must point to `../node_modules/@types` (relative to package dir) to find them.
- **express-openapi-validator v5**: Expects `apiSpec` to be a file path or parsed object, NOT a YAML string content. Passing file content as string causes "spec could not be read" errors.

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

