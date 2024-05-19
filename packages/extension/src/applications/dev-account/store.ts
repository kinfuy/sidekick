import { storage } from '@utils';
import { computed, ref, toRaw } from 'vue';
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
  webs: [
    {
      name: 'AI 语音',
      autoLogin: true,
      code: '',
      match: defaultMatchRule,
      isActive: true,
      envs: [
        {
          name: 'dev1',
          url: 'https://www.baidu.com',
        },
        {
          name: 'dev2',
          url: 'https://www.baidu.com',
        },
      ],
      users: [
        {
          name: 'admin',
          password: '123456',
          isDefault: true,
          role: 'admin',
        },
        {
          name: 'user',
          password: '123456',
          role: 'user',
        },
      ],
    },
  ],
});

const matchWeb = ref<WebInfo>();

export const useDevAccountStore = () => {
  const { get, set } = storage;

  const save = () => {
    set(STORE_KEY, JSON.stringify(toRaw(store.value)));
  };

  const sync = async () => {
    // let _store: DevAccountStoreInstance = {
    //   webs: [],
    // };
    // const devAccount = await get<DevAccountStoreInstance>(STORE_KEY);
    // if (devAccount && JSON.stringify(devAccount) !== '{}') {
    //   _store = devAccount;
    // }
    // store.value = _store;
  };

  sync();

  const addOrUpdateWeb = (web: WebInfo) => {
    const index = store.value.webs.findIndex((w) => w.name === web.name);
    if (index > -1) {
      store.value.webs[index] = web;
    } else {
      store.value.webs.push(web);
    }
    save();
  };

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

  return {
    webs,
    addOrUpdateWeb,
    matchWeb,
    setMatch,
  };
};
