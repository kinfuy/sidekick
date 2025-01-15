import type { App } from 'vue';
import Setting from './view/setting/api-proxy.vue';
import SidePanel from './view/sidepanel/api-proxy.vue';
export const apiProxySettingInstall = (app: App) => {
  app.component('SettingApiProxy', Setting);
};

export const apiProxySidePanelInstall = (app: App) => {
  app.component('SidePanelApiProxy', SidePanel);
};
