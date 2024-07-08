// import type { PostMessage } from '@utils';
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
    from: 'app_inject',
    code: 'onDocVisibilitychange',
    data: { visible },
  });
});
export {};
