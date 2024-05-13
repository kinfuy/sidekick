<template>
  <div class="setting-app">
    <div class="setting-header">
      <div class="setting-title">
        <div class="logo-content">
          <img :src="logoIcon" alt="logo" />
          <span class="logo-title">SildKick</span>
        </div>
      </div>
      <div class="setting-close"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import logo from '@/assets/logo.png';
const logoIcon = chrome.runtime.getURL(logo);
</script>
