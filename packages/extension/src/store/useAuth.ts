import { computed, ref, toRaw } from 'vue';
import { storage } from '@utils/chrome';

const STORE_KEY = 'userStore';

export interface UserStore {
  isLogin: boolean;
  lastLoginTime?: number;
  user?: {
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

  sync();

  return {
    isLogin,
    user,
    save,
  };
};
