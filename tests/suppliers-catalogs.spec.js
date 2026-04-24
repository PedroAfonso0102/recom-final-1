import { test, expect } from '@playwright/test';

test.describe('Suppliers and Catalogs', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate via base URL explicitly
    await page.goto('/');
    await page.getByRole('link', { name: 'Fornecedores e Catálogos' }).first().click();
    await expect(page.getByRole('heading', { name: 'Fornecedores e Catálogos', level: 1 })).toBeVisible();
  });

  test('should display supplier cards and navigate to details', async ({ page }) => {
    // Look for link near it within the same card context
    // Actually we can just locate all links that say "Ver fornecedor"
    const cardLinks = page.getByRole('link', { name: /Ver fornecedor/i });
    await expect(cardLinks.first()).toBeVisible();

    // Get the href of the first supplier link
    const supplierUrl = await cardLinks.first().getAttribute('href');

    // Click and check if it navigates to the detailed page
    await cardLinks.first().click();
    await expect(page).toHaveURL(new RegExp('.*' + supplierUrl.replace('/', '\\/')));

    // Check that we have external catalog links or a contact CTA as fallback
    // Try to find the catalog link
    const externalCatalogLink = page.getByRole('link', { name: /catálogo|oficial|ver|acessar/i });
    if (await externalCatalogLink.count() > 0) {
        await expect(externalCatalogLink.first()).toBeVisible();
    } else {
        // Fallback CTA is just any link that asks to contact or something similar
        await expect(page.locator('a[href="/contato"]')).first().toBeVisible();
    }
  });

  test('should inform user when opening external catalog', async ({ page }) => {
    // Expand the catalog disclosure if any
    const summary = page.locator('summary', { hasText: /Catálogos/i }).first();
    if (await summary.isVisible()) {
        await summary.click();
    }

    // Check for target="_blank" and visual hints on external links
    const externalLinks = page.locator('a[target="_blank"]');
    if (await externalLinks.count() > 0) {
      await expect(externalLinks.first()).toHaveAttribute('rel', /noopener/);
    }
  });
});
