import { test, expect } from '@playwright/test';

test.describe('Navigation and CTAs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate via header links correctly', async ({ page }) => {
    // Click "A RECOM" link and check URL/content
    await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'A RECOM' }).click();
    await expect(page).toHaveURL(/.*\/a-recom/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // The logo should navigate back to home
    await page.getByRole('link', { name: 'RECOM Metal Duro - Início' }).click();
    await expect(page).toHaveURL(/.*\/recom-final-1\/(#\/)?$/);
  });

  test('header CTA phone and email links should have correct href', async ({ page }) => {
    const phoneLink = page.locator('header a[href^="tel:"]');
    await expect(phoneLink).toHaveAttribute('href', /tel:\+5519/);

    const emailLink = page.locator('header a[href^="mailto:"]');
    await expect(emailLink).toHaveAttribute('href', /mailto:/);
  });

  test('footer should contain all key links and social/contact CTAs', async ({ page }) => {
    const footer = page.locator('footer');

    // Check main sections
    await expect(footer.getByText('Fornecedores', { exact: true })).toBeVisible();
    await expect(footer.getByText('Soluções', { exact: true })).toBeVisible();
    await expect(footer.getByText('Atendimento', { exact: true })).toBeVisible();

    // Check utility links
    const phoneLink = footer.locator('a[href^="tel:"]');
    await expect(phoneLink).toBeVisible();

    const emailLink = footer.locator('a[href^="mailto:"]');
    await expect(emailLink).toBeVisible();

    const wppCta = footer.getByRole('link', { name: /Falar com a RECOM/i });
    await expect(wppCta).toHaveAttribute('href', /https:\/\/wa\.me\//);
  });

  test('mobile menu should open and close', async ({ page }) => {
    // We can simulate mobile by setting viewport in the test
    await page.setViewportSize({ width: 375, height: 667 });

    const menuButton = page.getByRole('button', { name: /Abrir menu de navegação|Fechar menu de navegação/i });
    await expect(menuButton).toBeVisible();

    // Initially menu is closed
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    // Click to open
    await menuButton.click();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    // The navigation links should now be visible
    await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible();

    // Click close
    await menuButton.click();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });
});
