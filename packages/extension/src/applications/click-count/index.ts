import click from '@assets/app/click.svg';
import { getChromeUrl, sendMessageToContentScript } from '../../utils';
import type { App } from '@/types/core-app.type';

export const ClickCount: App = {
  name: 'ClickCount',
  title: '点击计数器',
  logo: getChromeUrl(click),
  inner: false,
  popupApp: true,
  settingApp: false,
  hooks: {
    onContentInit: async () => {
      sendMessageToContentScript({
        from: 'background',
        code: 'ClickCount',
        data: {
          key: 'init-click',
        },
      });
    },
    onPageshow: async () => {
      sendMessageToContentScript({
        from: 'background',
        code: 'ClickCount',
        data: {
          key: 'init-click',
        },
      });
    },
    onDocVisibilitychange: async () => {
      sendMessageToContentScript({
        from: 'background',
        code: 'ClickCount',
        data: {
          key: 'init-click',
        },
      });
    },
  },
};
