import { computed, ref, toRaw } from 'vue';
import {
  getStoreKey,
  sendMessageToContentScript,
  sendMessageToExtension,
  setStore,
} from '@utils';
import { apps as innerApps } from '../applications';
import type { CoreStoreInstance } from '@/types/core-app.type';

const defaultActiveApps: string[] = [];

const defaultCore = { apps: [] };

const store = ref<CoreStoreInstance>(defaultCore);
export const useCoreStore = (_env?: 'content' | 'background' | 'popup') => {
  const env = _env;
  const apps = computed(() => {
    return store.value.apps;
  });

  const openSetting = computed(() => {
    return store.value.openSetting;
  });

  const getActive = computed(() => {
    return store.value.apps.filter((x) => x.isInstall && x.active);
  });

  const installApps = computed(() => {
    return store.value.apps.filter((x) => x.isInstall);
  });

  const save = () => {
    setStore({ coreStore: toRaw(store.value) });
    const message = { data: { key: 'store-change' } };
    if (env === 'background') {
      sendMessageToContentScript({
        from: 'background',
        code: 'baichuan-core',
        ...message,
      });
    }
    if (env === 'popup') {
      sendMessageToExtension({
        from: 'popup',
        code: 'onCoreStoreChange',
        ...message,
      });
    }
  };

  const sync = async () => {
    let _store: CoreStoreInstance = defaultCore;
    const { coreStore } = await getStoreKey<{ coreStore: CoreStoreInstance }>([
      'coreStore',
    ]);
    let inited = false;
    if (coreStore && JSON.stringify(coreStore) !== '{}') {
      _store = coreStore;
    } else {
      inited = true;
    }
    innerApps.forEach((app) => {
      if (_store.apps.every((a) => a.name !== app.name)) {
        const deaultActive = defaultActiveApps.includes(app.name);
        const popupAction = app.popupAction || 'active';
        _store.apps.push({
          ...app,
          isInstall: deaultActive,
          active: deaultActive,
          popupAction,
        });
      } else {
        _store.apps.forEach((a) => {
          const { ...rest } = app;
          if (a.name === app.name) {
            Object.assign(a, rest);
          }
        });
      }
    });
    store.value = _store;
    if (inited) save();
  };

  const setAppInstall = (name: string, isInstall: boolean) => {
    store.value.apps.forEach((app) => {
      if (app.name === name) app.isInstall = isInstall;
    });
    save();
  };

  const installAll = () => {
    store.value.apps.forEach((app) => {
      app.isInstall = true;
    });
    save();
  };

  /**
   * 设置配置中心默认打开app
   * @param name
   */
  const setCurrentApp = (name: string, params?: any) => {
    store.value.openSetting = {
      currentApp: name,
      params,
    };
    save();
  };

  const isAppActive = (name: string) => {
    return store.value.apps.find((app) => app.name === name)?.active || false;
  };

  const setAppStatus = (name: string, active: boolean) => {
    store.value.apps.forEach((app) => {
      if (app.name === name) app.active = active;
    });
    save();
  };

  const sortApps = (list: string[]) => {
    const newArr = list
      .map((l) => {
        return store.value.apps.find((a) => a.name === l)!;
      })
      .filter(Boolean);
    store.value.apps = newArr;
    console.log(store.value.apps);
    save();
  };

  sync();

  return {
    sync,
    apps,
    openSetting,
    getActive,
    installApps,
    installAll,
    sortApps,
    setAppStatus,
    isAppActive,
    setCurrentApp,
    setAppInstall,
  };
};
