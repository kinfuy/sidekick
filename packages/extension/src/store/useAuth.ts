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
    save,
    setUser,
    clearAuth,
  };
};
