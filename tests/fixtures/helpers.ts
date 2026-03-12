import { Page, expect } from '@playwright/test';

export async function waitForAppReady(page: Page) {
  await page.waitForLoadState('domcontentloaded');
}

export async function dismissToasts(page: Page) {
  await page.addLocatorHandler(
    page.locator('[data-sonner-toast], .Toastify__toast, [role="status"].toast, .MuiSnackbar-root').first(),
    async () => {
      const close = page.locator('[data-sonner-toast] [data-close], [data-sonner-toast] button[aria-label="Close"], .Toastify__close-button, .MuiSnackbar-root button');
      await close.first().click({ timeout: 2000 }).catch(() => {});
    },
    { times: 10, noWaitAfter: true }
  );
}

export async function loginAdmin(page: Page) {
  await page.goto('/admin', { waitUntil: 'domcontentloaded' });
  await expect(page.getByTestId('admin-login-page')).toBeVisible();
  await page.getByTestId('admin-username').fill('admin');
  await page.getByTestId('admin-password').fill('srigorack2024');
  await page.getByTestId('admin-login-btn').click();
  await expect(page.getByTestId('admin-dashboard')).toBeVisible();
}

export async function checkForErrors(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const errorElements = Array.from(
      document.querySelectorAll('.error, [class*="error"], [id*="error"]')
    );
    return errorElements.map(el => el.textContent || '').filter(Boolean);
  });
}
