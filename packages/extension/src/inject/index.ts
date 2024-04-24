import { injectPostMessage } from '@utils';

window.addEventListener('message', (info: any) => {
  if (!info.data) return;
  const { code, data } = info.data;

  console.log('app_inject', code, data);
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
