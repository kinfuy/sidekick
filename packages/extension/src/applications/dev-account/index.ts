import account from '@assets/app/account.svg';
import type { App } from '@/types/core-app.type';

export const DevAccount: App = {
  name: 'dev-account',
  title: 'Dev Account',
  logo: chrome.runtime.getURL(account),
  inner: false,
  width: '600px',
  hooks: {},
};
