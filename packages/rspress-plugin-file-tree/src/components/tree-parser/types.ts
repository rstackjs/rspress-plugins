export interface TreeNode {
  name: string;
  type: 'file' | 'directory';
  children: TreeNode[];
  extension?: string;
}

export interface ParsedTree {
  nodes: TreeNode[];
  raw: string;
}
