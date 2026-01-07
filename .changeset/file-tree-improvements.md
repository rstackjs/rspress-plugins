---
"rspress-plugin-file-tree": patch
---

Improve file tree parser and UI:

- Support both 2-space and 4-space indentation formats
- Support comments after filenames (any text after the filename is treated as comment)
- Support `#`, `//`, `<--`, `-->` and other comment styles
- Skip leading `.` line (current directory marker)
- Add HTML file icon support
- Empty directories now default to collapsed state
- Add `...` ellipsis support for omitted content
