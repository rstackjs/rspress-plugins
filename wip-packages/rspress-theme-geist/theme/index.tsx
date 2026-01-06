import React from 'react';

import { usePageData, Content } from '@rspress/core/runtime';

function Layout() {
  return (
    <div>
      Custom Theme Layout
      <Content />
    </div>
  );
}

const setup = () => {};

export { Layout, setup };
