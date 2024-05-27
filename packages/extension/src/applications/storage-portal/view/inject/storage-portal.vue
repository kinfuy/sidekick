<template>
  <div class="storage-portal">
    <div class="storage-portal-operation">
      <div class="web-info">
        <div class="web-title theme-text">{{ currentWeb.title }}</div>
        <div class="web-url">
          <span class="theme-text-desc">{{ currentWeb.url }}</span>
          <template v-if="syncWeb.url">
            <span class="m-l-1 m-r-1">已从</span>
            <span>{{ syncWeb.url }}</span>
            <span class="m-l-1">同步</span>
          </template>
        </div>
      </div>
      <div class="operation-btn">
        <span
          class="btn btn-small btn-border m-r-1"
          title="从其他网站导入"
          @click="handleSelect"
        >
          {{ stateVisable ? '关闭' : '开启' }}传送门
        </span>
        <span class="btn btn-small btn-border m-r-1" @click="handleClear">
          清空
        </span>
        <span class="btn btn-small btn-border" @click="handleRefresh">
          刷新
        </span>
      </div>
    </div>
    <SelectWeb v-if="stateVisable" :webs="webs" @sync="handleSync" />
    <div class="storage-portal-content">
      <div class="storage-portal-tip">
        <span
          v-for="item in menuList"
          :key="item.id"
          class="m-r-2 flex align-center"
          @click="active = item.id"
        >
          <span
            :class="[active === item.id ? 'active-text' : '']"
            class="btn-text theme-text"
          >
            {{ item.name }}
          </span>
        </span>
      </div>
      <div class="storage-portal-list">
        <div
          v-if="['all', 'LocalStorage'].includes(active)"
          class="storage-item"
        >
          <div class="storage-title">
            <span class="storage-title-text theme-text">LocalStorage</span>
          </div>
          <KeyValue
            :list="currentStorage.localStorage"
            @delete="(key) => handleDelete(key, 'localStorage')"
          />
        </div>
        <div
          v-if="['all', 'SessionStorage'].includes(active)"
          class="storage-item"
        >
          <div class="storage-title">
            <span class="storage-title-text theme-text">SessionStorage</span>
          </div>
          <KeyValue
            :list="currentStorage.sessionStorage"
            @delete="(key) => handleDelete(key, 'sessionStorage')"
          />
        </div>
        <div v-if="['all', 'Cookies'].includes(active)" class="storage-item">
          <div class="storage-title">
            <span class="storage-title-text theme-text">Cookie</span>
          </div>
          <KeyValue
            :list="currentStorage.cookie"
            @delete="(key) => handleDelete(key, 'cookie')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { clearAllCookie, getAllStorage, injectPostMessage } from '@utils';
import { computed, onMounted, ref } from 'vue';
import { useStoragePortalStore } from '../../store';
import KeyValue from './key-value.vue';
import SelectWeb from './select-web.vue';

const { webs, clearAll, currentStorage, setStore, deleteItem } =
  useStoragePortalStore();

const active = ref('all');

const menuList = [
  { name: '全部', id: 'all' },
  { name: 'LocalStorage', id: 'LocalStorage', color: 'success' },
  { name: 'SessionStorage', id: 'SessionStorage', color: 'info' },
  { name: 'Cookies', id: 'Cookies', color: 'warning' },
];

const init = () => {
  injectPostMessage({
    from: 'app_inject',
    code: 'onGetData',
    data: {
      key: 'cookies',
      opt: {
        targetUrl: new URL(window.location.href).host,
        sourceUrl: new URL(window.location.href).host,
      },
    },
  });
  injectPostMessage({
    from: 'app_inject',
    code: 'onGetData',
    data: { key: 'tabs' },
  });
  setStore({
    localStorage: getAllStorage(localStorage),
    sessionStorage: getAllStorage(sessionStorage),
  });
};

const deleteCookie = (cookies: string[]) => {
  const targetUrl = new URL(window.location.href);
  injectPostMessage({
    from: 'app_inject',
    code: 'onCustomAction',
    data: {
      key: 'clear-cookies',
      data: {
        targetUrl: `${targetUrl.protocol}//${targetUrl.host}`,
        cookies,
      },
    },
  });
};

const handleDelete = (
  key: string,
  type: 'localStorage' | 'sessionStorage' | 'cookie',
) => {
  deleteItem(key, type);
  if (type === 'cookie') {
    const cookies = [key];
    deleteCookie(cookies);
  }
  init();
};

const handleClear = () => {
  const cookies = currentStorage.value.cookie.map((c) => c.key);
  deleteCookie(cookies);
  window.localStorage.clear();
  window.sessionStorage.clear();
  // clearAllCookie();
  clearAll();
};

const handleRefresh = () => {
  init();
};

const currentWeb = computed(() => {
  return {
    url: new URL(window.location.href).host,
    title: document.title,
  };
});

const stateVisable = ref(false);
const handleSelect = () => {
  stateVisable.value = !stateVisable.value;
};

const syncWeb = ref({
  url: '',
  title: '',
});

const handleSync = (item: { url: string; title: string }) => {
  if (!item.url) return;
  syncWeb.value = item;
  injectPostMessage({
    from: 'app_inject',
    code: 'onGetData',
    data: {
      key: 'cookies',
      opt: {
        targetUrl: item.url,
        sourceUrl: new URL(window.location.href).host,
      },
    },
  });
  stateVisable.value = false;
};

onMounted(() => {
  init();
});
</script>

<style lang="less" scoped></style>
