import type { App } from 'vue';
import setting from './view/setting/browse-behavior.vue';

export const browseBehaviorSettingInstall = (app: App) => {
  app.component('SettingBrowseBehavior', setting);
};
