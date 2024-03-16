<template>
  <div
    class="sidekick-kit left-mode"
    style="opacity: 0"
    @mouseenter="hoverToolBar"
    @mouseleave="leaveToolBar"
  >
    <div class="sidekick-tool-bar" :class="{ 'sidekick-active': isActive }">
      <Tool
        v-for="tool in tools"
        :key="tool.name"
        :title="tool.title"
        :logo="tool.logo"
      />
    </div>
    <Fluorescence v-if="!isActive" :is-diffuse="isDiffuse" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Tool from '../components/tool.vue';
import Fluorescence from '../components/fluorescence.vue';
import notice from '../../assets/app/notice.png';
import shot from '../../assets/app/shot.png';
import browser from '../../assets/app/browser.png';
import pen from '../../assets/app/pen.png';
import clipboard from '../../assets/app/clipboard.png';

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
  }, 1000);
};

const leaveToolBar = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    isActive.value = false;
    isDiffuse.value = false;
  }, 500);
};
</script>

<style lang="less" shadow>
.sidekick-kit {
  position: fixed;
  z-index: 2999999999999;
  opacity: 1 !important;

  .sidekick-tool-bar {
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s;
    height: 100%;
    width: 100%;
  }
}

.left-mode {
  top: 0;
  left: 0;
  bottom: 0;
  height: 100vh;
  width: 48px;
  transform: translateX(-48px);

  .sidekick-active {
    overflow: hidden;
    transform: translateX(48px);
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
  width: 48px;
  transform: translateX(48px);

  .sidekick-active {
    overflow: hidden;
    transform: translateX(-48px);
  }

  .sidekick-tool-bar {
    flex-direction: column;
  }

  .sidekick-tool {
    margin: 12px 0;
  }
}

.top-mode {
  top: 0;
  width: 100vw;
  height: 48px;
  transform: translateY(-48px);

  .sidekick-active {
    overflow: hidden;
    transform: translateY(48px);
  }

  .sidekick-tool {
    margin: 0 12px;
  }
}

.bottom-mode {
  bottom: 0;
  width: 100vw;
  height: 48px;
  transform: translateY(48px);

  .sidekick-active {
    overflow: hidden;
    transform: translateY(-48px);
  }

  .sidekick-tool {
    margin: 0 12px;
  }
}
</style>
