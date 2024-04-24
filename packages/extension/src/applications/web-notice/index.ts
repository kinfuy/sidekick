import { sendMessageToContentScript } from '@utils';
import type { App } from '@/types/core-app.type';

export const WebNotice: App = {
  name: 'web-notice',
  title: '生产环境',
  logo: 'KXiangling',
  description: '生产环境提示，防止误操作生产环境',
  category: 'PureTool',
  version: '0.0.1',
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
        code: 'web-notice',
        data: [],
      });
    },
    async onPageshow() {
      sendMessageToContentScript({
        from: 'background',
        code: 'web-notice',
        data: [],
      });
    },
    async onDocVisibilitychange() {
      sendMessageToContentScript({
        from: 'background',
        code: 'web-notice',
        data: [],
      });
    },
  },
};
