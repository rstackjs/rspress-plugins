import { ParsedTree, TreeNode } from './types';

/**
 * Parse tree-style directory structure text into TreeNode array
 *
 * Supported formats:
 * doc_build
 * ├── file.ts
 * └── folder
 *     ├── nested.ts
 *     └── another.ts
 */
export function parseTreeContent(content: string): ParsedTree {
  const lines = content.split('\n').filter((line) => line.trim());
  const nodes: TreeNode[] = [];
  const stack: { node: TreeNode; indent: number }[] = [];

  for (const line of lines) {
    const indent = calculateIndent(line);
    const fullName = extractName(line);
    // Split name and potential comment
    // Supports both "//" and "#" style comments
    // e.g. "file.ts // comment" -> name="file.ts", comment="comment"
    // e.g. "file.ts # comment" -> name="file.ts", comment="comment"
    const commentMatch = fullName.match(/^(.*?)(?:\s*(?:\/\/|#)\s*(.*))?$/);
    const name = commentMatch ? commentMatch[1].trim() : fullName;
    const comment = commentMatch?.[2]?.trim() || undefined;

    if (!name) continue;

    const isDirectory = isDirectoryName(name);

    const node: TreeNode = {
      name: name.replace(/\/$/, ''),
      type: isDirectory ? 'directory' : 'file',
      children: [],
      extension: isDirectory ? undefined : getExtension(name),
      comment,
    };

    // Find parent node by popping items with equal or greater indent
    while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    if (stack.length === 0) {
      nodes.push(node);
    } else {
      stack[stack.length - 1].node.children.push(node);
    }

    // Only directories can have children
    if (node.type === 'directory') {
      stack.push({ node, indent });
    }
  }

  return { nodes, raw: content };
}

/**
 * Calculate indent level from line
 * Supports both 4-character ("│   ") and 2-character ("│ ") indent patterns
 */
function calculateIndent(line: string): number {
  let indent = 0;
  let i = 0;

  while (i < line.length) {
    const char = line[i];

    // Check for "│   " pattern (vertical line + 3 spaces) - 4-char indent
    if (char === '│' && line.substring(i, i + 4) === '│   ') {
      indent++;
      i += 4;
      continue;
    }

    // Check for "│ " pattern (vertical line + 1 space) - 2-char indent
    // Must check this AFTER 4-char to avoid partial matches
    if (char === '│' && line[i + 1] === ' ') {
      indent++;
      i += 2;
      continue;
    }

    // Check for 4 spaces
    if (line.substring(i, i + 4) === '    ') {
      indent++;
      i += 4;
      continue;
    }

    // Check for 2 spaces (must come after 4-space check)
    if (line.substring(i, i + 2) === '  ') {
      indent++;
      i += 2;
      continue;
    }

    // Check for branch characters (├── or └──)
    if (char === '├' || char === '└') {
      if (
        line.substring(i, i + 3) === '├──' ||
        line.substring(i, i + 3) === '└──'
      ) {
        indent++;
      }
      break;
    }

    // Other characters, stop counting indent
    break;
  }

  return indent;
}

/**
 * Extract file/folder name from line
 * Removes tree characters: ├── └── │
 */
function extractName(line: string): string {
  return line
    .replace(/^[\s│]*/g, '') // Remove leading spaces and vertical lines
    .replace(/^[├└]──\s*/, '') // Remove branch characters
    .trim();
}

/**
 * Check if name represents a directory
 * - Ends with /
 * - Has no extension
 */
function isDirectoryName(name: string): boolean {
  // Strip comments if any (supports both // and # comments)
  const cleanName = name.split(/\s+(?:\/\/|#)/)[0].trim();

  if (cleanName.endsWith('/')) return true;

  const lastPart = cleanName.split('/').pop() || cleanName;

  // Use a more robust check: files usually have extensions.
  // Directories usually don't.
  // Exception: Dotfiles (.gitignore) are files.
  // exception: names with dots but known extensions are files.

  // If it starts with a dot, it's a file (hidden file), e.g., .gitignore
  if (lastPart.startsWith('.')) {
    return false; // Treat as file
  }

  // If it has an extension (e.g. foo.ts, bar.config.js), it's a file
  if (/\.[a-zA-Z0-9]+$/.test(lastPart)) {
    return false;
  }

  // Otherwise, treat as directory
  return true;
}

/**
 * Get file extension from name
 */
function getExtension(name: string): string {
  const match = name.match(/\.([^.]+)$/);
  return match ? match[1] : '';
}
