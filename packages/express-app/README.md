# @dhruv-m-patel/express-app

A reusable Express server package providing pre-configured middleware for health checks, request tracing, error handling, and optional OpenAPI validation with Swagger UI.

## Tech Stack

- **Express** with TypeScript
- **express-openapi-validator** for API spec validation (optional)
- **swagger-ui-express** for API documentation (optional)
- **Vitest** for unit tests
- Dual build: **CJS** + **ESM** outputs

## Features

- **Health check middleware** - `/health` endpoint with configurable checks
- **Request tracing** - Automatic request ID generation and propagation
- **Error handling** - Centralized error handler with structured error responses
- **OpenAPI validation** - Optional request/response validation against an OpenAPI spec
- **Swagger UI** - Optional interactive API docs at `/api-docs`
- **Cluster mode** - Optional multi-process server with Node.js cluster

## Usage

```typescript
import { configureApp, runApp } from '@dhruv-m-patel/express-app';

const app = configureApp({
  appName: 'my-service',
  apiSpec: './src/api-spec/bundled.yaml',  // optional
  routes(app) {
    app.get('/api/hello', (req, res) => {
      res.json({ message: 'Hello World' });
    });
  },
});

runApp(app, { port: 4000 });
```

## API

### `configureApp(options)`

Creates and configures an Express application with middleware.

| Option | Type | Description |
|--------|------|-------------|
| `appName` | `string` | Application name for logging and health checks |
| `routes` | `(app: Express) => void` | Function to register route handlers |
| `apiSpec` | `string` (optional) | Path to OpenAPI spec file for validation |

### `runApp(app, options)`

Starts the Express server.

| Option | Type | Description |
|--------|------|-------------|
| `port` | `number` | Port to listen on |
| `enableClusterMode` | `boolean` (optional) | Run with Node.js cluster for multi-process |

## Scripts

| Command | Description |
|---------|-------------|
| `yarn build` | Build CJS and ESM outputs with TypeScript |
| `yarn test` | Run Vitest unit tests |
| `yarn typecheck` | TypeScript type checking |

## Package Exports

The package provides dual CJS/ESM builds:

- **CJS**: `dist/cjs/index.js` (for `require()`)
- **ESM**: `dist/esm/index.js` (for `import`)
- **Types**: `dist/esm/index.d.ts`
