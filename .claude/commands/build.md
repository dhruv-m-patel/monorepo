# /build - Build all packages

Build all workspace packages using Turborepo's cached parallel build system.

## What this does

1. Runs `nvm use` to ensure correct Node.js version
2. Runs `yarn build` which executes `turbo run build`
3. Turborepo respects the dependency graph (express-app builds before service)
4. Reports build status and any errors

## Usage

```
/build
```

## Instructions

Run the following commands sequentially and report the results:

```bash
nvm use && yarn build
```

If the build fails:

- Check the error output for the failing package
- Common issues: TypeScript type errors, missing `.js` extensions in imports (nodenext), missing dependencies
- For express-app: builds both CJS and ESM outputs to `build/`
- For service: compiles TypeScript and bundles the OpenAPI spec
- For web-app: Vite builds the SPA to `dist/`

Report which packages built successfully and which failed, with error details.
