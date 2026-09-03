import { describe, expect, test } from '../../e2e/test.ts';
import { useRspressDevServer } from '../../e2e/utils.ts';

const pageUrl = useRspressDevServer(import.meta.dirname);

describe('rspress-plugin-mermaid', () => {
  // Covers conversion of the Mermaid code block to an SVG diagram.
  test('renders the diagram as SVG', async ({ page }) => {
    await page.goto(pageUrl());

    await expect(page.locator('svg[id^="_r_"]')).toBeVisible();
    await expect(page.locator('code.language-mermaid')).toHaveCount(0);
  });

  // Covers preservation of node and edge-label content during rendering.
  test('renders diagram labels', async ({ page }) => {
    await page.goto(pageUrl());

    const diagram = page.locator('svg[id^="_r_"]');
    await expect(diagram).toContainText('Christmas');
    await expect(diagram).toContainText('Get money');
    await expect(diagram).toContainText('Go shopping');
  });
});
