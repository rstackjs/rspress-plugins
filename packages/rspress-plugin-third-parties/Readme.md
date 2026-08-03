# `rspress-plugin-third-parties`

<div align="center">

<img src="https://sanjaiyan-dev.github.io/rspress-plugin-third-parties/rspress-plugin-third-party-hero.png" alt="rspress-plugin-third-parties banner" width="100%" />

<br/>
<br/>

[![npm version](https://img.shields.io/npm/v/rspress-plugin-third-parties.svg?style=for-the-badge&color=A855F7&labelColor=1F2937)](https://www.npmjs.com/package/rspress-plugin-third-parties)
[![npm downloads](https://img.shields.io/npm/dm/rspress-plugin-third-parties.svg?style=for-the-badge&color=3B82F6&labelColor=1F2937)](https://www.npmjs.com/package/rspress-plugin-third-parties)
[![license](https://img.shields.io/npm/l/rspress-plugin-third-parties.svg?style=for-the-badge&color=10B981&labelColor=1F2937)](./LICENSE)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black&labelColor=1F2937)](https://react.dev/)
[![Rspress](https://img.shields.io/badge/Rspress-Plugin-FF4154?style=for-the-badge&logo=rspack&logoColor=white&labelColor=1F2937)](https://rspress.rs/)
[![Docs & Demo](https://img.shields.io/badge/Docs_%26_Demo-Explore_Site-34268A?style=for-the-badge&logo=githubpages&logoColor=white&labelColor=0C1D48)](https://sanjaiyan-dev.github.io/rspress-plugin-third-parties)

<p align="center">
  <b>High-performance third-party embeds, Google Tag Manager, analytics, and non-blocking script strategies for Rspress sites.</b>
</p>

<p align="center">
  <a href="https://sanjaiyan-dev.github.io/rspress-plugin-third-parties"><strong>📖 Read the Documentation</strong></a> · 
  <a href="https://sanjaiyan-dev.github.io/rspress-plugin-third-parties/demo"><strong>🚀 View Interactive Demo</strong></a> · 
  <a href="https://www.npmjs.com/package/rspress-plugin-third-parties"><strong>📦 NPM Package</strong></a>
</p>

</div>

---

## ⚡ Overview

**`rspress-plugin-third-parties`** brings Next.js-style third-party optimizations (`@next/third-parties`) directly to **Rspress**.

External embeds (like YouTube, Google Maps, and Twitter/X posts) and script tags (like GA4 and GTM) are notorious for blocking the main thread, lowering Lighthouse performance scores, and causing layout shifts. This plugin solves that by providing:

- ⚡ **React Compiler Pre-Optimized**: Ships fully compiled with automated auto-memoization at build-time. Zero unnecessary re-renders.
- 🚀 **Non-Blocking Execution**: Lazy loading scripts using `requestIdleCallback` and fine-grained loading strategies.
- ⚡ **React 19 Resource Pre-initialization**: Leverages native `ReactDOM.preinit` and `ReactDOM.preload` during SSG/SSR.
- 🧠 **Smart Memory Caching**: Built-in script deduplication and stylesheet cache registry.
- 🛠️ **Zero-Config Global GA**: Inject Google Analytics across all documentation pages automatically via your `rspress.config.ts`.
- 📦 **Zero-Weight Embeds**: Powered by `third-party-capital` for lightweight HTML generation.

---

## 📑 Table of Contents

- [Installation](#installation)
- [Plugin Registration](#plugin-registration)
- [Component Reference](#component-reference)
  - [`<Script />`](#script-)
  - [`<YouTubeEmbed />`](#youtubeembed-)
  - [`<GoogleMapsEmbed />`](#googlemapsembed-)
  - [`<TweetEmbed />`](#tweetembed-)
  - [`<GoogleAnalytics />`](#googleanalytics-)
  - [`<GoogleTagManager />`](#googletagmanager-)
- [Event Tracking Utility](#event-tracking-utility)
- [Script Loading Strategies](#script-loading-strategies)
- [Under the Hood Mechanics](#under-the-hood-mechanics)
- [License](#license)

---

## 📦 Installation

<a id="installation"></a>
Install via your preferred package manager:

```bash
# pnpm
pnpm add rspress-plugin-third-parties

# npm
npm install rspress-plugin-third-parties

# yarn
yarn add rspress-plugin-third-parties
```

---

## 🔌 Plugin Registration

<a id="plugin-registration"></a>

To auto-inject **Google Analytics** globally across your Rspress documentation, register the plugin in your `rspress.config.ts`:

```typescript
// rspress.config.ts
import { defineConfig } from 'rspress/config';
import { pluginThirdParties } from 'rspress-plugin-third-parties/plugin';

export default defineConfig({
  plugins: [
    pluginThirdParties({
      googleAnalytics: {
        gaId: 'G-XXXXXXXXXX', // Your GA4 Measurement ID
        debugMode: false, // Set to true for local testing
        dataLayerName: 'dataLayer',
      },
    }),
  ],
});
```

---

## 🧩 Component Reference

<a id="component-reference"></a>

### `<Script />`

The foundation component powering all external integrations. It manages script mounting, deduplication, inline scripts, stylesheet preloading, and lifecycle events (`onLoad`, `onReady`, `onError`).

```mdx
import { Script } from 'rspress-plugin-third-parties';

{/* Load after interactive */}

<Script
  src="https://sanjaiyan-cool.web.app/script/v1/1/SanWebMaker.js"
  strategy="afterInteractive"
  onLoad={() => console.log('Widgets loaded!')}
/>

{/* Inline Script */}
<Script id="custom-inline-script">
  {`console.log('Inline script running');`}
</Script>
```

#### `<Script />` Props

| Prop          | Type                                                        | Default              | Description                                                             |
| :------------ | :---------------------------------------------------------- | :------------------- | :---------------------------------------------------------------------- |
| `src`         | `string`                                                    | `""`                 | Source URL of the script.                                               |
| `strategy`    | `"afterInteractive" \| "lazyOnload" \| "beforeInteractive"` | `"afterInteractive"` | Script loading strategy.                                                |
| `id`          | `string`                                                    | `src`                | Unique script identifier used for cache deduplication.                  |
| `onLoad`      | `(e: Event) => void`                                        | —                    | Callback fired when the script successfully loads.                      |
| `onReady`     | `() => void`                                                | —                    | Callback fired on load, or immediately if script was previously loaded. |
| `onError`     | `(e: Event) => void`                                        | —                    | Callback fired when script loading fails.                               |
| `stylesheets` | `string[]`                                                  | —                    | Array of stylesheet URLs to pre-init/inject alongside the script.       |
| `nonce`       | `string`                                                    | —                    | CSP nonce string.                                                       |

---

### `<YouTubeEmbed />`

Powered by `lite-youtube-embed` under the hood. Renders an ultra-fast visual facade that defers the heavy YouTube player until play is clicked—keeping your main thread pristine and Lighthouse scores flawless.

```mdx
import { YouTubeEmbed } from 'rspress-plugin-third-parties';

# Youtube Video

<YouTubeEmbed
  videoid="sSbDtQTtwBY"
  height={400}
  playlabel="A Lineage of Logic, A Future of Code"
/>
```

#### `<YouTubeEmbed />` Props

| Prop        | Type     | Default      | Description                                                      |
| :---------- | :------- | :----------- | :--------------------------------------------------------------- |
| `videoid`   | `string` | **Required** | The YouTube Video ID.                                            |
| `height`    | `number` | `null`       | Container height in pixels.                                      |
| `width`     | `number` | `null`       | Container width in pixels.                                       |
| `playlabel` | `string` | `'Play'`     | Accessible play button aria-label.                               |
| `params`    | `string` | —            | Additional iframe URL parameters (e.g. `"controls=0&start=10"`). |
| `style`     | `string` | —            | Additional CSS styles for the container.                         |

---

### `<GoogleMapsEmbed />`

Provides performance-optimized embeds for Google Maps without blocking the browser during initial navigation.

```mdx
import { GoogleMapsEmbed } from 'rspress-plugin-third-parties';

<GoogleMapsEmbed
  apiKey="YOUR_GOOGLE_MAPS_API_KEY"
  mode="place"
  q="Point Pedro, Sri Lanka"
  height={450}
  zoom="14"
/>
```

#### `<GoogleMapsEmbed />` Props

| Prop       | Type                                                            | Default      | Description                                    |
| :--------- | :-------------------------------------------------------------- | :----------- | :--------------------------------------------- |
| `apiKey`   | `string`                                                        | **Required** | Your Google Maps Embed API key.                |
| `mode`     | `"place" \| "view" \| "directions" \| "streetview" \| "search"` | **Required** | Embed mode.                                    |
| `q`        | `string`                                                        | —            | Map search query or location place name.       |
| `center`   | `string`                                                        | —            | Lat/lng center point (`"9.814937,81.166080"`). |
| `zoom`     | `string`                                                        | —            | Map zoom level (`0` to `21`).                  |
| `maptype`  | `"roadmap" \| "satellite"`                                      | `'roadmap'`  | Map rendering mode.                            |
| `language` | `string`                                                        | —            | Map language code (e.g. `'ta'`, `'en'`).       |
| `region`   | `string`                                                        | —            | Regional country code.                         |
| `loading`  | `"eager" \| "lazy"`                                             | `'lazy'`     | Native iframe loading attribute.               |

---

### `<TweetEmbed />`

Zero-overhead Twitter/X post embed powered by `react-tweet`. Fetches raw post data and renders lightweight, native React DOM components styled identically to X/Twitter UI without downloading heavy `widgets.js` scripts or layout-shifting IFrames.

```mdx
import { TweetEmbed } from 'rspress-plugin-third-parties';

{/* Basic Tweet */}

<TweetEmbed id="2017178323550605790" />

{/* Tweet with optional forced theme */}

<TweetEmbed id="2017178323550605790" theme="dark" />
```

#### `<TweetEmbed />` Props

| Prop           | Type                  | Default     | Description                                                                             |
| :------------- | :-------------------- | :---------- | :-------------------------------------------------------------------------------------- |
| `id`           | `string`              | —           | The Tweet / X Post ID (extracted from tweet URL).                                       |
| `theme`        | `"light" \| "dark"`   | `useDark()` | Optional theme override. Inherits Rspress reactive theme if omitted.                    |
| `caption`      | `ReactNode`           | —           | Optional accessible caption rendered in a `<figcaption>` tag beneath the tweet.         |
| `apiUrl`       | `string`              | —           | Custom proxy API URL for fetching raw tweet data.                                       |
| `fallback`     | `ReactNode`           | —           | Loading skeleton component rendered while tweet payload is being fetched.               |
| `components`   | `TwitterComponents`   | —           | Custom UI component overrides for tweet elements (e.g. custom avatar, media, or links). |
| `fetchOptions` | `RequestInit`         | —           | Custom `fetch` headers or request configuration sent to the tweet API.                  |
| `onError`      | `(error: any) => any` | —           | Callback function fired if tweet data fetching or rendering fails.                      |
| `className`    | `string`              | —           | Additional CSS class names applied to the container `<figure>` element.                 |

---

### `<GoogleAnalytics />`

Explicitly embed Google Analytics 4 (GA4) inside MDX pages or custom layout components.

```mdx
import { GoogleAnalytics } from 'rspress-plugin-third-parties';

<GoogleAnalytics gaId="G-XXXXXXXXXX" debugMode={true} />
```

#### `<GoogleAnalytics />` Props

| Prop            | Type      | Default       | Description                          |
| :-------------- | :-------- | :------------ | :----------------------------------- |
| `gaId`          | `string`  | **Required**  | GA4 Measurement ID (`G-XXXXXXXXXX`). |
| `dataLayerName` | `string`  | `'dataLayer'` | Custom global dataLayer array name.  |
| `debugMode`     | `boolean` | `false`       | Enables Google Analytics debug mode. |
| `nonce`         | `string`  | —             | CSP nonce string.                    |

---

### `<GoogleTagManager />`

Integrate Google Tag Manager (GTM) with support for custom domains, authentication, preview environments, and custom initial dataLayer states.

```mdx
import { GoogleTagManager } from 'rspress-plugin-third-parties';

<GoogleTagManager
  gtmId="GTM-XXXXXXX"
  dataLayer={{ userRole: 'developer', env: 'production' }}
/>
```

#### `<GoogleTagManager />` Props

| Prop            | Type                        | Default                                     | Description                                         |
| :-------------- | :-------------------------- | :------------------------------------------ | :-------------------------------------------------- |
| `gtmId`         | `string`                    | —                                           | GTM Container ID (`GTM-XXXXXXX`).                   |
| `gtmScriptUrl`  | `string`                    | `'https://www.googletagmanager.com/gtm.js'` | Custom domain proxy URL for GTM script.             |
| `dataLayer`     | `Record<string, JSONValue>` | —                                           | Initial dataLayer object payload.                   |
| `dataLayerName` | `string`                    | `'dataLayer'`                               | Custom dataLayer global array name.                 |
| `auth`          | `string`                    | —                                           | GTM Environment authentication string (`gtm_auth`). |
| `preview`       | `string`                    | —                                           | GTM Environment preview string (`gtm_preview`).     |
| `nonce`         | `string`                    | —                                           | CSP nonce string.                                   |

> [!NOTE]
> You must provide either `gtmId` or a custom `gtmScriptUrl` containing the ID parameter.

---

## 📊 Event Tracking Utility

Send custom Google Analytics events dynamically from anywhere in your client-side React code:

```typescript
import { sendGAEvent } from 'rspress-plugin-third-parties';

function FeedbackButton() {
  const handleClick = () => {
    sendGAEvent('event', 'documentation_helpful', {
      page: window.location.pathname,
      vote: 'yes',
    });
  };

  return <button onClick={handleClick}>Helpful 👍</button>;
}
```

---

## 🎯 Script Loading Strategies

| Strategy                           | Timing                                                          | Ideal For                                        |
| :--------------------------------- | :-------------------------------------------------------------- | :----------------------------------------------- |
| **`afterInteractive`** _(Default)_ | Injected immediately after page hydration.                      | Analytics, Tag Managers, essential widgets.      |
| **`lazyOnload`**                   | Injected during browser idle time (`requestIdleCallback`).      | Chat widgets, social feeds, low-priority pixels. |
| **`beforeInteractive`**            | Rendered into raw HTML prior to client JS execution during SSG. | Critical consent scripts, anti-bot security.     |

---

## 🔬 Under the Hood Mechanics

```
                  ┌─────────────────────────────────────────┐
                  │          Rspress SSG Build Phase        │
                  └────────────────────┬────────────────────┘
                                       │
                  ┌────────────────────▼────────────────────┐
                  │      Server Pre-render Execution        │
                  │   Calls safePreload() & safePreinit()   │
                  └────────────────────┬────────────────────┘
                                       │
                                       ▼
                     HTML Output with Native Preloads
                                       │
                  ┌────────────────────▼────────────────────┐
                  │        Hydration & Browser Idle         │
                  └────────────────────┬────────────────────┘
                                       │
             ┌─────────────────────────┼─────────────────────────┐
             │                         │                         │
             ▼                         ▼                         ▼
   [afterInteractive]           [lazyOnload]           [Cache Deduplication]
   Appends script after     Uses requestIdleCallback     Prevents fetching identical
   client hydration.        to minimize TBT.             `src`/`id` entries twice.
```

1. **React 19 Resource Pre-init**: Uses `ReactDOM.preinit` and `ReactDOM.preload` to declare external resource hints before browser parsing.
2. **Script Caching**: Maintains global `ScriptCache` and `LoadCache` Map/Set singletons, ensuring identical script tags are never loaded twice across page transitions.
3. **Graceful React 18 Fallback**: Fallbacks to dynamic `document.createElement('link')` stylesheet injection when React 19 resource pre-init functions are unavailable.

---

## 📄 License

[MIT](./LICENSE) © [Sanjaiyan Parthipan](https://github.com/sanjaiyan-dev)
