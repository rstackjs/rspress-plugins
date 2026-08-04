import {
  beforeEach,
  describe,
  expect,
  test,
  type PlaywrightFixture,
} from '../../e2e/test.ts';
import { useRspressDevServer } from '../../e2e/utils.ts';

const pageUrl = useRspressDevServer(import.meta.dirname);

describe('rspress-plugin-vercel-analytics', () => {
  beforeEach<PlaywrightFixture>(async ({ page }) => {
    await page.route('https://va.vercel-scripts.com/**', (route) =>
      route.abort(),
    );
  });

  // Covers analytics injection using the development-mode script.
  test('injects the Vercel Analytics script', async ({ page }) => {
    await page.goto(pageUrl());

    const script = page.locator(
      'script[src="https://va.vercel-scripts.com/v1/script.debug.js"]',
    );
    await expect(script).toHaveAttribute('data-sdkn', '@vercel/analytics');
    await expect(script).toHaveAttribute('defer', '');
  });

  // Covers forwarding endpoint and auto-tracking options to the SDK.
  test('forwards configured analytics options', async ({ page }) => {
    await page.goto(pageUrl());

    const script = page.locator('script[data-sdkn="@vercel/analytics"]');
    await expect(script).toHaveAttribute('data-endpoint', '/e2e-insights');
    await expect(script).toHaveAttribute('data-disable-auto-track', '1');
    expect(await page.evaluate(() => typeof window.va)).toBe('function');
  });
});
