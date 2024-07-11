import type { App } from 'vue';
import Content from './view/content/ui-flow.vue';
import Popup from './view/popup/ui-flow.vue';
import Setting from './view/setting/ui-flow.vue';
export const uiFlowContentInstall = (app: App) => {
  app.component('InjectUiFlow', Content);
};

export const uiFlowPopupInstall = (app: App) => {
  app.component('PopupUiFlow', Popup);
};

export const uiFlowSettingInstall = (app: App) => {
  app.component('SettingUiFlow', Setting);
};
