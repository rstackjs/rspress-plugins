import { SUPPORTED_LANGUAGES } from './languages';

export interface FolderIconDefinition {
  name: string;
  content: () => Promise<typeof import('*.svg')>;
}

export interface FileIconDefinition {
  name: string;
  content: () => Promise<typeof import('*.svg')>;
  matcher: RegExp;
}

/**
 * Special folder icons mapping
 * Maps folder names to their corresponding icons
 */
export const FOLDER_ICONS: Record<string, FolderIconDefinition> = {
  src: {
    name: 'folder-src',
    content: () => import('material-icon-theme/icons/folder-src.svg?raw'),
  },
  source: {
    name: 'folder-src',
    content: () => import('material-icon-theme/icons/folder-src.svg?raw'),
  },
  components: {
    name: 'folder-components',
    content: () =>
      import('material-icon-theme/icons/folder-components.svg?raw'),
  },
  component: {
    name: 'folder-components',
    content: () =>
      import('material-icon-theme/icons/folder-components.svg?raw'),
  },
  hooks: {
    name: 'folder-hook',
    content: () => import('material-icon-theme/icons/folder-hook.svg?raw'),
  },
  hook: {
    name: 'folder-hook',
    content: () => import('material-icon-theme/icons/folder-hook.svg?raw'),
  },
  utils: {
    name: 'folder-utils',
    content: () => import('material-icon-theme/icons/folder-utils.svg?raw'),
  },
  util: {
    name: 'folder-utils',
    content: () => import('material-icon-theme/icons/folder-utils.svg?raw'),
  },
  lib: {
    name: 'folder-lib',
    content: () => import('material-icon-theme/icons/folder-lib.svg?raw'),
  },
  libs: {
    name: 'folder-lib',
    content: () => import('material-icon-theme/icons/folder-lib.svg?raw'),
  },
  core: {
    name: 'folder-core',
    content: () => import('material-icon-theme/icons/folder-core.svg?raw'),
  },
  runtime: {
    name: 'folder-core',
    content: () => import('material-icon-theme/icons/folder-core.svg?raw'),
  },
  locales: {
    name: 'folder-i18n',
    content: () => import('material-icon-theme/icons/folder-i18n.svg?raw'),
  },
  locale: {
    name: 'folder-i18n',
    content: () => import('material-icon-theme/icons/folder-i18n.svg?raw'),
  },
  i18n: {
    name: 'folder-i18n',
    content: () => import('material-icon-theme/icons/folder-i18n.svg?raw'),
  },
  assets: {
    name: 'folder-images',
    content: () => import('material-icon-theme/icons/folder-images.svg?raw'),
  },
  images: {
    name: 'folder-images',
    content: () => import('material-icon-theme/icons/folder-images.svg?raw'),
  },
  styles: {
    name: 'folder-css',
    content: () => import('material-icon-theme/icons/folder-css.svg?raw'),
  },
  css: {
    name: 'folder-css',
    content: () => import('material-icon-theme/icons/folder-css.svg?raw'),
  },
  test: {
    name: 'folder-test',
    content: () => import('material-icon-theme/icons/folder-test.svg?raw'),
  },
  tests: {
    name: 'folder-test',
    content: () => import('material-icon-theme/icons/folder-test.svg?raw'),
  },
  __tests__: {
    name: 'folder-test',
    content: () => import('material-icon-theme/icons/folder-test.svg?raw'),
  },
  config: {
    name: 'folder-config',
    content: () => import('material-icon-theme/icons/folder-config.svg?raw'),
  },
  configs: {
    name: 'folder-config',
    content: () => import('material-icon-theme/icons/folder-config.svg?raw'),
  },
  api: {
    name: 'folder-api',
    content: () => import('material-icon-theme/icons/folder-api.svg?raw'),
  },
  apis: {
    name: 'folder-api',
    content: () => import('material-icon-theme/icons/folder-api.svg?raw'),
  },
  public: {
    name: 'folder-public',
    content: () => import('material-icon-theme/icons/folder-public.svg?raw'),
  },
  dist: {
    name: 'folder-dist',
    content: () => import('material-icon-theme/icons/folder-dist.svg?raw'),
  },
  build: {
    name: 'folder-dist',
    content: () => import('material-icon-theme/icons/folder-dist.svg?raw'),
  },
  node_modules: {
    name: 'folder-node',
    content: () => import('material-icon-theme/icons/folder-node.svg?raw'),
  },
  types: {
    name: 'folder-typescript',
    content: () =>
      import('material-icon-theme/icons/folder-typescript.svg?raw'),
  },
  typings: {
    name: 'folder-typescript',
    content: () =>
      import('material-icon-theme/icons/folder-typescript.svg?raw'),
  },
  pages: {
    name: 'folder-views',
    content: () => import('material-icon-theme/icons/folder-views.svg?raw'),
  },
  views: {
    name: 'folder-views',
    content: () => import('material-icon-theme/icons/folder-views.svg?raw'),
  },
  routes: {
    name: 'folder-routes',
    content: () => import('material-icon-theme/icons/folder-routes.svg?raw'),
  },
  docs: {
    name: 'folder-docs',
    content: () => import('material-icon-theme/icons/folder-docs.svg?raw'),
  },
  services: {
    name: 'folder-app',
    content: () => import('material-icon-theme/icons/folder-app.svg?raw'),
  },
  app: {
    name: 'folder-app',
    content: () => import('material-icon-theme/icons/folder-app.svg?raw'),
  },
};

/**
 * Default folder icon
 */
export const DEFAULT_FOLDER_ICON: FolderIconDefinition = {
  name: 'folder',
  content: () => import('material-icon-theme/icons/folder.svg?raw'),
};

/**
 * Default file icon
 */
export const DEFAULT_FILE_ICON: FileIconDefinition = {
  name: 'file',
  content: () => import('material-icon-theme/icons/file.svg?raw'),
  matcher: /^.*$/,
};

/**
 * Get folder icon by folder name
 */
export function getFolderIcon(name: string): FolderIconDefinition {
  const lowerName = name.toLowerCase();
  return FOLDER_ICONS[lowerName] || DEFAULT_FOLDER_ICON;
}

/**
 * Get file icon by file name
 * Searches through all supported languages for matching icon
 */
export function getFileIcon(fileName: string): FileIconDefinition {
  for (const language of SUPPORTED_LANGUAGES) {
    for (const icon of language.icons) {
      if (icon.matcher.test(fileName)) {
        return {
          name: icon.name,
          content: icon.content as () => Promise<typeof import('*.svg')>,
          matcher: icon.matcher,
        };
      }
    }
  }
  return DEFAULT_FILE_ICON;
}
