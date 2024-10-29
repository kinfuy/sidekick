import type { App } from 'vue';

import Setting from './view/setting/web-notice.vue';

export const webNoticeContentSettingInstall = (app: App) => {
  app.component('SettingWebNotice', Setting);
};
