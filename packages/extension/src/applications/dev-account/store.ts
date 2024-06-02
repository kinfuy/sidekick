import { storage, uuid } from '@utils';
import { computed, ref, toRaw } from 'vue';
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

export interface DevAccountStoreInstance {
  webs: WebInfo[];
  version: string;
}

const STORE_KEY = 'devAccountStore';
const store = ref<DevAccountStoreInstance>({
  webs: [],
  version: '1.0.0',
});

const matchWeb = ref<WebInfo>();

export const useDevAccountStore = () => {
  const { get, set } = storage;

  const save = () => {
    set(STORE_KEY, JSON.stringify(toRaw(store.value)));
  };

  const sync = async () => {
    let _store: DevAccountStoreInstance = {
      webs: [],
      version: '1.0.0',
    };
    const devAccount = await get<DevAccountStoreInstance>(STORE_KEY);
    if (devAccount && JSON.stringify(devAccount) !== '{}') {
      _store = devAccount;
    }
    store.value = _store;
  };

  sync();

  const addOrUpdateWeb = (rawWeb: Partial<WebInfo>) => {
    const web = JSON.parse(JSON.stringify(rawWeb)) as WebInfo;
    if (web.id) {
      const index = store.value.webs.findIndex((w) => w.id === rawWeb.id);
      if (index > -1) {
        store.value.webs[index] = { ...store.value.webs[index], ...web };
      }
    } else {
      store.value.webs.push({
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
    save();
  };

  const removeWeb = (id: string) => {
    store.value.webs = store.value.webs.filter((w) => w.id !== id);
    save();
  };

  const removeUser = (webId: string, userId: string) => {
    store.value.webs
      .find((w) => w.id === webId)
      ?.users?.filter((u) => u.id !== userId);
    save();
  };

  const removeEnv = (webId: string, useId: string) => {
    store.value.webs
      .find((w) => w.id === webId)
      ?.envs?.filter((u) => u.id !== useId);
    save();
  };

  const activeWebs = computed(() => {
    return store.value.webs.filter((w) => w.isActive);
  });

  const webs = computed(() => {
    return store.value.webs;
  });

  const setMatch = (web?: string) => {
    if (!web) {
      matchWeb.value = undefined;
      return;
    }
    matchWeb.value = store.value.webs.find((w) => w.name === web);
  };

  const getMatch = (url: string) => {
    return store.value.webs.find((web) => {
      if (web.envs?.some((u) => url.includes(u.url))) return true;
      return false;
    });
  };

  const exportConfig = () => {
    return store.value;
  };

  const importConfig = (
    config: DevAccountStoreInstance,
    type: 'update' | 'replace',
  ) => {
    if (type === 'replace') {
      store.value = config;
    }
    if (type === 'update') {
      const webs = [] as WebInfo[];
      store.value.webs.forEach((w) => {
        const web = config.webs.find((x) => x.id === w.id);
        if (web) {
          webs.push({ ...w, ...web });
        } else {
          webs.push(w);
        }
      });
      store.value.version = config.version;
      store.value.webs = webs;
    }
    save();
  };

  const version = computed(() => {
    return store.value.version;
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
