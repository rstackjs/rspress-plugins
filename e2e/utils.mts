import { ChildProcess, spawn } from 'child_process';
import path from 'path';
import { Page } from '@playwright/test';

export const runDevCommand = async (
  root: string,
  port = 3000,
): Promise<{ process: ChildProcess; url: string }> => {
  const childProcess = spawn('npx', ['rspress', 'dev', '--port', port.toString()], {
    cwd: root,
    stdio: 'pipe',
    env: {
      ...process.env,
      NODE_ENV: 'development',
    },
  });

  return new Promise((resolve, reject) => {
    childProcess.stdout?.on('data', (data) => {
      const output = data.toString();
      // Rspress dev server started
      if (output.includes('http://localhost')) {
        resolve({ process: childProcess, url: `http://localhost:${port}` });
      }
    });

    childProcess.stderr?.on('data', (data) => {
      console.error(`Dev Error: ${data}`);
    });

    childProcess.on('error', (err) => {
      reject(err);
    });
  });
};

export const runBuildCommand = async (root: string) => {
  return new Promise<void>((resolve, reject) => {
    const childProcess = spawn('npx', ['rspress', 'build'], {
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
  port = 3000,
): Promise<{ process: ChildProcess; url: string }> => {
  const childProcess = spawn('npx', ['rspress', 'preview', '--port', port.toString()], {
    cwd: root,
    stdio: 'pipe',
    env: {
      ...process.env,
      NODE_ENV: 'production',
    },
  });

  return new Promise((resolve, reject) => {
    childProcess.stdout?.on('data', (data) => {
      const output = data.toString();
      if (output.includes('http://localhost')) {
        resolve({ process: childProcess, url: `http://localhost:${port}` });
      }
    });

    childProcess.stderr?.on('data', (data) => {
      console.error(`Preview Error: ${data}`);
    });

    childProcess.on('error', (err) => {
      reject(err);
    });
  });
};