import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { test } from '@rstest/core';

test('can be imported by native Node.js ESM', () => {
  const packageRoot =
    path.basename(process.cwd()) === 'rspress-plugin-file-tree'
      ? process.cwd()
      : path.resolve(process.cwd(), 'packages/rspress-plugin-file-tree');
  const entryUrl = pathToFileURL(path.join(packageRoot, 'dist/index.js')).href;
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

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(
      result.stderr ||
        result.stdout ||
        `Node.js exited with code ${result.status ?? 'unknown'}.`,
    );
  }
});
