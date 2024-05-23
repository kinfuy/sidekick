import set from '@assets/image/set.svg';
import { getChromeUrl } from '@utils';
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
    logo: getChromeUrl(set),
    inner: true,
    isLogin: true,
    contentApp: true,
    linkUrl: 'setting.html',
  },
];

const settingApps: AppEntry[] = [
  {
    title: '基础信息',
    name: 'AppUser',
    logo: getChromeUrl(set),
    inner: true,
    isLogin: false,
    settingApp: true,
  },
  {
    title: '帮助与反馈',
    name: 'AppHelp',
    logo: getChromeUrl(set),
    inner: true,
    isLogin: false,
    settingApp: true,
  },
  {
    title: '关于',
    name: 'AppAbout',
    logo: getChromeUrl(set),
    inner: true,
    isLogin: false,
    settingApp: true,
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
  ...settingApps,
];
