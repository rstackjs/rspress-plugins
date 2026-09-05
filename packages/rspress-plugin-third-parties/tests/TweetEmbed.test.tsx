import { page } from '@rstest/browser';
import { render } from '@rstest/browser-react';
import { beforeEach, describe, expect, rs, test } from '@rstest/core';
import { TweetEmbed } from '../src/components/TweetEmbed';

const mockUseDark = rs.fn(() => false);

rs.mock('@rspress/core/runtime', () => ({
  useDark: () => mockUseDark(),
  usePageData: () => ({ page: {} }),
  useSiteData: () => ({ site: {} }),
}));

describe('TweetEmbed Component', () => {
  const TWEET_ID = '2017178323550605790';

  beforeEach(() => {
    mockUseDark.mockReturnValue(false);
  });

  test("renders tweet container with default 'light' theme when useDark is false", async () => {
    await render(<TweetEmbed id={TWEET_ID} />);

    const figure = page.locator('figure');

    await expect.element(figure).toBeVisible();
    await expect.element(figure).toHaveAttribute('data-theme', 'light');
  });

  test("renders tweet container with 'dark' theme when useDark returns true", async () => {
    mockUseDark.mockReturnValue(true);

    await render(<TweetEmbed id={TWEET_ID} />);

    const figure = page.locator('figure');

    await expect.element(figure).toBeVisible();
    await expect.element(figure).toHaveAttribute('data-theme', 'dark');
  });

  test('allows explicit theme prop to override useDark value', async () => {
    mockUseDark.mockReturnValue(false); // system is light mode

    // Explicitly set theme to dark
    await render(<TweetEmbed id={TWEET_ID} theme="dark" />);

    const figure = page.locator('figure');

    await expect.element(figure).toHaveAttribute('data-theme', 'dark');
  });

  test('renders caption inside figcaption when provided', async () => {
    const captionText = 'Announcement tweet about Rspress';

    await render(
      <TweetEmbed id={TWEET_ID} caption={<span>{captionText}</span>} />,
    );

    const figcaption = page.locator('figcaption');

    await expect.element(figcaption).toBeVisible();
    await expect.element(figcaption).toHaveText(captionText);
  });
});
