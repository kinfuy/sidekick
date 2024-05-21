<template>
  <div class="popup-app" :class="[theme]">
    <div class="popup-slider">
      <ToolItem
        v-for="app in popupApps"
        :key="app.name"
        :title="app.title"
        :logo="app.logo"
        :active="app.name === current?.name"
        @click="appClick(app)"
      />
    </div>
    <div class="popup-content">
      <component :is="`Popup${current.name}`" v-if="current"></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ToolItem from '@components/common/ToolItem/ToolItem.vue';
import { useApp } from '@store/useApp';
import { useTheme } from '@store/useTheme';
import { onBeforeUnmount, ref } from 'vue';
import { sendMessageToExtension } from '@utils';
import type { AppEntry } from '@/types/core-app.type';
sendMessageToExtension({
  from: 'POPUP_VIEW',
  code: 'onPopupOpen',
  data: {},
});

const { theme } = useTheme();

const { popupApps } = useApp();

const current = ref<AppEntry>();

const appClick = (app: AppEntry) => {};

onBeforeUnmount(() => {
  sendMessageToExtension({
    from: 'POPUP_VIEW',
    code: 'onPopupClose',
    data: {},
  });
  current.value = undefined;
});

current.value = popupApps.value[0];
</script>

<style lang="less" scoped>
.popup-app {
  display: flex;
  width: 500px;
  min-height: 200px;
  max-height: 460px;
  overflow: hidden;

  .popup-slider {
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

  .popup-content {
    flex-grow: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
