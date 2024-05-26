import cookie from '@assets/image/cookie.svg';
import {
  getChromeUrl,
  sendMessageToContentScript,
  sendMessageToContentScriptById,
} from '@utils';
import type { App } from '@/types/core-app.type';
export const StoragePortal: App = {
  name: 'StoragePortal',
  title: '缓存传送门',
  inner: false,
  isLogin: false,
  logo: getChromeUrl(cookie),
  contentApp: true,
  width: '600px',
  hooks: {
    onGetData: async (data) => {
      if (data.key === 'cookies') {
        const { targetUrl, sourceUrl } = data.opt;
        if (!targetUrl && !sourceUrl) return;
        const cookies = await chrome.cookies.getAll({ domain: targetUrl });
        const tabs = await chrome.tabs.query({ url: `*://${targetUrl}/*` });
        if (tabs && tabs[0]?.id) {
          sendMessageToContentScriptById(tabs[0].id, {
            from: 'background',
            code: 'StoragePortal',
            data: { key: 'send-storage', from: sourceUrl },
          });
        }
        sendMessageToContentScript({
          from: 'background',
          code: 'StoragePortal',
          data: {
            key: 'get-cookies',
            data: { cookies },
          },
        });
      }
      if (data.key === 'tabs') {
        const tabs = await chrome.tabs.query({ status: 'complete' });
        const opens = tabs.map((t) => {
          return { title: t.title, url: t.url };
        });
        sendMessageToContentScript({
          from: 'background',
          code: 'StoragePortal',
          data: {
            key: 'get-tabs',
            data: { openWebSites: opens || [] },
          },
        });
      }
    },
    onSendData: async (data) => {
      sendMessageToContentScript({
        from: 'background',
        code: 'StoragePortal',
        data: { key: 'get-storage', data },
      });
    },
    onCustomAction: async ({ data, key }) => {
      if (key === 'clear-cookies') {
        const { targetUrl, cookies } = data;
        if (!targetUrl) return;
        cookies.forEach(async (n: string) => {
          await chrome.cookies.remove({
            url: targetUrl,
            name: n,
          });
        });
      }
    },
  },
};
