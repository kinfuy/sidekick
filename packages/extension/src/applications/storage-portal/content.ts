import { getAllStorage, sendMessageToExtension } from '@utils';
import { Message } from '@core/message';
import { useStoragePortalStore } from './store';

export const storagePortal = (opt: any) => {
  if (opt.key === 'send-storage') {
    const _localStorage = getAllStorage(localStorage);
    const _sessionStorage = getAllStorage(sessionStorage);
    sendMessageToExtension({
      from: Message.Form.CONTENT_MESSAGE,
      to: Message.Target.SERVERWORKER,
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
    setStore(
      {
        sessionStorage: opt.data.opt.sessionStorage,
        localStorage: opt.data.opt.localStorage,
      },
      true,
    );
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
    setStore({ cookie: rst }, true);
  }

  if (opt.key === 'get-tabs') {
    const options: Array<{ title: string; url: string }> = [];
    opt.data.openWebSites.forEach((o: any) => {
      const isExclude =
        options.some((item) => item.url === new URL(o.url).host) ||
        new URL(o.url).host === new URL(window.location.href).host ||
        o.url.startsWith('chrome://');

      if (!isExclude) {
        options.push({
          url: new URL(o.url).host,
          title: o.title,
        });
      }
    });
    const { setTabs } = useStoragePortalStore();
    setTabs(options);
  }
};
