import cluster from 'cluster';
import os from 'os';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import * as ExpressOpenApiValidator from 'express-openapi-validator';
import swaggerUi from 'swagger-ui-express';
import yamljs from 'yamljs';
import process from 'process';

import { AppConfigOptions, ApiStartupOptions } from './types';
import {
  finalErrorHandler,
  requestTracing,
  createHealthCheck,
} from './middleware';

function isPromise(value?: unknown): value is Promise<void> {
  return Boolean(value && typeof (value as Promise<void>).then === 'function');
}

/**
 * Configures and returns an Express application with standard middleware,
 * optional API spec validation, request tracing, health checks, and error handling.
 */
export function configureApp(
  options: AppConfigOptions = {}
): express.Application {
  const { appName = 'Service', apiOptions, setup } = options;

  const app: express.Application = express();

  // Standard middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(compression());
  app.use(cookieParser());

  // API spec validation and Swagger UI
  if (apiOptions && apiOptions.apiSpec) {
    const { apiSpec, specType, validateResponses = true } = apiOptions;

    // Swagger UI documentation endpoint
    app.use(
      '/api/docs',
      swaggerUi.serve,
      swaggerUi.setup(yamljs.load(apiSpec))
    );

    // Request/response validation
    if (specType === 'openapi') {
      const specContent = fs.readFileSync(apiSpec, 'utf8');
      app.use(
        ExpressOpenApiValidator.middleware({
          apiSpec: specContent,
          validateRequests: true,
          validateResponses,
        })
      );
    }
  }

  // Request tracing
  app.use(requestTracing);

  // Health check endpoint
  app.get('/health', createHealthCheck(appName));

  // Consumer route setup
  if (setup && typeof setup === 'function') {
    const result = setup(app);
    if (isPromise(result)) {
      result.then(() => {
        app.use(finalErrorHandler);
      });
      return app;
    }
  }

  // Final error handler
  app.use(finalErrorHandler);
  return app;
}

/**
 * Starts an Express application, optionally using clustered mode
 * to leverage multiple CPU cores.
 */
export function runApp(
  app: express.Application,
  options: ApiStartupOptions = {}
): void {
  const {
    appName = 'express-app',
    port = 5000,
    useClusteredStart = false,
    setup,
    callback,
  } = options;

  const startApp = () => {
    if (useClusteredStart) {
      if (cluster.isPrimary) {
        console.log(`Main server process id: ${process.pid}`);
        const cpus = os.cpus();
        console.log(
          `Forking ${cpus.length} child server processes on CPU Model ${cpus[0].model}`
        );
        for (let i = 0; i < cpus.length; i++) {
          cluster.fork();
        }
      } else {
        app.listen(port, () => {
          console.log(
            `Server child process id ${process.pid} running, listening on port ${port}`
          );
          if (callback && typeof callback === 'function') {
            callback();
          }
        });
      }
    } else {
      app.listen(port, () => {
        console.log(`${appName} started on port ${port}...`);
        if (callback && typeof callback === 'function') {
          callback();
        }
      });
    }
  };

  if (setup && typeof setup === 'function') {
    const result = setup();
    if (isPromise(result)) {
      result.then(() => {
        startApp();
      });
      return;
    }
  }

  startApp();
}

// Re-export types and middleware
export * from './types';
export {
  finalErrorHandler,
  requestTracing,
  createHealthCheck,
} from './middleware';
