import { test, expect } from '@playwright/test';

test.describe('Navigation and CTAs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Fluxo F - should navigate via header links correctly', async ({ page }) => {
    await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'A RECOM' }).click();
    await expect(page).toHaveURL(/.*\/a-recom/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    await page.getByRole('link', { name: 'RECOM Metal Duro - Início' }).click();
    await expect(page).toHaveURL(/.*\/recom-final-1\/(#\/)?$/);
  });

  test('Fluxo F - header CTA phone and email links should have correct href', async ({ page }) => {
    const phoneLink = page.locator('header a[href^="tel:"]').first();
    await expect(phoneLink).toHaveAttribute('href', /tel:\+5519/);

    const emailLink = page.locator('header a[href^="mailto:"]').first();
    await expect(emailLink).toHaveAttribute('href', /mailto:/);
  });

  test('Fluxo F - footer should contain all key links and social/contact CTAs', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer.getByText('Fornecedores', { exact: true })).toBeVisible();
    await expect(footer.getByText('Soluções', { exact: true })).toBeVisible();
    
    const phoneLink = footer.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();

    const wppCta = footer.getByRole('link', { name: /Falar com a RECOM/i });
    await expect(wppCta).toHaveAttribute('href', /https:\/\/wa\.me\//);
  });

  test('Fluxo F - 404 page recovery', async ({ page }) => {
    await page.goto('/#/rota-invalida-404-teste');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Página não encontrada');
    await page.getByRole('link', { name: 'Voltar ao início' }).click();
    await expect(page).toHaveURL(/.*\/recom-final-1\/(#\/)?$/);
  });

  test('Fluxo C - mobile menu should open/close and have actionable contacts', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const menuButton = page.getByRole('button', { name: /Abrir menu de navegação|Fechar menu de navegação/i });
    await menuButton.click();

    const mobileNav = page.getByRole('navigation', { name: 'Navegação principal' });
    await mobileNav.getByRole('link', { name: 'Contato' }).click();
    await expect(page).toHaveURL(/.*\/contato/);

    // Verify contacts are actionable on the contact page
    const emailLink = page.locator('a[href^="mailto:"]').last();
    await expect(emailLink).toBeVisible();

    const whatsappFab = page.locator('a[aria-label="Falar com a RECOM pelo WhatsApp"]');
    if (await whatsappFab.isVisible()) {
      const box = await whatsappFab.boundingBox();
      expect(box.y).toBeGreaterThan(300);
    }
  });
});
