import type { Application } from '@/types/core-app.type';
import {
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
    onOpenChromeUrl: ({ openUrl }) => {
      createtab(getChromeUrl(openUrl));
    },
  };
};
