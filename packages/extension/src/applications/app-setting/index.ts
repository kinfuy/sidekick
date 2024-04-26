import set from '@assets/image/set.svg';
import type { App } from '@/types/core-app.type';

export const AppSetting: App = {
  name: 'AppSetting',
  title: '设置',
  logo: chrome.runtime.getURL(set),
  inner: true,
  description: '设置',
  hooks: {},
};
