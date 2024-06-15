import { storage } from '@utils';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { computed, ref, toRaw } from 'vue';
import { getDaysOpenWebs } from './transform';

export interface DayOpenWebs {
  date: string;
  webs: {
    url: string;
    title: string;
    count: number;
    totalTime?: number;
    activeTime?: number;
  }[];
}

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

  const sync = async () => {
    let _store: BrowseBehaviorStoreInstance = { webStatics: [] };
    const localStore = await get<BrowseBehaviorStoreInstance>(STORE_KEY);
    if (localStore && JSON.stringify(localStore) !== '{}') {
      _store = localStore;
    }
    store.value = _store;
  };

  const save = () => {
    set(STORE_KEY, JSON.stringify(toRaw(store.value))).finally(() => {
      sync();
    });
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
    store.value.webStatics.forEach((item) => {
      if (item.tabId === tabId && item.date === date) {
        item.tabId = '';
        item.endTime = endTime;
      }
    });
    save();
  };

  const webStaticsMate = computed(() => store.value.webStatics);

  const daysWebStatics = computed(() => {
    return getDaysOpenWebs(webStaticsMate.value).map((item) => {
      return {
        date: item.date,
        webs: item.webs.sort((a, b) => b.count - a.count),
      };
    });
  });

  const queryByDate = (day: Date | string | Dayjs) => {
    const date = dayjs(day).format('YYYY-MM-DD');
    return webStaticsMate.value.find((item) => item.date === date);
  };

  const clear = () => {
    store.value.webStatics = [];
    save();
  };

  sync();
  return {
    daysWebStatics,
    queryByDate,
    save,
    addRecord,
    updateEndTime,
    clear,
  };
};
