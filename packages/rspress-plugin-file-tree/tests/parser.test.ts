import { expect, test } from 'vitest';
import { parseTreeContent } from '../src/components/tree-parser/tree-parser';

test('Should parse normal input', () => {
  const input = `
.
├── rspress.config.ts
├── src
│   ├── components
│   │   ├── FileTreeRender.tsx
│   │   ├── Tree
│   │   │   ├── Expand.tsx
│   │   │   ├── FileIcon.tsx
│   │   │   ├── Tree.tsx
│   │   │   ├── TreeContext.tsx
│   │   │   ├── TreeFile.tsx
│   │   │   ├── TreeFolder.tsx
│   │   │   ├── TreeFolderIcon.tsx
│   │   │   ├── TreeIndents.tsx
│   │   │   ├── TreeStatusIcon.tsx
│   │   │   ├── index.less
│   │   │   └── index.tsx
│   │   ├── helpers.ts
│   │   └── presets.ts
│   ├── index.ts
│   └── parser.ts
└── tsconfig.json
`;
  expect(parseTreeContent(input).nodes).toMatchInlineSnapshot(`
    [
      {
        "children": [],
        "comment": undefined,
        "extension": "ts",
        "name": "rspress.config.ts",
        "type": "file",
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "comment": undefined,
                "extension": "tsx",
                "name": "FileTreeRender.tsx",
                "type": "file",
              },
              {
                "children": [
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "Expand.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "FileIcon.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "Tree.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "TreeContext.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "TreeFile.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "TreeFolder.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "TreeFolderIcon.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "TreeIndents.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "TreeStatusIcon.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "less",
                    "name": "index.less",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "index.tsx",
                    "type": "file",
                  },
                ],
                "comment": undefined,
                "extension": undefined,
                "name": "Tree",
                "type": "directory",
              },
              {
                "children": [],
                "comment": undefined,
                "extension": "ts",
                "name": "helpers.ts",
                "type": "file",
              },
              {
                "children": [],
                "comment": undefined,
                "extension": "ts",
                "name": "presets.ts",
                "type": "file",
              },
            ],
            "comment": undefined,
            "extension": undefined,
            "name": "components",
            "type": "directory",
          },
          {
            "children": [],
            "comment": undefined,
            "extension": "ts",
            "name": "index.ts",
            "type": "file",
          },
          {
            "children": [],
            "comment": undefined,
            "extension": "ts",
            "name": "parser.ts",
            "type": "file",
          },
        ],
        "comment": undefined,
        "extension": undefined,
        "name": "src",
        "type": "directory",
      },
      {
        "children": [],
        "comment": undefined,
        "extension": "json",
        "name": "tsconfig.json",
        "type": "file",
      },
    ]
  `);
});

