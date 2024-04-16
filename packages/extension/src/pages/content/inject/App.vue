<template>
  <div class="sidekick-app" style="opacity: 0" :class="[theme]">
    <div
      class="kit-tool-warper"
      :style="{ top: posY ? `${posY}px` : `30%` }"
      :class="{ 'is-not-active': isActive }"
    >
      <div class="kit-tool" @mousedown="catchPos" @mouseup="hoverToolBar">
        <img draggable="false" class="app-logo" :src="logoUrl" alt="logo" />
      </div>
    </div>
    <div
      class="sidekick-kit"
      :class="[`${direction}-mode`]"
      @mouseleave="leaveToolBar"
    >
      <div
        class="sidekick-tool-bar"
        :class="{ 'sidekick-active': isActive || isVisable }"
      >
        <div class="sidekick-content">
          <ToolItem
            v-for="app in apps"
            :key="app.name"
            :title="app.title"
            :logo="app.logo"
            @click="appClick(app)"
          />
        </div>

        <div class="sidekick-footer">
          <span class="line" />
          <div class="footer-operate btn m-t-1">
            <img :src="themeIcon" @click="() => handleSwitch()" />
          </div>
          <div class="footer-operate btn" @click="appClick(innerSetApp)">
            <img :src="setIcon" />
          </div>
        </div>
      </div>
    </div>
    <Dialog v-model="isVisable" :direction="direction" :tool="current" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import Dialog from '@pages/common/Dialog/Dialog.vue';
import ToolItem from '@pages/common/ToolItem/ToolItem.vue';
import './App.less?shadow';
import logo from '@assets/logo16.png';

import dark from '@assets/image/dark.svg';
import light from '@assets/image/light.svg';
import set from '@assets/image/set.svg';

import { useTheme } from '@store/useTheme';
import { useApp } from '@store/useApp';

const { theme, direction, posY, setTheme } = useTheme();

const { apps } = useApp();

const setIcon = chrome.runtime.getURL(set);

const logoUrl = chrome.runtime.getURL(logo);

const innerSetApp = ref({
  name: 'setting',
  title: '设置',
  logo: setIcon,
});

const themeIcon = computed(() => {
  if (theme.value === 'light') {
    return chrome.runtime.getURL(light);
  }
  return chrome.runtime.getURL(dark);
});

const handleSwitch = () => {
  if (theme.value === 'light') {
    setTheme('dark');
  } else {
    setTheme('light');
  }
};

const lastPosY = ref();
const catchPos = () => {
  lastPosY.value = posY.value;
};

const isActive = ref(false);

let timer: any;
const hoverToolBar = (payload: MouseEvent) => {
  if (timer) clearTimeout(timer);
  if (payload.button !== 0) return;
  isActive.value = !isActive.value;
};

const leaveToolBar = () => {
  const timer = setTimeout(() => {
    isActive.value = false;
    clearTimeout(timer);
  }, 1000);
};

const isVisable = ref(false);

const current = ref();

const appClick = (tool: any) => {
  if (current.value?.name && tool.name !== current.value.name) {
    isVisable.value = true;
  } else {
    isVisable.value = !isVisable.value;
  }
  if (isVisable.value) {
    current.value = tool;
  } else {
    current.value = null;
  }
};
</script>
