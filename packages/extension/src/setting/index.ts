import { createApp } from 'vue';
import setting from './setting.vue';
import '@/styles/index.less';
import './style/setting.less';
const app = createApp(setting);

app.mount('#setting-app');
