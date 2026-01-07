import React from 'react';
import { TreeNode } from '../tree-parser/types';
import styles from './FileTree.module.less';
import { FileTreeItem } from './FileTreeItem';

interface FileTreeProps {
  nodes: TreeNode[];
}

export const FileTree: React.FC<FileTreeProps> = ({ nodes }) => {
  return (
    <div className={styles.container}>
      {nodes.map((node, index) => (
        <FileTreeItem key={`${node.name}-${index}`} node={node} depth={0} />
      ))}
    </div>
  );
};

export default FileTree;
