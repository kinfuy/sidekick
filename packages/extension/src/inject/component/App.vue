<template>
  <div class="sidekick-app" style="opacity: 0" :class="[theme]">
    <div
      ref="kitRef"
      class="kit-tool-warper"
      :style="{ top: y ? `${y}px` : `38%` }"
      :class="[`${direction}-kit`]"
    >
      <div
        class="kit-tool"
        :class="[{ 'tool-active': isDragging }]"
        @mouseenter="hoverToolBar"
        @mouseleave="() => leaveToolBar()"
        @mousedown="catchPos"
        @mouseup="clickToolBar"
      >
        <img draggable="false" class="app-logo" :src="logoUrl" alt="logo" />
      </div>
    </div>
    <div
      class="sidekick-kit"
      :class="[`${direction}-mode`]"
      @mouseenter="hoverToolBar"
      @mouseleave="() => leaveToolBar(true)"
    >
      <div
        class="sidekick-tool-bar"
        :class="{
          'sidekick-active': isActive || isVisable,
        }"
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
import { computed, ref, watch, watchEffect } from 'vue';
import Dialog from '@components/common/Dialog/Dialog.vue';
import ToolItem from '@components/common/ToolItem/ToolItem.vue';
import { useDraggable } from '@vueuse/core';
import './App.less?shadow';
import logo from '@assets/logo16.png';

import dark from '@assets/image/dark.svg';
import light from '@assets/image/light.svg';
import set from '@assets/image/set.svg';

import { useTheme } from '@store/useTheme';
import { useApp } from '@store/useApp';

const { theme, direction, posY, setTheme, setPosY } = useTheme();

const kitRef = ref();
const { y, isDragging } = useDraggable(kitRef, {
  axis: 'y',
  onEnd: ({ y }) => {
    setPosY(y);
  },
});

watch(
  () => posY.value,
  (val) => {
    y.value = val;
  },
  {
    immediate: true,
  },
);

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
  if (theme.value === 'light') setTheme('dark');
  else setTheme('light');
};

const lastPosY = ref();
const catchPos = () => {
  lastPosY.value = y.value;
};

const isActive = ref(false);
const isVisable = ref(false);

let openTimer: any;
let leaveTimer: any;
const clickToolBar = (payload: MouseEvent) => {
  if (openTimer) clearTimeout(openTimer);
  if (payload.button !== 0) return;
  setTimeout(() => {
    const gap = Math.abs(lastPosY.value - y.value) < 10;
    if (gap) isActive.value = !isActive.value;
  }, 0);
};

const hoverToolBar = () => {
  clearTimeout(openTimer);
  clearTimeout(leaveTimer);
  if (isDragging.value) return;
  openTimer = setTimeout(() => {
    isActive.value = true;
    clearTimeout(openTimer);
  }, 1000);
};

const leaveToolBar = (isBar: boolean = false) => {
  if ((!isBar && isActive.value) || isDragging.value) return; // 侧边栏打开 logo 离开不关闭
  clearTimeout(openTimer);
  leaveTimer = setTimeout(() => {
    isActive.value = false;
    clearTimeout(leaveTimer);
  }, 800);
};

const current = ref();

const appClick = async (tool: any) => {
  if (current.value?.name && tool.name !== current.value.name) {
    isVisable.value = true;
  } else isVisable.value = !isVisable.value;
  if (isVisable.value) current.value = tool;
  else current.value = null;
};
</script>
