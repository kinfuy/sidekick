import type { App } from 'vue';
import Popup from './view/popup/click-count.vue';
export const clickCountPopupInstall = (app: App) => {
  app.component('PopupClickCount', Popup);
};
