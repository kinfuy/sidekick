import type { App } from 'vue';
import { WebNotice } from './web-notice';
export const install = (app: App) => {
  app.component('EasySwitch', WebNotice);
};
