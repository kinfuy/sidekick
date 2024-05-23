import type { App } from 'vue';
import Popup from './view/popup/link-go.vue';

export const linkGoPopupInstall = (app: App) => {
  app.component('PopupLinkGo', Popup);
};
