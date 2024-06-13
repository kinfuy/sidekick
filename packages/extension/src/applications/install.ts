import type { App } from 'vue';
import {
  devAccountContentInstall,
  devAccountPopupInstall,
  devAccountSettingInstall,
} from './dev-account/install';
import { WebNoticeContentInstall } from './web-notice/install';
import { appLayoutContentInstall } from './app-layout/install';
import { linkGoSettingInstall } from './link-go/install';
import { storagePortalContentInstall } from './storage-portal/install';
import { browseBehaviorSettingInstall } from './browse-behavior/install';

export const contentInstall = (app: App) => {
  appLayoutContentInstall(app);
  devAccountContentInstall(app);
  WebNoticeContentInstall(app);
  storagePortalContentInstall(app);
};

export const popupInstall = (app: App) => {
  devAccountPopupInstall(app);
};

export const settingInstall = (app: App) => {
  devAccountSettingInstall(app);
  linkGoSettingInstall(app);
  browseBehaviorSettingInstall(app);
};

export const hasSettingAppView = ['DevAccount', 'LinkGo', 'BrowseBehavior'];
