import path from 'node:path';
import { defineConfig } from '@rspress/core';
import { pluginThirdParties } from './dist/plugin.js';

export default defineConfig({
  root: 'docs',
  title: 'Rspress Third Parties Demo',
  siteOrigin: 'https://sanjaiyan-dev.github.io',
  base: '/rspress-plugin-third-parties/',
  llms: true,
  description: 'Live interactive playground for rspress-plugin-third-parties',
  icon: '/rspress-plugin-third-party-icon.png',
  logo: '/rspress-plugin-third-party-icon.png',
  head: [
    [
      'meta',
      {
        property: 'og:image',
        content:
          'https://sanjaiyan-dev.github.io/rspress-plugin-third-parties/rspress-plugin-third-party-hero.png',
      },
    ],
  ],
  logoText: 'Rspress Plugin Third Parties',
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content:
          'https://github.com/sanjaiyan-dev/rspress-plugin-third-parties',
      },
      {
        icon: 'npm',
        mode: 'link',
        content: 'https://www.npmjs.com/package/rspress-plugin-third-parties',
      },
      {
        icon: 'instagram',
        mode: 'link',
        content: 'https://www.instagram.com/sanjaiyan_dev',
      },
    ],
    enableAppearanceAnimation: true,
    enableContentAnimation: true,
  },
  plugins: [
    pluginThirdParties({
      googleAnalytics: {
        gaId: 'GA-ID',
      },
    }),
  ],
  markdown: {
    link: {
      checkDeadLinks: false,
    },
  },
});
