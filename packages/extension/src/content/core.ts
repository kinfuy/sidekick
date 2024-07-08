import type { ContentCore, ContentOptions } from '@/types/content.type';

/**
 * 刷新当前tab
 * @param options
 */
const coreRelaod = (option: ContentOptions) => {
  const { reload } = option;
  if (Array.isArray(reload)) {
    if (reload.some((url) => window.location.href.includes(url))) {
      window.location.reload();
    }
  } else if (typeof reload === 'boolean' && reload) {
    window.location.reload();
  }
};
export const contentCore = (options?: ContentCore) => {
  if (!options) return;
  const { key, data } = options;
  if (key === 'doc-reload') coreRelaod(data);
};
