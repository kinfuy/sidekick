import { createApp } from 'vue';
import { install } from '@applications/install';
import popup from './popup.vue';
import './styles/index.less';

const app = createApp(popup);

install(app);

app.mount('#popup-app');
