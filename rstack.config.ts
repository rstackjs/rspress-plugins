import { define } from 'rstack';

define.staged({
  '*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}': ['rs lint --type-check', 'rs fmt'],
  '*.{json,jsonc,md,mdx,css,less,scss,html,yml,yaml}': 'rs fmt',
});

define.fmt({
  printWidth: 80,
  singleQuote: true,
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
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      // Preserve existing legacy exceptions without weakening new TypeScript files.
      files: [
        'packages/rspress-plugin-align-image/src/index.ts',
        'packages/rspress-plugin-devkit/src/DirectivesTransformer/index.ts',
        'packages/rspress-plugin-devkit/src/NodeFactory/ESTreeNodeFactory.ts',
        'packages/rspress-plugin-devkit/src/NodeFactory/MdAstNodeFactory.ts',
        'packages/rspress-plugin-devkit/src/NodeFactory/MdxAttrNodeFactory.ts',
        'packages/rspress-plugin-devkit/src/NodeFactory/MdxJsxElementFactory.ts',
        'packages/rspress-plugin-devkit/src/RemarkPluginFactory/FactoryBase.ts',
        'packages/rspress-plugin-devkit/src/RemarkPluginFactory/InsertComponent.ts',
        'packages/rspress-plugin-file-tree/src/components/FileTree/FileTreeItem.tsx',
        'packages/rspress-plugin-file-tree/src/components/FileTree/RemoteSvgIcon.tsx',
        'packages/rspress-plugin-katex/src/index.ts',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
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
