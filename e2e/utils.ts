import { afterAll, beforeAll } from '@rstest/playwright';
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
      const response = await fetch(url, {
        signal: AbortSignal.timeout(
          Math.min(2_000, Math.max(1, deadline - Date.now())),
        ),
      });
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
  return new Promise<void>((resolve, reject) => {
    if (!instance || !instance.pid) {
      resolve();
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
          return resolve();
        }
        return reject(err);
      }
      return resolve();
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
    let settled = false;
    const url = `http://localhost:${targetPort}`;

    waitForServer(url)
      .then(() => {
        if (settled) {
          return;
        }
        settled = true;
        resolve({ process: childProcess, url });
      })
      .catch(async (error) => {
        if (settled) {
          return;
        }
        settled = true;
        try {
          await killProcess(childProcess);
        } catch (cleanupError) {
          console.error(`Dev cleanup error: ${cleanupError}`);
        }
        reject(error);
      });

    childProcess.stderr?.on('data', (data) => {
      console.error(`Dev Error: ${data}`);
    });

    childProcess.on('error', (err) => {
      if (settled) {
        return;
      }
      settled = true;
      reject(err);
    });

    childProcess.on('close', (code) => {
      if (!settled) {
        settled = true;
        reject(new Error(`Dev process exited with code ${code}`));
      }
    });
  });
};

export const useRspressDevServer = (root: string) => {
  let devProcess: ChildProcess | undefined;
  let url = '';

  beforeAll(async () => {
    const result = await runDevCommand(root);
    devProcess = result.process;
    url = result.url;
  });

  afterAll(async () => {
    if (devProcess) {
      await killProcess(devProcess);
    }
  });

  return (pathname = '/') => new URL(pathname, `${url}/`).toString();
};
