import vue from '@assets/app/vue.svg';
import { getChromeUrl, sendMessageToContentScript } from '../../utils';
import type { App } from '@/types/core-app.type';
export const VueDevtool: App = {
  name: 'VueDevtool',
  title: 'VueDevtool',
  description: '开启生产环境 devtools工具（Bate）',
  logo: getChromeUrl(vue),
  inner: false,
  settingApp: false,
  popupApp: true,
  hooks: {
    onActiveChange: () => {
      sendMessageToContentScript({
        from: 'background',
        code: 'CoreApp',
        data: { key: 'doc-reload', data: { reload: true } },
      });
    },
    async onDocLoad() {
      sendMessageToContentScript({
        from: 'background',
        code: 'VueDevtool',
      });
    },
  },
};
