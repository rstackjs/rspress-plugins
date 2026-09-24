import { useEffect, useState, type JSX } from 'react';
import {
  GoogleAnalytics,
  GoogleTagManager,
  Script,
  sendGAEvent,
  TweetEmbed,
  YouTubeEmbed,
} from 'rspress-plugin-third-parties';
import { reactDom } from '../../src/components/reactDom';

function createScrollButton() {
  const button = document.createElement('button');
  button.id = 'scrollToTopBtn';
  button.textContent = 'Scroll to top';
  button.style.backgroundColor = '#00001c';
  document.body.appendChild(button);
}

function Scenario({ name }: { name: string }) {
  if (name.startsWith('ga-')) {
    return (
      <>
        {name !== 'ga-uninitialized' && (
          <GoogleAnalytics
            gaId="G-TEST"
            debugMode={name === 'ga-debug'}
            dataLayerName={name === 'ga-custom' ? 'customDataLayer' : undefined}
            nonce={name === 'ga-nonce' ? 'csp-nonce-12345' : undefined}
          />
        )}
        <button
          onClick={() =>
            sendGAEvent('event', 'button_click', { button_id: 'submit-btn' })
          }
        >
          Send GA event
        </button>
      </>
    );
  }
  if (name.startsWith('gtm-')) {
    return (
      <GoogleTagManager
        gtmId="GTM-TEST"
        auth={name === 'gtm-advanced' ? 'myAuthCode' : undefined}
        preview={name === 'gtm-advanced' ? 'env-2' : undefined}
        dataLayerName={name === 'gtm-advanced' ? 'customDataLayer' : undefined}
        gtmScriptUrl={
          name === 'gtm-custom'
            ? 'https://custom-proxy.example.com/gtm.js'
            : undefined
        }
        nonce={name === 'gtm-nonce' ? 'random-nonce-12345' : undefined}
        dataLayer={
          name === 'gtm-data'
            ? { user_role: 'admin', logged_in: true }
            : undefined
        }
      />
    );
  }
  if (name.startsWith('script-')) {
    const strategy =
      name === 'script-beforeInteractive'
        ? 'beforeInteractive'
        : name === 'script-lazyOnload' || name === 'script-ready'
          ? 'lazyOnload'
          : 'afterInteractive';
    return (
      <Script
        id="test-script"
        src="https://example.com/test.js"
        strategy={strategy}
        stylesheets={
          name === 'script-styles'
            ? ['https://example.com/style.css']
            : undefined
        }
        onReady={name === 'script-ready' ? createScrollButton : undefined}
      />
    );
  }
  if (name.startsWith('tweet-')) {
    return (
      <TweetEmbed
        id="2017178323550605790"
        theme={name === 'tweet-override' ? 'dark' : undefined}
        caption={
          name === 'tweet-caption'
            ? 'Announcement tweet about Rspress'
            : undefined
        }
      />
    );
  }
  if (name.startsWith('youtube-')) {
    return (
      <YouTubeEmbed
        videoid="sSbDtQTtwBY"
        width={name === 'youtube-props' ? 640 : undefined}
        height={name === 'youtube-props' ? 360 : undefined}
        playlabel={name === 'youtube-props' ? 'Play Demo Video' : undefined}
      />
    );
  }
  return null;
}

export function Scenarios(): JSX.Element {
  const [scenario, setScenario] = useState('');
  useEffect(() => {
    const name = new URLSearchParams(location.search).get('scenario') || '';
    if (name === 'youtube-no-resources') {
      // Exercise the React 18 fallback without resource APIs. This page has its
      // own browser context, so the override cannot leak into other tests.
      reactDom.preconnect = undefined;
      reactDom.experimental_preconnect = undefined;
      reactDom.preinit = undefined;
      reactDom.experimental_preinit = undefined;
      reactDom.preload = undefined;
      reactDom.experimental_preload = undefined;
    }
    setScenario(name);
  }, []);
  return (
    <div data-testid="scenario" data-scenario={scenario}>
      <Scenario name={scenario} />
    </div>
  );
}
