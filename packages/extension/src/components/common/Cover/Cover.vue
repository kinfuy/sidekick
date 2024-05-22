<template>
  <div class="sidekick-cover">
    <div class="logo-content">
      <img class="logo" :src="logoIcon" alt="logo" />
      <span class="logo-title">SildKick</span>
      <span>欢迎，请点击登录SildKick</span>
      <div class="cover-btn">
        <span class="login-btn" @click="openLogin">登录</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createWindow, injectPostMessage } from '@utils';
import logo from '@/assets/logo.png';

const props = defineProps({
  isInject: {
    type: Boolean,
    default: false,
  },
});
const logoIcon = chrome.runtime.getURL(logo);

const openPage = (code: string, url: string, extra: any = {}) => {
  injectPostMessage({
    from: 'app_inject',
    code,
    data: {
      openUrl: url,
      extra,
    },
  });
};

const openLogin = () => {
  const config = {
    focused: true,
    width: 500,
    height: 680,
    left: 400,
    top: 100,
    type: 'panel',
  };
  if (props.isInject) {
    openPage('onOpenWindow', 'login.html', config);
  } else {
    createWindow('login.html', config);
  }
};
</script>
