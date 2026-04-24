import { test, expect } from '@playwright/test';

test.describe('Analytics Tracking', () => {
  test.beforeEach(async ({ page }) => {
    // Inject a spy into window.dataLayer before page load
    await page.addInitScript(() => {
      window.dataLayer = window.dataLayer || [];
      // We can't directly mock array push easily in a way that PW can assert without polling,
      // but we can expose a way to read it.
    });
    await page.goto('/');
  });

  test('should track phone link clicks', async ({ page }) => {
    const phoneLink = page.locator('header a[href^="tel:"]').first();
    await phoneLink.click();

    // Give it a tiny bit of time for the event loop
    await page.waitForTimeout(100);

    const dataLayer = await page.evaluate(() => window.dataLayer);

    // Check if the generate_lead event is in the dataLayer
    const leadEvent = dataLayer.find(event => event.event === 'generate_lead' && event.lead_method === 'phone');
    expect(leadEvent).toBeDefined();
    expect(leadEvent.form_name).toBe('Header');
  });

  test('should track email link clicks', async ({ page }) => {
    const emailLink = page.locator('header a[href^="mailto:"]').first();
    await emailLink.click();

    await page.waitForTimeout(100);

    const dataLayer = await page.evaluate(() => window.dataLayer);

    const leadEvent = dataLayer.find(event => event.event === 'generate_lead' && event.lead_method === 'email');
    expect(leadEvent).toBeDefined();
    expect(leadEvent.form_name).toBe('Header');
  });

  test('should track form submission', async ({ page }) => {
    // Go to contact page
    await page.getByRole('link', { name: 'Contato' }).first().click();
    await expect(page.locator('form')).toBeVisible();

    // Fill valid data
    await page.locator('input[name="name"]').fill('João Silva');
    await page.locator('input[name="company"]').fill('Indústria S.A.');
    await page.locator('input[name="email"]').fill('joao@industria.com');
    await page.locator('input[name="subject"]').fill('Orçamento de fresas');
    await page.locator('textarea[name="message"]').fill('Preciso de orçamento para 10 fresas.');
    await page.locator('input[name="consent"]').check();

    // Submit
    await page.locator('button[type="submit"]').click();
    await expect(page.getByText(/Solicitação recebida/i)).toBeVisible();

    const dataLayer = await page.evaluate(() => window.dataLayer);

    const leadEvent = dataLayer.find(event => event.event === 'generate_lead' && event.lead_method === 'form');
    expect(leadEvent).toBeDefined();
    expect(leadEvent.form_name).toBe('Contact Form');
  });
});
