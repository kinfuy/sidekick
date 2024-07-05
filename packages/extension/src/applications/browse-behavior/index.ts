import count from '@assets/app/count.svg';
import dayjs from 'dayjs';
import { useBrowseBehaviorStore } from './store';
import type { App } from '@/types/core-app.type';

export const BrowseBehavior: App = {
  name: 'BrowseBehavior',
  title: '浏览数据报告',
  logo: chrome.runtime.getURL(count),
  inner: false,
  settingApp: true,
  popupApp: true,
  hooks: {
    onTabUpdate: async (tabs) => {
      const { addRecord } = useBrowseBehaviorStore();
      const [tabId, changeinfo, tab] = tabs;
      const host = new URL(tab.url).host;
      if (tab.url.startsWith('chrome://')) return;
      if (tab.url.startsWith('chrome-extension://')) return;
      if (['extension', 'newtab'].includes(host)) return;
      // url 改变记录
      if (changeinfo.url) {
        addRecord({
          tabId,
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
