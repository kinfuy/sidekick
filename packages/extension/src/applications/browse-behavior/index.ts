import count from '@assets/app/count.svg';
import dayjs from 'dayjs';
import { useBrowseBehaviorStore } from './store';
import type { App } from '@/types/core-app.type';

export const BrowseBehavior: App = {
  name: 'BrowseBehavior',
  title: '浏览数据',
  logo: chrome.runtime.getURL(count),
  inner: false,
  settingApp: true,
  popupApp: true,
  hooks: {
    onContentFocus: async (opt) => {
      const { setActiveUrl } = useBrowseBehaviorStore();
      const { url, title, favIconUrl } = opt;
      const tabInfo = {
        url,
        title,
        favIconUrl,
      };
      if (!tabInfo.url) return;
      const host = new URL(tabInfo.url).host;
      if (tabInfo.url.startsWith('chrome://')) return;
      if (tabInfo.url.startsWith('chrome-extension://')) return;
      if (['extension', 'newtab'].includes(host)) return;
      setActiveUrl(tabInfo);
    },

    onContentBlur: async (opt) => {
      const { url } = opt;
      const { resetActiveUrl } = useBrowseBehaviorStore();
      resetActiveUrl(url);
    },

    onTabUpdate: async (tabs) => {
      const { addRecord } = useBrowseBehaviorStore();
      const [tabId, changeinfo, tab] = tabs;
      const host = new URL(tab.url).host;
      if (tab.url.startsWith('chrome://')) return;
      if (tab.url.startsWith('chrome-extension://')) return;
      if (['extension', 'newtab'].includes(host)) return;
      // url 改变记录
      if (changeinfo.url) {
        await addRecord({
          tabId,
          favIconUrl: tab.favIconUrl,
          url: new URL(tab.url).host,
          title: tab.title,
          date: dayjs().format('YYYY-MM-DD'),
          startTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        });
      }
    },
    onTabRemove: async (tabs) => {
      const [tabId] = tabs;
      const { updateEndTime } = useBrowseBehaviorStore();
      const endTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
      const taday = dayjs().format('YYYY-MM-DD');

      updateEndTime(tabId, taday, endTime);
    },
  },
};
