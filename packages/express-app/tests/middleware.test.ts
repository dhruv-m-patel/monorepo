import { describe, it, expect, vi, beforeEach } from 'vitest';
import express from 'express';
import request from 'supertest';
import {
  finalErrorHandler,
  requestTracing,
  createHealthCheck,
} from '../src/middleware';
import { ApiRequest, ApiError } from '../src/types';

describe('middleware', () => {
  describe('finalErrorHandler', () => {
    let app: express.Application;

    beforeEach(() => {
      app = express();
    });

    it('should return 500 with error message for unhandled errors', async () => {
      app.get('/error', (req, res, next) => {
        next(new Error('Something went wrong'));
      });
      app.use(finalErrorHandler);

      const response = await request(app).get('/error');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: 'Something went wrong',
      });
    });

    it('should use the error status if provided', async () => {
      app.get('/not-found', (req, res, next) => {
        const error: ApiError = new Error('Not found');
        error.status = 404;
        next(error);
      });
      app.use(finalErrorHandler);

      const response = await request(app).get('/not-found');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Not found' });
    });

    it('should default message to Internal server error if none provided', async () => {
      app.get('/blank-error', (req, res, next) => {
        const error = new Error();
        error.message = '';
        next(error);
      });
      app.use(finalErrorHandler);

      const response = await request(app).get('/blank-error');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: 'Internal server error',
      });
    });

    it('should log the error to console', async () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      app.get('/logged-error', (req, res, next) => {
        next(new Error('logged'));
      });
      app.use(finalErrorHandler);

      await request(app).get('/logged-error');
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('requestTracing', () => {
    let app: express.Application;

    beforeEach(() => {
      app = express();
      app.use(requestTracing);
    });

    it('should assign a unique id to the request', async () => {
      app.get('/trace', (req: ApiRequest, res) => {
        res.json({ id: req.id });
      });

      const response = await request(app).get('/trace');
      expect(response.status).toBe(200);
      expect(response.body.id).toBeDefined();
      expect(typeof response.body.id).toBe('string');
      // UUID v4 format
      expect(response.body.id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      );
    });

    it('should not overwrite an existing request id', async () => {
      const existingId = 'existing-request-id';

      // Add middleware that sets id before requestTracing
      const testApp = express();
      testApp.use((req: ApiRequest, res, next) => {
        req.id = existingId;
        next();
      });
      testApp.use(requestTracing);
      testApp.get('/trace', (req: ApiRequest, res) => {
        res.json({ id: req.id });
      });

      const response = await request(testApp).get('/trace');
      expect(response.body.id).toBe(existingId);
    });
  });

  describe('createHealthCheck', () => {
    it('should return 200 with app name health message', async () => {
      const app = express();
      app.get('/health', createHealthCheck('MyApp'));

      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.text).toBe('MyApp is healthy');
    });

    it('should use the provided app name', async () => {
      const app = express();
      app.get('/health', createHealthCheck('CustomService'));

      const response = await request(app).get('/health');
      expect(response.text).toBe('CustomService is healthy');
    });
  });
});
