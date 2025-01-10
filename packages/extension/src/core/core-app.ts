import { useAuth } from '@store/useAuth';
import type { Application } from '@/types/core-app.type';
import { createWindow, createtab, getChromeUrl } from '@/utils/chrome';

export const PreCoreApp = (): Application => {
  return {
    name: 'pre-core-app',
    onAlarms: (opt: chrome.alarms.Alarm) => {
      if (opt.name === 'refresh-token') {
        const { getRefreshToken } = useAuth();
        getRefreshToken();
      }
    },
  };
};

export const SuffixCoreApp = (): Application => {
  return {
    name: 'suffix-core-app',
    onOpenChromeUrl: ({ openUrl, extra }) => {
      createtab(getChromeUrl(openUrl), extra);
    },

    onOpenWindow: ({ openUrl, extra }) => {
      createWindow(getChromeUrl(openUrl), extra);
    },

    onOpenSidePanel: async (_, sender) => {
      console.log('onOpenSidePanel');
      if (chrome.sidePanel && sender.tab) {
        try {
          await chrome.sidePanel.open({ windowId: sender.tab.windowId });
          await chrome.sidePanel.setOptions({
            tabId: sender.tab.id,
            path: 'sidepanel.html',
            enabled: true,
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        console.warn('chrome.sidePanel API is not available');
      }
    },
  };
};