test('Should parse input with comments', () => {
  const input = `
├── rspress.config.ts // Rspress config
├── src
│   ├── components // Shared components
│   │   ├── FileTreeRender.tsx // The file tree render entry
│   │   ├── Tree
│   │   │   ├── Expand.tsx
│   │   │   ├── FileIcon.tsx
│   │   │   ├── Tree.tsx
│   │   │   ├── TreeContext.tsx
│   │   │   ├── TreeFile.tsx
│   │   │   ├── TreeFolder.tsx
│   │   │   ├── TreeFolderIcon.tsx
│   │   │   ├── TreeIndents.tsx
│   │   │   ├── TreeStatusIcon.tsx
│   │   │   ├── index.less
│   │   │   └── index.tsx
│   │   ├── helpers.ts
│   │   └── presets.ts
│   ├── index.ts
│   └── parser.ts // Parse string input to tree structure
└── tsconfig.json
`;
  expect(parseTreeContent(input).nodes).toMatchInlineSnapshot(`
    [
      {
        "children": [],
        "comment": "// Rspress config",
        "extension": "ts",
        "name": "rspress.config.ts",
        "type": "file",
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "comment": "// The file tree render entry",
                "extension": "tsx",
                "name": "FileTreeRender.tsx",
                "type": "file",
              },
              {
                "children": [
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "Expand.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "FileIcon.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "Tree.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "TreeContext.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "TreeFile.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "TreeFolder.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "TreeFolderIcon.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "TreeIndents.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "TreeStatusIcon.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "less",
                    "name": "index.less",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "index.tsx",
                    "type": "file",
                  },
                ],
                "comment": undefined,
                "extension": undefined,
                "name": "Tree",
                "type": "directory",
              },
              {
                "children": [],
                "comment": undefined,
                "extension": "ts",
                "name": "helpers.ts",
                "type": "file",
              },
              {
                "children": [],
                "comment": undefined,
                "extension": "ts",
                "name": "presets.ts",
                "type": "file",
              },
            ],
            "comment": "// Shared components",
            "extension": undefined,
            "name": "components",
            "type": "directory",
          },
          {
            "children": [],
            "comment": undefined,
            "extension": "ts",
            "name": "index.ts",
            "type": "file",
          },
          {
            "children": [],
            "comment": "// Parse string input to tree structure",
            "extension": "ts",
            "name": "parser.ts",
            "type": "file",
          },
        ],
        "comment": undefined,
        "extension": undefined,
        "name": "src",
        "type": "directory",
      },
      {
        "children": [],
        "comment": undefined,
        "extension": "json",
        "name": "tsconfig.json",
        "type": "file",
      },
    ]
  `);
});

test('Should parse input with spaces', () => {
  const input = `
├── 0. rspress.config.ts // Rspress config
├── -1. src
│   ├── 2. components // Shared components
│   │   ├── FileTreeRender.tsx // The file tree render entry
│   │   ├── Tree
│   │   │   ├── Expand.tsx
│   │   │   ├── FileIcon.tsx
│   │   │   ├── Tree.tsx
│   │   │   ├── TreeContext.tsx
│   │   │   ├── TreeFile.tsx
│   │   │   ├── TreeFolder.tsx
│   │   │   ├── TreeFolderIcon.tsx
│   │   │   ├── TreeIndents.tsx
│   │   │   ├── TreeStatusIcon.tsx
│   │   │   ├── index.less
│   │   │   └── index.tsx
│   │   ├── helpers.ts
│   │   └── presets.ts
│   ├── index.ts
│   └── parser.ts // Parse string input to tree structure
└── 1. tsconfig.json
`;

  // Alternative format with 2-space indentation (should produce same result)
  const input2SpaceIndent = `
├── 0. rspress.config.ts // Rspress config
├── -1. src
│ ├── 2. components // Shared components
│ │ ├── FileTreeRender.tsx // The file tree render entry
│ │ ├── Tree
│ │ │ ├── Expand.tsx
│ │ │ ├── FileIcon.tsx
│ │ │ ├── Tree.tsx
│ │ │ ├── TreeContext.tsx
│ │ │ ├── TreeFile.tsx
│ │ │ ├── TreeFolder.tsx
│ │ │ ├── TreeFolderIcon.tsx
│ │ │ ├── TreeIndents.tsx
│ │ │ ├── TreeStatusIcon.tsx
│ │ │ ├── index.less
│ │ │ └── index.tsx
│ │ ├── helpers.ts
│ │ └── presets.ts
│ ├── index.ts
│ └── parser.ts // Parse string input to tree structure
└── 1. tsconfig.json
`;
  expect(parseTreeContent(input).nodes).toMatchInlineSnapshot(`
    [
      {
        "children": [],
        "comment": "// Rspress config",
        "extension": "ts",
        "name": "0. rspress.config.ts",
        "type": "file",
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "comment": "// The file tree render entry",
                "extension": "tsx",
                "name": "FileTreeRender.tsx",
                "type": "file",
              },
              {
                "children": [
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "Expand.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "FileIcon.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "Tree.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "TreeContext.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "TreeFile.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "TreeFolder.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "TreeFolderIcon.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "TreeIndents.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "TreeStatusIcon.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "less",
                    "name": "index.less",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "tsx",
                    "name": "index.tsx",
                    "type": "file",
                  },
                ],
                "comment": undefined,
                "extension": undefined,
                "name": "Tree",
                "type": "directory",
              },
              {
                "children": [],
                "comment": undefined,
                "extension": "ts",
                "name": "helpers.ts",
                "type": "file",
              },
              {
                "children": [],
                "comment": undefined,
                "extension": "ts",
                "name": "presets.ts",
                "type": "file",
              },
            ],
            "comment": "// Shared components",
            "extension": undefined,
            "name": "2. components",
            "type": "directory",
          },
          {
            "children": [],
            "comment": undefined,
            "extension": "ts",
            "name": "index.ts",
            "type": "file",
          },
          {
            "children": [],
            "comment": "// Parse string input to tree structure",
            "extension": "ts",
            "name": "parser.ts",
            "type": "file",
          },
        ],
        "comment": undefined,
        "extension": undefined,
        "name": "-1. src",
        "type": "directory",
      },
      {
        "children": [],
        "comment": undefined,
        "extension": "json",
        "name": "1. tsconfig.json",
        "type": "file",
      },
    ]
  `);

  // Both formats should produce the same result
  expect(parseTreeContent(input2SpaceIndent).nodes).toEqual(
    parseTreeContent(input).nodes
  );
});

