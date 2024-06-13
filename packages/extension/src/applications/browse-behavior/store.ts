import { storage } from '@utils';
import dayjs from 'dayjs';
import { computed, ref, toRaw } from 'vue';

export interface WebStatics {
  tabId: string;
  url: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
}
export interface BrowseBehaviorStoreInstance {
  webStatics: Array<WebStatics>;
}

const STORE_KEY = 'browseBehaviorStore';
const store = ref<BrowseBehaviorStoreInstance>({
  webStatics: [],
});

export const useBrowseBehaviorStore = () => {
  const { get, set } = storage;
  const save = () => {
    set(STORE_KEY, JSON.stringify(toRaw(store.value)));
  };

  const sync = async () => {
    let _store: BrowseBehaviorStoreInstance = { webStatics: [] };
    const localStore = await get<BrowseBehaviorStoreInstance>(STORE_KEY);
    if (localStore && JSON.stringify(localStore) !== '{}') {
      _store = localStore;
    }
    store.value = _store;
  };

  const addRecord = (opt: any) => {
    const { tabId, url, title, date, startTime } = opt;
    const tab = store.value.webStatics.find((item) => item.tabId === tabId);
    if (tab) {
      if (tab.url === url) return;
      tab.tabId = '';
      tab.endTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    }
    store.value.webStatics.push({
      tabId,
      url,
      title,
      date,
      startTime,
      endTime: '',
    });
    save();
  };

  const updateEndTime = (tabId: string, date: string, endTime: string) => {
    store.value.webStatics = store.value.webStatics.map((item) => {
      if (item.tabId === tabId && item.date === date) {
        item.tabId = '';
        item.endTime = endTime;
      }
      return item;
    });
    save();
  };

  const webStatics = computed(() => store.value.webStatics);

  const clear = () => {
    store.value.webStatics = [];
    save();
  };

  sync();
  return {
    webStatics,
    save,
    addRecord,
    updateEndTime,
    clear,
  };
};
