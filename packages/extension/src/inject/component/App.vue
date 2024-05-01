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
          <div
            v-for="innerApp in innerApps"
            :key="innerApp.name"
            class="footer-operate btn m-t-1"
            @click="appClick(innerApp)"
          >
            <img :src="innerApp.logo" />
          </div>
        </div>
      </div>
    </div>
    <Dialog v-model="isVisable" :direction="direction" :tool="current" />
  </div>
</template>

<script lang="ts" setup>
import { provide, ref, watch } from 'vue';
import Dialog from '@components/common/Dialog/Dialog.vue';
import ToolItem from '@components/common/ToolItem/ToolItem.vue';
import { useDraggable } from '@vueuse/core';
import './App.less?shadow';
import logo from '@assets/logo16.png';
import { useTheme } from '@store/useTheme';
import { useApp } from '@store/useApp';
import { useAuth } from '@store/useAuth';
import { getChromeUrl } from '@utils';

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

const { apps, innerApps } = useApp();

const logoUrl = chrome.runtime.getURL(logo);

const lastPosY = ref();
const catchPos = () => {
  lastPosY.value = y.value;
};

const isActive = ref(false); // 侧边栏
const isVisable = ref(false); // 抽屉

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

const { isLogin } = useAuth();

const appClick = async (tool: any) => {
  if (!isLogin.value && tool.name === 'AppSetting') {
    window.open(getChromeUrl('login.html'));
    return;
  }
  if (current.value?.name && tool.name !== current.value.name) {
    isVisable.value = true;
  } else isVisable.value = !isVisable.value;
  if (isVisable.value) current.value = tool;
  else current.value = null;
};

provide('appContent', {
  setDialog: (val: boolean) => {
    isVisable.value = val;
  },
});
</script>
