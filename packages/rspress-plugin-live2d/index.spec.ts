import { readFile } from 'node:fs/promises';
import * as path from 'node:path';
import { expect, test } from '@playwright/test';
import { useRspressDevServer } from '../../e2e/utils.ts';

const pageUrl = useRspressDevServer(import.meta.dirname);
const sdk = await readFile(
  path.join(import.meta.dirname, 'node_modules/oh-my-live2d/lib/complete.js'),
);

test.describe('rspress-plugin-live2d', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('https://e2e.local/complete.js', (route) =>
      route.fulfill({
        body: sdk,
        contentType: 'application/javascript',
      }),
    );
    await page.route('https://model.oml2d.com/**', (route) => route.abort());
  });

  // Covers dynamic SDK loading through the configured library URL.
  test('loads the configured Live2D SDK', async ({ page }) => {
    const sdkRequest = page.waitForRequest('https://e2e.local/complete.js');
    await page.goto(pageUrl());

    await sdkRequest;
    await expect(page.locator('#oml2d-global-style')).toHaveCount(1);
  });

  // Covers widget mounting and forwarding the configured model URL.
  test('mounts the widget and requests the configured model', async ({
    page,
  }) => {
    const modelRequest = page.waitForRequest(
      'https://model.oml2d.com/HK416-1-normal/model.json',
    );
    await page.goto(pageUrl());

    await modelRequest;
    await expect(page.locator('#oml2d-stage')).toBeAttached();
    await expect(page.locator('#oml2d-canvas')).toBeAttached();
  });
});
