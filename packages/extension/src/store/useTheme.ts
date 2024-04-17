import { computed, ref, toRaw } from 'vue';
import { storage } from '@utils/chrome';

export interface ThemeStore {
  mode: 'light' | 'dark';
  direction: 'left' | 'right';
  pos: { y: number };
}

const STORE_KEY = 'themeStore';

const themeStore = ref<ThemeStore>({
  mode: 'light',
  direction: 'left',
  pos: { y: 0 },
});

export const useTheme = () => {
  const { get, set } = storage;

  const sync = async () => {
    let store: ThemeStore = {
      mode: 'light',
      direction: 'left',
      pos: { y: 0 },
    };
    const _store = await get<ThemeStore>(STORE_KEY);
    if (_store && JSON.stringify(_store) !== '{}') {
      store = _store as ThemeStore;
    }
    themeStore.value.direction = store.direction || 'left';
    themeStore.value.mode = store.mode || 'light';
    themeStore.value.pos = store.pos || { y: 0 };
    console.log('themeStore', themeStore.value.pos);
  };

  const theme = computed(() => themeStore.value.mode);

  const direction = computed(() => themeStore.value.direction);

  const posY = computed(() => themeStore.value.pos?.y);

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

  const setPosY = (val: number) => {
    themeStore.value.pos.y = val;
    save();
  };

  sync();
  return {
    sync,
    posY,
    theme,
    direction,
    setTheme,
    setDirection,
    setPosY,
  };
};
