import type { App } from 'vue';
import AppLayout from './view/app-layout';

export default (app: App) => {
  app.component('InjectAppLayout', AppLayout);
};
