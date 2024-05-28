import { computed, ref, toRaw } from 'vue';
import { storage } from '@utils/chrome';
import { appsRaw } from '../applications';
import type { AppEntry } from '@/types/core-app.type';

export interface AppStore {
  apps: Array<AppEntry>;
  notEffects: Array<string>;
}

const defaultStore: AppStore = {
  apps: appsRaw,
  notEffects: [],
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
    appsRaw.forEach((a) => {
      if (!store.apps.find((s) => s.name === a.name)) {
        store.apps.push(a);
      }
    });
    appStore.value = store;
  };

  const isAppActive = (name: string) => {
    return !appStore.value.notEffects.includes(name);
  };

  const apps = computed(() =>
    appStore.value.apps.filter(
      (a) => !a.inner && a.contentApp && isAppActive(a.name),
    ),
  );

  const innerApps = computed<AppEntry[]>(() => {
    return appStore.value.apps.filter(
      (a) => a.inner && a.contentApp && isAppActive(a.name),
    );
  });

  // popup app
  const popupApps = computed<AppEntry[]>(() => {
    return appStore.value.apps.filter((a) => a.popupApp && isAppActive(a.name));
  });

  const settingApps = computed(() => {
    return appStore.value.apps.filter((a) => a.settingApp);
  });

  const updateNotEffect = (name: string, notEffect: boolean) => {
    if (notEffect) {
      if (!appStore.value.notEffects.includes(name)) {
        appStore.value.notEffects.push(name);
      }
    } else {
      appStore.value.notEffects = appStore.value.notEffects.filter(
        (n) => n !== name,
      );
    }
    save();
  };

  sync();

  return {
    sync,
    save,
    isAppActive,
    apps,
    innerApps,
    popupApps,
    settingApps,
    updateNotEffect,
  };
};
