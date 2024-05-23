import type { App } from 'vue';
import Content from './view/inject/dev-account.vue';
import Popup from './view/popup/dev-account.vue';
import Setting from './view/setting/dev-account.vue';
export const devAccountContentInstall = (app: App) => {
  app.component('InjectDevAccount', Content);
};

export const devAccountPopupInstall = (app: App) => {
  app.component('PopupDevAccount', Popup);
};

export const devAccountSettingInstall = (app: App) => {
  app.component('SettingDevAccount', Setting);
};
