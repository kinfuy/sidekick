import type { App } from 'vue';
import {
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
import { clickCountPopupInstall } from './click-count/install';
import {
  urlBlockPopopInstall,
  urlBlockSettingInstall,
} from './url-block/install';

export const contentInstall = (app: App) => {
  appLayoutContentInstall(app);
  webNoticeContentInstall(app);
  storagePortalContentInstall(app);
};

export const popupInstall = (app: App) => {
  devAccountPopupInstall(app);
  browseBehaviorPopupInstall(app);
  clickCountPopupInstall(app);
  urlBlockPopopInstall(app);
};

export const settingInstall = (app: App) => {
  devAccountSettingInstall(app);
  linkGoSettingInstall(app);
  browseBehaviorSettingInstall(app);
  webNoticeContentSettingInstall(app);
  urlBlockSettingInstall(app);
};
