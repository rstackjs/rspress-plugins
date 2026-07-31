import { expect, test } from '@playwright/test';
import { useRspressDevServer } from '../../e2e/utils.ts';

const pageUrl = useRspressDevServer(import.meta.dirname);

test.describe('rspress-plugin-directives', () => {
  // Covers conversion of a named directive to its registered component.
  test('renders the registered directive component', async ({ page }) => {
    await page.goto(pageUrl());

    await expect(
      page.getByRole('heading', {
        name: 'This is Oops directive component.',
      }),
    ).toBeVisible();
  });

  // Covers forwarding quoted and unquoted directive attributes.
  test('forwards directive attributes as component props', async ({ page }) => {
    await page.goto(pageUrl());

    const props = page.locator('pre');
    await expect(props).toContainText('"key1": "value"');
    await expect(props).toContainText('"key2": "value2"');
  });
});
