import { StorageKit } from '@core/store';
import { computed } from 'vue';

export interface MockStore {
  rules: string[];
  version: string;
}

const STORE_KEY = 'Mock';

export const useMockStore = () => {
  const storageKit = StorageKit.getInstance<MockStore>(STORE_KEY, {
    rules: [],
    version: '1.0.0',
  });

  const rules = computed(() => storageKit.store.rules);

  return {
    rules,
  };
};
