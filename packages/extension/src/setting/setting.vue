<template>
  <div class="setting-app" :class="[theme]">
    <Cover v-if="!isLogin && current.isLogin" :is-inject="false"> </Cover>
    <template v-else>
      <div class="setting-left">
        <div class="logo-content">
          <img class="logo-icon" :src="logoIcon" alt="logo" />
          <span class="logo-title">SildKick</span>
        </div>
        <div class="silder-list">
          <div
            v-for="setting in settingList"
            :key="setting.name"
            class="silder-item"
            :class="{ 'item-active': active === setting.name }"
            @click="active = setting.name"
          >
            {{ setting.title }}
          </div>
        </div>
      </div>
      <div class="setting-right">
        <div class="setting-title">{{ current.title }}</div>
        <current.com class="setting-content" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useTheme } from '@store/useTheme';
import { computed, reactive, ref } from 'vue';
import devAccount from '@applications/dev-account/view/setting/dev-account.vue';
import { useAuth } from '@store/useAuth';
import Cover from '@components/common/Cover/Cover.vue';
import UserSetting from './components/UserSetting.vue';
import HelpSetting from './components/HelpSetting.vue';
import AboutSetting from './components/AboutSetting.vue';
import logo from '@/assets/logo.png';
const logoIcon = chrome.runtime.getURL(logo);

const { isLogin } = useAuth();

const { theme } = useTheme();

const active = ref('userInfo');

const init = () => {
  const query = window.location.search;
  const params = new URLSearchParams(query);
  const tab = params.get('menu');
  if (tab) {
    active.value = tab;
  }
};

init();

const settingList = reactive([
  {
    title: 'Dev Account',
    name: 'devAccount',
    com: devAccount,
    isLogin: false,
  },
  {
    title: '基础信息',
    name: 'userInfo',
    com: UserSetting,
    isLogin: false,
  },
  {
    title: '帮助与反馈',
    name: 'help',
    isLogin: false,
    com: HelpSetting,
  },
  {
    title: '关于',
    name: 'about',
    isLogin: false,
    com: AboutSetting,
  },
]);

const current = computed(() => {
  return settingList.find((item) => item.name === active.value)!;
});
</script>
