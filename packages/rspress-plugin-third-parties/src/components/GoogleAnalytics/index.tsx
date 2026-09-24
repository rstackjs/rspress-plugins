'use client';

import type { JSX } from 'react';

import { Script } from '../Script';

export type GAParams = {
  gaId: string;
  dataLayerName?: string;
  debugMode?: boolean;
  nonce?: string;
};

let currDataLayerName: string | undefined;

export function GoogleAnalytics(props: GAParams): JSX.Element {
  const { gaId, debugMode, dataLayerName = 'dataLayer', nonce } = props;

  if (currDataLayerName === undefined) {
    currDataLayerName = dataLayerName;
  }

  const initId = gaId ? `_rspress-ga-init-${gaId}` : '_rspress-ga-init';

  return (
    <>
      <Script
        id={initId}
        dangerouslySetInnerHTML={{
          __html: `
            window['${dataLayerName}'] = window['${dataLayerName}'] || [];
            function gtag(){window['${dataLayerName}'].push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}' ${debugMode ? ",{ 'debug_mode': true }" : ''});
          `,
        }}
        nonce={nonce}
      />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        nonce={nonce}
      />
    </>
  );
}

export function sendGAEvent(..._args: unknown[]) {
  if (currDataLayerName === undefined) {
    console.warn(`Rspress Third Parties: GA has not been initialized`);
    return;
  }
  const win = window as unknown as Record<string, unknown[] | undefined>;
  const dataLayer = win[currDataLayerName];
  if (dataLayer) {
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  } else {
    console.warn(
      `Rspress Third Parties: GA dataLayer "${currDataLayerName}" does not exist`,
    );
  }
}
