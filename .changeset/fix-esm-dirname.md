---
'rspress-plugin-google-analytics': patch
'rspress-plugin-back-to-top': patch
'rspress-plugin-file-tree': patch
'rspress-plugin-live2d': patch
'rspress-plugin-mermaid': patch
'rspress-plugin-reading-time': patch
'rspress-plugin-vercel-analytics': patch
---

fix: replace `__dirname` with ESM-compatible `import.meta.url` to fix `ReferenceError: __dirname is not defined` when loading plugins as ESM
