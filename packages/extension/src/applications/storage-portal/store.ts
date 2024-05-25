import { clearAllCookie } from '@utils';
import { computed, ref } from 'vue';
export interface IStorageItem {
  key: string;
  val: any;
}

export interface IStorage {
  cookie: IStorageItem[];
  localStorage: IStorageItem[];
  sessionStorage: IStorageItem[];
}

export interface StoragePortalStoreInstance {
  openWebSites: Array<{ title: string; url: string }>;
  storage: IStorage;
}

const store = ref<StoragePortalStoreInstance>({
  openWebSites: [],
  storage: {
    cookie: [],
    localStorage: [],
    sessionStorage: [],
  },
} as StoragePortalStoreInstance);

export const useStoragePortalStore = () => {
  // const { get, set } = storage;

  const clear = () => {};

  const setStore = (data: Partial<IStorage>) => {
    store.value.storage = {
      ...store.value.storage,
      ...data,
    };
  };

  const setTabs = (data: Array<{ title: string; url: string }>) => {
    store.value.openWebSites = data;
  };

  const currentStorage = computed(() => store.value.storage);

  const webs = computed(() => store.value.openWebSites);

  const deleteItem = (
    key: string,
    type: 'cookie' | 'localStorage' | 'sessionStorage',
  ) => {
    store.value.storage[type] = store.value.storage[type].filter(
      (i) => i.key !== key,
    );
    if (type === 'localStorage') {
      window.localStorage.removeItem(key);
    }
    if (type === 'sessionStorage') {
      window.sessionStorage.removeItem(key);
    }
    if (type === 'cookie') {
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    }
  };

  const clearAll = () => {
    store.value.storage = {
      cookie: [],
      localStorage: [],
      sessionStorage: [],
    };
    window.localStorage.clear();
    window.sessionStorage.clear();
    clearAllCookie();
  };

  return {
    clear,
    setStore,
    setTabs,
    webs,
    currentStorage,
    deleteItem,
    clearAll,
  };
};
