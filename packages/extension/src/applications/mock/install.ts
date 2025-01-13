import type { App } from 'vue';
import Setting from './view/setting/mock.vue';
import Popup from './view/popup/mock.vue';

export const mockSettingInstall = (app: App) => {
  app.component('SettingMock', Setting);
};

export const mockPopupInstall = (app: App) => {
  app.component('PopupMock', Popup);
};
