import { injectPostMessage } from '@utils';

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
