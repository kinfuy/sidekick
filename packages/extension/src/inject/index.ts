import type { PostMessage } from '@utils';
import { injectPostMessage } from '@utils';

window.addEventListener('message', (info: any) => {
  const response = info.data as PostMessage;
  if (!response?.data || response.data?.key !== 'app_inject') return;
  const { code, data } = info.data;
  console.log('app_inject', info, code, data);
});

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
