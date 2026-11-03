# rspress-plugin-third-parties

## 3.0.1

### Patch Changes

- 661a3e0: Remove React Compiler and its runtime dependency while preserving compatibility with React 18 and React 19.

## 3.0.0

### Major Changes

- 2a812cb: Publish ESM-only entry points instead of dual ESM/CommonJS output, and align the plugin with the monorepo's shared ESM build, dependency versions, and validation workflows.

### Patch Changes

- 661a3e0: Remove React Compiler and its runtime dependency while preserving compatibility with React 18 and React 19.

## 2.1.2

### Patch Changes

- fix: assign script id in DOM, dynamic IDs for GTM and GA to prevent LoadCache collisions, and add React Compiler compliant useEffect state initialization

## 2.1.1

### Patch Changes

- update <TweetEmbed> caption prop type from string to ReactNode to allow rich JSX formatting

## 2.1.0

### Minor Changes

- Add TweetEmbed component powered by react-tweet, add jsdelivr preconnect optimization for YouTubeEmbed, and update documentation.

## 2.0.0

### Major Changes

- Initial release with React Compiler, YouTubeEmbed, GoogleMapsEmbed, GA4, GTM, and custom Script components.
