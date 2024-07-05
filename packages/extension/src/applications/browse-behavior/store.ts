import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { computed } from 'vue';
import { StorageKit } from '@core/store';
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
export interface BrowseBehaviorStore {
  webStatics: Array<WebStatics>;
}

const STORE_KEY = 'browseBehaviorStore';

export const useBrowseBehaviorStore = () => {
  const storageKit = StorageKit.getInstance<BrowseBehaviorStore>(STORE_KEY, {
    webStatics: [],
  });

  const addRecord = (opt: any) => {
    const { tabId, url, title, date, startTime } = opt;
    const tab = storageKit.store.webStatics?.find(
      (item) => item.tabId === tabId,
    );
    if (tab) {
      if (tab.url === url) return;
      tab.tabId = '';
      tab.endTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    }

    storageKit.storeRaw.value.webStatics?.push({
      tabId,
      url,
      title,
      date,
      startTime,
      endTime: '',
    });
    storageKit.save();
  };

  const updateEndTime = (tabId: string, date: string, endTime: string) => {
    storageKit.storeRaw.value.webStatics?.forEach((item) => {
      if (item.tabId === tabId && item.date === date) {
        item.tabId = '';
        item.endTime = endTime;
      }
    });
    storageKit.save();
  };

  const webStaticsMate = computed(() => storageKit.store.webStatics);

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
    return webStaticsMate.value?.find((item) => item.date === date);
  };

  const clear = () => {
    storageKit.clear();
  };

  return {
    daysWebStatics,
    queryByDate,
    addRecord,
    updateEndTime,
    clear,
  };
};
