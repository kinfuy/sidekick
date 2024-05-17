import type { App } from 'vue';
import devAccount from './dev-account/install';
import webNotice from './web-notice/install';
import appLayout from './app-layout/install';
export const install = (app: App) => {
  appLayout(app);
  devAccount(app);
  webNotice(app);
};
