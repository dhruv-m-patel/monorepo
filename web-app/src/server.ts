import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { configureApp, runApp } from '@dhruv-m-patel/express-app';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const port = Number(process.env.REACT_APP_PORT) || 3000;

async function createServer() {
  // Resolve paths relative to the project root (one level up from src/)
  const root = path.resolve(__dirname, '..');

  let template: string;
  let render: (url: string) => string;

  const app = configureApp({
    appName: 'Web App',
    setup: (expressApp) => {
      if (isProduction) {
        // In production, serve the built client assets
        const distClient = path.resolve(root, 'dist/client');
        expressApp.use(
          '/assets',
          express.static(path.resolve(distClient, 'assets'), {
            immutable: true,
            maxAge: '1y',
          })
        );
        expressApp.use(express.static(distClient, { index: false }));
      }
    },
  });

  if (isProduction) {
    // Production: load built template and server entry
    const distClient = path.resolve(root, 'dist/client');
    const distServer = path.resolve(root, 'dist/server');

    template = fs.readFileSync(path.resolve(distClient, 'index.html'), 'utf-8');

    const serverEntry = await import(
      path.resolve(distServer, 'entry-server.js')
    );
    render = serverEntry.render;
  } else {
    // Development: use Vite's dev server as middleware for HMR
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      root,
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    // In dev, we load the template and server entry through Vite on each request
    // so changes are picked up immediately (HMR for SSR)
    template = '';
    render = () => '';

    // SSR handler — must come after Vite middleware
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;

      try {
        // Read and transform the HTML template through Vite (injects HMR client)
        let devTemplate = fs.readFileSync(
          path.resolve(root, 'index.html'),
          'utf-8'
        );
        devTemplate = await vite.transformIndexHtml(url, devTemplate);

        // Load the server entry module through Vite (SSR transform + HMR)
        const { render: devRender } = await vite.ssrLoadModule(
          '/src/entry-server.tsx'
        );

        const appHtml = devRender(url);
        const html = devTemplate.replace('<!--ssr-outlet-->', appHtml);

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });

    runApp(app, { appName: 'Web App (dev)', port });
    return;
  }

  // Production SSR handler
  app.use('*', (req, res) => {
    const url = req.originalUrl;
    const appHtml = render(url);
    const html = template.replace('<!--ssr-outlet-->', appHtml);
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  });

  runApp(app, { appName: 'Web App', port });
}

createServer();
