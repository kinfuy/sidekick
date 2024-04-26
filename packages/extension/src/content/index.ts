import type { PostMessage } from '@utils';
import { injectCustomScript, sendMessageToExtension } from '@utils';
import { contentFunc } from '@applications/content';
import injectScript from '@/inject/index.ts?script&module';
import { initInject } from '@/inject/component';

const initContent = () => {
  initInject();
  const timer = setTimeout(() => {
    const isExist = initInject();
    console.log('isExist', isExist);
    if (isExist) clearTimeout(timer);
  }, 100);
};

initContent();

injectCustomScript(injectScript);

const contentInit = () => {
  sendMessageToExtension({
    from: 'content',
    code: 'onContentInit',
    data: {
      url: window.location.href,
    },
  });
};

contentInit();

document.addEventListener('DOMContentLoaded', () => {
  sendMessageToExtension({
    from: 'content',
    code: 'onDocDOMContentLoaded',
    data: {
      url: window.location.href,
    },
  });
});

window.addEventListener('load', () => {
  sendMessageToExtension({
    from: 'content',
    code: 'onDocLoad',
    data: { url: window.location.href },
  });
});

window.addEventListener('pageshow', () => {
  sendMessageToExtension({
    from: 'content',
    code: 'onPageshow',
    data: { url: window.location.href },
  });
});

window.addEventListener('popstate', (event) => {
  sendMessageToExtension({
    from: 'content',
    code: 'onUrlChange',
    data: { url: window.location.href, event },
  });
});

window.addEventListener('hashchange', (event) => {
  sendMessageToExtension({
    from: 'content',
    code: 'onUrlChange',
    data: { url: window.location.href, event },
  });
});

window.addEventListener('message', async (info: { data: PostMessage }) => {
  const { data } = info;
  if (data.from !== 'app_inject') return;
  if (data.code === 'onDocVisibilitychange') {
    if (data.data && data.data.visible) {
      initInject();
    }
  }
  sendMessageToExtension({
    ...data,
    from: 'content',
  });
});

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  const { code, data } = request;
  const funcCall = contentFunc[code];
  if (funcCall) {
    funcCall(data);
  }

  sendResponse();
  return false;
});
