import type { Application } from '@/types/core-app.type';
import {
  createWindow,
  createtab,
  getChromeUrl,
  sendMessageToContentScript,
} from '@/utils/chrome';

export const PreCoreApp = (): Application => {
  return {
    name: 'pre-core-app',
  };
};

export const SuffixCoreApp = (): Application => {
  return {
    name: 'suffix-core-app',
    onCoreStoreChange: () => {
      sendMessageToContentScript({
        from: 'background',
        code: 'baichuan-core',
        data: {
          key: 'store-change',
        },
      });
    },
    onOpenChromeUrl: ({ openUrl, extra }) => {
      createtab(getChromeUrl(openUrl), extra);
    },

    onOpenWindow: ({ openUrl, extra }) => {
      createWindow(getChromeUrl(openUrl), extra);
    },
  };
};
