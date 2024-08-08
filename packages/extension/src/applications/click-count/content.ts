import { createApp } from '@components/vue-component';
import type { App } from 'vue';
import Count from './view/extra/click-count.vue';
import { useClickCountStore } from './store';
const APP_SELCTOR = 'click-count';
let app: App<Element> | undefined;
export const injectView = () => {
  const isExist = document.querySelector(`#${APP_SELCTOR}`);
  if (isExist) return true;
  app = createApp({
    app: { component: Count },
    config: { appSelector: 'click-count', predStyle: 'assets/click-count.css' },
  });
};

export const removeView = () => {
  if (app) app.unmount();
  const el = document.body?.querySelector(`#${APP_SELCTOR}`);
  el && el.parentNode?.removeChild(el);
};

export const initClickCount = async () => {
  const { status } = useClickCountStore();
  if ([1, 2, 3].includes(status.value)) {
    const timer = setTimeout(() => {
      const isExist = injectView();
      if (isExist) clearTimeout(timer);
    }, 100);
  } else {
    removeView();
  }
};

export const clickCount = ({ key }: { key: string }) => {
  if (key === 'init-click') initClickCount();
  if (key === 'stop-click') removeView();
};
