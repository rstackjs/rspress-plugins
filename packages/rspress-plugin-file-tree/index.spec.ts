import { expect, test } from '@playwright/test';
import type { ChildProcess } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { killProcess, runDevCommand } from '../../e2e/utils.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe('rspress-plugin-file-tree', () => {
  let devProcess: ChildProcess | undefined;
  let url: string;

  test.beforeAll(async () => {
    const result = await runDevCommand(__dirname);
    devProcess = result.process;
    url = result.url;
  });

  test.afterAll(async () => {
    if (devProcess) {
      await killProcess(devProcess);
    }
  });

  test('should render and toggle a file tree', async ({ page }) => {
    await page.goto(url, { waitUntil: 'networkidle' });

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

    await srcRow.click();

    await expect(srcChevron).toHaveAttribute('data-expanded', 'false');
    await expect(components).toHaveCount(0);

    await srcRow.click();

    await expect(srcChevron).toHaveAttribute('data-expanded', 'true');
    await expect(components).toBeVisible();
  });
});
