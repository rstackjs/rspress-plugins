import { join } from 'node:path';
import {
  beforeEach,
  describe,
  expect,
  test,
  type PlaywrightFixture,
} from '../../../e2e/test.ts';
import { useRspressDevServer } from '../../../e2e/utils.ts';

const pageUrl = useRspressDevServer(join(import.meta.dirname, 'fixture'));
const scenarioUrl = (scenario: string) =>
  pageUrl(`/index.html?scenario=${scenario}`);
const gaScript = 'script[data-rspress-script][src*="gtag/js"]';
const gtmScript = 'script[data-rspress-script][src*="gtm.js"]';
const inlineScript = 'script[data-rspress-script]:not([src])';

beforeEach<PlaywrightFixture>(async ({ page }) => {
  await page.route('**/*', (route) => {
    const url = new URL(route.request().url());
    if (url.hostname === 'localhost') return route.continue();
    // The real browser load event drives Script.onReady; no synthetic events.
    if (url.href === 'https://example.com/test.js') {
      return route.fulfill({
        contentType: 'application/javascript',
        body: 'void 0;',
      });
    }
    return route.abort();
  });
});

describe('GoogleAnalytics', () => {
  test('warns before initialization', async ({ page }) => {
    await page.goto(scenarioUrl('ga-uninitialized'));
    const warning = page.waitForEvent(
      'console',
      (message) => message.type() === 'warning',
    );
    await page.getByRole('button', { name: 'Send GA event' }).click();
    expect((await warning).text()).toBe(
      'Rspress Third Parties: GA has not been initialized',
    );
  });

  test('initializes the default data layer and script URL', async ({
    page,
  }) => {
    await page.goto(scenarioUrl('ga-default'));
    await expect(page.locator(gaScript)).toHaveAttribute(
      'src',
      'https://www.googletagmanager.com/gtag/js?id=G-TEST',
    );
    await expect(page.locator(inlineScript)).toContainText(
      "window['dataLayer']",
    );
    await expect(page.locator(inlineScript)).toContainText(
      "gtag('config', 'G-TEST'",
    );
  });

  test('enables debug mode', async ({ page }) => {
    await page.goto(scenarioUrl('ga-debug'));
    await expect(page.locator(inlineScript)).toContainText(
      "{ 'debug_mode': true }",
    );
  });

  test('sends events to a custom data layer', async ({ page }) => {
    await page.goto(scenarioUrl('ga-custom'));
    await expect(page.locator(inlineScript)).toContainText(
      "window['customDataLayer']",
    );
    await page.getByRole('button', { name: 'Send GA event' }).click();
    expect(
      await page.evaluate(() => {
        const win = window as unknown as { customDataLayer: IArguments[] };
        return Array.from(win.customDataLayer.at(-1)!);
      }),
    ).toEqual(['event', 'button_click', { button_id: 'submit-btn' }]);
  });

  test('sets both nonces even when Google inserts another script', async ({
    page,
  }) => {
    await page.goto(scenarioUrl('ga-nonce'));
    await expect(page.locator(gaScript)).toHaveCount(1);
    await page.evaluate(() => {
      const script = document.createElement('script');
      script.type = 'application/json';
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-TEST&cx=c';
      document.head.appendChild(script);
    });
    await expect(page.locator('script[src*="gtag/js"]')).toHaveCount(2);
    await expect(page.locator(gaScript)).toHaveAttribute(
      'nonce',
      'csp-nonce-12345',
    );
    await expect(page.locator(inlineScript)).toHaveAttribute(
      'nonce',
      'csp-nonce-12345',
    );
  });

  test('sends the event payload after initialization', async ({ page }) => {
    await page.goto(scenarioUrl('ga-event'));
    await expect(page.locator(inlineScript)).toHaveCount(1);
    await page.getByRole('button', { name: 'Send GA event' }).click();
    expect(
      await page.evaluate(() => {
        const win = window as unknown as { dataLayer: IArguments[] };
        return Array.from(win.dataLayer.at(-1)!);
      }),
    ).toEqual(['event', 'button_click', { button_id: 'submit-btn' }]);
  });
});

describe('GoogleTagManager', () => {
  test('initializes the default script URL', async ({ page }) => {
    await page.goto(scenarioUrl('gtm-default'));
    await expect(page.locator(gtmScript)).toHaveAttribute(
      'src',
      'https://www.googletagmanager.com/gtm.js?id=GTM-TEST',
    );
    await expect(page.locator(inlineScript)).toContainText('w[l]=w[l]||[]');
  });

  test('includes auth, preview and custom data layer parameters', async ({
    page,
  }) => {
    await page.goto(scenarioUrl('gtm-advanced'));
    await expect(page.locator(gtmScript)).toHaveCount(1);
    const url = new URL((await page.locator(gtmScript).getAttribute('src'))!);
    expect(Object.fromEntries(url.searchParams)).toEqual({
      id: 'GTM-TEST',
      l: 'customDataLayer',
      gtm_auth: 'myAuthCode',
      gtm_preview: 'env-2',
      gtm_cookies_win: 'x',
    });
  });

  test('uses a custom script URL', async ({ page }) => {
    await page.goto(scenarioUrl('gtm-custom'));
    await expect(page.locator(gtmScript)).toHaveAttribute(
      'src',
      'https://custom-proxy.example.com/gtm.js?id=GTM-TEST',
    );
  });

  test('sets both script nonces', async ({ page }) => {
    await page.goto(scenarioUrl('gtm-nonce'));
    await expect(page.locator(gtmScript)).toHaveAttribute(
      'nonce',
      'random-nonce-12345',
    );
    await expect(page.locator(inlineScript)).toHaveAttribute(
      'nonce',
      'random-nonce-12345',
    );
  });

  test('pushes the initial data layer object', async ({ page }) => {
    await page.goto(scenarioUrl('gtm-data'));
    await expect(page.locator(inlineScript)).toContainText(
      '{"user_role":"admin","logged_in":true}',
    );
    expect(
      await page.evaluate(() => {
        const win = window as unknown as { dataLayer: unknown[] };
        return win.dataLayer.at(-1);
      }),
    ).toEqual({ user_role: 'admin', logged_in: true });
  });
});

