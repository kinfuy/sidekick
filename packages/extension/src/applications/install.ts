import type { App } from 'vue';
import WebNotice from './web-notice/view/web-notice';
import AppLayout from './app-layout/view/app-layout';
export const install = (app: App) => {
  app.component('WebNotice', WebNotice);
  app.component('AppLayout', AppLayout);
};
