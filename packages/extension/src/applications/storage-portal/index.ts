import cookie from '@assets/image/cookie.svg';
import { getChromeUrl } from '@utils';
import type { App } from '@/types/core-app.type';
export const StoragePortal: App = {
  name: 'StoragePortal',
  title: '缓存传送门',
  inner: false,
  isLogin: false,
  logo: getChromeUrl(cookie),
  contentApp: true,
  settingApp: true,
  width: '600px',
  hooks: {},
};
