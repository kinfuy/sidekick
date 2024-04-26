import { ref, toRaw } from 'vue';
import { storage } from '@utils/chrome';

const defaultStore: NoticeStore = {
  whiteList: [],
  current: undefined,
};

interface Web {
  url: string;
  tips: string;
  active: boolean;
  config: { color: string; animation: boolean; size: number };
}

export interface NoticeStore {
  whiteList: Web[];
  current?: Web;
}

const STORE_KEY = 'noticeStore';

const noticeStore = ref<NoticeStore>(defaultStore);

export const useWebNoticeStore = () => {
  const { get, set } = storage;

  const save = () => {
    set(STORE_KEY, JSON.stringify(toRaw(noticeStore.value)));
  };

  const sync = async () => {
    let store: NoticeStore = { whiteList: [], current: undefined };
    const _store = await get<NoticeStore>(STORE_KEY);
    if (_store && JSON.stringify(_store) !== '{}') {
      store = _store as NoticeStore;
    }
    noticeStore.value = store;
  };

  sync();

  return {
    save,
  };
};
