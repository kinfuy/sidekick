import type { App } from 'vue';
import WebNotice from './web-notice/view/web-notice';
import AppSetting from './app-setting/view/app-setting';
export const install = (app: App) => {
  app.component('WebNotice', WebNotice);
  app.component('AppSetting', AppSetting);
};
