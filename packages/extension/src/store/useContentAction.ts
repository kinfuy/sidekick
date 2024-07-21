import { computed } from 'vue';
import { StorageKit } from '../core/store';

const defaultStore = (): ActionStore => {
  return {
    actions: [],
  };
};

export interface ContentActionDetail {
  code: string;
  title: string;
  key: string;
  icon?: string;
  description?: string;
  data?: any;
}

export interface ContentAction {
  url: string;
  plugins: ContentActionDetail[];
}

export interface ActionStore {
  actions: ContentAction[];
}

const STORE_KEY = 'AppContentAction';

export const useContentAction = () => {
  const storageKit = StorageKit.getInstance<ActionStore>(
    STORE_KEY,
    defaultStore(),
  );

  const get = async (url: string): Promise<ContentActionDetail[]> => {
    while (!storageKit.inited) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    return storageKit.store.actions?.find((n) => n.url === url)?.plugins || [];
  };

  const add = async (url: string, action: ContentActionDetail) => {
    const isExist = storageKit.store.actions?.find(
      (n) => n.url === url && n.plugins.find((x) => x.key === action.key),
    );
    const plugins = storageKit.store.actions?.find((n) => n.url === url);
    if (!isExist) {
      storageKit.storeRaw.value.actions.push({
        url,
        plugins: [...(plugins?.plugins || []), action],
      });
    }
    storageKit.save();
  };

  const clear = (url: string) => {
    storageKit.storeRaw.value.actions = storageKit.store.actions?.filter(
      (n) => n.url !== url,
    );
    storageKit.save();
  };

  const remove = (url: string, key: string) => {
    storageKit.storeRaw.value.actions.map((n) => {
      if (n.url === url) {
        n.plugins = n.plugins.filter((x) => x.key !== key);
      }
      return n;
    });
    storageKit.storeRaw.value.actions = storageKit.store.actions?.filter(
      (n) => n.plugins.length > 0,
    );
    storageKit.save();
  };

  const isUpdate = computed(() => {
    return storageKit.update_key.value;
  });

  return {
    remove,
    clear,
    add,
    get,
    isUpdate,
  };
};
