import { FileIconDefinition } from './folder-icons';

interface LanguageDefinition {
  id: string;
  icons: FileIconDefinition[];
}

export const SUPPORTED_LANGUAGES: LanguageDefinition[] = [
  {
    id: 'javascript',
    icons: [
      {
        name: 'javascript',
        content: () => import('material-icon-theme/icons/javascript.svg?raw'),
        matcher: /^.*\.js$/,
      },
      {
        name: 'javascript-beta',
        content: () => import('material-icon-theme/icons/javascript.svg?raw'),
        matcher: /^.*\.cjs$/,
      },
      {
        name: 'javascript-beta',
        content: () => import('material-icon-theme/icons/javascript.svg?raw'),
        matcher: /^.*\.mjs$/,
      },
    ],
  },
  {
    id: 'typescript',
    icons: [
      {
        name: 'typescript',
        content: () => import('material-icon-theme/icons/typescript.svg?raw'),
        matcher: /^.*\.ts$/,
      },
      {
        name: 'typescript-beta',
        content: () => import('material-icon-theme/icons/typescript.svg?raw'),
        matcher: /^.*\.mts$/,
      },
      {
        name: 'typescript-beta',
        content: () => import('material-icon-theme/icons/typescript.svg?raw'),
        matcher: /^.*\.cts$/,
      },
      {
        name: 'react_ts',
        content: () => import('material-icon-theme/icons/react_ts.svg?raw'),
        matcher: /^.*\.tsx$/,
      },
    ],
  },
  {
    id: 'react',
    icons: [
      {
        name: 'react',
        content: () => import('material-icon-theme/icons/react.svg?raw'),
        matcher: /^.*\.jsx$/,
      },
    ],
  },
  {
    id: 'css',
    icons: [
      {
        name: 'css',
        content: () => import('material-icon-theme/icons/css.svg?raw'),
        matcher: /^.*\.css$/,
      },
      {
        name: 'less',
        content: () => import('material-icon-theme/icons/less.svg?raw'),
        matcher: /^.*\.less$/,
      },
      {
        name: 'sass',
        content: () => import('material-icon-theme/icons/sass.svg?raw'),
        matcher: /^.*\.scss$/,
      },
    ],
  },
  {
    id: 'json',
    icons: [
      {
        name: 'json',
        content: () => import('material-icon-theme/icons/json.svg?raw'),
        matcher: /^.*\.json$/,
      },
    ],
  },
  {
    id: 'markdown',
    icons: [
      {
        name: 'markdown',
        content: () => import('material-icon-theme/icons/markdown.svg?raw'),
        matcher: /^.*\.(md|mdx)$/,
      },
    ],
  },
];
