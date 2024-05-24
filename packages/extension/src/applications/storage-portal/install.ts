import type { App } from 'vue';
import StoragePortal from './view/inject/storage-portal.vue';

export const storagePortalContentInstall = (app: App) => {
  app.component('InjectStoragePortal', StoragePortal);
};
