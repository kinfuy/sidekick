import type { App } from 'vue';
import WebNotice from './web-notice/view/web-notice';
import AppLayout from './app-layout/view/app-layout';
import DevAccount from './dev-account/view/dev-account';
export const install = (app: App) => {
  app.component('WebNotice', WebNotice);
  app.component('AppLayout', AppLayout);
  app.component('DevAccount', DevAccount);
};
