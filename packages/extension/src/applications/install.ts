import type { App } from 'vue';
import {
  devAccountContentInstall,
  devAccountPopupInstall,
} from './dev-account/install';
import { WebNoticeContentInstall } from './web-notice/install';
import { appLayoutContentInstall } from './app-layout/install';
export const contentInstall = (app: App) => {
  appLayoutContentInstall(app);
  devAccountContentInstall(app);
  WebNoticeContentInstall(app);
};

export const popupInstall = (app: App) => {
  devAccountPopupInstall(app);
};
