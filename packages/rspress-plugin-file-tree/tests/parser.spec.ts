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
        "extension": "",
        "name": ".",
        "type": "file",
      },
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
        "comment": "Rspress config",
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
                "comment": "The file tree render entry",
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
            "comment": "Shared components",
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
            "comment": "Parse string input to tree structure",
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
        "comment": "Rspress config",
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
                "comment": "The file tree render entry",
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
            "comment": "Shared components",
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
            "comment": "Parse string input to tree structure",
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

  // Check that comments are parsed correctly
  const advancedDir = result[0].children[1];
  expect(advancedDir.name).toBe('advanced');

  const metaJson = advancedDir.children[0];
  expect(metaJson.name).toBe('_meta.json');
  expect(metaJson.comment).toBe('hello world');

  const utilsTs = advancedDir.children[1];
  expect(utilsTs.name).toBe('utils.ts');
  expect(utilsTs.comment).toBe('hello world2');
});
