import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('feature card links point to external sites', async ({ page }) => {
    await page.goto('/');

    // Each feature card is an <a> with an external href
    const reactLink = page.locator('a.group', { hasText: 'React' }).first();
    await expect(reactLink).toHaveAttribute('href', /react\.dev/);
    await expect(reactLink).toHaveAttribute('target', '_blank');
    await expect(reactLink).toHaveAttribute('rel', /noreferrer/);
  });

  test('navigating to unknown route does not crash the app', async ({
    page,
  }) => {
    await page.goto('/some-unknown-page');

    // The app shell (header) should still render
    const header = page.locator('header');
    await expect(header.getByText('Monorepo')).toBeVisible();

    // Footer should still render
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('home page is accessible from root path', async ({ page }) => {
    await page.goto('/');

    // Verify we are on the home page by checking the main heading
    await expect(
      page.getByRole('heading', { name: /Welcome to Monorepo/ })
    ).toBeVisible();
  });

  test('page maintains layout structure across navigation', async ({
    page,
  }) => {
    // Start at root
    await page.goto('/');
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeAttached();
    await expect(page.locator('footer')).toBeVisible();

    // Navigate to non-existent route - layout shell still renders
    await page.goto('/non-existent');
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeAttached();
    await expect(page.locator('footer')).toBeVisible();
  });
});
