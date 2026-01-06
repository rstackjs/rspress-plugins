import React, { useEffect } from 'react';

import type { Live2DWidgetProps } from '../src/typings';

const Live2DWidget: React.FC<Live2DWidgetProps> = (options) => {
  useEffect(() => {
    import('oh-my-live2d').then(({ loadOml2d }) => {
      console.log(1111111);
      loadOml2d(options);
    });
  }, []);

  return null;
};

export default Live2DWidget;
