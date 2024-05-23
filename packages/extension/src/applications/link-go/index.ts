import link from '@assets/image/link.svg';
import { getChromeUrl, sendMessageToContentScriptAllTabs } from '../../utils';
import type { App } from '@/types/core-app.type';

export const LinkGo: App = {
  name: 'LinkGo',
  title: '超链直达',
  logo: getChromeUrl(link),
  inner: true,
  settingApp: true,
  hooks: {
    onContentInit: async () => {
      sendMessageToContentScriptAllTabs({
        from: 'background',
        code: 'LinkGo',
      });
    },
  },
};
