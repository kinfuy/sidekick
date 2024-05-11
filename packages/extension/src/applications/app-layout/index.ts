import layout from '@assets/image/layout.svg';
import type { App } from '@/types/core-app.type';

export const AppLayout: App = {
  name: 'AppLayout',
  title: '布局',
  logo: chrome.runtime.getURL(layout),
  inner: true,
  isLogin: true,
  description: '布局',
  hooks: {},
};
