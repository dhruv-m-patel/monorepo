import { type ReactNode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';

/**
 * Renders the application to an HTML string for server-side rendering.
 * Called by the Express SSR middleware for each incoming request.
 */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}

/**
 * Renders the application to a pipeable Node.js stream for streaming SSR.
 * Can be used for progressive rendering in production.
 */
export { renderToPipeableStream } from 'react-dom/server';

export function renderStream(url: string): ReactNode {
  return (
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}
