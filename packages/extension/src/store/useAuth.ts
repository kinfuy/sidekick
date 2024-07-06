import { computed } from 'vue';
import { StorageKit } from '@core/store';
import { refreshTokenApi } from '@/apis/user';

const STORE_KEY = 'AppAuth';

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
  return { isLogin: false };
};

export const useAuth = () => {
  const storageKit = StorageKit.getInstance<UserStore>(
    STORE_KEY,
    defaultStore(),
  );

  const isLogin = computed(() => storageKit.store.isLogin);

  const user = computed(() => {
    return storageKit.store.user;
  });

  const subscription = computed(() => {
    const { user } = storageKit.store;
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
    const { user } = storageKit.store;
    if (user) return user.accessToken;
    return null;
  });

  const refreshToken = computed(() => {
    const { user } = storageKit.store;
    if (user) return user.refreshToken;
    return null;
  });

  const setUser = (user: UserInfo) => {
    storageKit.storeRaw.value = {
      user,
      isLogin: true,
      lastLoginTime: new Date(),
    };
    storageKit.save();
  };

  const setSubscription = (subscription: Subscription) => {
    storageKit.storeRaw.value.user!.subscription = subscription;
    storageKit.save();
  };

  const clearAuth = () => {
    storageKit.clear();
  };

  const getRefreshToken = async () => {
    if (isLogin.value) {
      const res = await refreshTokenApi<{
        refreshToken: string;
        accessToken: string;
      }>({
        refreshToken: storageKit.store.user!.refreshToken,
        accessToken: storageKit.store.user!.accessToken,
      });
      if (res) {
        storageKit.storeRaw.value.user!.accessToken = res.accessToken;
        storageKit.storeRaw.value.user!.refreshToken = res.refreshToken;
        storageKit.save();
      } else {
        clearAuth();
      }
    }
  };

  return {
    isLogin,
    user,
    subscription,
    accessToken,
    refreshToken,
    setUser,
    clearAuth,
    setSubscription,
    getRefreshToken,
  };
};
