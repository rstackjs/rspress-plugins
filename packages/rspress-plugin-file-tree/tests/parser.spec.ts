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
        "extension": "",
        "name": ".",
        "type": "file",
      },
      {
        "children": [],
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
                "extension": "tsx",
                "name": "FileTreeRender.tsx",
                "type": "file",
              },
              {
                "children": [
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "Expand.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "FileIcon.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "Tree.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "TreeContext.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "TreeFile.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "TreeFolder.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "TreeFolderIcon.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "TreeIndents.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "TreeStatusIcon.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "less",
                    "name": "index.less",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "index.tsx",
                    "type": "file",
                  },
                ],
                "extension": undefined,
                "name": "Tree",
                "type": "directory",
              },
              {
                "children": [],
                "extension": "ts",
                "name": "helpers.ts",
                "type": "file",
              },
              {
                "children": [],
                "extension": "ts",
                "name": "presets.ts",
                "type": "file",
              },
            ],
            "extension": undefined,
            "name": "components",
            "type": "directory",
          },
          {
            "children": [],
            "extension": "ts",
            "name": "index.ts",
            "type": "file",
          },
          {
            "children": [],
            "extension": "ts",
            "name": "parser.ts",
            "type": "file",
          },
        ],
        "extension": undefined,
        "name": "src",
        "type": "directory",
      },
      {
        "children": [],
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
                "extension": "tsx",
                "name": "FileTreeRender.tsx",
                "type": "file",
              },
              {
                "children": [
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "Expand.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "FileIcon.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "Tree.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "TreeContext.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "TreeFile.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "TreeFolder.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "TreeFolderIcon.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "TreeIndents.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "TreeStatusIcon.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "less",
                    "name": "index.less",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "index.tsx",
                    "type": "file",
                  },
                ],
                "extension": undefined,
                "name": "Tree",
                "type": "directory",
              },
              {
                "children": [],
                "extension": "ts",
                "name": "helpers.ts",
                "type": "file",
              },
              {
                "children": [],
                "extension": "ts",
                "name": "presets.ts",
                "type": "file",
              },
            ],
            "extension": undefined,
            "name": "components",
            "type": "directory",
          },
          {
            "children": [],
            "extension": "ts",
            "name": "index.ts",
            "type": "file",
          },
          {
            "children": [],
            "extension": "ts",
            "name": "parser.ts",
            "type": "file",
          },
        ],
        "extension": undefined,
        "name": "src",
        "type": "directory",
      },
      {
        "children": [],
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
                "extension": "tsx",
                "name": "FileTreeRender.tsx",
                "type": "file",
              },
              {
                "children": [
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "Expand.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "FileIcon.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "Tree.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "TreeContext.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "TreeFile.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "TreeFolder.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "TreeFolderIcon.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "TreeIndents.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "TreeStatusIcon.tsx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "less",
                    "name": "index.less",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "tsx",
                    "name": "index.tsx",
                    "type": "file",
                  },
                ],
                "extension": undefined,
                "name": "Tree",
                "type": "directory",
              },
              {
                "children": [],
                "extension": "ts",
                "name": "helpers.ts",
                "type": "file",
              },
              {
                "children": [],
                "extension": "ts",
                "name": "presets.ts",
                "type": "file",
              },
            ],
            "extension": undefined,
            "name": "2. components",
            "type": "directory",
          },
          {
            "children": [],
            "extension": "ts",
            "name": "index.ts",
            "type": "file",
          },
          {
            "children": [],
            "extension": "ts",
            "name": "parser.ts",
            "type": "file",
          },
        ],
        "extension": undefined,
        "name": "-1. src",
        "type": "directory",
      },
      {
        "children": [],
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
            "extension": "md",
            "name": "index.md",
            "type": "file",
          },
          {
            "children": [
              {
                "children": [],
                "extension": "md",
                "name": "index.md",
                "type": "file",
              },
              {
                "children": [
                  {
                    "children": [],
                    "extension": "md",
                    "name": "index.md",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "mdx",
                    "name": "component.mdx",
                    "type": "file",
                  },
                  {
                    "children": [],
                    "extension": "mdx",
                    "name": "utils.mdx",
                    "type": "file",
                  },
                ],
                "extension": undefined,
                "name": "theme",
                "type": "directory",
              },
            ],
            "extension": undefined,
            "name": "api",
            "type": "directory",
          },
        ],
        "extension": undefined,
        "name": "docs",
        "type": "directory",
      },
    ]
  `);
});
