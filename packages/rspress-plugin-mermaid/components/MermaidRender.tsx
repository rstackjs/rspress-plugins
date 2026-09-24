import React, { useEffect, useId, useRef, useState } from 'react';

import mermaid, { type MermaidConfig } from 'mermaid';

interface MermaidRendererProps {
  code: string;
  config?: MermaidConfig;
}

const MermaidRenderer: React.FC<MermaidRendererProps> = (props) => {
  const { code, config = {} } = props;

  // useId() may contain characters that must not leak into mermaid's render id
  // (it ends up in the SVG id and url(#...) marker references), e.g. ":" in
  // React 18, "«»" in React 19.0-19.1, "_"-wrapped forms in React 19.2+.
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');

  const [svg, setSvg] = useState('');

  const [renderError, setRenderError] = useState(false);

  // Skip re-renders unless the diagram source or light/dark theme changed.
  // Separate refs compare prop identity directly, so a long diagram source is
  // never re-allocated into a combined key.
  const lastTheme = useRef<string | null>(null);
  const lastCode = useRef<string | null>(null);

  useEffect(() => {
    // Concurrent calls are safe: mermaid queues render() calls internally
    // and runs them serially.
    const render = async () => {
      const theme = document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'default';

      if (lastTheme.current === theme && lastCode.current === code) {
        return;
      }

      lastTheme.current = theme;
      lastCode.current = code;

      const mermaidConfig: MermaidConfig = {
        securityLevel: 'loose',
        startOnLoad: false,
        theme,
        ...config,
      };

      try {
        mermaid.initialize(mermaidConfig);
        const { svg } = await mermaid.render(id, code);
        setSvg(svg);
        setRenderError(false);
      } catch (error) {
        lastTheme.current = null;
        lastCode.current = null;
        setRenderError(true);
      }
    };

    render();
    const observer = new MutationObserver(() => {
      render();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();
    };
  }, [code, config, id]);

  return (
    <>
      {renderError ? null : <div dangerouslySetInnerHTML={{ __html: svg }} />}
    </>
  );
};

export default MermaidRenderer;
