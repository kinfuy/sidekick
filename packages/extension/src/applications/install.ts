import type { App } from 'vue';
import {
  devAccountPopupInstall,
  devAccountSettingInstall,
} from './dev-account/install';
import { webNoticeContentSettingInstall } from './web-notice/install';

import { linkGoSettingInstall } from './link-go/install';

import {
  browseBehaviorPopupInstall,
  browseBehaviorSettingInstall,
} from './browse-behavior/install';
import { clickCountPopupInstall } from './click-count/install';
import {
  urlBlockPopopInstall,
  urlBlockSettingInstall,
} from './url-block/install';

import {
  apiProxySettingInstall,
  apiProxySidePanelInstall,
} from './api-proxy/install';

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
  apiProxySettingInstall(app);
};

export const sidePanelInstall = (app: App) => {
  apiProxySidePanelInstall(app);
};
