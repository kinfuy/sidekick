import { computed, ref, toRaw } from 'vue';
import { storage } from '@utils/chrome';

export interface ThemeStore {
  mode: 'light' | 'dark';
}

const STORE_KEY = 'themeStore';

const themeStore = ref<ThemeStore>({
  mode: 'light',
});

export const useTheme = () => {
  const { get, set } = storage;

  const sync = async () => {
    let store: ThemeStore = {
      mode: 'light',
    };
    const _store = await get<ThemeStore>(STORE_KEY);
    if (_store && JSON.stringify(_store) !== '{}') {
      store = _store as ThemeStore;
    }
    themeStore.value = store;
  };

  const theme = computed(() => themeStore.value.mode);

  const save = () => {
    set(STORE_KEY, JSON.stringify(toRaw(themeStore.value)));
  };

  const setTheme = (val: 'light' | 'dark') => {
    themeStore.value.mode = val;
    save();
  };

  sync();
  return {
    sync,
    theme,
    setTheme,
  };
};
