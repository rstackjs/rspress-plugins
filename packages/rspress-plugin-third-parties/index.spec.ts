import {
  beforeEach,
  describe,
  expect,
  test,
  type PlaywrightFixture,
} from '../../e2e/test.ts';
import { useRspressDevServer } from '../../e2e/utils.ts';

const pageUrl = useRspressDevServer(import.meta.dirname);

describe('rspress-plugin-third-parties', () => {
  beforeEach<PlaywrightFixture>(async ({ page }) => {
    // Verify the local integration without executing third-party scripts.
    await page.route('**/*', (route) => {
      const url = new URL(route.request().url());
      return url.hostname === 'localhost' ? route.continue() : route.abort();
    });
  });

  test('loads the built global analytics component', async ({ page }) => {
    await page.goto(pageUrl('/rspress-plugin-third-parties/index.html'));

    await expect(page.locator('#_rspress-ga-init-GA-ID')).toHaveCount(1);
    await expect(
      page.locator(
        'script[src="https://www.googletagmanager.com/gtag/js?id=GA-ID"]',
      ),
    ).toHaveCount(1);
  });

  test('loads the package components in MDX', async ({ page }) => {
    await page.goto(pageUrl('/rspress-plugin-third-parties/demo.html'));

    await expect(page.locator('lite-youtube')).toHaveAttribute(
      'videoid',
      'sSbDtQTtwBY',
    );
    await expect(
      page.locator('iframe[src*="google.com/maps/embed"]'),
    ).toHaveCount(1);
    await expect(page.locator('#san-web-maker-demo')).toHaveAttribute(
      'data-rspress-script',
      'lazyOnload',
    );
  });
});
