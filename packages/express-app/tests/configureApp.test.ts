import { Request, Response } from 'express';
import request from 'supertest';
import { configureApp } from '../src/index';

describe('configureApp', () => {
  it('should return an Express application', () => {
    const app = configureApp();
    expect(app).toBeDefined();
    expect(typeof app.listen).toBe('function');
    expect(typeof app.use).toBe('function');
  });

  it('should set up the health check endpoint at /health', async () => {
    const app = configureApp({ appName: 'TestApp' });
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.text).toBe('TestApp is healthy');
  });

  it('should default appName to Service', async () => {
    const app = configureApp();
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Service is healthy');
  });

  it('should add JSON body parsing middleware', async () => {
    const app = configureApp({
      setup: (expressApp) => {
        expressApp.post('/echo', (req, res) => {
          res.json(req.body);
        });
      },
    });

    const response = await request(app)
      .post('/echo')
      .send({ message: 'hello' })
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'hello' });
  });

  it('should support CORS headers', async () => {
    const app = configureApp();
    const response = await request(app)
      .options('/health')
      .set('Origin', 'http://example.com');

    expect(response.headers['access-control-allow-origin']).toBe('*');
  });

  it('should call the setup function with the app', async () => {
    const setupFn = jest.fn((expressApp) => {
      expressApp.get('/custom', (req: Request, res: Response) => {
        res.json({ custom: true });
      });
    });

    const app = configureApp({ setup: setupFn });
    expect(setupFn).toHaveBeenCalledTimes(1);
    expect(setupFn).toHaveBeenCalledWith(app);

    const response = await request(app).get('/custom');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ custom: true });
  });

  it('should handle async setup functions', async () => {
    const app = configureApp({
      setup: async (expressApp) => {
        expressApp.get('/async-route', (req, res) => {
          res.json({ async: true });
        });
      },
    });

    const response = await request(app).get('/async-route');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ async: true });
  });
});
