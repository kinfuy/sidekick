<template>
  <div class="setting-app" :class="[theme]">
    <Cover v-if="!isLogin && current?.isLogin" :is-inject="false"> </Cover>
    <template v-else>
      <div class="setting-left">
        <div class="logo-content">
          <img class="logo-icon" :src="logoIcon" alt="logo" />
          <span class="logo-title">DevTester</span>
        </div>
        <div class="silder-list">
          <div class="silder-title">我的应用</div>
          <Sortable @sort="appSort">
            <div
              v-for="setting in myApps"
              :key="setting.name"
              class="silder-item"
              :class="{ 'item-active': active === setting.name }"
              @click="() => appClick(setting)"
            >
              <span>{{ setting.title }}</span>
              <img class="drag-icon" :src="dragIcon" alt="logo" />
            </div>
          </Sortable>
          <ElDivider />
          <div class="silder-title">其他</div>
          <div
            v-for="setting in innerApps"
            :key="setting.name"
            class="silder-item"
            :class="{ 'item-active': active === setting.name }"
            @click="() => appClick(setting)"
          >
            {{ setting.title }}
          </div>
        </div>
      </div>
      <div class="setting-right">
        <div class="setting-title">
          <span>{{ current?.title }}</span>
          <ElSwitch
            v-if="!current?.inner"
            class="m-l-1"
            active-text="启用"
            inactive-text="禁用"
            inline-prompt
            :model-value="isAppActive(current.name)"
            @change="
              (value) => updateNotEffect(current.name, !value as boolean)
            "
          />
        </div>
        <component
          :is="`Setting${current?.name}`"
          v-if="hasSettingAppView.includes(current?.name) || current?.inner"
        />
        <Empty v-else text="暂无配置项" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useTheme } from '@store/useTheme';
import { computed, ref } from 'vue';
import { useAuth } from '@store/useAuth';
import Cover from '@components/common/Cover/Cover.vue';
import { useApp } from '@store/useApp';
import { ElDivider, ElSwitch } from 'element-plus';
import { hasSettingAppView } from '@applications/install';

import Empty from '@components/common/Empty/Empty';
import Sortable from '@components/Sortable/sort-able';
import drag from '@/assets/image/drag.svg';
import type { AppEntry } from '@/types/core-app.type';
import logo from '@/assets/logo.png';
const logoIcon = chrome.runtime.getURL(logo);
const dragIcon = chrome.runtime.getURL(drag);

const { isLogin, getRefreshToken } = useAuth();

const { theme } = useTheme();

const active = ref();

const { settingApps, sortApps, isAppActive, updateNotEffect } = useApp();

const myApps = computed(() => {
  return settingApps.value.filter((item) => !item.inner);
});

const innerApps = computed(() => {
  return settingApps.value.filter((item) => item.inner);
});

const appSort = (apps: string[]) => {
  sortApps(apps);
};

const init = () => {
  const idx = window.location.href.lastIndexOf('#') > 0;
  if (idx) {
    const menu = window.location.href.split('#')[1];
    if (settingApps.value.find((item) => item.name === menu)) {
      active.value = menu;
      return;
    }
  }
  active.value = settingApps.value[0].name;
  window.location.href = `${window.location.href}#${active.value}`;
  getRefreshToken();
};

init();

const current = computed(() => {
  return (
    settingApps.value.find((item) => item.name === active.value) ||
    settingApps.value[1]
  );
});

const appClick = (app: AppEntry) => {
  active.value = app.name;
  const idx = window.location.href.lastIndexOf('#');
  window.location.href = `${window.location.href.slice(0, idx)}#${app.name}`;
};
</script>
