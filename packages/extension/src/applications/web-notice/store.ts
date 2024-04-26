import { storage } from '@utils';
import { computed, ref, toRaw } from 'vue';
const defaultStore: WebNoticeStoreInstance = {
  whiteList: [],
  current: undefined,
  viewType: 'border',
};

interface Web {
  url: string;
  tips: string;
  active: boolean;
  style: {
    color: string;
    animation: boolean;
    size: number;
  };
}

export interface WebNoticeStoreInstance {
  whiteList: Web[];
  current?: Web;
  viewType: 'border' | 'waterMask';
}

const store = ref<WebNoticeStoreInstance>(defaultStore);
const STORE_KEY = 'webNoticeStore';

export const useWebNoticeStore = () => {
  const { get, set } = storage;
  const whiteList = computed(() => {
    return store.value.whiteList;
  });

  const viewType = computed(() => {
    return store.value.viewType;
  });

  const current = computed(() => {
    return store.value.current;
  });

  const save = () => {
    set(STORE_KEY, JSON.stringify(toRaw(store.value)));
  };

  const sync = async () => {
    let _store: WebNoticeStoreInstance = defaultStore;
    const webNotice = await get<WebNoticeStoreInstance>('webNotice');
    if (webNotice && JSON.stringify(webNotice) !== '{}') {
      _store = webNotice;
    }
    if (!_store?.whiteList) {
      _store = defaultStore;
    }

    store.value = _store;
  };

  sync();

  const setCurrent = async (url: string) => {
    await sync();
    store.value.current = store.value.whiteList.find((web) => {
      if (url.includes(web.url) && web.active) return true;
      return false;
    });
    save();
    if (store.value.current) {
      return true;
    }
    return false;
  };

  const serViewType = (val: 'border' | 'waterMask') => {
    store.value.viewType = val;
  };

  const addWeb = (web: Web) => {
    if (store.value.whiteList.some((x) => x.url === web.url)) {
      store.value.whiteList.forEach((w) => {
        if (w.url === web.url) {
          w.active = web.active;
          w.tips = web.tips;
          w.style = web.style;
        }
      });
    } else {
      store.value.whiteList.push({ ...web });
    }

    store.value.current = { ...web };
    save();
  };

  return {
    whiteList,
    current,
    save,
    setCurrent,
    viewType,
    serViewType,
    addWeb,
  };
};
