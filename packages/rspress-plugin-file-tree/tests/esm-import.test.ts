import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { test } from '@rstest/core';

test('can be imported by native Node.js ESM', () => {
  const entryUrl = pathToFileURL(
    path.resolve(
      process.cwd(),
      'packages/rspress-plugin-file-tree/dist/index.js',
    ),
  ).href;
  const result = spawnSync(
    process.execPath,
    [
      '--input-type=module',
      '--eval',
      `await import(${JSON.stringify(entryUrl)})`,
    ],
    {
      encoding: 'utf8',
    },
  );

  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout);
  }
});
