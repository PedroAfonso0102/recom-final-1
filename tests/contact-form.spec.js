import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate using the base path correctly, handling Vite's base property.
    await page.goto('/');
    // Click the contact button to navigate to it safely from Home since direct route may fail in some SPA setups with playwright dev server
    await page.getByRole('link', { name: 'Contato' }).first().click();
    // Wait for form to appear
    await expect(page.locator('form')).toBeVisible();
  });

  test('should validate required fields and show errors', async ({ page }) => {
    await page.locator('button[type="submit"]').click();

    // Check for custom validation messages
    await expect(page.getByText('O nome é obrigatório.')).toBeVisible();
    await expect(page.getByText('A empresa é obrigatória.')).toBeVisible();
    await expect(page.getByText('O e-mail é obrigatório.')).toBeVisible();
    await expect(page.getByText('O assunto é obrigatório.')).toBeVisible();
    await expect(page.getByText('A mensagem é obrigatória.')).toBeVisible();
    await expect(page.getByText('Você deve aceitar os termos.')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await page.locator('input[name="email"]').fill('invalid-email');
    await page.locator('button[type="submit"]').click();
    await expect(page.getByText('Formato de e-mail inválido.')).toBeVisible();
  });

  test('should submit successfully with valid data', async ({ page }) => {
    await page.locator('input[name="name"]').fill('João Silva');
    await page.locator('input[name="company"]').fill('Indústria S.A.');
    await page.locator('input[name="email"]').fill('joao@industria.com');
    await page.locator('input[name="subject"]').fill('Orçamento de fresas');
    await page.locator('textarea[name="message"]').fill('Preciso de orçamento para 10 fresas.');
    await page.locator('input[name="consent"]').check();

    await page.locator('button[type="submit"]').click();

    await expect(page.getByText(/Solicitação recebida/i)).toBeVisible();
    await expect(page.locator('button[type="submit"]')).not.toBeVisible();
  });

  test('honeypot should silently succeed for bots', async ({ page }) => {
    await page.evaluate(() => {
        const field = document.getElementById('bot_field');
        if (field) field.value = 'im a bot';
    });

    await page.locator('button[type="submit"]').click();

    await expect(page.getByText(/Solicitação recebida/i)).toBeVisible();
    await expect(page.locator('button[type="submit"]')).not.toBeVisible();
  });
});
