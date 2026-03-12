import { test, expect } from '@playwright/test';
import { dismissToasts } from '../fixtures/helpers';

test.describe('Designs Page & Gallery', () => {
  test.beforeEach(async ({ page }) => {
    await dismissToasts(page);
  });

  test('designs page loads with gallery title', async ({ page }) => {
    await page.goto('/designs', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId('designs-page')).toBeVisible();
    await expect(page.getByTestId('designs-title')).toBeVisible();
  });

  test('designs page has gallery tabs', async ({ page }) => {
    await page.goto('/designs', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId('tab-all')).toBeVisible();
    await expect(page.getByTestId('tab-cad')).toBeVisible();
    await expect(page.getByTestId('tab-rendering')).toBeVisible();
  });

  test('designs page displays gallery images from API', async ({ page }) => {
    await page.goto('/designs', { waitUntil: 'domcontentloaded' });
    // Wait for images to load from API
    await expect(page.locator('[data-testid^="design-item-"]').first()).toBeVisible({ timeout: 15000 });
  });

  test('CAD tab filters gallery to CAD images only', async ({ page }) => {
    await page.goto('/designs', { waitUntil: 'domcontentloaded' });
    // Wait for all images to load
    await expect(page.locator('[data-testid^="design-item-"]').first()).toBeVisible({ timeout: 15000 });
    // Click CAD tab
    await page.getByTestId('tab-cad').click();
    // Should still show images
    await expect(page.locator('[data-testid^="design-item-"]').first()).toBeVisible({ timeout: 10000 });
  });

  test('Rendering tab filters gallery', async ({ page }) => {
    await page.goto('/designs', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('[data-testid^="design-item-"]').first()).toBeVisible({ timeout: 15000 });
    await page.getByTestId('tab-rendering').click();
    await expect(page.locator('[data-testid^="design-item-"]').first()).toBeVisible({ timeout: 10000 });
  });

  test('clicking gallery image opens lightbox', async ({ page }) => {
    await page.goto('/designs', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('[data-testid^="design-item-"]').first()).toBeVisible({ timeout: 15000 });
    await page.locator('[data-testid^="design-item-"]').first().click();
    // Lightbox should open
    await expect(page.getByTestId('lightbox-overlay')).toBeVisible();
    await expect(page.getByTestId('lightbox-close')).toBeVisible();
  });

  test('homepage gallery section shows images', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('gallery-section').scrollIntoViewIfNeeded();
    // Wait for API images
    await expect(page.getByTestId('gallery-image-0')).toBeVisible({ timeout: 15000 });
  });
});
