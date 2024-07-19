import click from '@assets/app/click.svg';
import { Message } from '@core/message';
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
        from: Message.Form.SERVERWORKER_MESSAGE,
        to: Message.Target.CONTENT,
        code: 'ClickCount',
        data: {
          key: 'init-click',
        },
      });
    },
    onPageshow: async () => {
      sendMessageToContentScript({
        from: Message.Form.SERVERWORKER_MESSAGE,
        to: Message.Target.CONTENT,
        code: 'ClickCount',
        data: {
          key: 'init-click',
        },
      });
    },
    onDocVisibilitychange: async () => {
      sendMessageToContentScript({
        from: Message.Form.SERVERWORKER_MESSAGE,
        to: Message.Target.CONTENT,
        code: 'ClickCount',
        data: {
          key: 'init-click',
        },
      });
    },
  },
};
