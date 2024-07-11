import type { App } from 'vue';
import {
  devAccountContentInstall,
  devAccountPopupInstall,
  devAccountSettingInstall,
} from './dev-account/install';
import {
  webNoticeContentInstall,
  webNoticeContentSettingInstall,
} from './web-notice/install';
import { appLayoutContentInstall } from './app-layout/install';
import { linkGoSettingInstall } from './link-go/install';
import { storagePortalContentInstall } from './storage-portal/install';
import {
  browseBehaviorPopupInstall,
  browseBehaviorSettingInstall,
} from './browse-behavior/install';
import {
  uiFlowContentInstall,
  uiFlowPopupInstall,
  uiFlowSettingInstall,
} from './ui-flow/install';

export const contentInstall = (app: App) => {
  appLayoutContentInstall(app);
  devAccountContentInstall(app);
  webNoticeContentInstall(app);
  storagePortalContentInstall(app);
  uiFlowContentInstall(app);
};

export const popupInstall = (app: App) => {
  devAccountPopupInstall(app);
  browseBehaviorPopupInstall(app);
  uiFlowPopupInstall(app);
};

export const settingInstall = (app: App) => {
  devAccountSettingInstall(app);
  linkGoSettingInstall(app);
  browseBehaviorSettingInstall(app);
  webNoticeContentSettingInstall(app);
  uiFlowSettingInstall(app);
};
