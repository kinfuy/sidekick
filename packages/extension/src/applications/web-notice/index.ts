import { sendMessageToContentScript } from '@utils';
import notice from '@assets/app/notice.png';
import type { App } from '@/types/core-app.type';

export const WebNotice: App = {
  name: 'WebNotice',
  title: 'Env Notice',
  inner: false,
  logo: chrome.runtime.getURL(notice),
  contentApp: true,
  settingApp: true,
  hooks: {
    onActiveChange: () => {
      sendMessageToContentScript({
        from: 'background',
        code: 'baichuan-core',
        data: { key: 'doc-reload', data: { reload: true } },
      });
    },
    async onDocLoad() {
      sendMessageToContentScript({
        from: 'background',
        code: 'WebNotice',
        data: [],
      });
    },
    async onPageshow() {
      sendMessageToContentScript({
        from: 'background',
        code: 'WebNotice',
        data: [],
      });
    },
    async onDocVisibilitychange() {
      sendMessageToContentScript({
        from: 'background',
        code: 'WebNotice',
        data: [],
      });
    },
  },
};
