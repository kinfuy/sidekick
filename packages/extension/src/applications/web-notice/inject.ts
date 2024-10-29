import type { App } from 'vue';
import WebNotice from './view/inject/web-notice';
export const webNoticeContentInstall = (app: App) => {
  app.component('InjectWebNotice', WebNotice);
};
