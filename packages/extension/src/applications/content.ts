import { webNotice } from './web-notice/content';
import { devAccount } from './dev-account/content';
import { linkGo } from './link-go/content';
import { storagePortal } from './storage-portal/content';
import { clickCount } from './click-count/content';
import { urlBlock } from './url-block/content';
import { apiProxy } from './api-proxy/content';

export const contentFunc: Record<string, Function> = {
  WebNotice: webNotice,
  DevAccount: devAccount,
  LinkGo: linkGo,
  StoragePortal: storagePortal,
  ClickCount: clickCount,
  UrlBlock: urlBlock,
  ApiProxy: apiProxy,
};
