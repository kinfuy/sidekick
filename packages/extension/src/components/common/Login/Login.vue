<template>
  <div class="sidekick-login">
    <div class="sidekick-login-logo">
      <img :src="logoIcon" alt="logo" />
      <div class="theme-text-desc">发现更好玩的浏览器</div>
    </div>
    <div class="login-operate">
      <div class="btn btn-border">登录</div>
      <div class="btn btn-border m-l-1">注册</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import logo from '@/assets/logo.png';
const logoIcon = chrome.runtime.getURL(logo);
</script>
