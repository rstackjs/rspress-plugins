import React from 'react';

export default (props: Record<string, unknown>) => {
  return (
    <div>
      <h1>This is Oops directive component.</h1>
      <p>
        received props:
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </p>
    </div>
  );
};
