import type { App } from 'vue';
import {
  devAccountContentInstall,
  devAccountPopupInstall,
  devAccountSettingInstall,
} from './dev-account/install';
import { WebNoticeContentInstall } from './web-notice/install';
import { appLayoutContentInstall } from './app-layout/install';
import { linkGoPopupInstall } from './link-go/install';

export const contentInstall = (app: App) => {
  appLayoutContentInstall(app);
  devAccountContentInstall(app);
  WebNoticeContentInstall(app);
};

export const popupInstall = (app: App) => {
  devAccountPopupInstall(app);
  linkGoPopupInstall(app);
};

export const settingInstall = (app: App) => {
  devAccountSettingInstall(app);
};
