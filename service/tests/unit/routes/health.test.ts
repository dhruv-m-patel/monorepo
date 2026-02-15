import { describe, it, expect } from 'vitest';
import express from 'express';
import request from 'supertest';
import healthRouter from '../../../src/routes/health.js';

describe('Unit: Health Router', () => {
  it('should return 200 with a health message', async () => {
    const app = express();
    app.use('/api/health', healthRouter);

    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Service is healthy' });
  });

  it('should return JSON content type', async () => {
    const app = express();
    app.use('/api/health', healthRouter);

    const response = await request(app).get('/api/health');
    expect(response.headers['content-type']).toMatch(/json/);
  });
});
