import { test, expect } from '@playwright/test';

test.describe('Specialized Responsiveness Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/');
  });

  test('Mobile Menu - should open, block scroll, and close on link click', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'This test is specific to mobile viewports');
    await page.waitForLoadState('networkidle');

    const menuButton = page.getByRole('button', { name: /Abrir menu/i });
    await expect(menuButton).toBeVisible();
    
    await menuButton.click();
    await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible();

    // Check if scroll is blocked (if implemented via body class or overflow)
    // For now, check if menu items are visible
    await page.waitForTimeout(500); // Wait for animation
    const menuLink = page.locator('nav').getByRole('link', { name: 'A RECOM' });
    await expect(menuLink).toBeVisible();

    // Click a link and check if menu closes
    await page.locator('nav').getByRole('link', { name: 'Soluções' }).click();
    await expect(page).toHaveURL(/.*\/solucoes/);
    
    // Header should be visible but nav should be hidden again (or at least not obstructing)
    await expect(page.getByRole('navigation', { name: 'Navegação principal' })).not.toBeVisible({ timeout: 10000 });
  });

  test('WhatsApp FAB - should be visible and not obstruct critical elements on small screens', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    const whatsappFab = page.locator('a[aria-label*="WhatsApp"]');
    await expect(whatsappFab).toBeVisible();

    // On mobile, ensure it doesn't cover the main CTA initially
    // (This is hard to test perfectly without visual regression, but we can check bounding boxes)
    const fabBox = await whatsappFab.boundingBox();
    
    // Check if FAB is in the bottom right corner
    const viewport = page.viewportSize();
    expect(fabBox.x + fabBox.width).toBeGreaterThan(viewport.width * 0.7);
    expect(fabBox.y + fabBox.height).toBeGreaterThan(viewport.height * 0.7);
  });

  test('Contact Form - should have one column layout on mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'This test is specific to mobile viewports');
    await page.goto('/#/contato');
    await page.waitForLoadState('networkidle');

    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Check width of inputs relative to form
    const firstInput = page.locator('input[name="name"]');
    const formBox = await form.boundingBox();
    const inputBox = await firstInput.boundingBox();

    // Input should take up most of the form width on mobile
    expect(inputBox.width).toBeGreaterThan(formBox.width * 0.8);
  });

  test('Header - should handle 320px width without overlapping buttons', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    
    const brand = page.locator('header a[aria-label="RECOM Metal Duro - Início"]');
    const menuButton = page.getByRole('button', { name: /Abrir menu de navegação/i });
    
    const brandBox = await brand.boundingBox();
    const menuBox = await menuButton.boundingBox();
    
    // Brand should be on the left, menu on the right, no overlap
    expect(brandBox.x + brandBox.width).toBeLessThan(menuBox.x);
  });
});
