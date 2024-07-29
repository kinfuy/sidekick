import { createApp } from 'vue';
import BlockContent from './views/extra/block-content.vue';
import type { Engine, TargetNode, UrlMatch } from './store';
import { useUrlBlockStore } from './store';
import { getPropByPath } from './utils';

export const injectBlockView = (target: Element, engine: Engine) => {
  const app = createApp(BlockContent, {
    targetElement: target,
    engine,
  });
  const blickElement = document.createElement('div');
  blickElement.setAttribute('style', 'position: absolute; inset: 0;');
  app.mount(blickElement);
  target.appendChild(blickElement);
};

const getUrlText = (item: Element, target: TargetNode): string => {
  if (target.attribute) {
    return item.getAttribute(target.attribute) || '';
  }
  if (target.path) {
    return getPropByPath(item, target.path);
  }
  return '';
};

const isBlockUrl = (url: string, blackList: UrlMatch[]) => {
  let flag = false;
  blackList.forEach((b) => {
    if (b.type === 'regex') {
      if (Array.isArray(b.value)) {
        b.value.forEach((v) => {
          if (url.match(v)) {
            flag = true;
          }
        });
      } else if (url.includes(b.value)) {
        flag = true;
      }
    }
    if (b.type === 'string') {
      if (Array.isArray(b.value) && b.value.includes(url)) {
        flag = true;
      } else if (url.includes(b.value as string)) {
        flag = true;
      }
    }
  });
  return flag;
};

const extractHostFromUrl = (text: string) => {
  const regex = /(?:https?:\/\/)?([^:\/\s]+\.[^:\/\s]+)/;
  const match = text.match(regex);
  return match ? match[1] : text;
};

export const urlBlock = async () => {
  const { enableBlackList, getEnfineConfig, inited } = useUrlBlockStore();

  while (!inited.value) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const engineConfig = getEnfineConfig(document.location.host);

  if (engineConfig) {
    if (engineConfig.delay) {
      await new Promise((resolve) => setTimeout(resolve, engineConfig.delay));
    }
    const list = document.querySelectorAll(engineConfig.query.target.selector);
    Array.from(list).forEach((item) => {
      let urlText = getUrlText(item, engineConfig.query.target);
      // 提取文本中的网址
      urlText = extractHostFromUrl(urlText);
      if (urlText) {
        try {
          if (
            !urlText.startsWith('https://') &&
            !urlText.startsWith('http://')
          ) {
            urlText = `https://${urlText}`;
          }
          const url = new URL(urlText).host;
          if (url && isBlockUrl(url, enableBlackList.value)) {
            const container = item.closest(engineConfig.query.container);
            const isBlock = container?.getAttribute('data-blocked');
            if (container && !isBlock) {
              injectBlockView(container, engineConfig.engine);
            }
          }
        } catch (error) {}
      }
    });
  }
};
