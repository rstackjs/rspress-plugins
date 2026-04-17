import { execFileSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { expect, test } from 'vitest'

const __dirname = dirname(fileURLToPath(import.meta.url))
const packageDir = resolve(__dirname, '..')
const repoDir = resolve(packageDir, '..', '..')
const distEntry = resolve(packageDir, 'dist/index.js')

test('built devkit entrypoint is importable in Node ESM', async () => {
  execFileSync(
    'corepack',
    ['pnpm', '--filter', 'rspress-plugin-devkit', 'run', 'build'],
    { cwd: repoDir },
  )

  await expect(import(pathToFileURL(distEntry).href)).resolves.toMatchObject({
    ESTreeNodeFactory: expect.any(Function),
    RemarkInsertComponentPluginFactory: expect.any(Function),
  })
})
