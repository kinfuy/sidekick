import type { App } from 'vue';
import WebNotice from './view/inject/web-notice';

export const WebNoticeContentInstall = (app: App) => {
  app.component('InjectWebNotice', WebNotice);
};