test('Should parse 2-space and 4-space indentation identically', () => {
  // 4-space indentation format (standard)
  const input4Space = `
├── docs
│   ├── index.md
│   ├── api
│   │   ├── index.md
│   │   ├── theme
│   │   │   ├── index.md
│   │   │   ├── component.mdx
│   │   │   ├── utils.mdx
`;

  // 2-space indentation format (alternative)
  const input2Space = `
├── docs
│ ├── index.md
│ ├── api
│ │ ├── index.md
│ │ ├── theme
│ │ │ ├── index.md
│ │ │ ├── component.mdx
│ │ │ ├── utils.mdx
`;

  const result4Space = parseTreeContent(input4Space).nodes;
  const result2Space = parseTreeContent(input2Space).nodes;

  // Both should produce identical results
  expect(result2Space).toEqual(result4Space);

  // Verify the structure is correct
  expect(result4Space).toMatchInlineSnapshot(`
    [
      {
        "children": [
          {
            "children": [],
            "comment": undefined,
            "extension": "md",
            "name": "index.md",
            "type": "file",
          },
          {
            "children": [
              {
                "children": [],
                "comment": undefined,
                "extension": "md",
                "name": "index.md",
                "type": "file",
              },
              {
                "children": [
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "md",
                    "name": "index.md",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "mdx",
                    "name": "component.mdx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "comment": undefined,
                    "extension": "mdx",
                    "name": "utils.mdx",
                    "type": "file",
                  },
                ],
                "comment": undefined,
                "extension": undefined,
                "name": "theme",
                "type": "directory",
              },
            ],
            "comment": undefined,
            "extension": undefined,
            "name": "api",
            "type": "directory",
          },
        ],
        "comment": undefined,
        "extension": undefined,
        "name": "docs",
        "type": "directory",
      },
    ]
  `);
});

test('Should parse space-only indentation without tree characters', () => {
  const input = `
docs
├── advanced.mdx
└── advanced
  ├── _meta.json
  └── nested
`;

  expect(parseTreeContent(input).nodes).toMatchInlineSnapshot(`
    [
      {
        "children": [
          {
            "children": [],
            "comment": undefined,
            "extension": "mdx",
            "name": "advanced.mdx",
            "type": "file",
          },
          {
            "children": [
              {
                "children": [],
                "comment": undefined,
                "extension": "json",
                "name": "_meta.json",
                "type": "file",
              },
              {
                "children": [],
                "comment": undefined,
                "extension": undefined,
                "name": "nested",
                "type": "directory",
              },
            ],
            "comment": undefined,
            "extension": undefined,
            "name": "advanced",
            "type": "directory",
          },
        ],
        "comment": undefined,
        "extension": undefined,
        "name": "docs",
        "type": "directory",
      },
    ]
  `);
});

