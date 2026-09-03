import { describe, expect, test } from '../../e2e/test.ts';
import { useRspressDevServer } from '../../e2e/utils.ts';

const pageUrl = useRspressDevServer(import.meta.dirname);

describe('rspress-plugin-file-tree', () => {
  // Covers structured rendering and the configured initial expansion depth.
  test('renders a structured, initially expanded tree', async ({ page }) => {
    await page.goto(pageUrl());

    const fileTree = page
      .locator('div[class^="container-"]')
      .filter({
        has: page.getByText('rspress.config.ts', { exact: true }),
      })
      .first();
    const srcRow = fileTree.getByText('src', { exact: true }).locator('..');
    const srcChevron = srcRow.locator('[data-expanded]');
    const components = fileTree.getByText('components', { exact: true });

    await expect(fileTree).toBeVisible();
    await expect(srcRow.locator('svg')).toHaveCount(2);
    await expect(srcRow.locator('svg').last()).toBeVisible();
    await expect(srcChevron).toHaveAttribute('data-expanded', 'true');
    await expect(components).toBeVisible();
  });

  // Covers the interactive folder collapse and re-expand behavior.
  test('toggles a directory', async ({ page }) => {
    await page.goto(pageUrl());

    const fileTree = page
      .locator('div[class^="container-"]')
      .filter({
        has: page.getByText('rspress.config.ts', { exact: true }),
      })
      .first();
    const srcRow = fileTree.getByText('src', { exact: true }).locator('..');
    const srcChevron = srcRow.locator('[data-expanded]');
    const components = fileTree.getByText('components', { exact: true });
    await srcRow.click();

    await expect(srcChevron).toHaveAttribute('data-expanded', 'false');
    await expect(components).toHaveCount(0);

    await srcRow.click();

    await expect(srcChevron).toHaveAttribute('data-expanded', 'true');
    await expect(components).toBeVisible();
  });
});
