import { createApp } from 'vue';
import { contentInstall } from '@applications/install';
import App from './App.vue';

const APP_SELCTOR = 'dev-tester-extension';

export const initInject = () => {
  const isExist = document.querySelector(`#${APP_SELCTOR}`);
  if (isExist) return true;

  const container = document.createElement('div');
  container.id = `${APP_SELCTOR}`;
  setTimeout(() => document.body?.appendChild(container), 0);
  const root = document.createElement('div');
  root.id = `${APP_SELCTOR}-root`;

  const shadowDOM = container.attachShadow?.({ mode: 'open' });

  if (!__DEV__) {
    const styleEl = document.createElement('link');
    styleEl.setAttribute('rel', 'stylesheet');
    styleEl.setAttribute(
      'href',
      chrome.runtime.getURL('/assets/shadow-styles.css'),
    );
    shadowDOM.appendChild(styleEl);
  }
  shadowDOM.appendChild(root);

  const app = createApp(App);

  contentInstall(app);

  app.mount(root);
};

export const removeInject = () => {
  const app = document.body.querySelector(`#${APP_SELCTOR}`);
  app && app.parentNode?.removeChild(app);
};