test('Should parse both // and # style comments', () => {
  const input = `
docs
├── advanced.mdx
└── advanced
  ├── _meta.json # hello world
  └── utils.ts // hello world2
`;

  const result = parseTreeContent(input).nodes;

  // Check that comments are parsed correctly (comments include the markers)
  const advancedDir = result[0].children[1];
  expect(advancedDir.name).toBe('advanced');

  const metaJson = advancedDir.children[0];
  expect(metaJson.name).toBe('_meta.json');
  expect(metaJson.comment).toBe('# hello world');

  const utilsTs = advancedDir.children[1];
  expect(utilsTs.name).toBe('utils.ts');
  expect(utilsTs.comment).toBe('// hello world2');
});

test('Should parse arrow style comments (<--, -->, <-, ->)', () => {
  const input = `
├── docs
│   └── index.mdx  <-- "@rspress/core/theme"
├── theme
│   └── index.tsx  <-- "@rspress/core/theme-original"
└── rspress.config.ts
`;

  const result = parseTreeContent(input).nodes;

  // docs/index.mdx - comment includes the arrow
  const docsDir = result[0];
  expect(docsDir.name).toBe('docs');
  const indexMdx = docsDir.children[0];
  expect(indexMdx.name).toBe('index.mdx');
  expect(indexMdx.comment).toBe('<-- "@rspress/core/theme"');

  // theme/index.tsx - comment includes the arrow
  const themeDir = result[1];
  expect(themeDir.name).toBe('theme');
  const indexTsx = themeDir.children[0];
  expect(indexTsx.name).toBe('index.tsx');
  expect(indexTsx.comment).toBe('<-- "@rspress/core/theme-original"');

  // rspress.config.ts (no comment)
  const configTs = result[2];
  expect(configTs.name).toBe('rspress.config.ts');
  expect(configTs.comment).toBeUndefined();
});

test('Should treat any text after filename as comment', () => {
  const input = `
├── file1.ts // slash comment
├── file2.ts # hash comment
├── file3.ts <-- left arrow comment
├── file4.ts --> right arrow comment
├── file5.ts any text here is comment
└── file6.ts (note: this is also a comment)
`;

  const result = parseTreeContent(input).nodes;

  // All text after filename is treated as comment (including markers)
  expect(result[0].comment).toBe('// slash comment');
  expect(result[1].comment).toBe('# hash comment');
  expect(result[2].comment).toBe('<-- left arrow comment');
  expect(result[3].comment).toBe('--> right arrow comment');
  expect(result[4].comment).toBe('any text here is comment');
  expect(result[5].comment).toBe('(note: this is also a comment)');
});

test('Should skip leading . line (current directory marker)', () => {
  const input = `
.
├── docs
│   └── index.mdx  <-- "@rspress/core/theme"
├── theme
│   └── index.tsx  <-- "@rspress/core/theme-original"
└── rspress.config.ts
`;

  const result = parseTreeContent(input).nodes;

  // Should have 3 top-level items (docs, theme, rspress.config.ts)
  // The leading "." should be skipped
  expect(result.length).toBe(3);

  // docs directory
  const docsDir = result[0];
  expect(docsDir.name).toBe('docs');
  expect(docsDir.type).toBe('directory');
  expect(docsDir.children[0].name).toBe('index.mdx');
  expect(docsDir.children[0].comment).toBe('<-- "@rspress/core/theme"');

  // theme directory
  const themeDir = result[1];
  expect(themeDir.name).toBe('theme');
  expect(themeDir.type).toBe('directory');
  expect(themeDir.children[0].name).toBe('index.tsx');
  expect(themeDir.children[0].comment).toBe('<-- "@rspress/core/theme-original"');

  // rspress.config.ts
  const configTs = result[2];
  expect(configTs.name).toBe('rspress.config.ts');
  expect(configTs.type).toBe('file');
});

