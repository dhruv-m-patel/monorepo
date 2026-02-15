import { test, expect } from '@playwright/test';

const SERVICE_URL = 'http://localhost:4000';

test.describe('API Health Check', () => {
  test('service /health endpoint responds with 200', async ({ request }) => {
    const response = await request.get(`${SERVICE_URL}/health`);
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain('healthy');
  });

  test('service /api/health endpoint responds with JSON', async ({
    request,
  }) => {
    const response = await request.get(`${SERVICE_URL}/api/health`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Service is healthy');
  });

  test('service /api/message endpoint responds with JSON', async ({
    request,
  }) => {
    const response = await request.get(`${SERVICE_URL}/api/message`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Hello world');
  });
});
