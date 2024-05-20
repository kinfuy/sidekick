import { storage } from '@utils';
import { computed, ref, toRaw } from 'vue';
import { webList } from './defaultUser';
import { defaultMatchRule } from './config';
export interface MatchRule {
  cssSeletor: string[];
  placeholder: string[];
  xpath: string[];
}

export interface WebEnv {
  name: string;
  alias?: string;
  url: string;
}

export interface WebUser {
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
}

const STORE_KEY = 'devAccountStore';
const store = ref<DevAccountStoreInstance>({
  webs: webList,
});

const matchWeb = ref<WebInfo>();

export const useDevAccountStore = () => {
  const { get, set } = storage;

  const save = () => {
    set(STORE_KEY, JSON.stringify(toRaw(store.value)));
  };

  const sync = async () => {
    let _store: DevAccountStoreInstance = {
      webs: webList,
    };
    const devAccount = await get<DevAccountStoreInstance>(STORE_KEY);
    if (devAccount && JSON.stringify(devAccount) !== '{}') {
      _store = devAccount;
    }
    store.value = _store;
  };

  sync();

  const addOrUpdateWeb = (name: string, web: Partial<WebInfo>) => {
    const index = store.value.webs.findIndex((w) => w.name === name);
    if (index > -1) {
      store.value.webs[index] = { ...store.value.webs[index], ...web };
    } else {
      store.value.webs.push({
        ...web,
        isActive: web.isActive ?? true,
        autoLogin: web.autoLogin ?? true,
        code: web.code ?? 'code',
        match: web.match ?? defaultMatchRule,
        envs: web.envs ?? [],
        users: web.users ?? [],
        name,
      });
    }
    save();
  };

  const removeWeb = (name: string) => {
    store.value.webs = store.value.webs.filter((w) => w.name !== name);
    save();
  };

  const removeUser = (webName: string, name: string) => {
    store.value.webs
      .find((w) => w.name === webName)
      ?.users?.filter((u) => u.name !== name);
    save();
  };

  const removeEnv = (webName: string, name: string) => {
    store.value.webs
      .find((w) => w.name === webName)
      ?.envs?.filter((u) => u.name !== name);
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

  return {
    webs,
    addOrUpdateWeb,
    matchWeb,
    setMatch,
    getMatch,
    activeWebs,
    removeWeb,
    removeUser,
    removeEnv,
  };
};
