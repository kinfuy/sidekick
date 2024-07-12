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
import AppStorageSetting from './components/AppStorageSetting.vue';

const app = createApp(setting);

export const isRegister = (name: string) => {
  console.log(name);
  return app.component(name);
};

settingInstall(app);

app.component('SettingAppUser', UserSetting);
app.component('SettingAppHelp', HelpSetting);
app.component('SettingAppAbout', AboutSetting);
app.component('SettingAppStore', AppStoreSetting);
app.component('SettingAppStorage', AppStorageSetting);

app.mount('#setting-app');
