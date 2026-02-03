import React, { useMemo, useState } from 'react';
import { getFileIcon, getFolderIcon } from '../folder-icons';
import { TreeNode } from '../tree-parser/types';
import styles from './FileTreeItem.module.less';
import { RemoteSvgIcon } from './RemoteSvgIcon';

interface FileTreeItemProps {
  node: TreeNode;
  depth: number;
}

const INDENT_SIZE = 12;

export const FileTreeItem: React.FC<FileTreeItemProps> = ({ node, depth }) => {
  // Default to collapsed if directory has no children
  const hasChildren = node.type === 'directory' && node.children.length > 0;
  const [expanded, setExpanded] = useState(hasChildren);

  const icon = useMemo(() => {
    if (node.type === 'directory') {
      return getFolderIcon(node.name);
    }
    return getFileIcon(node.name);
  }, [node.name, node.type]);

  const isDirectory = node.type === 'directory';

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDirectory) {
      setExpanded((p) => !p);
    }
  };

  return (
    <div className={styles.item}>
      <div
        className={styles.row}
        onClick={toggle}
        style={{ paddingLeft: `${depth * INDENT_SIZE}px` }}
      >
        <div
          className={styles.chevron}
          data-expanded={expanded}
          style={{ visibility: isDirectory ? 'visible' : 'hidden' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.072 8.024L5.715 3.667l.618-.62L11 8.024l-4.667 4.977-.618-.62L10.072 8.024z"
            />
          </svg>
        </div>
        <RemoteSvgIcon
          content={icon.content as any}
          className={styles.iconWrapper}
        />
        <span className={styles.name}>{node.name}</span>
        {node.comment && <span className={styles.comment}>{node.comment}</span>}
      </div>

      {isDirectory && node.children.length > 0 && expanded && (
        <div className={styles.children}>
          <div
            className={styles.indentGuide}
            style={{ left: `${depth * INDENT_SIZE + 6}px` }}
          />
          {node.children.map((child, index) => (
            <FileTreeItem
              key={`${child.name}-${index}`}
              node={child}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
