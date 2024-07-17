import { StorageKit } from '@core/store';
import { computed } from 'vue';

export interface ClickCountStore {
  status: number; // 0：初始 1:开始ing  2：暂停 3：终止
  clickCount: number;
}
const defaultStore = (): ClickCountStore => {
  return {
    status: 0,
    clickCount: 0,
  };
};
const STORE_KEY = 'ClickCount';
export const useClickCountStore = () => {
  const storageKit = StorageKit.getInstance<ClickCountStore>(
    STORE_KEY,
    defaultStore(),
  );

  const status = computed(() => {
    return storageKit.store.status;
  });
  const count = computed(() => {
    return storageKit.store.clickCount;
  });
  const add = async (count: number = 1) => {
    storageKit.storeRaw.value.clickCount += count;
    await storageKit.save();
  };

  /**
   *
   * @param val // 0：初始 1:开始ing  2：暂停 3：终止
   */
  const set = (val: number) => {
    if (val === 0) {
      storageKit.storeRaw.value.status = 0;
      storageKit.storeRaw.value.clickCount = 0;
    }
    storageKit.storeRaw.value.status = val;
    storageKit.save();
  };

  return {
    status,
    count,
    add,
    set,
  };
};
