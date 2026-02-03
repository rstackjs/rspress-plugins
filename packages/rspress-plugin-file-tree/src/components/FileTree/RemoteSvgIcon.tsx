import React, { useEffect, useState } from 'react';

interface RemoteSvgIconProps {
  content: () => Promise<{ default: string } | string>;
  size?: 'sm' | 'md';
  delay?: number;
  className?: string;
}

export const RemoteSvgIcon: React.FC<RemoteSvgIconProps> = ({
  content,
  className,
}) => {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    content().then((mod) => {
      if (cancelled) return;
      // Handle both ESM with default export and direct string export (if any)
      const svg = typeof mod === 'string' ? mod : (mod as any).default;
      setSvgContent(svg);
    });
    return () => {
      cancelled = true;
    };
  }, [content]);

  if (!svgContent) return null;

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};
