import type { App } from 'vue';
import Popup from './view/popup/vue-devtool.vue';

export const vueDevtoolPopupInstall = (app: App) => {
  app.component('PopupVueDevtool', Popup);
};
