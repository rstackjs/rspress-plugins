# rspress-plugin-file-tree

## 1.0.7

### Patch Changes

- 20196b7: fix: replace `__dirname` with ESM-compatible `import.meta.url` to fix `ReferenceError: __dirname is not defined` when loading plugins as ESM

## 1.0.6

### Patch Changes

- a59a167: Resolve the package root from `import.meta.url` and expose the generated entry
  through package exports so the plugin can be loaded by native Node.js ESM.
- Updated dependencies [a59a167]
  - rspress-plugin-devkit@1.0.1

## 1.0.5

### Patch Changes

- fix(rspress-plugin-file-tree): correct file detection for multi-part extensions (#27)

## 1.0.4

### Patch Changes

- 24b82a2: fix SVG icons not displaying in Safari

## 1.0.3

### Patch Changes

- aa8384f: fix the indent detection

## 1.0.2

### Patch Changes

- a45e165: Improve file tree parser and UI:

  - Support both 2-space and 4-space indentation formats
  - Support comments after filenames (any text after the filename is treated as comment)
  - Support `#`, `//`, `<--`, `-->` and other comment styles
  - Skip leading `.` line (current directory marker)
  - Add HTML file icon support
  - Empty directories now default to collapsed state
  - Add `...` ellipsis support for omitted content

## 1.0.1

### Patch Changes

- 6cd114a: fix that the material-icon-theme is uninstalled

## 1.0.0

### Major Changes

- 732b475: feat: Compatible with V2 Rspress

### Patch Changes

- Updated dependencies [732b475]
  - rspress-plugin-devkit@1.0.0

## 0.4.0

### Minor Changes

- d05808f: support comment display
- a6f7bdb: compat for number prefix and spaces

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
