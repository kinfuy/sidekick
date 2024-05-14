<template>
  <div class="setting-app" :class="[theme]">
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
  </div>
</template>

<script lang="ts" setup>
import { useTheme } from '@store/useTheme';
import { computed, reactive, ref } from 'vue';
import UserSetting from './components/UserSetting.vue';
import HelpSetting from './components/HelpSetting.vue';
import AboutSetting from './components/AboutSetting.vue';
import logo from '@/assets/logo.png';

const logoIcon = chrome.runtime.getURL(logo);

const { theme } = useTheme();

const active = ref('userInfo');

const settingList = reactive([
  {
    title: '基础信息',
    name: 'userInfo',
    com: UserSetting,
  },
  {
    title: '帮助与反馈',
    name: 'help',
    com: HelpSetting,
  },
  {
    title: '关于',
    name: 'about',
    com: AboutSetting,
  },
]);

const current = computed(() => {
  return settingList.find((item) => item.name === active.value)!;
});
</script>
