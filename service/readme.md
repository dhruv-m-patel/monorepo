# service

An Express REST API backend service built on `@dhruv-m-patel/express-app`, featuring OpenAPI validation, health checks, and request tracing.

## Tech Stack

- **Express** with TypeScript
- **@dhruv-m-patel/express-app** for server setup, middleware, and health checks
- **express-openapi-validator** for request/response validation against OpenAPI spec
- **Swagger UI** for interactive API documentation
- **Vitest** for unit/integration tests
- **Autocannon** for performance/load testing

## Architecture

```
src/
  index.ts              # Server entry point (configures and starts the app)
  routes/
    health.ts           # Health check endpoint
    message.ts          # Message API endpoint
  api-spec/
    openapi.yaml        # OpenAPI 3.x specification
    bundled.yaml        # Bundled spec (generated at build time)
```

## Development

```bash
# From monorepo root
yarn workspace service run dev       # Start dev server with hot reload

# Or start all dev servers
yarn dev
```

Access the API at http://localhost:4000

- API docs: http://localhost:4000/api-docs
- Health check: http://localhost:4000/health
- Message endpoint: http://localhost:4000/api/message

## Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start dev server with hot reload (tsx watch) |
| `yarn build` | Compile TypeScript + bundle OpenAPI spec |
| `yarn start` | Start production server |
| `yarn test` | Run Vitest unit/integration tests |
| `yarn test:perf` | Run autocannon performance/load tests |
| `yarn typecheck` | TypeScript type checking |

## API Specification

The service uses an OpenAPI 3.x spec (`src/api-spec/openapi.yaml`) for:
- **Request validation**: Incoming requests are validated against the spec
- **Response validation**: Outgoing responses are checked for spec compliance
- **Documentation**: Swagger UI auto-generates interactive docs from the spec

The spec is bundled at build time into `src/api-spec/bundled.yaml` using `swagger-cli bundle`.

## Testing

- **Unit/Integration**: Vitest with supertest for HTTP assertions
- **Performance**: Autocannon-based load tests in `tests/performance/`
- Run all tests: `yarn workspace service run test`
- Run perf tests: `yarn workspace service run test:perf`
