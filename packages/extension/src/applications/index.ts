import pen from '@assets/app/pen.png';
import clipboard from '@assets/app/clipboard.png';
import { WebNotice } from './web-notice';
import { AppSetting } from './app-setting';
import type { App, AppEntry } from '@/types/core-app.type';

export const apps: App[] = [WebNotice, AppSetting];

export const appsRaw: AppEntry[] = [
  ...apps.map((a) => ({
    name: a.name,
    title: a.title,
    logo: a.logo,
    inner: a.inner,
  })),
  {
    name: 'pen',
    title: '马克笔',
    inner: false,
    logo: chrome.runtime.getURL(pen),
  },
  {
    name: 'clipboard',
    title: '粘贴板',
    inner: false,
    logo: chrome.runtime.getURL(clipboard),
  },
];
