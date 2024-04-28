import { sendMessageToContentScript } from '@utils';
import notice from '@assets/app/notice.png';
import type { App } from '@/types/core-app.type';

export const WebNotice: App = {
  name: 'WebNotice',
  title: 'Env Notice',
  inner: false,
  logo: chrome.runtime.getURL(notice),
  hooks: {
    onActiveChange: () => {
      sendMessageToContentScript({
        from: 'background',
        code: 'baichuan-core',
        data: { key: 'doc-reload', data: { reload: true } },
      });
    },
    async onDocLoad() {
      console.log('WebNotice onDocLoad');
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
      console.log('WebNotice onDocVisibilitychange');

      sendMessageToContentScript({
        from: 'background',
        code: 'WebNotice',
        data: [],
      });
    },
  },
};
