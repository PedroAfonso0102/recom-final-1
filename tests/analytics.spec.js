import { test, expect } from '@playwright/test';

const openContactPage = async (page) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Contato' }).first().click();
  await expect(page.locator('form')).toBeVisible();
};

test.describe('Analytics Tracking', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.dataLayer = window.dataLayer || [];
    });
    await page.goto('/');
  });

  test('should track phone link clicks', async ({ page }) => {
    const phoneLink = page.locator('header a[href^="tel:"]').first();
    await phoneLink.click();

    await page.waitForTimeout(100);

    const dataLayer = await page.evaluate(() => window.dataLayer);
    const leadEvent = dataLayer.find(
      (event) => event.event === 'generate_lead' && event.lead_method === 'phone'
    );

    expect(leadEvent).toBeDefined();
    expect(leadEvent.form_name).toBe('Header');
    expect(leadEvent.page_location).toContain('/recom-final-1/');
  });

  test('should track email link clicks', async ({ page }) => {
    const emailLink = page.locator('header a[href^="mailto:"]').first();
    await emailLink.click();

    await page.waitForTimeout(100);

    const dataLayer = await page.evaluate(() => window.dataLayer);
    const leadEvent = dataLayer.find(
      (event) => event.event === 'generate_lead' && event.lead_method === 'email'
    );

    expect(leadEvent).toBeDefined();
    expect(leadEvent.form_name).toBe('Header');
    expect(leadEvent.page_location).toContain('/recom-final-1/');
  });

  test('should track successful form submission with page context', async ({ page }) => {
    await page.addInitScript(() => {
      window.__RECOM_CONTACT_ENDPOINT__ = '/mock-contact-endpoint';
    });

    await page.route('**/mock-contact-endpoint', async (route) => {
      await route.fulfill({
        status: 202,
        contentType: 'application/json',
        body: JSON.stringify({ protocol: 'RECOM-2026-010' }),
      });
    });

    await openContactPage(page);
    await page.locator('input[name="name"]').fill('João Silva');
    await page.locator('input[name="company"]').fill('Indústria S.A.');
    await page.locator('input[name="email"]').fill('joao@industria.com');
    await page.locator('textarea[name="message"]').fill('Preciso de orçamento para fresas.');
    await page.locator('input[name="consent"]').check();
    await page.locator('button[type="submit"]').click();

    await expect(page.getByRole('status')).toContainText('Mensagem enviada.');

    const dataLayer = await page.evaluate(() => window.dataLayer);
    const leadEvent = dataLayer.find(
      (event) => event.event === 'generate_lead' && event.lead_method === 'form'
    );

    expect(leadEvent).toBeDefined();
    expect(leadEvent.form_name).toBe('contact_orcamento');
    expect(leadEvent.page_location).toContain('/contato');
    expect(leadEvent.process_interest).toBe('none');
    expect(leadEvent.supplier_interest).toBe('none');
  });

  test('should track fallback clicks after a submission error', async ({ page }) => {
    await page.addInitScript(() => {
      window.__RECOM_CONTACT_ENDPOINT__ = '/mock-contact-endpoint';
    });

    await page.route('**/mock-contact-endpoint', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Falha temporária.' }),
      });
    });

    await openContactPage(page);
    await page.locator('input[name="name"]').fill('João Silva');
    await page.locator('input[name="company"]').fill('Indústria S.A.');
    await page.locator('input[name="email"]').fill('joao@industria.com');
    await page.locator('textarea[name="message"]').fill('Preciso de orçamento para fresas.');
    await page.locator('input[name="consent"]').check();
    await page.locator('button[type="submit"]').click();

    const alert = page.getByRole('alert');
    await expect(alert).toContainText('Falha temporária.');
    await alert.getByRole('link', { name: 'WhatsApp' }).click();

    const dataLayer = await page.evaluate(() => window.dataLayer);
    const fallbackEvent = dataLayer.find((event) => event.event === 'contact_fallback_click');

    expect(fallbackEvent).toBeDefined();
    expect(fallbackEvent.channel).toBe('whatsapp');
    expect(fallbackEvent.reason).toBe('error');
    expect(fallbackEvent.form_name).toBe('contact_orcamento');
  });
});
