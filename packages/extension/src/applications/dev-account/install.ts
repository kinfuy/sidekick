import type { App } from 'vue';
import Content from './view/inject/dev-account.vue';
import Popup from './view/popup/dev-account.vue';
export const devAccountContentInstall = (app: App) => {
  app.component('InjectDevAccount', Content);
};

export const devAccountPopupInstall = (app: App) => {
  app.component('PopupDevAccount', Popup);
};
