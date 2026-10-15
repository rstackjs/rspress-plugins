import ReactDOM from 'react-dom';

type ResourceOptions = {
  as: 'style' | 'script';
  precedence?: 'reset' | 'low' | 'medium' | 'high';
  integrity?: string;
  nonce?: string;
  crossOrigin?: string;
};

type PreconnectOptions = {
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
};

// Resource APIs may be unavailable in some renderers.
export const reactDom = ReactDOM as typeof ReactDOM & {
  preinit?: (href: string, options: ResourceOptions) => void;
  experimental_preinit?: (href: string, options: ResourceOptions) => void;
  preload?: (href: string, options: ResourceOptions) => void;
  experimental_preload?: (href: string, options: ResourceOptions) => void;
  preconnect?: (href: string, options?: PreconnectOptions) => void;
  experimental_preconnect?: (href: string, options?: PreconnectOptions) => void;
};
