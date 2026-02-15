import { test, expect } from '@playwright/test';

test.describe('Web App ↔ Service Communication', () => {
  test('web-app can fetch message from service via /api/message proxy', async ({
    page,
  }) => {
    await page.goto('/');

    // Make a fetch request through the web-app's Vite proxy to the service
    const response = await page.evaluate(async () => {
      const res = await fetch('/api/message');
      return {
        status: res.status,
        body: await res.json(),
      };
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Hello world');
  });

  test('web-app can reach service health check via proxy', async ({ page }) => {
    await page.goto('/');

    const response = await page.evaluate(async () => {
      const res = await fetch('/api/health');
      return {
        status: res.status,
        body: await res.json(),
      };
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Service is healthy');
  });
});
