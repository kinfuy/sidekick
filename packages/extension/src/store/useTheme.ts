import { computed, onMounted, onUnmounted, ref, toRaw } from 'vue';
import { storage } from '@utils/chrome';
import { useApp } from './useApp';

export interface ThemeStore {
  mode: 'light' | 'dark';
  direction: 'left' | 'right';
  pos: { y: number };
  bubble: boolean;
}

const STORE_KEY = 'AppTheme';

const defaultStore: ThemeStore = {
  mode: 'light',
  direction: 'right',
  pos: { y: 100 },
  bubble: true,
};

const themeStore = ref<ThemeStore>(JSON.parse(JSON.stringify(defaultStore)));

export const useTheme = () => {
  const { get, set } = storage;

  const sync = async () => {
    let store: ThemeStore = JSON.parse(JSON.stringify(defaultStore));
    const _store = await get<ThemeStore>(STORE_KEY);
    if (_store && JSON.stringify(_store) !== '{}') {
      store = _store as ThemeStore;
    }
    themeStore.value.direction = store.direction || 'left';
    themeStore.value.mode = store.mode || 'light';
    themeStore.value.pos = store.pos || { y: 0 };
  };

  const theme = computed(() => themeStore.value.mode);

  const direction = computed(() => themeStore.value.direction);

  const windowHeight = ref(document.documentElement.clientHeight);

  const setHeight = () => {
    windowHeight.value = document.documentElement.clientHeight;
  };

  onMounted(() => {
    window.addEventListener('resize', setHeight);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', setHeight);
  });

  const posY = computed(() => {
    return windowHeight.value < themeStore.value.pos.y
      ? windowHeight.value - 180
      : themeStore.value.pos.y;
  });

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

  const clearTheme = () => {
    themeStore.value = JSON.parse(JSON.stringify(defaultStore));
    save();
  };

  const { contentApps } = useApp();

  const bubble = computed(() => {
    if (contentApps.value.length === 0) return false;
    return themeStore.value.bubble;
  });

  const setBubble = (val: boolean) => {
    themeStore.value.bubble = val;
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
    clearTheme,
    bubble,
    setBubble,
  };
};
