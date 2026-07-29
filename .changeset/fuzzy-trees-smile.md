---
'rspress-plugin-file-tree': patch
---

Resolve the package root from `import.meta.url` and expose the generated entry
through package exports so the plugin can be loaded by native Node.js ESM.