test('Should parse .html files and ... ellipsis correctly', () => {
  const input = `
doc_build
├── static
│   ├── main.js
│   └── ...
├── index.html
├── about.html
├── posts
│   ├── hello-world.html
│   └── ...
`;

  const result = parseTreeContent(input).nodes;

  // doc_build is the root directory
  const docBuild = result[0];
  expect(docBuild.name).toBe('doc_build');
  expect(docBuild.type).toBe('directory');

  // static directory
  const staticDir = docBuild.children[0];
  expect(staticDir.name).toBe('static');
  expect(staticDir.type).toBe('directory');

  // main.js
  const mainJs = staticDir.children[0];
  expect(mainJs.name).toBe('main.js');
  expect(mainJs.type).toBe('file');
  expect(mainJs.extension).toBe('js');

  // ... ellipsis (should be treated as file, not directory)
  const ellipsis1 = staticDir.children[1];
  expect(ellipsis1.name).toBe('...');
  expect(ellipsis1.type).toBe('file');

  // index.html
  const indexHtml = docBuild.children[1];
  expect(indexHtml.name).toBe('index.html');
  expect(indexHtml.type).toBe('file');
  expect(indexHtml.extension).toBe('html');

  // about.html
  const aboutHtml = docBuild.children[2];
  expect(aboutHtml.name).toBe('about.html');
  expect(aboutHtml.type).toBe('file');
  expect(aboutHtml.extension).toBe('html');

  // posts directory
  const postsDir = docBuild.children[3];
  expect(postsDir.name).toBe('posts');
  expect(postsDir.type).toBe('directory');

  // hello-world.html
  const helloWorldHtml = postsDir.children[0];
  expect(helloWorldHtml.name).toBe('hello-world.html');
  expect(helloWorldHtml.type).toBe('file');
  expect(helloWorldHtml.extension).toBe('html');

  // ... ellipsis in posts
  const ellipsis2 = postsDir.children[1];
  expect(ellipsis2.name).toBe('...');
  expect(ellipsis2.type).toBe('file');
});

test('Should parse docs structure with basic directory containing mdx files', () => {
  const input = `
docs
├── _meta.json
└── guides
  ├── _meta.json
  └── basic
    ├── introduction.mdx
    ├── install.mdx
    └── plugin-development.md
`;

  const result = parseTreeContent(input).nodes;

  // docs is the root directory
  const docs = result[0];
  expect(docs.name).toBe('docs');
  expect(docs.type).toBe('directory');
  expect(docs.children.length).toBe(2);

  // _meta.json at root level
  const metaJson = docs.children[0];
  expect(metaJson.name).toBe('_meta.json');
  expect(metaJson.type).toBe('file');
  expect(metaJson.extension).toBe('json');

  // guides directory
  const guides = docs.children[1];
  expect(guides.name).toBe('guides');
  expect(guides.type).toBe('directory');
  expect(guides.children.length).toBe(2);

  // _meta.json in guides
  const guidesMetaJson = guides.children[0];
  expect(guidesMetaJson.name).toBe('_meta.json');
  expect(guidesMetaJson.type).toBe('file');
  expect(guidesMetaJson.extension).toBe('json');

  // basic directory (should be a directory, not a file)
  const basic = guides.children[1];
  expect(basic.name).toBe('basic');
  expect(basic.type).toBe('directory');
  expect(basic.children.length).toBe(3);

  // introduction.mdx
  const introduction = basic.children[0];
  expect(introduction.name).toBe('introduction.mdx');
  expect(introduction.type).toBe('file');
  expect(introduction.extension).toBe('mdx');

  // install.mdx
  const install = basic.children[1];
  expect(install.name).toBe('install.mdx');
  expect(install.type).toBe('file');
  expect(install.extension).toBe('mdx');

  // plugin-development.md
  const pluginDev = basic.children[2];
  expect(pluginDev.name).toBe('plugin-development.md');
  expect(pluginDev.type).toBe('file');
  expect(pluginDev.extension).toBe('md');
});

