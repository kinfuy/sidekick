import { StorageKit } from '@core/store';
import { computed } from 'vue';
const defaultStore = (): WebNoticeStoreInstance => ({
  whiteList: [],
  current: undefined,
  viewType: 'border',
});

interface Web {
  url: string;
  tips: string;
  active: boolean;
  style: {
    color: string;
    animation: boolean;
    fontSize: number;
    borderWidth: number;
  };
}

export interface WebNoticeStoreInstance {
  whiteList: Web[];
  current?: Web;
  viewType: 'border' | 'waterMask';
}

const STORE_KEY = 'WebNotice';

export const useWebNoticeStore = () => {
  const storageKit = StorageKit.getInstance<WebNoticeStoreInstance>(
    STORE_KEY,
    defaultStore(),
  );

  const whiteList = computed(() => {
    return storageKit.store.whiteList;
  });

  const viewType = computed(() => {
    return storageKit.store.viewType;
  });

  const current = computed(() => {
    return storageKit.store.current;
  });

  const setCurrent = async (url: string) => {
    await storageKit.sync();
    while (!storageKit.inited) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    storageKit.storeRaw.value.current = storageKit.store.whiteList?.find(
      (web) => {
        if (url.includes(web.url)) return true;
        return false;
      },
    );
    storageKit.save();
    return storageKit.store.current;
  };

  const serViewType = (val: 'border' | 'waterMask') => {
    storageKit.store.viewType = val;
  };

  const updateWeb = (web: Web) => {
    if (storageKit.storeRaw.value?.whiteList?.some((x) => x.url === web.url)) {
      storageKit.storeRaw.value.whiteList.forEach((w) => {
        if (w.url === web.url) {
          w.active = web.active;
          w.tips = web.tips;
          w.style = web.style;
        }
      });
    } else {
      if (!storageKit.storeRaw.value?.whiteList)
        storageKit.storeRaw.value.whiteList = [];
      storageKit.storeRaw.value.whiteList.push({ ...web });
    }

    storageKit.storeRaw.value.current = { ...web };
    storageKit.save();
  };

  const clear = () => {
    storageKit.clear();
  };

  return {
    whiteList,
    current,
    setCurrent,
    viewType,
    clear,
    serViewType,
    updateWeb,
  };
};
