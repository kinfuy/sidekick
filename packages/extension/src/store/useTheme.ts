import { computed, ref, toRaw } from 'vue';
import { storage } from '@utils/chrome';

export interface ThemeStore {
  mode: 'light' | 'dark';
  direction: 'left' | 'right';
}

const STORE_KEY = 'themeStore';

const themeStore = ref<ThemeStore>({
  mode: 'light',
  direction: 'left',
});

export const useTheme = () => {
  const { get, set } = storage;

  const sync = async () => {
    let store: ThemeStore = {
      mode: 'light',
      direction: 'left',
    };
    const _store = await get<ThemeStore>(STORE_KEY);
    if (_store && JSON.stringify(_store) !== '{}') {
      store = _store as ThemeStore;
    }
    themeStore.value = store;
  };

  const theme = computed(() => themeStore.value.mode || 'light');

  const direction = computed(() => themeStore.value.direction || 'left');

  const save = () => {
    set(STORE_KEY, JSON.stringify(toRaw(themeStore.value)));
  };

  const setDirection = (val: 'left' | 'right') => {
    themeStore.value.direction = val;
    save();
  };

  const setTheme = (val: 'light' | 'dark') => {
    themeStore.value.mode = val;
    save();
  };

  sync();
  return {
    sync,
    theme,
    direction,
    setTheme,
    setDirection,
  };
};
