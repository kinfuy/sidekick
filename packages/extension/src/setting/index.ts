import { createApp } from 'vue';
import { settingInstall } from '@applications/install';
import setting from './setting.vue';
import '@/styles/index.less';
import './style/setting.less';
import 'element-plus/dist/index.css';
import UserSetting from './components/UserSetting.vue';
import HelpSetting from './components/HelpSetting.vue';
import AboutSetting from './components/AboutSetting.vue';
import AppStoreSetting from './components/AppStoreSetting.vue';

const app = createApp(setting);

settingInstall(app);

app.component('SettingAppUser', UserSetting);
app.component('SettingAppHelp', HelpSetting);
app.component('SettingAppAbout', AboutSetting);
app.component('SettingAppStore', AppStoreSetting);

app.mount('#setting-app');
