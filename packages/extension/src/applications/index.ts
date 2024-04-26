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
];
