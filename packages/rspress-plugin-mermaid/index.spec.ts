import { describe, expect, test } from '../../e2e/test.ts';
import { useRspressDevServer } from '../../e2e/utils.ts';

const pageUrl = useRspressDevServer(import.meta.dirname);

describe('rspress-plugin-mermaid', () => {
  // Covers conversion of the Mermaid code block to an SVG diagram.
  test('renders the diagram as SVG', async ({ page }) => {
    await page.goto(pageUrl());

    await expect(page.locator('svg[id^="_r_"]').first()).toBeVisible();
    await expect(page.locator('code.language-mermaid')).toHaveCount(0);
  });

  // Covers preservation of node and edge-label content during rendering.
  test('renders diagram labels', async ({ page }) => {
    await page.goto(pageUrl());

    const diagram = page.locator('svg[id^="_r_"]').first();
    await expect(diagram).toContainText('Christmas');
    await expect(diagram).toContainText('Get money');
    await expect(diagram).toContainText('Go shopping');
  });

  // Covers concurrent renders: two renderer instances mount at the same time;
  // mermaid's internal render queue serializes them and both must produce
  // correct output.
  test('renders multiple diagrams concurrently', async ({ page }) => {
    await page.goto(pageUrl());

    await expect(
      page.locator('svg[id^="_r_"]', { hasText: 'Christmas' }),
    ).toBeVisible();
    await expect(
      page.locator('svg[id^="_r_"]', { hasText: 'Alice' }),
    ).toBeVisible();
  });

  // Covers the MutationObserver path: injecting the dark class must re-render
  // the diagram with the dark theme.
  test('re-renders on dark mode toggle', async ({ page }) => {
    await page.goto(pageUrl());

    const diagram = page.locator('svg[id^="_r_"]').first();
    await expect(diagram).toBeVisible();

    const lightMarkup = await diagram.evaluate((element) => element.outerHTML);

    await page.evaluate(() => document.documentElement.classList.add('dark'));

    await expect
      .poll(async () =>
        page
          .locator('svg[id^="_r_"]')
          .first()
          .evaluate((element) => element.outerHTML),
      )
      .not.toBe(lightMarkup);
  });

  // Covers the error path: an invalid diagram renders nothing and valid
  // diagrams keep rendering.
  test('skips invalid diagrams without breaking valid ones', async ({
    page,
  }) => {
    await page.goto(pageUrl());

    await expect(
      page.locator('svg[id^="_r_"]', { hasText: 'Christmas' }),
    ).toBeVisible();
    await expect(
      page.locator('svg', { hasText: 'this-is-not-a-valid-diagram-type' }),
    ).toHaveCount(0);
  });
});
