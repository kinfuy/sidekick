import type { App } from 'vue';
import setting from './view/setting/link-go.vue';

export const linkGoSettingInstall = (app: App) => {
  app.component('SettingLinkGo', setting);
};
