import notice from '@assets/app/notice.png';
import pen from '@assets/app/pen.png';
import clipboard from '@assets/app/clipboard.png';
import { computed, ref, toRaw } from 'vue';
import { storage } from '@utils/chrome';

export interface AppStore {
  apps: Array<{
    name: string;
    title: string;
    logo: string;
  }>;
}

const defaultStore: AppStore = {
  apps: [
    {
      name: 'notice',
      title: 'Env Notice',
      logo: chrome.runtime.getURL(notice),
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
  ],
};

const appStore = ref<AppStore>(defaultStore);

const STORE_KEY = 'appStore';

export const useApp = () => {
  const { get, set } = storage;

  const save = () => {
    set(STORE_KEY, JSON.stringify(toRaw(appStore.value)));
  };

  const sync = async () => {
    let store: AppStore = defaultStore;
    const _store = await get<AppStore>(STORE_KEY);
    if (_store && JSON.stringify(_store) !== '{}') {
      store = _store as AppStore;
    }
    appStore.value = store;
  };

  const apps = computed(() => appStore.value.apps);

  sync();

  return {
    save,
    apps,
  };
};
