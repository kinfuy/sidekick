import type { App } from 'vue';
import Setting from './view/setting/browse-behavior.vue';
import Popup from './view/popup/browse-behavior.vue';

export const browseBehaviorSettingInstall = (app: App) => {
  app.component('SettingBrowseBehavior', Setting);
};

export const browseBehaviorPopupInstall = (app: App) => {
  app.component('PopupBrowseBehavior', Popup);
};
