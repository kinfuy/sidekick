import type { App, Component } from 'vue';
import { createApp as _createApp } from 'vue';

type Data = Record<string, unknown>;

interface AppProps {
  app: {
    component: Component;
    rootProps?: Data | null;
  };
  config: {
    /**
     * app 标识 确认是否挂在过
     */
    appSelector: string;
    /**
     * pred css url
     */
    predStyle: string;
  };
}

/**
 * 注入vue app
 * @param {AppProps} options
 * @returns {App<Element>} app
 */
export const createApp = (options: AppProps): App<Element> | undefined => {
  const { appSelector, predStyle } = options.config;
  const { component, rootProps } = options.app;
  const isexist = document.body.querySelector(`#${appSelector}`);
  if (isexist) return;
  const container = document.createElement('div');
  container.id = appSelector;

  setTimeout(() => {
    const isexist = document.body.querySelector(`#${appSelector}`);
    if (isexist) return;
    document.body.appendChild(container);
  }, 0);
  const root = document.createElement('div');
  root.id = `${appSelector}-root`;

  const shadowDOM = container.attachShadow?.({ mode: 'open' }); //  || container;

  if (!__DEV__) {
    const styleEl = document.createElement('link');
    styleEl.setAttribute('rel', 'stylesheet');
    styleEl.setAttribute('href', chrome.runtime.getURL(predStyle));
    shadowDOM.appendChild(styleEl);
  }

  shadowDOM.appendChild(root);

  const app = _createApp(component, rootProps);
  app.mount(root);
  return app;
};
