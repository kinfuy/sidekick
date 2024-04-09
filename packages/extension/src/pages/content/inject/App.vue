<template>
  <div class="sidekick-app" :class="[theme]">
    <div
      class="sidekick-kit"
      :class="[`${direction}-mode`]"
      style="opacity: 0"
      @mouseenter="hoverToolBar"
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
      <Fluorescence v-if="!isActive && !isVisable" :is-diffuse="isDiffuse" />
    </div>
    <Dialog v-model="isVisable" :direction="direction" :tool="current" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import Dialog from '@pages/common/Dialog/Dialog.vue';
import ToolItem from '@pages/common/ToolItem/ToolItem.vue';
import Fluorescence from '@pages/common/Fluorescence/Fluorescence.vue';
import './App.less?shadow';

import dark from '@assets/image/dark.svg';
import light from '@assets/image/light.svg';
import set from '@assets/image/set.svg';

import { useTheme } from '@store/useTheme';
import { useApp } from '@store/useApp';

const { theme, direction, setTheme } = useTheme();

const { apps } = useApp();

const setIcon = chrome.runtime.getURL(set);

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
  } else if (theme.value === 'dark') {
    setTheme('light');
  }
};

const isActive = ref(false);

const isDiffuse = ref(false);

let timer = 0;
const hoverToolBar = () => {
  clearTimeout(timer);
  isDiffuse.value = true;
  timer = setTimeout(() => {
    isActive.value = true;
  }, 500);
};

const leaveToolBar = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    isActive.value = false;
    isDiffuse.value = false;
  }, 500);
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

<style lang="less" shadow>
.sidekick-kit {
  position: fixed;
  z-index: 2999999999999;
  opacity: 1 !important;

  .sidekick-tool-bar {
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    transition: all 0.5s;
    height: 100%;
    width: 100%;
    background-color: var(--bg-color-primary);
    box-shadow: 0 0 49px 16px #00000024;
    padding: 10px;

    .sidekick-content {
      display: flex;
      align-items: center;
      flex-direction: column;
      flex-grow: 0;
    }

    .sidekick-footer {
      min-height: 60px;
      width: 100%;
      padding: 10px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .footer-operate {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 6px;
        padding: 8px;

        img {
          width: 24px;
          height: 24px;
          cursor: pointer;
        }
      }
    }
  }
}

.left-mode {
  top: 0;
  left: 0;
  bottom: 0;
  height: 100vh;
  width: 60px;
  transform: translateX(-60px);

  .sidekick-active {
    overflow: hidden;
    transform: translateX(60px);
  }

  .sidekick-tool {
    margin: 12px 0;
  }
}

.right-mode {
  top: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  width: 60px;
  transform: translateX(60px);

  .sidekick-active {
    overflow: hidden;
    transform: translateX(-60px);
  }

  .sidekick-tool {
    margin: 12px 0;
  }
}
</style>
