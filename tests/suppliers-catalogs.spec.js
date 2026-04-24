import { test, expect } from '@playwright/test';

test.describe('Suppliers, Catalogs and Processes Flows', () => {

  test('Fluxo D - usuário por fornecedor', async ({ page }) => {
    // Acessa via home ou página de fornecedores
    await page.goto('/');
    await page.getByRole('link', { name: /Ver fornecedores e catálogos/i }).first().click();
    await expect(page).toHaveURL(/.*\/fornecedores-catalogos/);

    const cardLinks = page.getByRole('link', { name: /Ver fornecedor/i });
    await expect(cardLinks.first()).toBeVisible();

    // Navega para a página de detalhe
    const supplierUrl = await cardLinks.first().getAttribute('href');
    await cardLinks.first().click();
    await expect(page).toHaveURL(new RegExp('.*' + supplierUrl.replace('/', '\\/')));

    // Verifica se existe catálogo externo ou fallback para contato
    const externalCatalogLink = page.getByRole('link', { name: /catálogo|oficial/i });
    const fallbackContactLink = page.locator('a[href="/contato"]');

    const hasCatalog = await externalCatalogLink.count() > 0;
    const hasContact = await fallbackContactLink.count() > 0;

    expect(hasCatalog || hasContact).toBeTruthy();
  });

  test('Fluxo E - usuário por processo', async ({ page }) => {
    // Acessa via home
    await page.goto('/');
    
    // Pode clicar no card da Home "Ver soluções por processo"
    const btnSolucoes = page.getByRole('link', { name: /Ver soluções por processo/i }).first();
    await btnSolucoes.click();
    await expect(page).toHaveURL(/.*\/solucoes/);

    // Navega para o primeiro processo
    const processLinks = page.getByRole('link', { name: /Ver processo/i });
    await expect(processLinks.first()).toBeVisible();
    
    const processUrl = await processLinks.first().getAttribute('href');
    await processLinks.first().click();
    await expect(page).toHaveURL(new RegExp('.*' + processUrl.replace('/', '\\/')));

    // Verifica CTA para fornecedores ou fallback de contato
    const fornecedoresCTA = page.getByRole('link', { name: /Ver fornecedor/i });
    const fallbackContactLink = page.locator('a[href="/contato"]');

    const hasFornecedores = await fornecedoresCTA.count() > 0;
    const hasContact = await fallbackContactLink.count() > 0;

    expect(hasFornecedores || hasContact).toBeTruthy();
  });

  test('should inform user when opening external catalog', async ({ page }) => {
    await page.goto('/fornecedores-catalogos/mitsubishi-materials'); // Ajuste para rota direta

    const externalLinks = page.locator('a[target="_blank"]');
    if (await externalLinks.count() > 0) {
      await expect(externalLinks.first()).toHaveAttribute('rel', /noopener/);
    }
  });
});
