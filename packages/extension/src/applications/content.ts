import { webNotice } from './web-notice/content';
import { devAccount } from './dev-account/content';
import { linkGo } from './link-go/content';
import { storagePortal } from './storage-portal/content';
import { vueDevtool } from './vue-devtool/content';

export const contentFunc: Record<string, Function> = {
  WebNotice: webNotice,
  DevAccount: devAccount,
  LinkGo: linkGo,
  StoragePortal: storagePortal,
  VueDevtool: vueDevtool,
};
