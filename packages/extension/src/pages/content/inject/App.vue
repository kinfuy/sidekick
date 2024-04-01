<template>
  <div class="sidekick-app" :class="[theme]">
    <div
      class="sidekick-kit"
      :class="[`${toolMode}-mode`]"
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
            v-for="tool in tools"
            :key="tool.name"
            :title="tool.title"
            :logo="tool.logo"
            @click="toolClick(tool)"
          />
        </div>
        <div class="sidekick-footer">
          <div class="footer-operate">
            <img :src="setIcon" @click="() => handleSwitch()" />
          </div>
        </div>
      </div>
      <Fluorescence v-if="!isActive && !isVisable" :is-diffuse="isDiffuse" />
    </div>
    <Dialog v-model="isVisable" :tool="current" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Dialog from '@pages/common/Dialog/Dialog.vue';
import ToolItem from '@pages/common/ToolItem/ToolItem.vue';
import Fluorescence from '@pages/common/Fluorescence/Fluorescence.vue';
import '@pages/common/Fluorescence/Fluorescence.less?shadow';
import '@pages/common/Dialog/Dialog.less?shadow';
import '@pages/common/ToolItem/ToolItem.less?shadow';
import '@pages/common/App/Notice/Notice.less?shadow';
import '@pages/common/Empty/Empty.less?shadow';

import notice from '@assets/app/notice.png';
import shot from '@assets/app/shot.png';
import browser from '@assets/app/browser.png';
import pen from '@assets/app/pen.png';
import clipboard from '@assets/app/clipboard.png';
import set from '@assets/image/set.svg';

import { useTheme } from '@store/useTheme';

const setIcon = chrome.runtime.getURL(set);

const toolMode = ref('left');

const { theme, setTheme } = useTheme();

const handleSwitch = () => {
  if (theme.value === 'light') {
    setTheme('dark');
  } else if (theme.value === 'dark') {
    setTheme('light');
  }
};

const tools = ref([
  {
    name: 'notice',
    title: '环境警示',
    logo: chrome.runtime.getURL(notice),
  },
  {
    name: 'shot',
    title: '截图',
    logo: chrome.runtime.getURL(shot),
  },
  {
    name: 'browser',
    title: '浏览器',
    logo: chrome.runtime.getURL(browser),
  },
  {
    name: 'pen',
    title: '马克笔',
    logo: chrome.runtime.getURL(pen),
  },
  {
    name: 'clipboard',
    title: '粘贴板',
    logo: chrome.runtime.getURL(clipboard),
  },
]);

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
  }, 300);
};

const isVisable = ref(false);

const current = ref();

const toolClick = (tool: any) => {
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
    background-color: var(--bg-color);
    box-shadow: 0 0 49px 16px #00000024;
    padding: 10px;

    .sidekick-content {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    .sidekick-footer {
      position: absolute;
      bottom: 0;
      height: 60px;
      width: 100%;

      .footer-operate {
        display: flex;
        align-items: center;
        justify-content: center;

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
