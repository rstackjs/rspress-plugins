# rspress-plugin-mermaid

## 1.0.3

### Patch Changes

- 20196b7: fix: replace `__dirname` with ESM-compatible `import.meta.url` to fix `ReferenceError: __dirname is not defined` when loading plugins as ESM

## 1.0.2

### Patch Changes

- f8454d4: Sanitizing the React `useId()` render id, skipping redundant re-renders, and resolving the
  component path from `import.meta.dirname` under ESM.
- Updated dependencies [a59a167]
  - rspress-plugin-devkit@1.0.1

## 1.0.1

### Patch Changes

- 2d7e800: fix: dark mode

## 1.0.0

### Major Changes

- 732b475: feat: Compatible with V2 Rspress

### Patch Changes

- Updated dependencies [732b475]
  - rspress-plugin-devkit@1.0.0

## 0.3.0

### Minor Changes

- 4001d0c: release latest

### Patch Changes

- Updated dependencies [4001d0c]
  - rspress-plugin-devkit@0.3.0

## 0.2.0

### Minor Changes

- b2062fa: initial release

### Patch Changes

- Updated dependencies [b2062fa]
  - rspress-plugin-devkit@0.2.0
