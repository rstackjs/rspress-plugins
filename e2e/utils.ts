import { test } from '@playwright/test';
import type { ChildProcess } from 'node:child_process';
import spawn from 'cross-spawn';
import getPortLib from 'get-port';
import treeKill from 'tree-kill';

export const getRandomPort = async () => {
  return getPortLib();
};

const waitForServer = async (url: string) => {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // The Rspress dev server can briefly restart during its first compilation.
    }

    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  throw new Error(`Dev server did not become ready: ${url}`);
};

export const killProcess = async (instance: ChildProcess) => {
  return new Promise((resolve, reject) => {
    if (!instance || !instance.pid) {
      resolve(null);
      return;
    }
    treeKill(instance.pid, (err) => {
      if (err) {
        if (
          process.platform === 'win32' &&
          typeof err.message === 'string' &&
          (err.message.includes('no running instance of the task') ||
            err.message.includes('not found'))
        ) {
          // Windows throws an error if the process is already dead
          return resolve(null);
        }
        return reject(err);
      }
      return resolve(null);
    });
  });
};

export const runDevCommand = async (
  root: string,
  port?: number,
): Promise<{ process: ChildProcess; url: string }> => {
  const targetPort = port || (await getRandomPort());
  const childProcess = spawn(
    'pnpm',
    ['rspress', 'dev', '--port', targetPort.toString()],
    {
      cwd: root,
      stdio: 'pipe',
      env: {
        ...process.env,
        NODE_ENV: 'development',
      },
    },
  );

  return new Promise((resolve, reject) => {
    let resolved = false;
    let starting = false;
    childProcess.stdout?.on('data', (data) => {
      const output = data.toString();
      // Rspress dev server started
      if (output.includes('http://localhost') && !resolved && !starting) {
        starting = true;
        const url = `http://localhost:${targetPort}`;
        waitForServer(url)
          .then(() => {
            resolved = true;
            resolve({
              process: childProcess,
              url,
            });
          })
          .catch(reject);
      }
    });

    childProcess.stderr?.on('data', (data) => {
      console.error(`Dev Error: ${data}`);
    });

    childProcess.on('error', (err) => {
      reject(err);
    });

    childProcess.on('close', (code) => {
      if (!resolved && code !== 0) {
        reject(new Error(`Dev process exited with code ${code}`));
      }
    });
  });
};

export const useRspressDevServer = (root: string) => {
  let devProcess: ChildProcess | undefined;
  let url = '';

  test.beforeAll(async () => {
    const result = await runDevCommand(root);
    devProcess = result.process;
    url = result.url;
  });

  test.afterAll(async () => {
    if (devProcess) {
      await killProcess(devProcess);
    }
  });

  return (pathname = '/') => new URL(pathname, `${url}/`).toString();
};
