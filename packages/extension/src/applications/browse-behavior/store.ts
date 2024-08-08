import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { computed } from 'vue';
import { StorageKit } from '@core/store';
import { getDaysOpenWebs } from './transform';

export interface DayOpenWebs {
  date: string;
  webs: {
    url: string;
    favIconUrl: string;
    title: string;
    count: number;
  }[];
}

export interface WebStatics {
  tabId: string;
  url: string;
  title: string;
  favIconUrl: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface WebUseTimes {
  url: string;
  title: string;
  favIconUrl: string;
  isActive: boolean;
  startTime: string;
  lastTime: string;
  useTimes: number; // 秒
}

export interface DayUseTimes {
  date: string;
  webs: WebUseTimes[];
}
export interface BrowseBehaviorStore {
  webStatics: WebStatics[]; // 打开次数统计
  webUseTimes: DayUseTimes[]; // 站点活跃时间统计
}

const STORE_KEY = 'BrowseBehavior';

export const useBrowseBehaviorStore = () => {
  const storageKit = StorageKit.getInstance<BrowseBehaviorStore>(STORE_KEY, {
    webStatics: [],
    webUseTimes: [],
  });

  // 次数统计
  const addRecord = async (opt: {
    tabId: string;
    url: string;
    title: string;
    date: string;
    startTime: string;
    favIconUrl: string;
  }) => {
    while (!storageKit.inited) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    const { tabId, url, title, date, startTime, favIconUrl } = opt;
    const tab = storageKit.store.webStatics?.find(
      (item) => item.tabId === tabId,
    );
    if (tab) {
      if (tab.url === url) return;
      tab.tabId = '';
      tab.endTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    }
    if (!storageKit.storeRaw.value?.webStatics) {
      storageKit.storeRaw.value.webStatics = [];
    }

    storageKit.storeRaw.value.webStatics?.push({
      tabId,
      url,
      favIconUrl,
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
    return daysWebStatics.value?.find((item) => item.date === date);
  };

  const dayWebCounts = computed(() => {
    const taday = dayjs().format('YYYY-MM-DD');
    return queryByDate(taday);
  });

  const clear = () => {
    storageKit.clear();
  };

  const inited = computed(() => storageKit.inited);

  // 时间统计

  const getTadayUseTimes = () => {
    const taday = dayjs().format('YYYY-MM-DD');
    const tadayUsed = storageKit.storeRaw.value.webUseTimes?.find(
      (item) => item.date === taday,
    );
    return tadayUsed;
  };

  const clearAllActive = async () => {
    const tadayUsed = getTadayUseTimes();
    if (tadayUsed) {
      tadayUsed.webs.forEach((item) => {
        if (item.isActive) {
          item.useTimes += dayjs().diff(dayjs(item.lastTime), 'second');
          item.lastTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
        }
        item.isActive = false;
      });
    }
  };

  const resetActiveUrl = async (url: string) => {
    const tadayUsed = getTadayUseTimes();
    if (tadayUsed) {
      tadayUsed.webs.forEach((item) => {
        if (item.url === new URL(String(url)).host) {
          if (item.isActive) {
            item.useTimes += dayjs().diff(dayjs(item.lastTime), 'second');
            item.lastTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
            item.isActive = false;
          }
        }
      });
    }
  };

  const setActiveUrl = async (tab: {
    url?: string;
    title?: string;
    favIconUrl?: string;
  }) => {
    while (!storageKit.inited) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    clearAllActive();
    if (!tab.url) {
      storageKit.save();
      return;
    }
    let tadayUsed = getTadayUseTimes();
    if (!tadayUsed) {
      tadayUsed = {
        date: dayjs().format('YYYY-MM-DD'),
        webs: [],
      };
    }
    const web = tadayUsed.webs.find(
      (item) => item.url === new URL(String(tab.url)).host,
    );
    if (web) {
      web.useTimes += dayjs().diff(dayjs(web.lastTime), 'second');
      web.lastTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    } else {
      tadayUsed.webs.push({
        url: new URL(tab.url).host,
        favIconUrl: tab.favIconUrl || '',
        title: tab.title || '',
        isActive: true,
        startTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        lastTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        useTimes: 0,
      });
    }
    if (
      storageKit.storeRaw.value.webUseTimes?.find(
        (item) => item.date === tadayUsed?.date,
      )
    ) {
      storageKit.storeRaw.value.webUseTimes?.forEach((item) => {
        if (item.date === tadayUsed?.date) {
          item.webs = tadayUsed?.webs;
        }
      });
    } else {
      if (!storageKit.storeRaw.value.webUseTimes) {
        storageKit.storeRaw.value.webUseTimes = [];
      }
      storageKit.storeRaw.value.webUseTimes?.push(tadayUsed);
    }

    storageKit.save();
  };

  const dayUseTimes = computed(() => {
    const taday = dayjs().format('YYYY-MM-DD');
    const tadayUsed = storageKit.storeRaw.value.webUseTimes?.find(
      (item) => item.date === taday,
    );
    return {
      date: taday,
      webs: tadayUsed?.webs.sort((a, b) => b.useTimes - a.useTimes) || [],
    };
  });

  const daysUseTimes = computed(() => {
    return storageKit.storeRaw.value.webUseTimes?.map((item) => {
      return {
        date: item.date,
        webs: item.webs.sort((a, b) => b.useTimes - a.useTimes),
      };
    });
  });
  const curentActiveWeb = computed(() => {
    const taday = dayjs().format('YYYY-MM-DD');
    const tadayUsed = storageKit.storeRaw.value.webUseTimes?.find(
      (item) => item.date === taday,
    );
    if (!tadayUsed) return;
    return tadayUsed.webs?.find((item) => item.isActive);
  });

  return {
    daysWebStatics,
    queryByDate,
    addRecord,
    updateEndTime,
    clear,
    inited,
    setActiveUrl,
    resetActiveUrl,
    dayUseTimes,
    daysUseTimes,
    dayWebCounts,
    curentActiveWeb,
  };
};
