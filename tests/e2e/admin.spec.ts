import { test, expect } from '@playwright/test';
import { dismissToasts, loginAdmin } from '../fixtures/helpers';

test.describe('Admin Panel', () => {
  test.beforeEach(async ({ page }) => {
    await dismissToasts(page);
    await page.evaluate(() => {
      const badge = document.querySelector('[class*="emergent"], [id*="emergent-badge"]');
      if (badge) (badge as HTMLElement).remove();
    });
  });

  test('admin login page loads', async ({ page }) => {
    await page.goto('/admin', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId('admin-login-page')).toBeVisible();
    await expect(page.getByTestId('admin-username')).toBeVisible();
    await expect(page.getByTestId('admin-password')).toBeVisible();
    await expect(page.getByTestId('admin-login-btn')).toBeVisible();
  });

  test('admin login with valid credentials', async ({ page }) => {
    await loginAdmin(page);
    await expect(page.getByTestId('admin-dashboard')).toBeVisible();
    await expect(page.getByTestId('admin-tab-gallery')).toBeVisible();
    await expect(page.getByTestId('admin-tab-contacts')).toBeVisible();
  });

  test('admin login fails with invalid credentials', async ({ page }) => {
    await page.goto('/admin', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('admin-username').fill('wronguser');
    await page.getByTestId('admin-password').fill('wrongpass');
    await page.getByTestId('admin-login-btn').click();
    // Should NOT navigate to dashboard
    await expect(page.getByTestId('admin-dashboard')).not.toBeVisible();
    await expect(page.getByTestId('admin-login-page')).toBeVisible();
  });

  test('admin dashboard shows gallery tab with images', async ({ page }) => {
    await loginAdmin(page);
    await expect(page.getByTestId('admin-tab-gallery')).toBeVisible();
    // Gallery tab should be active by default
    await expect(page.getByTestId('add-image-btn')).toBeVisible();
  });

  test('admin can switch to contacts tab', async ({ page }) => {
    await loginAdmin(page);
    await page.getByTestId('admin-tab-contacts').click();
    // Contacts section should show
    await expect(page.getByRole('heading', { name: /contact submissions/i })).toBeVisible();
  });

  test('admin gallery shows existing images', async ({ page }) => {
    await loginAdmin(page);
    // Wait for gallery images to load
    await expect(page.locator('[data-testid^="gallery-item-"]').first()).toBeVisible({ timeout: 10000 });
  });

  test('admin can open add image dialog', async ({ page }) => {
    await loginAdmin(page);
    await page.getByTestId('add-image-btn').click({ force: true });
    await expect(page.getByTestId('image-title-input')).toBeVisible();
    await expect(page.getByTestId('image-url-input')).toBeVisible();
    await expect(page.getByTestId('save-image-btn')).toBeVisible();
  });

  test('admin can logout', async ({ page }) => {
    await loginAdmin(page);
    await page.getByTestId('admin-logout').click({ force: true });
    await expect(page.getByTestId('admin-login-page')).toBeVisible();
  });
});
