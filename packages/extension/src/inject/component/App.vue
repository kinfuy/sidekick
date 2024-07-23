<template>
  <div class="dev-tester-app z-index" style="display: none" :class="[theme]">
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
      class="dev-tester-kit"
      :class="[`${direction}-mode`]"
      @mouseenter="hoverToolBar"
      @mouseleave="() => leaveToolBar(true)"
    >
      <div
        class="dev-tester-tool-bar"
        :class="{
          'dev-tester-active': isActive || isVisable,
        }"
      >
        <div class="dev-tester-content">
          <ToolItem
            v-for="app in contentApps"
            :key="app.name"
            :title="app.title"
            :logo="app.logo"
            :active="app.name === current?.name"
            @click="appClick(app)"
          />
        </div>

        <div class="dev-tester-footer">
          <span class="line" />
          <div
            v-for="innerApp in contentInnerApps"
            :key="innerApp.name"
            class="footer-operate btn m-t-1"
            @click="appClick(innerApp)"
          >
            <img :src="innerApp.logo" />
          </div>
        </div>
      </div>
    </div>
    <div
      class="dev-tester-action"
      :class="[`${direction}-action`]"
      :style="activeTipStyle"
    >
      <ActionTips v-if="!isVisable && !isActive" />
    </div>
    <Dialog v-model="isVisable" :direction="direction" :tool="current" />
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, ref, watch, watchEffect } from 'vue';
import Dialog from '@components/common/Dialog/Dialog.vue';
import ToolItem from '@components/common/ToolItem/ToolItem.vue';
import { useDraggable, useWindowSize } from '@vueuse/core';
import './App.less?shadow';
import logo from '@assets/logo16.png';
import { useTheme } from '@store/useTheme';
import { useApp } from '@store/useApp';
import { injectPostMessage } from '@utils';
import { Message } from '@core/message';
import ActionTips from './ActionTips.vue';
import type { AppEntry } from '@/types/core-app.type';

const { syncStore } = useApp();
const { theme, direction, posY, setPosY } = useTheme();

const kitRef = ref();
const { y, isDragging } = useDraggable(kitRef, {
  axis: 'y',
  onEnd: ({ y }) => {
    setPosY(y);
  },
});

const { height } = useWindowSize();

const activeTipStyle = computed(() => {
  let fix = 68;
  if (height.value * 0.8 < y.value) {
    fix = -18;
  }
  return { top: y.value ? `${y.value + fix}px` : `calc(38% + ${fix}px)` };
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

const { contentApps, contentInnerApps } = useApp();

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

watchEffect(() => {
  if (isActive.value) {
    syncStore();
  }
});

const leaveToolBar = (isBar: boolean = false) => {
  if ((!isBar && isActive.value) || isDragging.value) return; // 侧边栏打开 logo 离开不关闭
  clearTimeout(openTimer);
  leaveTimer = setTimeout(() => {
    isActive.value = false;
    clearTimeout(leaveTimer);
  }, 800);
};

const current = ref();

const openPage = (code: string, url: string, extra: any = {}) => {
  injectPostMessage({
    from: Message.Form.INJECT_MESSAGE,
    to: Message.Target.CONTENT,
    code,
    data: {
      openUrl: url,
      extra,
    },
  });
};

const openLogin = () => {
  openPage('onOpenWindow', 'login.html', {
    focused: true,
    width: 500,
    height: 680,
    left: 400,
    top: 100,
    type: 'panel',
  });
};

const appClick = async (tool: AppEntry) => {
  if (tool.linkUrl) {
    openPage('onOpenChromeUrl', 'setting.html');
    return;
  }
  if (current.value?.name && tool.name !== current.value.name) {
    isVisable.value = true;
  } else isVisable.value = !isVisable.value;
  if (isVisable.value) current.value = tool;
  else current.value = null;
};

watch(
  () => isDragging.value,
  () => {
    clearTimeout(openTimer);
    clearTimeout(leaveTimer);
  },
);

provide('appContent', {
  setDialog: (val: boolean) => {
    isVisable.value = val;
  },
  openPage,
  openLogin,
});

watchEffect(() => {
  if (!isVisable.value) {
    current.value = undefined;
  }
});
</script>
