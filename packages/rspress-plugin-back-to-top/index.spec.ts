import { expect, test } from '@playwright/test';
import { useRspressDevServer } from '../../e2e/utils.ts';

const pageUrl = useRspressDevServer(import.meta.dirname);

test.describe('rspress-plugin-back-to-top', () => {
  // Covers the plugin's configured scroll threshold.
  test('shows the control only after scrolling past the threshold', async ({
    page,
  }) => {
    await page.goto(pageUrl());

    const control = page.locator('.rp-back-to-top');
    await expect(control).toHaveAttribute('data-visible', 'false');
    await page.evaluate(() =>
      window.scrollTo(0, document.documentElement.scrollHeight),
    );
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(100);
    await expect(control).toHaveAttribute('data-visible', 'true');
  });

  // Covers the control's primary scroll-to-top interaction.
  test('returns to the top when clicked', async ({ page }) => {
    await page.goto(pageUrl());
    await page.evaluate(() =>
      window.scrollTo(0, document.documentElement.scrollHeight),
    );
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(100);

    const control = page.locator('.rp-back-to-top');
    await expect(control).toHaveAttribute('data-visible', 'true');
    await control.click();

    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await expect(control).toHaveAttribute('data-visible', 'false');
  });
});
