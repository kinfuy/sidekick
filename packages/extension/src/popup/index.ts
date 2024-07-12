import { createApp } from 'vue';
import { popupInstall } from '@applications/install';
import popup from './popup.vue';
import './styles/index.less';
import 'element-plus/dist/index.css';
const app = createApp(popup);

popupInstall(app);

export const isRegister = (name: string) => {
  console.log(name);
  return app.component(name);
};

app.mount('#popup-app');
