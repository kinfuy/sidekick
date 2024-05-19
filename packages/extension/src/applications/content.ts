import { webNotice } from './web-notice/content';
import { devAccount } from './dev-account/content';

export const contentFunc: Record<string, Function> = {
  WebNotice: webNotice,
  DevAccount: devAccount,
};
