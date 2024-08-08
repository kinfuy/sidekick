import { defineManifest } from '@crxjs/vite-plugin';
export const isDev = process.env.NODE_ENV !== 'production';

export default defineManifest(() => {
  return {
    manifest_version: 3,
    name: '__MSG_chrome_extension_name__',
    version: '0.0.3',
    description: '__MSG_chrome_extension_description__',
    icons: {
      '16': 'public/logo.png',
      '48': 'public/logo.png',
      '128': 'public/logo.png',
    },
    background: {
      service_worker: 'src/background/index.ts',
      type: 'module',
    },
    action: {
      default_icon: 'public/logo.png',
      default_title: 'DevTester',
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
      // 'contextMenus',
      // 'bookmarks',
      // 'webRequest',
      // 'notifications',
      'storage',
      'tabs',
      'alarms',
      'cookies',
      'activeTab',
    ],
    default_locale: 'zh_CN',
    host_permissions: ['<all_urls>'],
    web_accessible_resources: isDev
      ? []
      : [
          {
            matches: ['<all_urls>'],
            resources: ['assets/shadow-styles.css'],
            use_dynamic_url: true,
          },
          {
            matches: ['<all_urls>'],
            resources: ['assets/web-notice.css'],
            use_dynamic_url: true,
          },
          {
            matches: ['<all_urls>'],
            resources: ['assets/click-count.css'],
            use_dynamic_url: true,
          },
        ],
  };
});
