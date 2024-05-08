import set from '@assets/image/set.svg';
import { WebNotice } from './web-notice';
import { AppLayout } from './app-layout';
import type { App, AppEntry } from '@/types/core-app.type';

export const apps: App[] = [WebNotice, AppLayout];

const linkApp: AppEntry[] = [
  {
    name: 'AppSetting',
    title: '设置',
    logo: chrome.runtime.getURL(set),
    inner: true,
    linkUrl: chrome.runtime.getURL('setting.html'),
  },
];

export const appsRaw: AppEntry[] = [
  ...apps.map((a) => ({
    name: a.name,
    title: a.title,
    logo: a.logo,
    inner: a.inner,
  })),
  ...linkApp,
];
