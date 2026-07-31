import { define } from 'rstack';

define.staged({
  '*.{js,jsx,ts,tsx,mjs,cjs}': ['rs lint --type-check', 'prettier --write'],
  '*.{json,md,mdx,css,less,scss,yml,yaml}': 'prettier --write',
});

define.lint(async () => {
  const { globalIgnores, ts } = await import('rstack/lint');

  return [
    globalIgnores([
      '**/dist/**',
      '**/build/**',
      '**/node_modules/**',
      '**/.rslib/**',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
    ]),
    ts.configs.recommended,
    {
      languageOptions: {
        parserOptions: {
          project: ['./tsconfig.json', './packages/*/tsconfig.json'],
        },
      },
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-empty-object-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ];
});

define.test({
  include: ['packages/**/*.test.ts'],
  exclude: ['packages/**/*.spec.ts', 'node_modules/**/*'],
  coverage: {
    provider: 'v8',
  },
});
