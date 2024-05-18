import type { App } from 'vue';
import AppLayout from './view/app-layout';

export const appLayoutContentInstall = (app: App) => {
  app.component('InjectAppLayout', AppLayout);
};
