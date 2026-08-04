import { describe, expect, test } from '../../e2e/test.ts';
import { useRspressDevServer } from '../../e2e/utils.ts';

const pageUrl = useRspressDevServer(import.meta.dirname);

describe('rspress-plugin-align-image', () => {
  // Covers the plugin's wrapper transformation and configured alignment.
  test('wraps a standalone image with configured classes', async ({ page }) => {
    await page.goto(pageUrl());

    const wrapper = page.locator('.e2e-align-image');
    await expect(wrapper).toHaveClass(
      /\bmy-4\b.*\bflex\b.*\bflex-row\b.*\bjustify-end\b/,
    );
    await expect(wrapper).toHaveJSProperty('tagName', 'DIV');
  });

  // Covers preservation of the original image attributes and asset loading.
  test('preserves the transformed image', async ({ page }) => {
    await page.goto(pageUrl());

    const image = page.getByRole('img', { name: 'unicorn' });
    await expect(image).toBeVisible();
    await expect(image).toHaveJSProperty('complete', true);
    expect(
      await image.evaluate((element: HTMLImageElement) => element.naturalWidth),
    ).toBeGreaterThan(0);
  });
});
