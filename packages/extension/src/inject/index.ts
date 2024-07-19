// import type { PostMessage } from '@utils';
import { Message } from '@core/message';
import { injectPostMessage } from '@utils';

// window.addEventListener('message', (info: { data: PostMessage }) => {
//   const response = info.data as PostMessage;
//   if (response?.from !== 'content_inject') return;
// });

document.addEventListener('visibilitychange', () => {
  let visible = false;
  if (document.visibilityState === 'visible') {
    visible = true;
  }
  injectPostMessage({
    from: Message.Form.INJECT_MESSAGE,
    to: Message.Target.CONTENT,
    code: 'onDocVisibilitychange',
    data: { visible },
  });
});
export {};
