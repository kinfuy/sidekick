import { createApp } from 'vue';
import App from './App.vue';

const APP_SELCTOR = 'sidekick-extension';

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

  app.mount(root);
};
