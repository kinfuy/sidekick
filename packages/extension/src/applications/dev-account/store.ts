import { uuid } from '@utils';
import { computed, ref } from 'vue';
import { StorageKit } from '@core/store';
import { defaultMatchRule } from './config';
export interface MatchRule {
  cssSeletor: string[];
  placeholder: string[];
  xpath: string[];
}

export interface WebEnv {
  id: string;
  name: string;
  alias?: string;
  url: string;
}

export interface WebUser {
  id: string;
  name: string;
  password: string;
  isDefault?: boolean;
  role?: string;
  remark?: string;
}

export interface LoginMatchRule {
  account: MatchRule;
  password: MatchRule;
  loginBtn: MatchRule;
  validate: MatchRule;
}
export interface WebInfo {
  id: string;
  name: string;
  autoLogin: boolean;
  code: string;
  match: LoginMatchRule;
  envs: WebEnv[];
  users: WebUser[];
  isActive: boolean;
}

export interface DevAccountStore {
  webs: WebInfo[];
  version: string;
}

const STORE_KEY = 'DevAccount';

const matchWeb = ref<WebInfo>();
const defaultStore: DevAccountStore = {
  webs: [],
  version: '1.0.0',
};

export const useDevAccountStore = () => {
  const storageKit = StorageKit.getInstance<DevAccountStore>(
    STORE_KEY,
    defaultStore,
  );

  const addOrUpdateWeb = (rawWeb: Partial<WebInfo>) => {
    const web = JSON.parse(JSON.stringify(rawWeb)) as WebInfo;
    if (web.id) {
      const index = storageKit.store.webs.findIndex((w) => w.id === rawWeb.id);
      if (index > -1) {
        storageKit.storeRaw.value.webs[index] = {
          ...storageKit.store.webs[index],
          ...web,
        };
      }
    } else {
      storageKit.storeRaw.value.webs.push({
        id: uuid(),
        name: web.name || '',
        isActive: web.isActive ?? true,
        autoLogin: web.autoLogin ?? true,
        code: web.code ?? 'code',
        match: web.match ?? defaultMatchRule,
        envs: web.envs ?? [],
        users: web.users ?? [],
      });
    }
    storageKit.save();
  };

  const removeWeb = (id: string) => {
    storageKit.storeRaw.value.webs = storageKit.store.webs.filter(
      (w) => w.id !== id,
    );
    storageKit.save();
  };

  const removeUser = (webId: string, userId: string) => {
    storageKit.storeRaw.value.webs
      .find((w) => w.id === webId)
      ?.users?.filter((u) => u.id !== userId);
    storageKit.save();
  };

  const removeEnv = (webId: string, useId: string) => {
    storageKit.storeRaw.value.webs
      .find((w) => w.id === webId)
      ?.envs?.filter((u) => u.id !== useId);
    storageKit.save();
  };

  const activeWebs = computed(() => {
    return storageKit.store.webs.filter((w) => w.isActive);
  });

  const webs = computed(() => {
    return storageKit.store.webs;
  });

  const setMatch = (web?: string) => {
    if (!web) {
      matchWeb.value = undefined;
      return;
    }
    matchWeb.value = storageKit.store.webs.find((w) => w.name === web);
  };

  const getMatch = (url: string) => {
    return storageKit.store.webs.find((web) => {
      if (web.envs?.some((u) => url.includes(u.url))) return true;
      return false;
    });
  };

  const exportConfig = () => {
    return storageKit.store;
  };

  const importConfig = (
    config: DevAccountStore,
    type: 'update' | 'replace',
  ) => {
    if (type === 'replace') {
      storageKit.storeRaw.value = config;
    }
    if (type === 'update') {
      const webs = [] as WebInfo[];
      storageKit.store.webs.forEach((w) => {
        const web = config.webs.find((x) => x.id === w.id);
        if (web) {
          webs.push({ ...w, ...web });
        } else {
          webs.push(w);
        }
      });
      config.webs.forEach((w) => {
        const web = webs.find((x) => x.id === w.id);
        if (!web) {
          webs.push(w);
        }
      });
      storageKit.storeRaw.value.version = config.version;
      storageKit.storeRaw.value.webs = webs;
    }
    storageKit.save();
  };

  const version = computed(() => {
    return storageKit.store.version;
  });

  return {
    version,
    webs,
    addOrUpdateWeb,
    matchWeb,
    setMatch,
    getMatch,
    activeWebs,
    removeWeb,
    removeUser,
    removeEnv,
    exportConfig,
    importConfig,
  };
};
