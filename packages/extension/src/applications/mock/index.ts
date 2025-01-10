import mock from '@assets/app/shot.png';
import { sendMessageToContentScript } from '@utils';
import type { App } from '@/types/core-app.type';

export const Mock: App = {
  name: 'Mock',
  title: 'Mock数据',
  logo: chrome.runtime.getURL(mock),
  inner: false,
  contentApp: true,
  settingApp: true,
  popupApp: true,
  linkUrl: 'sidepanel',
  hooks: {
    async onContentInit() {
      sendMessageToContentScript({
        from: 'background',
        code: 'Mock',
        data: {},
      });
    },
  },
};
