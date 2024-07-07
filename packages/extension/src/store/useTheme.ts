import { computed, onMounted, onUnmounted, ref } from 'vue';
import { StorageKit } from '@core/store';
import { useApp } from './useApp';

export interface ThemeStore {
  mode: 'light' | 'dark';
  direction: 'left' | 'right';
  pos: { y: number };
  bubble: boolean;
}

const STORE_KEY = 'AppTheme';

const defaultStore = (): ThemeStore => ({
  mode: 'light',
  direction: 'right',
  pos: { y: 100 },
  bubble: true,
});

export const useTheme = () => {
  const storageKit = StorageKit.getInstance<ThemeStore>(
    STORE_KEY,
    defaultStore(),
  );

  const { contentApps } = useApp();

  const theme = computed(() => storageKit.store.mode);

  const direction = computed(() => storageKit.store.direction);

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
    return windowHeight.value < storageKit.store.pos.y
      ? windowHeight.value - 180
      : storageKit.store.pos.y;
  });

  const setDirection = (val: 'left' | 'right') => {
    storageKit.storeRaw.value.direction = val;
    storageKit.save();
  };

  const setTheme = (val: 'light' | 'dark') => {
    storageKit.storeRaw.value.mode = val;
    storageKit.save();
  };

  const setPosY = (val: number) => {
    storageKit.storeRaw.value.pos.y = val;
    storageKit.save();
  };

  const clearTheme = () => {
    storageKit.storeRaw.value = JSON.parse(JSON.stringify(defaultStore));
    storageKit.save();
  };

  const bubble = computed(() => {
    if (contentApps.value.length === 0) return false;
    return storageKit.store.bubble;
  });

  const setBubble = (val: boolean) => {
    storageKit.storeRaw.value.bubble = val;
    storageKit.save();
  };

  return {
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
