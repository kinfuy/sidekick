<template>
  <div class="setting-app" :class="[theme]">
    <div class="setting-left">
      <div class="logo-content">
        <img class="logo-icon" :src="logoIcon" alt="logo" />
        <span class="logo-title">SildKick</span>
      </div>
      <div class="silder-list">
        <a class="silder-item" href="#userInfo">用户信息</a>
        <a class="silder-item" href="#help">帮助与反馈</a>
        <a class="silder-item" href="#about">关于</a>
      </div>
    </div>
    <div class="setting-right">
      <a name="userInfo" class="setting-title">用户信息</a>
      <UserSetting class="setting-content" />
      <a name="help" class="setting-title">帮助与反馈</a>
      <HelpSetting class="setting-content" />
      <a name="about" class="setting-title">关于</a>
      <AboutSetting class="setting-content" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTheme } from '@store/useTheme';
import UserSetting from './components/UserSetting.vue';
import HelpSetting from './components/HelpSetting.vue';
import AboutSetting from './components/AboutSetting.vue';
import logo from '@/assets/logo.png';

const logoIcon = chrome.runtime.getURL(logo);

const { theme } = useTheme();
</script>
