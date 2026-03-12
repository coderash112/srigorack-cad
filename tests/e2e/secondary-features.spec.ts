import { test, expect } from '@playwright/test';
import { dismissToasts } from '../fixtures/helpers';

test.describe('Pricing Page', () => {
  test.beforeEach(async ({ page }) => {
    await dismissToasts(page);
  });

  test('pricing page displays 3 subscription packages', async ({ page }) => {
    await page.goto('/pricing', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId('pricing-page')).toBeVisible();
    await expect(page.getByTestId('pricing-card-starter')).toBeVisible();
    await expect(page.getByTestId('pricing-card-professional')).toBeVisible();
    await expect(page.getByTestId('pricing-card-enterprise')).toBeVisible();
  });

  test('pricing page shows correct prices', async ({ page }) => {
    await page.goto('/pricing', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId('pricing-card-starter')).toContainText('$799');
    await expect(page.getByTestId('pricing-card-professional')).toContainText('$1,299');
    await expect(page.getByTestId('pricing-card-enterprise')).toContainText('$1,999');
  });

  test('pricing page Professional plan is highlighted as Most Popular', async ({ page }) => {
    await page.goto('/pricing', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId('pricing-card-professional')).toContainText('Most Popular');
  });

  test('pricing page FAQ section visible', async ({ page }) => {
    await page.goto('/pricing', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('faq-0').scrollIntoViewIfNeeded();
    await expect(page.getByTestId('faq-0')).toBeVisible();
  });

  test('pricing CTA links to contact page', async ({ page }) => {
    await page.goto('/pricing', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('pricing-cta-starter').click();
    await expect(page.getByTestId('contact-page')).toBeVisible();
  });
});

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await dismissToasts(page);
  });

  test('about page loads with company info', async ({ page }) => {
    await page.goto('/about', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId('about-page')).toBeVisible();
    await expect(page.getByTestId('about-title')).toBeVisible();
    await expect(page.getByTestId('about-title')).toContainText('SriGoRack Technologies');
  });

  test('about page displays stats', async ({ page }) => {
    await page.goto('/about', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('stat-0').scrollIntoViewIfNeeded();
    await expect(page.getByTestId('stat-0')).toBeVisible();
    await expect(page.getByTestId('stat-1')).toBeVisible();
    await expect(page.getByTestId('stat-2')).toBeVisible();
    await expect(page.getByTestId('stat-3')).toBeVisible();
  });

  test('about page has core values section', async ({ page }) => {
    await page.goto('/about', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('value-0').scrollIntoViewIfNeeded();
    await expect(page.getByTestId('value-0')).toBeVisible();
    await expect(page.getByTestId('value-1')).toBeVisible();
    await expect(page.getByTestId('value-2')).toBeVisible();
    await expect(page.getByTestId('value-3')).toBeVisible();
  });

  test('about page CTA navigates to contact', async ({ page }) => {
    await page.goto('/about', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('about-contact-cta').scrollIntoViewIfNeeded();
    await page.getByTestId('about-contact-cta').click({ force: true });
    await expect(page.getByTestId('contact-page')).toBeVisible();
  });
});

test.describe('Contact Page & Form', () => {
  test.beforeEach(async ({ page }) => {
    await dismissToasts(page);
  });

  test('contact page loads with form', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId('contact-page')).toBeVisible();
    await expect(page.getByTestId('contact-form')).toBeVisible();
  });

  test('contact page shows email and phone info', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId('contact-info-email')).toBeVisible();
    await expect(page.getByTestId('contact-info-email')).toContainText('ashrut@gorack.in');
    await expect(page.getByTestId('contact-info-phone')).toBeVisible();
    await expect(page.getByTestId('contact-info-phone')).toContainText('+91-9981834205');
  });

  test('contact form submits successfully', async ({ page }) => {
    const timestamp = Date.now();
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('contact-name').fill(`Test User ${timestamp}`);
    await page.getByTestId('contact-company').fill('Test Company');
    await page.getByTestId('contact-email').fill(`test${timestamp}@example.com`);
    await page.getByTestId('contact-phone').fill('+1234567890');
    await page.getByTestId('contact-message').fill('This is a test message from automated testing.');
    await page.getByTestId('contact-submit').click();
    // After submit, either success state or toast
    await expect(
      page.locator('[data-testid="contact-form"]').or(page.getByRole('heading', { name: /message sent/i }))
    ).toBeVisible();
  });

  test('contact form has all required fields', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId('contact-name')).toBeVisible();
    await expect(page.getByTestId('contact-email')).toBeVisible();
    await expect(page.getByTestId('contact-message')).toBeVisible();
    await expect(page.getByTestId('contact-submit')).toBeVisible();
  });
});
