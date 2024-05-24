import { storage } from '@utils';
import { computed, ref, toRaw } from 'vue';

const STORE_KEY = 'storagePortalStore';

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
  openWebSites: Array<{ label: string; value: string }>;
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
  const { get, set } = storage;

  const save = () => {
    set(STORE_KEY, JSON.stringify(toRaw(store.value)));
  };

  const sync = async () => {
    let _store: StoragePortalStoreInstance = {
      openWebSites: [],
      storage: {
        cookie: [],
        localStorage: [],
        sessionStorage: [],
      },
    };
    const storagePortal = await get<StoragePortalStoreInstance>(STORE_KEY);
    if (storagePortal && JSON.stringify(storagePortal) !== '{}') {
      _store = storagePortal;
    }
    store.value = _store;
  };

  sync();

  const clear = () => {};

  const setStore = (data: Partial<IStorage>) => {
    store.value.storage = {
      ...store.value.storage,
      ...data,
    };
    save();
  };

  const setTabs = (data: Array<{ label: string; value: string }>) => {
    store.value.openWebSites = data;
    save();
  };

  const currentStorage = computed(() => store.value.storage);

  const webs = computed(() => store.value.openWebSites);
  return {
    clear,
    setStore,
    setTabs,
    webs,
    currentStorage,
  };
};
