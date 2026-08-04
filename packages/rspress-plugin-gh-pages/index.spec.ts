import { describe, expect, test } from '../../e2e/test.ts';
import { useRspressDevServer } from '../../e2e/utils.ts';

const pageUrl = useRspressDevServer(import.meta.dirname);

describe('rspress-plugin-gh-pages', () => {
  // Covers base-path inference from the configured GitHub repository URL.
  test('serves docs from the inferred repository base', async ({ page }) => {
    await page.goto(pageUrl('/rspress-plugins/'));

    await expect(page).toHaveURL(/\/rspress-plugins\/$/);
    await expect(
      page.getByRole('heading', { name: 'RSPress x GH Pages' }),
    ).toBeVisible();
  });

  // Covers propagation of the inferred base to generated asset URLs.
  test('prefixes generated assets with the inferred base', async ({ page }) => {
    await page.goto(pageUrl('/rspress-plugins/'));

    const assetPaths = await page
      .locator('script[src], link[rel="stylesheet"]')
      .evaluateAll((elements) =>
        elements.map((element) => {
          const url = new URL(
            element.getAttribute('src') ?? element.getAttribute('href') ?? '',
            location.href,
          );
          return url.pathname;
        }),
      );

    expect(assetPaths.length).toBeGreaterThan(0);
    expect(
      assetPaths.every((pathname) => pathname.startsWith('/rspress-plugins/')),
    ).toBe(true);
  });
});
