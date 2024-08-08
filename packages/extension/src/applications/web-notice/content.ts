import { useWebNoticeStore } from './store';
import Notice from './view/extra/notice.vue';
import { createApp } from '@/components/vue-component';

const APP_SELCTOR = 'web-notice';

let app: any;
export const injectNotice = () => {
  const isExist = document.querySelector(`#${APP_SELCTOR}`);
  if (isExist) return true;
  app = createApp({
    app: { component: Notice },
    config: { appSelector: 'web-notice', predStyle: 'assets/web-notice.css' },
  });
};

export const removeNotice = () => {
  if (app) app.unmount();
  const el = document.body?.querySelector('#web-notice');
  el && document.body.removeChild(el);
};

export const initNotice = async () => {
  const { setCurrent } = useWebNoticeStore();
  const current = await setCurrent(window.location.href);
  if (current && current.active) {
    const timer = setTimeout(() => {
      const isExist = injectNotice();
      if (isExist) clearTimeout(timer);
    }, 100);
  } else {
    removeNotice();
  }
};
export const webNotice = () => {
  initNotice();
};
