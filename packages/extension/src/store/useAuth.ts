import { computed, onUnmounted, ref, toRaw } from 'vue';
import { storage } from '@utils/chrome';

const STORE_KEY = 'userStore';

export interface UserStore {
  isLogin: boolean;
  lastLoginTime?: string;
  user?: {
    email: string;
    avatar: string;
    name: string;
    description?: string;
    vip: number;
  };
}

const defaultStore = (): UserStore => {
  return {
    isLogin: false,
  };
};

const userStore = ref<UserStore>(defaultStore());

export const useAuth = () => {
  const { get, set } = storage;

  const save = () => {
    set(STORE_KEY, JSON.stringify(toRaw(userStore.value)));
  };

  const sync = async () => {
    let store: UserStore = defaultStore();
    const _store = await get<UserStore>(STORE_KEY);
    if (_store && JSON.stringify(_store) !== '{}') {
      store = _store as UserStore;
    }
    userStore.value = store;
  };

  const isLogin = computed(() => userStore.value.isLogin);

  const user = computed(() => userStore.value.user);

  const vip = computed(() => {
    const { user } = userStore.value;
    if (user?.vip) {
      switch (user.vip) {
        case 1:
          return {
            name: '月卡会员',
            value: 1,
          };
        case 2:
          return {
            name: '季卡会员',
            value: 2,
          };
        case 3:
          return {
            name: '年卡会员',
            value: 3,
          };
        case 4:
          return {
            name: '周体验卡',
            value: 4,
          };
        case 99:
          return {
            name: '永久会员',
            value: 99,
          };
      }
    }
    return null;
  });

  const setUser = (user: UserStore['user']) => {
    userStore.value.user = user;
    userStore.value.isLogin = true;
    userStore.value.lastLoginTime = new Date().getTime().toString();
    save();
  };

  const clearAuth = () => {
    userStore.value = JSON.parse(JSON.stringify(defaultStore()));
    save();
  };

  const syncStore = async (changes: any) => {
    if (changes[STORE_KEY]) {
      sync();
    }
  };

  chrome.storage.onChanged.addListener(syncStore);
  sync();

  onUnmounted(() => {
    chrome.storage.onChanged.removeListener(syncStore);
  });

  return {
    isLogin,
    user,
    vip,
    save,
    setUser,
    clearAuth,
  };
};
