import { computed, ref, toRaw } from 'vue';
import { storage } from '@utils/chrome';
import { appsRaw } from '../applications';
import type { AppEntry } from '@/types/core-app.type';

export interface AppStore {
  apps: Array<AppEntry>;
}

const defaultStore: AppStore = {
  apps: appsRaw,
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
    // appsRaw.forEach((a) => {
    //   if (!store.apps.find((s) => s.name === a.name)) {
    //     store.apps.push(a);
    //   }
    // });
    appStore.value = defaultStore ?? store;
  };

  const apps = computed(() =>
    appStore.value.apps.filter((a) => !a.inner && a.contentApp),
  );

  const innerApps = computed(() => {
    return appStore.value.apps.filter((a) => a.inner);
  });

  // popup app
  const popupApps = computed(() => {
    return appStore.value.apps.filter((a) => a.popupApp);
  });

  const isAppActive = () => {
    return true;
  };

  sync();

  return {
    save,
    isAppActive,
    apps,
    innerApps,
    popupApps,
  };
};
