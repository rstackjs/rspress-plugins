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

    // Extract name and comment
    // Rule: filename ends when we detect a valid file/directory name pattern,
    // everything after (with leading spaces) is treated as comment
    const { name, comment } = extractNameAndComment(fullName);

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
 * Extract filename/dirname and comment from a line
 *
 * Rules for detecting end of filename:
 * 1. Files have extensions: name.ext (e.g., file.ts, config.json)
 * 2. Hidden files start with dot: .gitignore, .env
 * 3. Directories end with / or have no extension
 * 4. Special names: ... (ellipsis for omitted content)
 * 5. Everything after the name (separated by 2+ spaces) is comment
 *
 * Note: Filenames can contain spaces (e.g., "0. file.ts"), so we use
 * 2+ consecutive spaces as the delimiter between name and comment.
 */
function extractNameAndComment(fullName: string): {
  name: string;
  comment: string | undefined;
} {
  const trimmed = fullName.trim();
  if (!trimmed) {
    return { name: '', comment: undefined };
  }

  // Special case: "..." or similar ellipsis patterns (standalone)
  if (/^\.{2,}$/.test(trimmed)) {
    return { name: trimmed, comment: undefined };
  }

  // Strategy: Find the last occurrence of a file extension pattern,
  // then check if there's content after it (separated by 2+ spaces)

  // First, try to split by 2+ spaces (common comment delimiter)
  const doubleSpaceMatch = trimmed.match(/^(.+?)\s{2,}(.+)$/);
  if (doubleSpaceMatch) {
    const potentialName = doubleSpaceMatch[1].trim();
    const potentialComment = doubleSpaceMatch[2].trim();

    // Verify the name part looks like a valid file/directory
    if (isValidName(potentialName)) {
      return { name: potentialName, comment: potentialComment };
    }
  }

  // If no double-space delimiter, check if the whole thing is just a name
  // For files with extensions or directories, we can be more lenient
  // Look for pattern: name.ext followed by single space and non-extension content
  const singleSpaceMatch = trimmed.match(
    /^(.+?\.[a-zA-Z0-9]+)\s+([^.].*)$/
  );
  if (singleSpaceMatch) {
    const potentialName = singleSpaceMatch[1].trim();
    const potentialComment = singleSpaceMatch[2].trim();
    return { name: potentialName, comment: potentialComment };
  }

  // Check for hidden files followed by comment
  const hiddenFileMatch = trimmed.match(/^(\.[^\s]+)\s+(.+)$/);
  if (hiddenFileMatch) {
    return {
      name: hiddenFileMatch[1].trim(),
      comment: hiddenFileMatch[2].trim(),
    };
  }

  // Check for directory name followed by single space and comment
  // Directory names don't have extensions, so look for "word space non-word-start"
  // Also handles names starting with numbers like "2. components"
  const dirCommentMatch = trimmed.match(/^([\w][\w.\s-]*?)\s+([^a-zA-Z0-9].*)$/);
  if (dirCommentMatch) {
    const potentialName = dirCommentMatch[1].trim();
    // Make sure it's not a file with extension
    if (!/\.[a-zA-Z0-9]+$/.test(potentialName)) {
      return {
        name: potentialName,
        comment: dirCommentMatch[2].trim(),
      };
    }
  }

  // No comment detected, return the whole thing as name
  return { name: trimmed, comment: undefined };
}

/**
 * Check if a string looks like a valid file/directory name
 */
function isValidName(name: string): boolean {
  if (!name) return false;

  // Ends with / (explicit directory)
  if (name.endsWith('/')) return true;

  // Has a file extension
  if (/\.[a-zA-Z0-9]+$/.test(name)) return true;

  // Hidden file/directory (starts with dot)
  if (name.startsWith('.')) return true;

  // Looks like a directory name (no extension, word characters)
  if (/^[\w\s.-]+$/.test(name)) return true;

  return false;
}

/**
 * Check if name represents a directory
 * - Ends with /
 * - Has no extension
 */
function isDirectoryName(name: string): boolean {
  if (name.endsWith('/')) return true;

  const lastPart = name.split('/').pop() || name;

  // Special case: ellipsis is not a directory
  if (/^\.{2,}$/.test(lastPart)) {
    return false;
  }

  // If it starts with a dot, it's a file (hidden file), e.g., .gitignore
  if (lastPart.startsWith('.')) {
    return false;
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
