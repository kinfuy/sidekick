import block from '@assets/app/url.svg';
import { Message } from '@core/message';
import { getChromeUrl, sendMessageToContentScriptAllTabs } from '../../utils';
import type { App } from '@/types/core-app.type';

export const UrlBlock: App = {
  name: 'UrlBlock',
  title: '屏蔽内容农场',
  logo: getChromeUrl(block),
  inner: false,
  settingApp: true,
  popupApp: true,
  hooks: {
    onContentActive: async () => {
      sendMessageToContentScriptAllTabs({
        from: Message.Form.SERVERWORKER_MESSAGE,
        to: Message.Target.CONTENT,
        code: 'UrlBlock',
      });
    },
  },
};
