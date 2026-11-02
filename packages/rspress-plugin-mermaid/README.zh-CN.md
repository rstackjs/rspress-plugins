# rspress-plugin-mermaid ![NPM Version](https://img.shields.io/npm/v/rspress-plugin-mermaid)

为 Rspress 支持基于 [Mermaid](https://mermaid.js.org/#/) 的流程图、时序图等图表。

编写 Mermaid 图表时，只需使用 `mermaid` 代码块，插件会自动将其转换为 SVG。

````markdown
```mermaid
flowchart TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
```
````

<div align="center">
  <img src="./image.png" alt="sample" width="400" height="560" />
</div>

## 使用

```bash
npm i rspress-plugin-mermaid
pnpm add rspress-plugin-mermaid
```

```ts
import * as path from 'path';
import { defineConfig } from 'rspress/config';
import mermaid from 'rspress-plugin-mermaid';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  plugins: [mermaid()],
});
```

## 配置

### Mermaid 12 兼容性

插件使用 [Mermaid 12](https://github.com/mermaid-js/mermaid/releases/tag/mermaid%4012.0.0)，支持用例图和内置的 ELK 布局。需要 Node.js 22.12+ 和支持 ES2024 的浏览器（Safari 17.4+）。

Mermaid 12 调整了部分图表类型的默认布局和外观，现有图表的渲染结果可能发生变化。除非显式设置 `mermaidConfig.theme`，插件仍会根据站点的颜色模式自动选择 `default` 或 `dark` 主题。如需保留之前的布局和外观，同时保持自动切换主题：

```ts
mermaid({
  mermaidConfig: {
    layout: 'dagre',
    look: 'classic',
  },
});
```

请将旧的 `flowchart.defaultRenderer`、`class.defaultRenderer` 或 `state.defaultRenderer` 配置改为顶层 `layout` 选项；Mermaid 12 会忽略这些旧选项。

### mermaidConfig

Mermaid 配置选项，将传递给 `mermaid.initialize` 函数。查看 [mermaid 文档](https://mermaid.js.org/config/schema-docs/config.html) 了解更多细节。

- Type: `object`

```ts
import * as path from 'path';
import { defineConfig } from 'rspress/config';
import mermaid from 'rspress-plugin-mermaid';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  plugins: [
    mermaid({
      mermaidConfig: {
        theme: 'forest',
      },
    }),
  ],
});
```
