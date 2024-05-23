import set from '@assets/image/set.svg';
import { WebNotice } from './web-notice';
import { AppLayout } from './app-layout';
import { DevAccount } from './dev-account';
import { LinkGo } from './link-go';
import type { App, AppEntry } from '@/types/core-app.type';

export const apps: App[] = [WebNotice, AppLayout, DevAccount, LinkGo];

const linkApp: AppEntry[] = [
  {
    name: 'AppSetting',
    title: '设置',
    logo: chrome.runtime.getURL(set),
    inner: true,
    isLogin: true,
    contentApp: true,
    linkUrl: 'setting.html',
  },
];

export const appsRaw: AppEntry[] = [
  ...apps.map((a) => ({
    ...a,
    name: a.name,
    title: a.title,
    logo: a.logo,
    inner: a.inner,
    width: a.width,
  })),
  ...linkApp,
];
