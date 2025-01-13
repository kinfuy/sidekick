import type { PostMessage } from '@utils';
import {
  getFaviconUrl,
  injectCustomScript,
  sendMessageToExtension,
} from '@utils';
import { contentFunc } from '@applications/content';
import { useTheme } from '@store/useTheme';
import { watch } from 'vue';
import { Message } from '@core/message';
import { contentCore } from './core';

import injectScript from '@/inject/index.ts?script&module';
import { initInject, removeInject } from '@/inject/component';

const { bubble } = useTheme();

const initContent = () => {
  initInject();
  const timer = setTimeout(() => {
    const isExist = initInject();
    if (isExist) clearTimeout(timer);
  }, 100);
};
if (bubble.value) {
  initContent();
} else {
  removeInject();
}

watch(
  () => bubble.value,
  (value) => {
    if (value) {
      initContent();
    } else {
      removeInject();
    }
  },
);

injectCustomScript(injectScript, {
  key: 'core-inject',
  type: 'module',
});

const contentInit = () => {
  sendMessageToExtension({
    from: Message.Form.CONTENT_MESSAGE,
    to: Message.Target.SERVERWORKER,
    code: 'onContentInit',
    data: {
      url: window.location.href,
    },
  });
};

contentInit();

window.addEventListener('load', () => {
  sendMessageToExtension({
    from: Message.Form.CONTENT_MESSAGE,
    to: Message.Target.SERVERWORKER,
    code: 'onDocLoad',
    data: { url: window.location.href },
  });
});

window.addEventListener('pageshow', () => {
  sendMessageToExtension({
    from: Message.Form.CONTENT_MESSAGE,
    to: Message.Target.SERVERWORKER,
    code: 'onPageshow',
    data: { url: window.location.href },
  });
});

window.addEventListener('message', async (info: { data: PostMessage }) => {
  const { data } = info;
  if (data.from !== Message.Form.INJECT_MESSAGE) return;
  if (data.code === 'onDocVisibilitychange') {
    if (data.data && data.data.visible) {
      initInject();
    }
  }
  sendMessageToExtension({
    ...data,
    from: Message.Form.CONTENT_MESSAGE,
    to: Message.Target.SERVERWORKER,
  });
});

window.addEventListener('blur', () => {
  sendMessageToExtension({
    from: Message.Form.CONTENT_MESSAGE,
    to: Message.Target.SERVERWORKER,
    code: 'onContentBlur',
    data: { url: window.location.href },
  });
});
window.addEventListener('focus', () => {
  const url = window.location.href;
  const title = document.title;
  // shortcut icon
  const favIconUrl = getFaviconUrl();
  sendMessageToExtension({
    from: Message.Form.CONTENT_MESSAGE,
    to: Message.Target.SERVERWORKER,
    code: 'onContentFocus',
    data: { url, title, favIconUrl },
  });
});

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  const { code, data } = request;
  if (code === 'ContentCore') {
    contentCore(data);
  } else {
    const funcCall = contentFunc[code];
    if (funcCall) {
      funcCall(data);
    }
  }

  sendResponse();
  return false;
});
