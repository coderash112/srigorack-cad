import { test, expect } from '@playwright/test';
import { waitForAppReady, dismissToasts } from '../fixtures/helpers';

test.describe('Core Navigation & Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await dismissToasts(page);
    await page.evaluate(() => {
      const badge = document.querySelector('[class*="emergent"], [id*="emergent-badge"]');
      if (badge) (badge as HTMLElement).remove();
    });
  });

  test('homepage loads with hero section', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId('home-page')).toBeVisible();
    await expect(page.getByTestId('hero-section')).toBeVisible();
    await expect(page.getByTestId('hero-headline')).toBeVisible();
    await expect(page.getByTestId('hero-subheadline')).toBeVisible();
  });

  test('homepage has navbar with all links', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId('navbar')).toBeVisible();
    await expect(page.getByTestId('navbar-logo')).toBeVisible();
    await expect(page.getByTestId('nav-link-home')).toBeVisible();
    await expect(page.getByTestId('nav-link-designs')).toBeVisible();
    await expect(page.getByTestId('nav-link-pricing')).toBeVisible();
    await expect(page.getByTestId('nav-link-about-us')).toBeVisible();
    await expect(page.getByTestId('nav-link-contact')).toBeVisible();
  });

  test('homepage services section renders', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId('services-section')).toBeVisible();
    await expect(page.getByTestId('service-card-0')).toBeVisible();
    await expect(page.getByTestId('service-card-1')).toBeVisible();
    await expect(page.getByTestId('service-card-2')).toBeVisible();
  });

  test('homepage pricing preview section renders', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('pricing-preview-section').scrollIntoViewIfNeeded();
    await expect(page.getByTestId('pricing-preview-0')).toBeVisible();
    await expect(page.getByTestId('pricing-preview-1')).toBeVisible();
    await expect(page.getByTestId('pricing-preview-2')).toBeVisible();
  });

  test('navigate to Designs page via navbar', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('nav-link-designs').click();
    await expect(page.getByTestId('designs-page')).toBeVisible();
    await expect(page.getByTestId('designs-title')).toBeVisible();
  });

  test('navigate to Pricing page via navbar', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('nav-link-pricing').click();
    await expect(page.getByTestId('pricing-page')).toBeVisible();
    await expect(page.getByTestId('pricing-title')).toBeVisible();
  });

  test('navigate to About page via navbar', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('nav-link-about-us').click();
    await expect(page.getByTestId('about-page')).toBeVisible();
    await expect(page.getByTestId('about-title')).toBeVisible();
  });

  test('navigate to Contact page via navbar', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('nav-link-contact').click();
    await expect(page.getByTestId('contact-page')).toBeVisible();
    await expect(page.getByTestId('contact-title')).toBeVisible();
  });

  test('hero CTA buttons navigate correctly', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('hero-cta-designs').click();
    await expect(page.getByTestId('designs-page')).toBeVisible();
  });
});
