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
