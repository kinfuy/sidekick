import link from '@assets/image/link.svg';
import { Message } from '@core/message';
import { getChromeUrl, sendMessageToContentScriptAllTabs } from '../../utils';
import type { App } from '@/types/core-app.type';

export const LinkGo: App = {
  name: 'LinkGo',
  title: '超链直达',
  logo: getChromeUrl(link),
  inner: false,
  settingApp: true,
  hooks: {
    onContentActive: async () => {
      sendMessageToContentScriptAllTabs({
        from: Message.Form.SERVERWORKER_MESSAGE,
        to: Message.Target.CONTENT,
        code: 'LinkGo',
      });
    },
  },
};
