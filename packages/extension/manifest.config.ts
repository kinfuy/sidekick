import { defineManifest } from '@crxjs/vite-plugin';
export const isDev = process.env.NODE_ENV !== 'production';

export default defineManifest(() => {
  return {
    manifest_version: 3,
    name: 'DevTester',
    version: '0.0.1',
    description: '专注于开发与测试的浏览器工具集',
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
        ],
  };
});
