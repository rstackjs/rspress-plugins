import React from 'react';
import { buildClassName } from '../presets';

interface Props {
  count: number;
}

const TreeIndents: React.FC<Props> = ({ count }) => {
  if (!count || count <= 0) return null;

  return (
    <>
      {[...Array.from({ length: Math.floor(count) })].map((_, index) => (
        <span
          className={buildClassName('indent')}
          key={`indent-${index}`}
          style={{
            left: `calc(-1.875rem * ${index + 1} + 0.75rem)`,
          }}
        ></span>
      ))}
    </>
  );
};

export default TreeIndents;
