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
      <component :is="`Popup${current.name}`"></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ToolItem from '@components/common/ToolItem/ToolItem.vue';
import { useApp } from '@store/useApp';
import { useTheme } from '@store/useTheme';
import { ref } from 'vue';
import { getActiveTab, sendMessageToExtension } from '@utils';
import { useDevAccountStore } from '@applications/dev-account/store';
import type { AppEntry } from '@/types/core-app.type';
sendMessageToExtension({
  from: 'POPUP_VIEW',
  code: 'onPopupOpen',
  data: {},
});

const init = async () => {
  const { url } = await getActiveTab();
  if (!url) return;
  const { getMatch, setMatch } = useDevAccountStore();
  const web = getMatch(url);
  setMatch(web?.name);
};

init();
const { theme } = useTheme();

const { popupApps } = useApp();

const current = ref(popupApps.value[0]);

const appClick = (app: AppEntry) => {};
</script>

<style lang="less" scoped>
.popup-app {
  display: flex;
  width: 500px;
  height: 460px;
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