test('Should correctly identify files with various extensions', () => {
  const input = `
├── file.ts
├── file.tsx
├── file.js
├── file.jsx
├── file.json
├── file.html
├── file.md
├── file.mdx
├── file.css
├── file.less
├── file.scss
├── file.svg
├── file.png
├── file.jpg
├── file.gif
├── file.woff
├── file.woff2
├── file.ttf
├── file.eot
└── file.ico
`;

  const result = parseTreeContent(input).nodes;

  result.forEach((node) => {
    expect(node.type).toBe('file');
    expect(node.extension).toBeDefined();
  });
});

test('Should correctly identify files with extensions containing underscores and hyphens', () => {
  const input = `
├── file.config_dev.js
├── file.config-prod.json
├── file.test_spec.ts
├── file.e2e-test.tsx
├── component.stories_tsx
└── style.module_css
`;

  const result = parseTreeContent(input).nodes;

  result.forEach((node) => {
    expect(node.type).toBe('file');
    expect(node.extension).toBeDefined();
  });

  expect(result[0].name).toBe('file.config_dev.js');
  expect(result[0].extension).toBe('js');
  expect(result[1].name).toBe('file.config-prod.json');
  expect(result[1].extension).toBe('json');
  expect(result[2].name).toBe('file.test_spec.ts');
  expect(result[2].extension).toBe('ts');
  expect(result[3].name).toBe('file.e2e-test.tsx');
  expect(result[3].extension).toBe('tsx');
  expect(result[4].name).toBe('component.stories_tsx');
  expect(result[4].extension).toBe('stories_tsx');
  expect(result[5].name).toBe('style.module_css');
  expect(result[5].extension).toBe('module_css');
});

test('Should correctly identify files with multiple dots', () => {
  const input = `
├── rspress.config.ts
├── webpack.config.dev.js
├── webpack.config.prod.js
├── tsconfig.build.json
├── package.lock.json
├── .env.local
├── .env.production
└── file.test.unit.spec.ts
`;

  const result = parseTreeContent(input).nodes;

  expect(result[0].name).toBe('rspress.config.ts');
  expect(result[0].type).toBe('file');
  expect(result[0].extension).toBe('ts');

  expect(result[1].name).toBe('webpack.config.dev.js');
  expect(result[1].type).toBe('file');
  expect(result[1].extension).toBe('js');

  expect(result[2].name).toBe('webpack.config.prod.js');
  expect(result[2].type).toBe('file');
  expect(result[2].extension).toBe('js');

  expect(result[3].name).toBe('tsconfig.build.json');
  expect(result[3].type).toBe('file');
  expect(result[3].extension).toBe('json');

  expect(result[4].name).toBe('package.lock.json');
  expect(result[4].type).toBe('file');
  expect(result[4].extension).toBe('json');

  expect(result[5].name).toBe('.env.local');
  expect(result[5].type).toBe('file');
  expect(result[5].extension).toBe('local');

  expect(result[6].name).toBe('.env.production');
  expect(result[6].type).toBe('file');
  expect(result[6].extension).toBe('production');

  expect(result[7].name).toBe('file.test.unit.spec.ts');
  expect(result[7].type).toBe('file');
  expect(result[7].extension).toBe('ts');
});

test('Should correctly identify hidden files (starting with dot)', () => {
  const input = `
├── .gitignore
├── .env
├── .eslintrc
├── .prettierrc
├── .dockerignore
└── .npmrc
`;

  const result = parseTreeContent(input).nodes;

  result.forEach((node) => {
    expect(node.type).toBe('file');
    expect(node.name.startsWith('.')).toBe(true);
  });

  expect(result[0].name).toBe('.gitignore');
  expect(result[1].name).toBe('.env');
  expect(result[2].name).toBe('.eslintrc');
  expect(result[3].name).toBe('.prettierrc');
  expect(result[4].name).toBe('.dockerignore');
  expect(result[5].name).toBe('.npmrc');
});

