import mock from '@assets/app/mock.svg';
import { sendMessageToContentScript } from '@utils';
import { Message } from '@core/message';
import { useApiProxyStore } from './store';
import type { App } from '@/types/core-app.type';

export const ApiProxy: App = {
  name: 'ApiProxy',
  title: '接口代理',
  logo: chrome.runtime.getURL(mock),
  inner: false,
  contentApp: true,
  settingApp: true,
  sidePanelApp: true,
  linkUrl: 'sidepanel',
  hooks: {
    async onContentActive() {
      sendMessageToContentScript({
        from: 'background',
        code: 'ApiProxy',
        to: Message.Target.CONTENT,
        data: {
          key: 'init_rules',
        },
      });
    },
    async onCustomAction({ data, key }) {
      if (key === 'api_records') {
        const { setCatchRecords } = useApiProxyStore();
        setCatchRecords(data.records);
      }
    },
  },
};
