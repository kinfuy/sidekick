import type { App } from 'vue';
import popup from './views/pupup/url-block.vue';
import setting from './views/setting/url-block.vue';
export const urlBlockPopopInstall = (app: App) => {
  app.component('PopupUrlBlock', popup);
};

export const urlBlockSettingInstall = (app: App) => {
  app.component('SettingUrlBlock', setting);
};