test('Should correctly identify directories without extensions', () => {
  const input = `
├── src
├── components
├── utils
├── pages
├── docs
├── public
├── assets
└── styles
`;

  const result = parseTreeContent(input).nodes;

  result.forEach((node) => {
    expect(node.type).toBe('directory');
    expect(node.extension).toBeUndefined();
  });
});

test('Should correctly identify directories with trailing slash', () => {
  const input = `
├── src/
├── components/
├── utils/
└── pages/
`;

  const result = parseTreeContent(input).nodes;

  result.forEach((node) => {
    expect(node.type).toBe('directory');
    expect(node.extension).toBeUndefined();
    expect(node.name.endsWith('/')).toBe(false);
  });
});

test('Should correctly identify files with dots in name (treated as extensions)', () => {
  const input = `
├── node_modules
├── test.utils
├── my.components
├── v1.0.0
└── release-1.2.3
`;

  const result = parseTreeContent(input).nodes;

  expect(result[0].name).toBe('node_modules');
  expect(result[0].type).toBe('directory');
  expect(result[0].extension).toBeUndefined();

  expect(result[1].name).toBe('test.utils');
  expect(result[1].type).toBe('file');
  expect(result[1].extension).toBe('utils');

  expect(result[2].name).toBe('my.components');
  expect(result[2].type).toBe('file');
  expect(result[2].extension).toBe('components');

  expect(result[3].name).toBe('v1.0.0');
  expect(result[3].type).toBe('file');
  expect(result[3].extension).toBe('0');

  expect(result[4].name).toBe('release-1.2.3');
  expect(result[4].type).toBe('file');
  expect(result[4].extension).toBe('3');
});

test('Should correctly identify files with numeric extensions', () => {
  const input = `
├── file.123
├── file.456
├── file.789
└── file.0
`;

  const result = parseTreeContent(input).nodes;

  result.forEach((node) => {
    expect(node.type).toBe('file');
    expect(node.extension).toBeDefined();
  });

  expect(result[0].extension).toBe('123');
  expect(result[1].extension).toBe('456');
  expect(result[2].extension).toBe('789');
  expect(result[3].extension).toBe('0');
});

test('Should correctly identify files in nested paths', () => {
  const input = `
├── src
│   ├── components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Modal
│   │       ├── Modal.tsx
│   │       ├── Modal.test.tsx
│   │       └── index.ts
│   └── utils
│       ├── helpers.ts
│       └── constants.ts
└── package.json
`;

  const result = parseTreeContent(input).nodes;

  expect(result[0].name).toBe('src');
  expect(result[0].type).toBe('directory');

  const components = result[0].children[0];
  expect(components.name).toBe('components');
  expect(components.type).toBe('directory');

  expect(components.children[0].name).toBe('Button.tsx');
  expect(components.children[0].type).toBe('file');
  expect(components.children[0].extension).toBe('tsx');

  expect(components.children[1].name).toBe('Input.tsx');
  expect(components.children[1].type).toBe('file');
  expect(components.children[1].extension).toBe('tsx');

  const modal = components.children[2];
  expect(modal.name).toBe('Modal');
  expect(modal.type).toBe('directory');

  expect(modal.children[0].name).toBe('Modal.tsx');
  expect(modal.children[0].type).toBe('file');
  expect(modal.children[0].extension).toBe('tsx');

  expect(modal.children[1].name).toBe('Modal.test.tsx');
  expect(modal.children[1].type).toBe('file');
  expect(modal.children[1].extension).toBe('tsx');

  expect(modal.children[2].name).toBe('index.ts');
  expect(modal.children[2].type).toBe('file');
  expect(modal.children[2].extension).toBe('ts');

  const utils = result[0].children[1];
  expect(utils.name).toBe('utils');
  expect(utils.type).toBe('directory');

  expect(utils.children[0].name).toBe('helpers.ts');
  expect(utils.children[0].type).toBe('file');
  expect(utils.children[0].extension).toBe('ts');

  expect(utils.children[1].name).toBe('constants.ts');
  expect(utils.children[1].type).toBe('file');
  expect(utils.children[1].extension).toBe('ts');

  expect(result[1].name).toBe('package.json');
  expect(result[1].type).toBe('file');
  expect(result[1].extension).toBe('json');
});

