import { test, expect } from '@playwright/test';

const fillValidContactForm = async (page) => {
  await page.locator('input[name="name"]').fill('João Silva');
  await page.locator('input[name="company"]').fill('Indústria S.A.');
  await page.locator('input[name="email"]').fill('joao@industria.com');
  await page.locator('input[name="phone"]').fill('(19) 99999-0000');
  await page.locator('select[name="supplier"]').selectOption('mitsubishi-materials');
  await page.locator('select[name="process"]').selectOption('fresamento');
  await page.locator('input[name="codes"]').fill('MWS0500SB');
  await page.locator('textarea[name="message"]').fill('Preciso de orçamento para 10 fresas e apoio técnico.');
  await page.locator('input[name="consent"]').check();
};

const openContactPage = async (page) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Contato' }).first().click();
  await expect(page.locator('form')).toBeVisible();
};

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.__RECOM_CONTACT_ENDPOINT__ = '/mock-contact-endpoint';
    });
  });

  // Fluxo A
  test('Fluxo A - usuário quer orçamento rápido a partir da home', async ({ page }) => {
    let receivedPayload = null;
    await page.route('**/mock-contact-endpoint', async (route) => {
      receivedPayload = JSON.parse(route.request().postData() || '{}');
      await route.fulfill({
        status: 202,
        contentType: 'application/json',
        body: JSON.stringify({
          protocol: 'RECOM-FLUXO-A',
          message: 'Mensagem enviada com sucesso.',
        }),
      });
    });

    await page.goto('/');
    // Encontra o CTA na home
    await page.getByRole('link', { name: /Solicitar orçamento/i }).first().click();
    await expect(page).toHaveURL(/.*\/contato/);
    await expect(page.locator('form')).toBeVisible();

    await fillValidContactForm(page);
    await page.locator('button[type="submit"]').click();

    await expect(page.getByRole('status')).toContainText('Mensagem enviada com sucesso.');
    expect(receivedPayload).not.toBeNull();
    expect(receivedPayload.lead.email).toBe('joao@industria.com');
  });

  // Fluxo B
  test('Fluxo B - usuário com erro no formulário preenche e envia com sucesso', async ({ page }) => {
    await page.route('**/mock-contact-endpoint', async (route) => {
      await route.fulfill({
        status: 202,
        contentType: 'application/json',
        body: JSON.stringify({ protocol: 'RECOM-FLUXO-B', message: 'Ok' }),
      });
    });

    await openContactPage(page);
    
    // Tentativa de envio vazio
    await page.locator('button[type="submit"]').click();
    await expect(page.getByText('Informe seu nome.')).toBeVisible();
    await expect(page.getByText('Por favor, preencha os campos destacados em vermelho para podermos retornar o contato.')).toBeVisible();
    
    // Foco no primeiro campo com erro
    await expect(page.locator('#contact-name')).toBeFocused();
    
    // Preenchimento parcial e submissão
    await page.locator('input[name="name"]').fill('Maria Silva');
    await page.locator('input[name="email"]').fill('maria-invalid');
    await page.locator('button[type="submit"]').click();

    // Preservação dos dados
    await expect(page.locator('input[name="name"]')).toHaveValue('Maria Silva');
    await expect(page.getByText('Informe um e-mail válido.')).toBeVisible();

    // Preenchimento correto
    await page.locator('input[name="company"]').fill('Tech Corp');
    await page.locator('input[name="email"]').fill('maria@techcorp.com');
    await page.locator('textarea[name="message"]').fill('Mensagem de teste.');
    await page.locator('input[name="consent"]').check();

    // Submissão bem-sucedida
    await page.locator('button[type="submit"]').click();
    await expect(page.getByRole('status')).toContainText('Ok');
    await expect(page.locator('form')).not.toBeVisible();
  });

  test('validates required fields and focuses the first error', async ({ page }) => {
    await openContactPage(page);
    await page.locator('button[type="submit"]').click();

    await expect(page.getByText('Informe seu nome.')).toBeVisible();
    await expect(page.getByText('Informe sua empresa.')).toBeVisible();
    await expect(page.getByText('Informe seu e-mail.')).toBeVisible();
    await expect(page.getByText('Descreva a sua necessidade.')).toBeVisible();
    await expect(page.getByText('Autorize o retorno comercial da RECOM.')).toBeVisible();
    await expect(page.locator('#contact-name')).toBeFocused();
    await expect(page.getByRole('alert').first()).toBeVisible();
  });

  test('validates e-mail format', async ({ page }) => {
    await openContactPage(page);
    await page.locator('input[name="name"]').fill('João Silva');
    await page.locator('input[name="company"]').fill('Indústria S.A.');
    await page.locator('input[name="email"]').fill('invalid-email');
    await page.locator('textarea[name="message"]').fill('Preciso de orçamento para fresas.');
    await page.locator('input[name="consent"]').check();
    await page.locator('button[type="submit"]').click();

    await expect(page.getByText('Informe um e-mail válido.')).toBeVisible();
  });

  test('preserves data after a server error and shows fallback contacts', async ({ page }) => {
    await page.route('**/mock-contact-endpoint', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Falha temporária.' }),
      });
    });

    await openContactPage(page);
    await fillValidContactForm(page);
    await page.locator('button[type="submit"]').click();

    const alert = page.getByRole('alert');
    await expect(alert).toContainText('Falha temporária.');
    await expect(page.locator('input[name="name"]')).toHaveValue('João Silva');
    await expect(alert.getByRole('link', { name: 'WhatsApp' })).toBeVisible();
  });

  test('prevents duplicate submissions while the request is in flight', async ({ page }) => {
    let requestCount = 0;
    await page.route('**/mock-contact-endpoint', async (route) => {
      requestCount += 1;
      await new Promise((resolve) => setTimeout(resolve, 500));
      await route.fulfill({
        status: 202,
        contentType: 'application/json',
        body: JSON.stringify({ protocol: 'RECOM-2026-002', message: 'Mensagem enviada.' }),
      });
    });

    await openContactPage(page);
    await fillValidContactForm(page);

    const submit = page.locator('button[type="submit"]');
    await submit.click();
    await submit.click({ force: true }).catch(() => {});

    await expect(submit).toHaveText('Enviando...');
    await expect(page.getByRole('status')).toContainText('Mensagem enviada.');
    expect(requestCount).toBe(1);
  });

  test('shows fallback messaging when no endpoint is configured', async ({ page }) => {
    await page.addInitScript(() => {
      window.__RECOM_CONTACT_ENDPOINT__ = '';
    });
    await openContactPage(page);
    await fillValidContactForm(page);
    await page.locator('button[type="submit"]').click();

    const alert = page.getByRole('alert');
    await expect(alert).toContainText('O canal online de contato está indisponível no momento.');
    await expect(alert.getByRole('link', { name: 'Ligar agora' })).toBeVisible();
    await expect(alert.getByRole('link', { name: 'WhatsApp' })).toBeVisible();
  });
});
