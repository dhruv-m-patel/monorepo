import { describe, it, expect } from 'vitest';
import app from '../../../src/app.js';
import request from 'supertest';

describe('Integration: /health', () => {
  it('should return response for GET /health', async () => {
    const result = await request(app).get('/api/health');
    expect(result.status).toEqual(200);
    expect(result.body.message).toEqual('Service is healthy');
  });
});
