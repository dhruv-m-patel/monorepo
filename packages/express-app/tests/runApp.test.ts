import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import express from 'express';
import { runApp } from '../src/index';

describe('runApp', () => {
  let app: express.Application;
  let server: any;

  beforeEach(() => {
    app = express();
  });

  afterEach(
    () =>
      new Promise<void>((resolve) => {
        if (server && server.close) {
          server.close(() => resolve());
        } else {
          resolve();
        }
      })
  );

  it('should start the app on the specified port', () => {
    return new Promise<void>((resolve) => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      // Capture the server by monkey-patching app.listen
      const originalListen = app.listen.bind(app);
      app.listen = function (...args: any[]) {
        server = originalListen(...args);
        return server;
      } as any;

      runApp(app, {
        port: 0, // Use port 0 for random available port
        appName: 'TestService',
        callback: () => {
          expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('TestService started on port')
          );
          consoleSpy.mockRestore();
          resolve();
        },
      });
    });
  });

  it('should use default options when none provided', () => {
    return new Promise<void>((resolve) => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      const originalListen = app.listen.bind(app);
      app.listen = function (...args: any[]) {
        server = originalListen(...args);
        return server;
      } as any;

      runApp(app, {
        port: 0,
        callback: () => {
          expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('express-app started on port')
          );
          consoleSpy.mockRestore();
          resolve();
        },
      });
    });
  });

  it('should call setup function before starting', () => {
    return new Promise<void>((resolve) => {
      const setupOrder: string[] = [];

      const originalListen = app.listen.bind(app);
      app.listen = function (...args: any[]) {
        server = originalListen(...args);
        return server;
      } as any;

      vi.spyOn(console, 'log').mockImplementation(() => {});

      runApp(app, {
        port: 0,
        setup: () => {
          setupOrder.push('setup');
        },
        callback: () => {
          setupOrder.push('callback');
          expect(setupOrder).toEqual(['setup', 'callback']);
          vi.restoreAllMocks();
          resolve();
        },
      });
    });
  });

  it('should handle async setup function', () => {
    return new Promise<void>((resolve) => {
      const setupOrder: string[] = [];

      const originalListen = app.listen.bind(app);
      app.listen = function (...args: any[]) {
        server = originalListen(...args);
        return server;
      } as any;

      vi.spyOn(console, 'log').mockImplementation(() => {});

      runApp(app, {
        port: 0,
        setup: async () => {
          await new Promise((r) => setTimeout(r, 10));
          setupOrder.push('async-setup');
        },
        callback: () => {
          setupOrder.push('callback');
          expect(setupOrder).toEqual(['async-setup', 'callback']);
          vi.restoreAllMocks();
          resolve();
        },
      });
    });
  });
});
