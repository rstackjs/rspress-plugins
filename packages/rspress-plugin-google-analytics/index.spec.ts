import { beforeEach, describe, expect, test } from '../../e2e/test.ts';
import { useRspressDevServer } from '../../e2e/utils.ts';

const pageUrl = useRspressDevServer(import.meta.dirname);

describe('rspress-plugin-google-analytics', () => {
  beforeEach(async ({ page }) => {
    await page.route('https://www.googletagmanager.com/**', (route) =>
      route.abort(),
    );
  });

  // Covers injection of Google Analytics connection and loader tags.
  test('injects analytics tags for the primary ID', async ({ page }) => {
    await page.goto(pageUrl());

    await expect(
      page.locator(
        'link[rel="preconnect"][href="https://www.google-analytics.com"]',
      ),
    ).toHaveCount(1);
    await expect(
      page.locator(
        'script[src="https://www.googletagmanager.com/gtag/js?id=G-E2EPRIMARY"]',
      ),
    ).toHaveCount(1);
  });

  // Covers multi-ID configuration, IP anonymization, and page-view reporting.
  test('configures every ID and reports the page view', async ({ page }) => {
    await page.goto(pageUrl());

    await expect
      .poll(
        () =>
          page.evaluate(() => {
            const analyticsWindow = window as typeof window & {
              dataLayer: ArrayLike<unknown>[];
            };
            return analyticsWindow.dataLayer.map((entry) => Array.from(entry));
          }),
        { timeout: 5_000 },
      )
      .toEqual(
        expect.arrayContaining([
          ['config', 'G-E2EPRIMARY', { anonymize_ip: true }],
          ['config', 'G-E2ESECONDARY', { anonymize_ip: true }],
          ['set', 'page_path', '/'],
          ['event', 'page_view'],
        ]),
      );
  });
});
