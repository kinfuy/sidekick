import { computed } from 'vue';
import { StorageKit } from '@core/store';
import { appsRaw } from '../applications';
import type { AppEntry } from '@/types/core-app.type';

const defaultActive = [] as string[];
export interface AppStore {
  version: number;
  apps: Array<AppEntry>;
  actives: Array<string>; // 激活的应用
  installed: Array<string>; // 安装的应用
  popupActive: string; // popup app 激活的app 优先展示
}

const defaultStore: AppStore = {
  version: 2,
  apps: appsRaw,
  actives: defaultActive,
  installed: [],
  popupActive: '',
};

// 内置应用 store key
const innerStoreKeys = ['AppStore', 'AppAuth', 'AppTheme', 'AppNotice'];

const STORE_KEY = 'AppStore';
export const useApp = () => {
  const storageKit = StorageKit.getInstance<AppStore>(STORE_KEY, defaultStore);

  const inited = computed(() => {
    return storageKit.inited;
  });

  // app 是否安装
  const isAppInstall = (name: string) => {
    const app = storageKit.store.apps.find((a) => a.name === name);
    if (!app) return false;
    if (app.inner) return true;
    return storageKit.store.installed?.includes(name);
  };

  // app 是否激活
  const isAppActive = (name: string) => {
    const app = storageKit.store.apps.find((a) => a.name === name);
    if (!app) return false;
    if (app.inner) return true;
    if (!isAppInstall(name)) return false;
    return storageKit.store.actives?.includes(name);
  };

  // 内置app 不可删除
  const innerApps = computed<AppEntry[]>(() => {
    return storageKit.store.apps.filter((a) => a.inner);
  });

  // inject 侧边内置app
  const contentInnerApps = computed<AppEntry[]>(() => {
    return innerApps.value.filter((a) => a.contentApp);
  });

  // content app
  const contentApps = computed<AppEntry[]>(() => {
    const apps = storageKit.store.apps.filter(
      (a) => !a.inner && a.contentApp && isAppActive(a.name),
    );
    return apps || [];
  });

  // popup app
  const popupApps = computed<AppEntry[]>(() => {
    const apps =
      storageKit.store.apps.filter((a) => a.popupApp && isAppActive(a.name)) ||
      [];
    console.log('popupApps', storageKit.store);
    if (!storageKit.store.popupActive) return apps;
    const avtiveApp = apps.find((a) => a.name === storageKit.store.popupActive);
    const notActiveApp = apps.filter(
      (a) => a.name !== storageKit.store.popupActive,
    );
    if (avtiveApp) return [avtiveApp, ...notActiveApp];
    return apps;
  });

  // setting app
  const settingApps = computed(() => {
    return storageKit?.store?.apps.filter((a) => a.settingApp) || [];
  });

  // 安装的app
  const installApps = computed(() => {
    return (
      storageKit.store.apps.filter((a) => isAppInstall(a.name) || a.inner) || []
    );
  });

  // 安装的需要设置的app
  const installWithSettingApps = computed(() => {
    return (
      settingApps.value.filter((a) => isAppInstall(a.name) && !a.inner) || []
    );
  });

  // 所有可超安装的app
  const allCustomApps = computed(() => {
    return storageKit.store.apps.filter((a) => !a.inner) || [];
  });

  const settingInnerApps = computed(() => {
    return settingApps.value.filter((a) => a.inner);
  });

  const apps = computed(() => {
    return storageKit?.store?.apps || [];
  });

  // 更新应用激活
  const updateAppState = (name: string, isActive: boolean) => {
    if (!isAppInstall(name)) return false;
    if (!storageKit.storeRaw.value.actives)
      storageKit.storeRaw.value.actives = []; // 老数据兼容
    if (isActive) {
      if (!storageKit.storeRaw.value.actives.includes(name)) {
        storageKit.storeRaw.value?.actives.push(name);
      }
    } else {
      storageKit.storeRaw.value.actives =
        storageKit.storeRaw.value.actives.filter((n) => n !== name);
    }
    storageKit.save();
  };

  const sortApps = (list: string[]) => {
    const apps = list.map((name) => {
      return storageKit.storeRaw.value.apps.find(
        (app) => app.name === name,
      ) as AppEntry;
    });
    storageKit.storeRaw.value.apps = storageKit.storeRaw.value.apps
      .filter((app) => !list.includes(app.name))
      .concat(apps);
    storageKit.save();
  };

  const installApp = (name: string, switchStatus?: boolean) => {
    if (!isAppInstall(name)) {
      storageKit.storeRaw.value.installed?.push(name);
      storageKit.storeRaw.value.actives?.push(name);
    } else if (switchStatus) {
      storageKit.storeRaw.value.installed =
        storageKit.storeRaw.value.installed?.filter((n) => n !== name);
      storageKit.storeRaw.value.actives =
        storageKit.storeRaw.value.actives?.filter((n) => n !== name);
    }
    storageKit.save();
  };

  const syncStore = async () => {
    await storageKit.sync();
  };

  const storeKeys = computed(() => {
    return [
      {
        name: '核心',
        value: innerStoreKeys,
      },
      ...allCustomApps.value.map((a) => {
        return {
          name: a.title,
          value: a.name,
        };
      }),
    ];
  });

  const reset = () => {
    storageKit.clear();
  };

  const clearStorage = async (name: string) => {
    return StorageKit.clearStorage(name);
  };

  const getStorageSize = (key: string) => {
    return StorageKit.getStorageSize(key);
  };

  const setPopupActive = (name?: string) => {
    storageKit.storeRaw.value.popupActive = name || '';
    storageKit.save();
  };

  return {
    isAppActive,
    isAppInstall,
    installApp,
    apps,
    installApps,
    installWithSettingApps,
    sortApps,
    settingInnerApps,
    contentApps,
    contentInnerApps,
    popupApps,
    settingApps,
    updateAppState,
    allCustomApps,
    inited,
    syncStore,
    storeKeys,
    reset,
    clearStorage,
    getStorageSize,
    setPopupActive,
  };
};
