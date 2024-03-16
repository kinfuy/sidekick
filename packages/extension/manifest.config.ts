import { defineManifest } from '@crxjs/vite-plugin';
export const isDev = process.env.NODE_ENV !== 'production';

export default defineManifest(async () => {
  return {
    manifest_version: 3,
    name: 'Sidekick',
    version: '0.0.1',
    description:
      'The fish in the browser are free, flexible, and efficient. A super efficient personal assistant',
    icons: {
      '16': 'src/assets/logo.png',
      '48': 'src/assets/logo.png',
      '128': 'src/assets/logo.png',
    },
    background: {
      service_worker: 'src/background/index.ts',
      type: 'module',
    },
    action: {
      default_icon: 'src/assets/logo.png',
      default_title: 'sidekick',
      default_popup: 'popup.html',
    },
    content_scripts: [
      {
        matches: ['<all_urls>'],
        js: ['src/content/index.ts'],
        run_at: 'document_start',
      },
    ],
    permissions: [
      'contextMenus',
      'bookmarks',
      'webRequest',
      'notifications',
      'storage',
      'tabs',
      'alarms',
      'cookies',
    ],
    host_permissions: ['<all_urls>'],
    web_accessible_resources: isDev ? [] : [],
  };
});