test('Should correctly handle mixed files and directories', () => {
  const input = `
├── src
│   ├── index.ts
│   ├── App.tsx
│   └── styles
│       ├── index.css
│       └── variables.less
├── public
│   ├── index.html
│   └── favicon.ico
├── package.json
├── tsconfig.json
└── README.md
`;

  const result = parseTreeContent(input).nodes;

  expect(result[0].type).toBe('directory');
  expect(result[0].name).toBe('src');

  expect(result[0].children[0].type).toBe('file');
  expect(result[0].children[0].name).toBe('index.ts');

  expect(result[0].children[1].type).toBe('file');
  expect(result[0].children[1].name).toBe('App.tsx');

  expect(result[0].children[2].type).toBe('directory');
  expect(result[0].children[2].name).toBe('styles');

  expect(result[1].type).toBe('directory');
  expect(result[1].name).toBe('public');

  expect(result[2].type).toBe('file');
  expect(result[2].name).toBe('package.json');

  expect(result[3].type).toBe('file');
  expect(result[3].name).toBe('tsconfig.json');

  expect(result[4].type).toBe('file');
  expect(result[4].name).toBe('README.md');
});

test('Should correctly identify files with uppercase extensions', () => {
  const input = `
├── file.TS
├── file.TSX
├── file.JS
├── file.JSX
├── file.JSON
├── file.HTML
├── file.CSS
└── file.MD
`;

  const result = parseTreeContent(input).nodes;

  result.forEach((node) => {
    expect(node.type).toBe('file');
    expect(node.extension).toBeDefined();
  });

  expect(result[0].extension).toBe('TS');
  expect(result[1].extension).toBe('TSX');
  expect(result[2].extension).toBe('JS');
  expect(result[3].extension).toBe('JSX');
  expect(result[4].extension).toBe('JSON');
  expect(result[5].extension).toBe('HTML');
  expect(result[6].extension).toBe('CSS');
  expect(result[7].extension).toBe('MD');
});

test('Should correctly identify files with mixed case extensions', () => {
  const input = `
├── file.Ts
├── file.TsX
├── file.Js
├── file.JsOn
└── file.HtMl
`;

  const result = parseTreeContent(input).nodes;

  result.forEach((node) => {
    expect(node.type).toBe('file');
    expect(node.extension).toBeDefined();
  });

  expect(result[0].extension).toBe('Ts');
  expect(result[1].extension).toBe('TsX');
  expect(result[2].extension).toBe('Js');
  expect(result[3].extension).toBe('JsOn');
  expect(result[4].extension).toBe('HtMl');
});

test('Should handle edge case: files with only extension', () => {
  const input = `
├── .ts
├── .js
└── .json
`;

  const result = parseTreeContent(input).nodes;

  result.forEach((node) => {
    expect(node.type).toBe('file');
    expect(node.name.startsWith('.')).toBe(true);
  });
});

test('Should handle edge case: files with underscore-only extension', () => {
  const input = `
├── file._
├── file.__
└── file._test
`;

  const result = parseTreeContent(input).nodes;

  result.forEach((node) => {
    expect(node.type).toBe('file');
    expect(node.extension).toBeDefined();
  });

  expect(result[0].extension).toBe('_');
  expect(result[1].extension).toBe('__');
  expect(result[2].extension).toBe('_test');
});

test('Should handle edge case: files with hyphen-only extension', () => {
  const input = `
├── file.-
├── file.--
└── file.-test
`;

  const result = parseTreeContent(input).nodes;

  result.forEach((node) => {
    expect(node.type).toBe('file');
    expect(node.extension).toBeDefined();
  });

  expect(result[0].extension).toBe('-');
  expect(result[1].extension).toBe('--');
  expect(result[2].extension).toBe('-test');
});
