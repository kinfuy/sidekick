import type { App } from 'vue';
import WebNotice from './view/inject/web-notice';

export default (app: App) => {
  app.component('InjectWebNotice', WebNotice);
};
