import click from '@assets/app/click.svg';
import { getChromeUrl, sendMessageToContentScript } from '../../utils';
import { useClickCountStore } from './store';
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
    onCustomAction: async ({ key }) => {
      const { set } = useClickCountStore();
      if (key === 'reset-click') set(0); // 初始化
      if (key === 'start-click') set(1); // 开始统计
      if (key === 'stop-click') set(2); // 暂停统计
      if (key === 'end-click') set(3); // 结束统计
    },
  },
};
