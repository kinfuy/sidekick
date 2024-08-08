import account from '@assets/app/account.svg';
import { sendMessageToContentScript } from '@utils';
import { Message } from '@core/message';
import type { App } from '@/types/core-app.type';

export const DevAccount: App = {
  name: 'DevAccount',
  title: 'Dev Account',
  logo: chrome.runtime.getURL(account),
  inner: false,
  width: '600px',
  popupApp: true,
  settingApp: true,
  hooks: {
    onContentActive: async () => {
      sendMessageToContentScript({
        from: Message.Form.SERVERWORKER_MESSAGE,
        to: Message.Target.CONTENT,
        code: 'DevAccount',
        data: {
          key: 'register-shortcut',
        },
      });
    },
    onShortcut: async ({ key }) => {
      if (key === 'auto-login') {
        sendMessageToContentScript({
          from: Message.Form.SERVERWORKER_MESSAGE,
          to: Message.Target.CONTENT,
          code: 'DevAccount',
          data: {
            key: 'auto-login',
          },
        });
      }
    },
  },
};
