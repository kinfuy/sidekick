import { injectPostMessage } from '@utils';

const defaultBan = ['localhost', '0.0.0.0', '127.0.0.1'];
export const vueDevtool = () => {
  const isBanUrl = defaultBan.some((ban) => {
    return window.location.href.includes(ban);
  });
  if (isBanUrl)
    console.log(
      '[DevTester: VueDevtool] disabled by default in the development environment',
    );
  if (!isBanUrl) {
    injectPostMessage({
      from: 'content_inject',
      code: 'VueDevtool',
    });
  }
};
