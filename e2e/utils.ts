import { ChildProcess } from 'child_process';
import spawn from 'cross-spawn';
import getPortLib from 'get-port';
import treeKill from 'tree-kill';

export const getRandomPort = async () => {
  return getPortLib();
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
  const childProcess = spawn('pnpm', ['rspress', 'dev', '--port', targetPort.toString()], {
    cwd: root,
    stdio: 'pipe',
    env: {
      ...process.env,
      NODE_ENV: 'development',
    },
  });

  return new Promise((resolve, reject) => {
    let resolved = false;
    childProcess.stdout?.on('data', (data) => {
      const output = data.toString();
      // Rspress dev server started
      if (output.includes('http://localhost') && !resolved) {
        resolved = true;
        resolve({ process: childProcess, url: `http://localhost:${targetPort}` });
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

export const runBuildCommand = async (root: string) => {
  return new Promise<void>((resolve, reject) => {
    const childProcess = spawn('pnpm', ['rspress', 'build'], {
      cwd: root,
      stdio: 'ignore',
      env: {
        ...process.env,
        NODE_ENV: 'production',
      },
    });

    childProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Build failed with code ${code}`));
      }
    });
  });
};

export const runPreviewCommand = async (
  root: string,
  port?: number,
): Promise<{ process: ChildProcess; url: string }> => {
  const targetPort = port || (await getRandomPort());
  const childProcess = spawn('npx', ['rspress', 'preview', '--port', targetPort.toString()], {
    cwd: root,
    stdio: 'pipe',
    env: {
      ...process.env,
      NODE_ENV: 'production',
    },
  });

  return new Promise((resolve, reject) => {
    let resolved = false;
    childProcess.stdout?.on('data', (data) => {
      const output = data.toString();
      if (output.includes('http://localhost') && !resolved) {
          resolved = true;
          resolve({ process: childProcess, url: `http://localhost:${targetPort}` });
      }
    });

    childProcess.stderr?.on('data', (data) => {
      console.error(`Preview Error: ${data}`);
    });

    childProcess.on('error', (err) => {
      reject(err);
    });

    childProcess.on('close', (code) => {
        if (!resolved && code !== 0) {
            reject(new Error(`Preview process exited with code ${code}`));
        }
    });
  });
};
