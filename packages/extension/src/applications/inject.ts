import type { App } from 'vue';
import { storagePortalContentInstall } from './storage-portal/install';
import { appLayoutContentInstall } from './app-layout/install';
import { webNoticeContentInstall } from './web-notice/inject';
export const contentInstall = (app: App) => {
  appLayoutContentInstall(app);
  webNoticeContentInstall(app);
  storagePortalContentInstall(app);
};
