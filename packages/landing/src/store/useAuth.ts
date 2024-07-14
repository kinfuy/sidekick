import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

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

export const useAuth = defineStore('auth', () => {
  const store = ref<UserInfo>({
    accessToken: '',
    refreshToken: '',
    email: '',
    avatar: '',
    name: '',
  });
  const clearAuth = () => {
    store.value.accessToken = '';
  };

  const setUser = (user: Partial<UserInfo>) => {
    store.value = {
      ...store.value,
      ...user,
    };
  };

  const accessToken = computed(() => store.value.accessToken);
  return {
    store,
    accessToken,
    clearAuth,
    setUser,
  };
});
