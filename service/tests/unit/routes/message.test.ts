import { describe, it, expect } from 'vitest';
import express from 'express';
import request from 'supertest';
import messageRouter from '../../../src/routes/message.js';

describe('Unit: Message Router', () => {
  it('should return 200 with a greeting message', async () => {
    const app = express();
    app.use('/api/message', messageRouter);

    const response = await request(app).get('/api/message');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello world' });
  });

  it('should return JSON content type', async () => {
    const app = express();
    app.use('/api/message', messageRouter);

    const response = await request(app).get('/api/message');
    expect(response.headers['content-type']).toMatch(/json/);
  });

  it('should not respond to POST requests', async () => {
    const app = express();
    app.use('/api/message', messageRouter);

    const response = await request(app).post('/api/message');
    expect(response.status).toBe(404);
  });
});
