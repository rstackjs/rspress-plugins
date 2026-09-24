import React from 'react';

export const useDark = () => false;
export const usePageData = () => ({ page: {}, siteData: {} });
export const useSiteData = () => ({ site: {} });
export const useI18n = () => (key: string) => key;
export const useLang = () => 'ta';
export const usePages = () => ({ pages: [] });
export function defineConfig<T>(config: T) {
  return config;
}
export const WithBase = ({ children }: { children?: React.ReactNode }) =>
  children ?? null;
export const Helmet = ({ children }: { children?: React.ReactNode }) =>
  children ?? null;

export default {
  useDark,
  usePageData,
  useSiteData,
  useI18n,
  useLang,
  usePages,
  defineConfig,
  WithBase,
  Helmet,
};
