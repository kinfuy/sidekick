import { createApp } from 'vue';
import login from './login.vue';
import './style/Login.less';
const app = createApp(login);

app.mount('#login-app');
