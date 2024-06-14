import type { WebStatics } from './store';

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
export const getDaysOpenWebs = (data: Array<WebStatics>): DayOpenWebs[] => {
  const dates = new Set<string>();
  data.forEach((item) => {
    if (item.date) dates.add(item.date);
  });

  return Array.from(dates).map((date) => {
    const webs = data.filter((item) => item.date === date);
    const webMap = new Map();
    webs.forEach((item) => {
      if (webMap.has(item.url)) {
        const old = webMap.get(item.url);
        webMap.set(item.url, {
          ...old,
          totalTime: '',
          count: old.count + 1,
        });
      } else {
        webMap.set(item.url, {
          url: item.url,
          title: item.title,
          totalTime: '',
          count: 1,
        });
      }
    });

    return {
      date,
      webs: Array.from(webMap.values()),
    };
  });
};
