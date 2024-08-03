// import type { PostMessage } from '@utils';
import { Message } from '@core/message';
import { injectPostMessage } from '@utils';
import { enhanceHistory } from './history-polyfill';
enhanceHistory();

window.addEventListener('pushState', () => {
  injectPostMessage({
    from: Message.Form.INJECT_MESSAGE,
    to: Message.Target.SERVERWORKER,
    code: 'onUrlChange',
    data: { url: window.location.href },
  });
});

window.addEventListener('replaceState', () => {
  injectPostMessage({
    from: Message.Form.INJECT_MESSAGE,
    to: Message.Target.SERVERWORKER,
    code: 'onUrlChange',
    data: { url: window.location.href },
  });
});

window.addEventListener('popstate', () => {
  injectPostMessage({
    from: Message.Form.INJECT_MESSAGE,
    to: Message.Target.SERVERWORKER,
    code: 'onUrlChange',
    data: { url: window.location.href },
  });
});

document.addEventListener('DOMContentLoaded', () => {
  injectPostMessage({
    from: Message.Form.CONTENT_MESSAGE,
    to: Message.Target.SERVERWORKER,
    code: 'onDocDOMContentLoaded',
    data: {
      url: window.location.href,
    },
  });
});

window.addEventListener('hashchange', () => {
  injectPostMessage({
    from: Message.Form.INJECT_MESSAGE,
    to: Message.Target.SERVERWORKER,
    code: 'onUrlChange',
    data: { url: window.location.href },
  });
});

document.addEventListener('visibilitychange', () => {
  let visible = false;
  if (document.visibilityState === 'visible') {
    visible = true;
  }
  injectPostMessage({
    from: Message.Form.INJECT_MESSAGE,
    to: Message.Target.CONTENT,
    code: 'onDocVisibilitychange',
    data: { visible, url: window.location.href },
  });
});
export {};
