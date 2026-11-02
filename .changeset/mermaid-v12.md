---
'rspress-plugin-mermaid': major
---

Upgrade Mermaid from v10 to v12, including support for use case diagrams and the bundled ELK layout. Requires Node.js 22.12+ and browsers supporting ES2024 (Safari 17.4+). Existing diagrams may render differently; set `mermaidConfig: { layout: 'dagre', look: 'classic' }` to retain the previous layout and look. The plugin continues to select the `default` or `dark` theme automatically unless a theme is configured explicitly.
