import ReactDOM from 'react-dom';
import { YouTubeEmbed as TPCYouTubeEmbed } from 'third-party-capital';
import type { ScriptProps } from './Script';
import { Script } from './Script';
import ThirdPartyScriptEmbed from './ThirdPartyScripts';

export type YouTubeEmbedTypes = {
  height?: number;
  width?: number;
  videoid: string;
  playlabel?: string;
  params?: string;
  style?: string;
};

interface PreconnectOptions {
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
}

const safePreconnect = (href: string, options?: PreconnectOptions) => {
  const preconnectFn =
    (ReactDOM as any).preconnect || (ReactDOM as any).experimental_preconnect;
  if (typeof preconnectFn === 'function') {
    preconnectFn(href, options);
  }
};

export const scriptStrategy = {
  server: 'beforeInteractive',
  client: 'afterInteractive',
  idle: 'lazyOnload',
  // Fallback to 'lazyOnload' since Rspress/custom loader does not support web workers
  worker: 'lazyOnload',
} as const;

const youtubePreconnectOpts = {
  crossOrigin: '',
} as const;

export function YouTubeEmbed(props: YouTubeEmbedTypes) {
  const { html, scripts, stylesheets } = TPCYouTubeEmbed(props);
  safePreconnect('https://cdn.jsdelivr.net', youtubePreconnectOpts);

  return (
    <ThirdPartyScriptEmbed
      height={props.height || null}
      width={props.width || null}
      html={html}
    >
      {scripts?.flatMap((script) => {
        if (script && 'url' in script && typeof script.url === 'string') {
          return [
            <Script
              key={script.key ?? script.url}
              src={script.url}
              strategy={
                scriptStrategy[
                  script.strategy as keyof typeof scriptStrategy
                ] as ScriptProps['strategy']
              }
              stylesheets={stylesheets}
            />,
          ];
        }
        return [];
      })}
    </ThirdPartyScriptEmbed>
  );
}
