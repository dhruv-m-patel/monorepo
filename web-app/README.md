# web-app

A modern web application built with **React 19**, **Vite 6**, **Tailwind CSS v4**, and **react-router-dom v7**, featuring server-side rendering (SSR) with Express.

## Tech Stack

- **React 19** with TypeScript
- **Vite 6** for bundling and dev server with HMR
- **Tailwind CSS v4** with OKLCH color theme
- **shadcn/ui** components via `@dhruv-m-patel/react-components`
- **react-router-dom v7** for client and server routing
- **Express** SSR server with `@dhruv-m-patel/express-app`
- **Vitest** + **@testing-library/react** for unit tests
- **Storybook v8** for component documentation (shared with react-components)

## Architecture

The app uses a **Vite SSR** architecture with dual entry points:

```
src/
  entry-client.tsx    # Client hydration with BrowserRouter
  entry-server.tsx    # Server render with StaticRouter
  server.ts           # Express SSR server (dev: Vite middleware, prod: static assets)
  App.tsx             # Root app component with routes
  pages/              # Page components (HomePage, etc.)
  components/         # App-specific components (Layout, ThemeToggle, etc.)
  context/            # React contexts (ThemeContext for dark mode)
  lib/                # Utilities (cn helper)
  styles/             # Global CSS with Tailwind directives
```

### SSR Flow

- **Development**: Express server uses Vite in middleware mode for full HMR on both client and server
- **Production**: Express serves pre-built client assets from `dist/client/` and renders pages via the SSR bundle

## Development

```bash
# From monorepo root
yarn workspace web-app run dev       # Start dev server with SSR + HMR

# Or start all dev servers
yarn dev
```

Access the app at http://localhost:3000

## Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start Vite dev server with SSR and HMR |
| `yarn build` | Build client bundle and SSR server bundle |
| `yarn test` | Run Vitest unit tests |
| `yarn typecheck` | TypeScript type checking |
| `yarn lint` | ESLint with flat config |
| `yarn test:size` | Check bundle size limits with size-limit |
| `yarn storybook` | Start Storybook dev server |
| `yarn build-storybook` | Build static Storybook site |

## Styling

- **Tailwind CSS v4** with theme defined in CSS `@theme {}` blocks (no `tailwind.config.js`)
- **OKLCH color space** for perceptually uniform colors with light/dark mode support
- **Class-based dark mode** toggled via `ThemeContext` applying `.dark` class to root element
- **Path alias**: `@/` maps to `src/` (configured in Vite, Vitest, and TypeScript)

## Testing

- **Vitest** with jsdom environment
- **@testing-library/react** v16 for component testing
- Explicit imports: `import { describe, it, expect } from 'vitest'`
- Run tests: `yarn workspace web-app run test`
