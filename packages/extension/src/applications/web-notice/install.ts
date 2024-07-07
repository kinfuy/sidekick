import type { App } from 'vue';
import WebNotice from './view/inject/web-notice';
import Setting from './view/setting/web-notice.vue';

export const webNoticeContentInstall = (app: App) => {
  app.component('InjectWebNotice', WebNotice);
};

export const webNoticeContentSettingInstall = (app: App) => {
  app.component('SettingWebNotice', Setting);
};
