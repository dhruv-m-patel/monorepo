import express from 'express';
import { runApp } from '../src/index';

describe('runApp', () => {
  let app: express.Application;
  let server: any;

  beforeEach(() => {
    app = express();
  });

  afterEach((done) => {
    if (server && server.close) {
      server.close(done);
    } else {
      done();
    }
  });

  it('should start the app on the specified port', (done) => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

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
        done();
      },
    });
  });

  it('should use default options when none provided', (done) => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

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
        done();
      },
    });
  });

  it('should call setup function before starting', (done) => {
    const setupOrder: string[] = [];

    const originalListen = app.listen.bind(app);
    app.listen = function (...args: any[]) {
      server = originalListen(...args);
      return server;
    } as any;

    jest.spyOn(console, 'log').mockImplementation();

    runApp(app, {
      port: 0,
      setup: () => {
        setupOrder.push('setup');
      },
      callback: () => {
        setupOrder.push('callback');
        expect(setupOrder).toEqual(['setup', 'callback']);
        jest.restoreAllMocks();
        done();
      },
    });
  });

  it('should handle async setup function', (done) => {
    const setupOrder: string[] = [];

    const originalListen = app.listen.bind(app);
    app.listen = function (...args: any[]) {
      server = originalListen(...args);
      return server;
    } as any;

    jest.spyOn(console, 'log').mockImplementation();

    runApp(app, {
      port: 0,
      setup: async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        setupOrder.push('async-setup');
      },
      callback: () => {
        setupOrder.push('callback');
        expect(setupOrder).toEqual(['async-setup', 'callback']);
        jest.restoreAllMocks();
        done();
      },
    });
  });
});
