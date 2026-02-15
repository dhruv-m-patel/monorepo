# /new-package - Scaffold a new workspace package

Create a new package in the `packages/` directory with the correct structure, configuration, and boilerplate for this monorepo.

## Usage

```
/new-package $ARGUMENTS
```

Where `$ARGUMENTS` is the package name (e.g., `utils`, `logger`, `auth`).

## Instructions

Given the package name from the arguments, scaffold a new workspace package at `packages/<name>/` with the following structure and files:

### 1. Create directory structure

```
packages/<name>/
├── src/
│   └── index.ts
├── tests/
│   └── index.test.ts
├── package.json
├── tsconfig.json
├── tsconfig.cjs.json
├── tsconfig.esm.json
└── vitest.config.ts
```

### 2. package.json

```json
{
  "name": "@dhruv-m-patel/<name>",
  "version": "1.0.0",
  "description": "<Ask user for description or use a sensible default>",
  "main": "build/cjs/index.js",
  "module": "build/esm/index.js",
  "types": "build/cjs/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./build/esm/index.d.ts",
        "default": "./build/esm/index.js"
      },
      "require": {
        "types": "./build/cjs/index.d.ts",
        "default": "./build/cjs/index.js"
      }
    }
  },
  "files": ["build"],
  "engines": {
    "node": ">= 22"
  },
  "scripts": {
    "build": "rimraf ./build && yarn build:cjs && yarn build:esm",
    "build:cjs": "tsc -p tsconfig.cjs.json",
    "build:esm": "tsc -p tsconfig.esm.json",
    "test": "vitest run",
    "test:ci": "vitest run --coverage --reporter=default --reporter=verbose",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit"
  },
  "author": {
    "name": "Dhruv Patel",
    "email": "dhruv.codelab@gmail.com"
  },
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/dhruv-m-patel/monorepo.git",
    "directory": "packages/<name>"
  },
  "devDependencies": {
    "@types/node": "^22.13.0",
    "rimraf": "^5.0.10",
    "typescript": "^5.7.3",
    "vitest": "^3.0.0"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

### 3. tsconfig.json (main - for typecheck)

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./build",
    "types": ["node"]
  },
  "include": ["./src"],
  "exclude": ["./tests", "node_modules"]
}
```

### 4. tsconfig.cjs.json (CJS build)

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "rootDir": "./src",
    "outDir": "./build/cjs"
  },
  "include": ["./src"],
  "exclude": ["./tests", "node_modules"]
}
```

### 5. tsconfig.esm.json (ESM build)

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "rootDir": "./src",
    "outDir": "./build/esm"
  },
  "include": ["./src"],
  "exclude": ["./tests", "node_modules"]
}
```

### 6. vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: false,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/index.ts'],
      reporter: ['text', 'text-summary', 'lcov'],
    },
  },
});
```

### 7. src/index.ts

```typescript
// @dhruv-m-patel/<name>
// Main entry point

export {};
```

### 8. tests/index.test.ts

```typescript
import { describe, it, expect } from 'vitest';

describe('<name>', () => {
  it('should be defined', () => {
    expect(true).toBe(true);
  });
});
```

### 9. Post-scaffolding steps

After creating all files:

1. Add the package to `vitest.workspace.ts` at the root
2. Add the package's source and test files to the ESLint config (`eslint.config.mjs`)
3. Add the package's `vitest.config.ts` to the ESLint node globals section
4. Run `yarn install` to register the new workspace package
5. Run `yarn workspace @dhruv-m-patel/<name> run build` to verify the build
6. Run `yarn workspace @dhruv-m-patel/<name> run test` to verify tests
7. Run `yarn lint` to verify lint passes

Report the results of each step.
