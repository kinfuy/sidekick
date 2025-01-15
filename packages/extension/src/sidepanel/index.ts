import './styles/index.less';
import 'element-plus/dist/index.css';

import { createApp } from 'vue';
import App from './sidepanel-app.vue';
import { sidePanelInstall } from '@/applications/install';

const app = createApp(App);

if (app) sidePanelInstall(app);

export const isRegister = (name: string) => {
  if (!app) return false;
  return app.component(name);
};

app.mount('#sidepanel-app');
