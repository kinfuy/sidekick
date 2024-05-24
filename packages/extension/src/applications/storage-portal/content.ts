import { getAllStorage, sendMessageToExtension } from '@utils';
import { useStoragePortalStore } from './store';

export const storagePortal = (opt: any) => {
  debugger;
  if (opt.key === 'send-storage') {
    const _localStorage = getAllStorage(localStorage);
    const _sessionStorage = getAllStorage(sessionStorage);
    sendMessageToExtension({
      from: 'content',
      code: 'onSendData',
      data: {
        key: 'send-storage',
        opt: {
          targetUrl: opt.from,
          soureurl: new URL(window.location.href).host,
          localStorage: _localStorage,
          sessionStorage: _sessionStorage,
        },
      },
    });
  }
  if (opt.key === 'get-storage') {
    const { setStore } = useStoragePortalStore();
    setStore({
      sessionStorage: opt.data.opt.sessionStorage,
      localStorage: opt.data.opt.localStorage,
    });
  }
  if (opt.key === 'get-cookies') {
    const { setStore } = useStoragePortalStore();
    const cookies = new Map();
    opt.data.cookies.forEach((c: any) => {
      cookies.set(c.name, {
        key: c.name,
        val: c.value,
      });
    });

    const rst: any[] = [];
    cookies.forEach((c) => {
      if (c.key) rst.push(c);
    });
    setStore({ cookie: rst });
  }

  if (opt.key === 'get-tabs') {
    const options: Array<{ label: string; value: string }> = [];
    opt.data.openWebSites.forEach((o: any) => {
      const isExclude =
        options.some((item) => item.value === new URL(o.url).host) ||
        new URL(o.url).host === new URL(window.location.href).host ||
        o.url.startsWith('chrome://');

      if (!isExclude) {
        options.push({
          value: new URL(o.url).host,
          label: o.title,
        });
      }
    });
    const { setTabs } = useStoragePortalStore();
    setTabs(options);
  }
};
