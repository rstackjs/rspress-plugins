import type { ReactElement } from 'react';

interface DevkitCodeProps {
  code: string;
}

export default function DevkitCode({ code }: DevkitCodeProps): ReactElement {
  return <output data-testid="devkit-code">{code}</output>;
}
