import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('loads correctly with heading and description', async ({ page }) => {
    await page.goto('/');

    // Page title should be set
    await expect(page).toHaveTitle(/Web App/);

    // Main heading is visible
    const heading = page.getByRole('heading', {
      name: /Welcome to Turborepo Monorepo/,
    });
    await expect(heading).toBeVisible();

    // Subtitle / description is visible
    await expect(
      page.getByText(/Featured with rich support of modern tools/)
    ).toBeVisible();
  });

  test('renders feature cards', async ({ page }) => {
    await page.goto('/');

    // The feature cards grid should be present with expected items
    const cards = page.locator('.group'); // each feature card is wrapped in an <a class="group">
    await expect(cards).not.toHaveCount(0);

    // Spot-check specific feature cards by their exact card title text
    await expect(
      page.getByRole('link', { name: /Monorepo Benefits/ })
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /Express/ })).toBeVisible();
    await expect(
      page.getByRole('link', { name: /Vite Lightning-fast/ })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /TypeScript Type-safe/ })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /Tailwind CSS/ })
    ).toBeVisible();
  });

  test('has header with app title and dark mode toggle', async ({ page }) => {
    await page.goto('/');

    // Header should contain the app name
    const header = page.locator('header');
    await expect(header.getByText('Turborepo Monorepo')).toBeVisible();

    // Dark mode toggle button should be present
    const themeToggle = page.getByRole('button', { name: /Switch to .* mode/ });
    await expect(themeToggle).toBeVisible();
  });

  test('has footer with tech stack info', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(
      footer.getByText(/Built with React 19, Vite, TypeScript/)
    ).toBeVisible();
  });

  test('dark mode toggle works', async ({ page }) => {
    await page.goto('/');

    const themeToggle = page.getByRole('button', { name: /Switch to .* mode/ });

    // Click to toggle dark mode
    await themeToggle.click();

    // The html element or a parent should gain the .dark class
    const darkClass = await page.locator('html').getAttribute('class');
    expect(darkClass).toContain('dark');

    // Toggle back
    await themeToggle.click();
    const lightClass = await page.locator('html').getAttribute('class');
    expect(lightClass).not.toContain('dark');
  });
});
