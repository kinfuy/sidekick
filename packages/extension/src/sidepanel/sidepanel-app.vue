<template>
  <ElConfigProvider size="small">
    <div class="sidepanel-app" :class="[theme]">
      <div class="sidepanel-slider">
        <ToolItem
          v-for="app in sidePanelApps"
          :key="app.name"
          :title="app.title"
          :logo="app.logo"
          :active="app.name === current?.name"
          @click="appClick(app)"
        />
      </div>
      <div v-if="sidePanelApps.length" class="sidepanel-content">
        <img class="sidepanel-set" :src="setIcon" @click="handleSet" />
        <component
          :is="`SidePanel${current?.name}`"
          v-if="isRegister(`SidePanel${current?.name}`)"
          :key="current?.name"
        ></component>
        <Empty v-else text="暂无配置项" />
      </div>
    </div>
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import Empty from '@components/common/Empty/Empty';
import ToolItem from '@components/common/ToolItem/ToolItem.vue';
import { useApp } from '@store/useApp';
import { useTheme } from '@store/useTheme';
import { onBeforeUnmount, provide, ref, watchEffect } from 'vue';
import { getChromeUrl, sendMessageToExtension } from '@utils';
import set from '@assets/image/set.svg';
import { ElConfigProvider } from 'element-plus';
import { Message } from '@core/message';
import { isRegister } from '.';
import type { AppEntry } from '@/types/core-app.type';

const setIcon = getChromeUrl(set);

sendMessageToExtension({
  from: Message.Form.SIDEPANEL_MESSAGE,
  to: Message.Target.SERVERWORKER,
  code: 'onSidepanelOpen',
  data: {},
});

const { theme } = useTheme();
const { sidePanelApps, inited } = useApp();
const current = ref<AppEntry>();

const appClick = (app: AppEntry) => {
  current.value = app;
};

onBeforeUnmount(() => {
  sendMessageToExtension({
    from: Message.Form.SIDEPANEL_MESSAGE,
    to: Message.Target.SERVERWORKER,
    code: 'onSidepanelClose',
    data: {},
  });
  current.value = undefined;
});

const handleSet = () => {
  const query = current.value ? `#${current.value?.name}` : '';
  window.open(getChromeUrl(`setting.html${query}`), '_blank');
};

watchEffect(() => {
  if (sidePanelApps.value.length === 0 && inited.value) {
    handleSet();
  }

  if (sidePanelApps.value.length > 0) {
    current.value = sidePanelApps.value[0];
  }
  console.log(sidePanelApps.value, current.value);
});

provide('appContent', {
  openSet: handleSet,
});
</script>

<style lang="less" scoped>
.sidepanel-app {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .sidepanel-slider {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-shrink: 1;
    padding: 10px;
    height: 100%;
    width: 50px;
    border-right: 1px solid #f4f4f4;
    background-color: var(--bg-color-primary);
  }

  .sidepanel-content {
    flex-grow: 1;
    height: 100%;
    position: relative;

    .sidepanel-set {
      position: absolute;
      right: 16px;
      top: 10px;
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
  }
}
</style>
