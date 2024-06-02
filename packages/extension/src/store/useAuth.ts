import { computed, onUnmounted, ref, toRaw } from 'vue';
import { storage } from '@utils/chrome';
import { refreshTokenApi } from '@/apis/user';

const STORE_KEY = 'userStore';

export interface Subscription {
  type: number;
  form: number;
  startTime: string;
  lastTime: string;
  endTime: string;
  isEffective: boolean;
}

export interface UserInfo {
  accessToken: string;
  refreshToken: string;
  email: string;
  avatar: string;
  name: string;
  description?: string;
  subscription?: Subscription;
}

export interface UserStore {
  isLogin: boolean;
  lastLoginTime?: Date;
  user?: UserInfo;
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

  const isLogin = computed(() => userStore.value.isLogin);

  const sync = async () => {
    let store: UserStore = defaultStore();
    const _store = await get<UserStore>(STORE_KEY);
    if (_store && JSON.stringify(_store) !== '{}') {
      store = _store as UserStore;
    }
    userStore.value = store;
  };

  const user = computed(() => userStore.value.user);

  const subscription = computed(() => {
    const { user } = userStore.value;
    if (user?.subscription) {
      switch (user.subscription.type) {
        case 1:
          return {
            ...user?.subscription,
            name: '月卡会员',
          };
        case 2:
          return {
            ...user?.subscription,
            name: '季卡会员',
          };
        case 3:
          return {
            ...user?.subscription,
            name: '年卡会员',
          };
        case 4:
          return {
            ...user?.subscription,
            name: '周体验卡',
          };
        case 99:
          return {
            ...user?.subscription,
            name: '永久会员',
          };
      }
    }
    return null;
  });

  const accessToken = computed(() => {
    const { user } = userStore.value;
    if (user) return user.accessToken;
    return null;
  });

  const refreshToken = computed(() => {
    const { user } = userStore.value;
    if (user) return user.refreshToken;
    return null;
  });

  const setUser = (user: UserInfo) => {
    userStore.value.user = user;
    userStore.value.isLogin = true;
    userStore.value.lastLoginTime = new Date();
    save();
  };

  const setSubscription = (subscription: Subscription) => {
    userStore.value.user!.subscription = subscription;
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

  const getRefreshToken = async () => {
    if (isLogin.value) {
      const res = await refreshTokenApi<{
        refreshToken: string;
        accessToken: string;
      }>({
        refreshToken: userStore.value.user!.refreshToken,
        accessToken: userStore.value.user!.accessToken,
      });
      if (res) {
        userStore.value.user!.accessToken = res.accessToken;
        userStore.value.user!.refreshToken = res.refreshToken;
        save();
      } else {
        clearAuth();
      }
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
    subscription,
    accessToken,
    refreshToken,
    save,
    setUser,
    clearAuth,
    setSubscription,
    getRefreshToken,
  };
};
