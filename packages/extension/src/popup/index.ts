import { createApp } from 'vue';
import { popupInstall } from '@applications/install';
import popup from './popup-app.vue';
import './styles/index.less';
import 'element-plus/dist/index.css';
const app = createApp(popup);

if (app) popupInstall(app);

export const isRegister = (name: string) => {
  if (!app) return false;
  return app.component(name);
};

app.mount('#popup-app');