describe('Script', () => {
  for (const strategy of [
    'afterInteractive',
    'beforeInteractive',
    'lazyOnload',
  ]) {
    test(`loads with ${strategy}`, async ({ page }) => {
      await page.goto(scenarioUrl(`script-${strategy}`));
      await expect(page.locator('#test-script')).toHaveAttribute(
        'data-rspress-script',
        strategy,
      );
    });
  }

  test('preinitializes stylesheets with medium precedence', async ({
    page,
  }) => {
    await page.goto(scenarioUrl('script-styles'));
    await expect(
      page.locator(
        'link[rel="stylesheet"][href="https://example.com/style.css"]',
      ),
    ).toHaveAttribute('data-precedence', 'medium');
  });

  test('creates exactly one scroll button from the native load callback', async ({
    page,
  }) => {
    await page.goto(scenarioUrl('script-ready'));
    await expect(page.locator('#scrollToTopBtn')).toHaveCount(1);
    await expect(page.locator('#scrollToTopBtn')).toBeVisible();
    await expect(page.locator('#scrollToTopBtn')).toHaveText('Scroll to top');
    await expect(page.locator('#scrollToTopBtn')).toHaveCSS(
      'background-color',
      'rgb(0, 0, 28)',
    );
  });
});

describe('TweetEmbed', () => {
  for (const theme of ['light', 'dark']) {
    test(`follows the Rspress ${theme} theme`, async ({ page }) => {
      await page.addInitScript(
        (value) => localStorage.setItem('rspress-theme-appearance', value),
        theme,
      );
      await page.goto(scenarioUrl('tweet-default'));
      await expect(page.locator('figure')).toBeVisible();
      await expect(page.locator('figure')).toHaveAttribute('data-theme', theme);
    });
  }

  test('allows an explicit theme to override the site theme', async ({
    page,
  }) => {
    await page.addInitScript(() =>
      localStorage.setItem('rspress-theme-appearance', 'light'),
    );
    await page.goto(scenarioUrl('tweet-override'));
    await expect(page.locator('figure')).toHaveAttribute('data-theme', 'dark');
  });

  test('renders the caption', async ({ page }) => {
    await page.goto(scenarioUrl('tweet-caption'));
    await expect(page.locator('figcaption')).toHaveText(
      'Announcement tweet about Rspress',
    );
    await expect(page.locator('figcaption')).toBeVisible();
  });
});

describe('YouTubeEmbed', () => {
  test('renders the requested video', async ({ page }) => {
    await page.goto(scenarioUrl('youtube-default'));
    await expect(page.locator('lite-youtube')).toHaveAttribute(
      'videoid',
      'sSbDtQTtwBY',
    );
    // External player assets are blocked; verify the embed markup locally.
    await expect(page.locator('lite-youtube')).toHaveCount(1);
  });

  test('sets dimensions and play label', async ({ page }) => {
    await page.goto(scenarioUrl('youtube-props'));
    const embed = page.locator('lite-youtube');
    await expect(embed).toHaveAttribute('playlabel', 'Play Demo Video');
    await expect(embed.locator('..')).toHaveCSS('width', '640px');
    await expect(embed.locator('..')).toHaveCSS('height', '360px');
  });

  test('preconnects to the script CDN', async ({ page }) => {
    await page.goto(scenarioUrl('youtube-default'));
    await expect(
      page.locator('link[rel="preconnect"][href="https://cdn.jsdelivr.net"]'),
    ).toHaveAttribute('crossorigin', '');
  });

  test('loads with the React 18 resource API fallback', async ({ page }) => {
    await page.goto(scenarioUrl('youtube-no-resources'));
    await expect(page.locator('lite-youtube')).toHaveAttribute(
      'videoid',
      'sSbDtQTtwBY',
    );
    await expect(
      page.locator('script[data-rspress-script][src*="lite-yt-embed"]'),
    ).toHaveCount(1);
    await expect(
      page.locator('link[rel="stylesheet"][href*="lite-yt-embed"]'),
    ).toHaveCount(1);
    await expect(
      page.locator('link[rel="preconnect"][href="https://cdn.jsdelivr.net"]'),
    ).toHaveCount(0);
  });

  test('loads the generated embed script', async ({ page }) => {
    await page.goto(scenarioUrl('youtube-default'));
    await expect(
      page.locator('script[data-rspress-script][src*="lite-yt-embed"]'),
    ).toHaveCount(1);
  });
});
