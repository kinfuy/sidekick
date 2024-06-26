import { computed, ref, toRaw } from 'vue';
import { storage } from '@utils/chrome';
import { appsRaw } from '../applications';
import type { AppEntry } from '@/types/core-app.type';

const defaultActive = [] as string[];
export interface AppStore {
  version: number;
  apps: Array<AppEntry>;
  actives?: Array<string>;
  installed?: Array<string>;
}

const currentVersion = 1;

const defaultStore: AppStore = {
  version: 1,
  apps: appsRaw,
  actives: defaultActive,
  installed: ['DevAccount', 'WebNotice'],
};

const appStore = ref<AppStore>(defaultStore);

const STORE_KEY = 'appStore';

export const useApp = () => {
  const { get, set } = storage;

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

  const save = () => {
    set(STORE_KEY, JSON.stringify(toRaw(appStore.value))).finally(() => {
      sync();
    });
  };

  // app 是否安装
  const isAppInstall = (name: string) => {
    const app = appStore.value.apps.find((a) => a.name === name);
    if (!app) return false;
    if (app.inner) return true;
    return appStore.value.installed?.includes(name);
  };

  // app 是否激活
  const isAppActive = (name: string) => {
    const app = appStore.value.apps.find((a) => a.name === name);
    if (!app) return false;
    if (app.inner) return true;
    if (!isAppInstall(name)) return false;
    return appStore.value.actives?.includes(name);
  };

  // 内置app 不可删除
  const innerApps = computed<AppEntry[]>(() => {
    return appStore.value.apps.filter((a) => a.inner);
  });

  // inject 侧边内置app
  const contentInnerApps = computed<AppEntry[]>(() => {
    return innerApps.value.filter((a) => a.contentApp);
  });

  // content app
  const contentApps = computed<AppEntry[]>(() => {
    return appStore.value.apps.filter(
      (a) => !a.inner && a.contentApp && isAppActive(a.name),
    );
  });

  // popup app
  const popupApps = computed<AppEntry[]>(() => {
    return appStore.value.apps.filter((a) => a.popupApp && isAppActive(a.name));
  });

  // setting app
  const settingApps = computed(() => {
    return appStore.value.apps.filter((a) => a.settingApp);
  });

  // 安装的app
  const installApps = computed(() => {
    return settingApps.value.filter((a) => isAppInstall(a.name) && !a.inner);
  });

  const settingInnerApps = computed(() => {
    return settingApps.value.filter((a) => a.inner);
  });

  // 更新应用激活
  const updateAppState = (name: string, isActive: boolean) => {
    if (!isAppInstall(name)) return false;
    if (!appStore.value.actives) appStore.value.actives = []; // 老数据兼容
    if (isActive) {
      if (!appStore.value.actives.includes(name)) {
        appStore.value?.actives.push(name);
      }
    } else {
      appStore.value.actives = appStore.value.actives.filter((n) => n !== name);
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
    isAppInstall,
    installApps,
    sortApps,
    settingInnerApps,
    contentApps,
    contentInnerApps,
    popupApps,
    settingApps,
    updateAppState,
  };
};
