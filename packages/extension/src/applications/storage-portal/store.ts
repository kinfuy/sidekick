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
  const syncLocal = () => {
    localStorage.clear();
    sessionStorage.clear();
    const list = store.value.storage.cookie;
    list.forEach((c: IStorageItem) => {
      document.cookie = `${c.key}=${c.val}`;
    });
    if (store.value.storage.localStorage) {
      store.value.storage.localStorage.forEach((storage: IStorageItem) => {
        window.localStorage.setItem(storage.key, storage.val);
      });
    }
    if (store.value.storage.sessionStorage) {
      store.value.storage.sessionStorage.forEach((storage: IStorageItem) => {
        window.sessionStorage.setItem(storage.key, storage.val);
      });
    }
  };

  const setStore = (data: Partial<IStorage>, sync?: boolean) => {
    store.value.storage = {
      ...store.value.storage,
      ...data,
    };
    if (sync) {
      syncLocal();
    }
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
  };

  return {
    syncLocal,
    setStore,
    setTabs,
    webs,
    currentStorage,
    deleteItem,
    clearAll,
  };
};
