<template>
  <div
    class="sidekick-kit"
    :class="`${toolMode}-mode`"
    style="opacity: 0"
    @mouseenter="hoverToolBar"
    @mouseleave="leaveToolBar"
  >
    <div
      class="sidekick-tool-bar"
      :class="{ 'sidekick-active': isActive || isVisable }"
    >
      <ToolItem
        v-for="tool in tools"
        :key="tool.name"
        :title="tool.title"
        :logo="tool.logo"
        @click="toolClick(tool)"
      />
    </div>
    <Fluorescence v-if="!isActive && !isVisable" :is-diffuse="isDiffuse" />
  </div>
  <Dialog v-model="isVisable" title="环境警示" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Dialog from '@pages/common/Dialog/Dialog.vue';
import ToolItem from '@pages/common/ToolItem/ToolItem.vue';
import Fluorescence from '@pages/common/Fluorescence/Fluorescence.vue';
import '@pages/common/Fluorescence/Fluorescence.less?shadow';
import '@pages/common/Dialog/Dialog.less?shadow';
import '@pages/common/ToolItem/ToolItem.less?shadow';

import notice from '@assets/app/notice.png';
import shot from '@assets/app/shot.png';
import browser from '@assets/app/browser.png';
import pen from '@assets/app/pen.png';
import clipboard from '@assets/app/clipboard.png';

const toolMode = ref('left');

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

const toolClick = (tool: any) => {
  if (tool.name === 'notice') {
    isVisable.value = true;
  }
};
</script>

<style lang="less" shadow>
.sidekick-kit {
  position: fixed;
  z-index: 2999999999999;
  opacity: 1 !important;

  .sidekick-tool-bar {
    display: flex;
    align-items: center;
    transition: all 0.5s;
    height: 100%;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 0 49px 16px #00000024;
    padding: 10px;
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

  .sidekick-tool-bar {
    flex-direction: column;
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

  .sidekick-tool-bar {
    flex-direction: column;
  }

  .sidekick-tool {
    margin: 12px 0;
  }
}
</style>
