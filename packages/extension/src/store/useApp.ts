import { computed, ref, toRaw } from 'vue';
import { storage } from '@utils/chrome';
import { appsRaw } from '../applications';
import type { AppEntry } from '@/types/core-app.type';

export interface AppStore {
  version: number;
  apps: Array<AppEntry>;
  notEffects: Array<string>;
}

const currentVersion = 1;

const defaultStore: AppStore = {
  version: 1,
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
    if (store.version === currentVersion) {
      appStore.value = store;
    } else {
      appStore.value = defaultStore;
    }
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

  const sortApps = (list: string[]) => {
    const apps = list.map((name) => {
      return appStore.value.apps.find((app) => app.name === name) as AppEntry;
    });
    appStore.value.apps = appStore.value.apps
      .filter((app) => !list.includes(app.name))
      .concat(apps);
    save();
  };

  sync();

  return {
    sync,
    save,
    isAppActive,
    sortApps,
    apps,
    innerApps,
    popupApps,
    settingApps,
    updateNotEffect,
  };
};
