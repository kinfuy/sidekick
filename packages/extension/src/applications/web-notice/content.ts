import { useWebNoticeStore } from './store';
import Notice from './components/notice.vue';
import { createApp } from '@/components/vue-component';

export const initNotice = async () => {
  const { setCurrent } = useWebNoticeStore();

  const current = await setCurrent(window.location.href);
  if (current && current.active) {
    createApp({
      app: {
        component: Notice,
      },
      config: {
        appSelector: 'web-notice',
        predStyle: 'assets/web-notice.css',
      },
    });
  } else {
    const app = document.body.querySelector('#web-notice');
    app && document.body.removeChild(app);
  }
};
export const webNotice = () => {
  initNotice();
};
