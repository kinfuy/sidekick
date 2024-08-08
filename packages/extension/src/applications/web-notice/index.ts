import { sendMessageToContentScript } from '@utils';
import notice from '@assets/app/notice.png';
import { Message } from '@core/message';
import type { App } from '@/types/core-app.type';

export const WebNotice: App = {
  name: 'WebNotice',
  title: 'Env Notice',
  inner: false,
  logo: chrome.runtime.getURL(notice),
  contentApp: true,
  settingApp: true,
  hooks: {
    async onContentActive() {
      sendMessageToContentScript({
        from: Message.Form.SERVERWORKER_MESSAGE,
        to: Message.Target.CONTENT,
        code: 'WebNotice',
        data: [],
      });
    },
  },
};
