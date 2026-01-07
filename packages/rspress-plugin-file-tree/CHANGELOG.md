# rspress-plugin-file-tree

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
