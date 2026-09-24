export const browserWindow = window as typeof window & {
  dataLayer?: unknown[];
  customDataLayer?: unknown[];
  sanScrollTop?: (emoji: string, color: string) => void;
};
