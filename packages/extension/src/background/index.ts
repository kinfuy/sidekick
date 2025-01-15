/* eslint-disable @typescript-eslint/no-unused-vars */
import { triggerApplicationHooks } from '../core/application';
import { createtab, getChromeUrl } from '../utils';
import { useAlarm } from '@/store/useAlarm';

chrome.runtime.onInstalled.addListener(() => {
  // createtab(getChromeUrl('setting.html'));
  triggerApplicationHooks('onInstalled');
});

chrome.tabs.onActivated.addListener(
  (opt: { tabId: number; windowId: number }) => {
    triggerApplicationHooks('onTabActiveChange', opt);
  },
);

// 禁用 action button 打开侧边栏
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false });

triggerApplicationHooks('onInit');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let limitApp;
  console.log(request);
  if (request.code === 'onActiveChange' && request.data?.name) {
    limitApp = [request.data?.name];
  }
  if (request.code === 'onOpenSidePanel' && sender.tab) {
    try {
      chrome.sidePanel.open({ tabId: sender.tab.id });
    } catch (error) {
      console.error(error);
    }
  }

  const contentActive = [
    'onContentInit',
    'onUrlChange',
    'onTabUpdate',
    'onPageshow',
    'onDocVisibilitychange',
    'onDocDOMContentLoaded',
  ];
  if (contentActive.includes(request.code)) {
    triggerApplicationHooks('onContentActive', request.data, limitApp, sender);
  }
  triggerApplicationHooks(request.code, request.data, limitApp, sender);
  sendResponse();
  return false;
});

chrome.alarms?.onAlarm.addListener((opt) => {
  triggerApplicationHooks('onAlarms', opt);
});

chrome.contextMenus?.onClicked.addListener((e, tab) => {
  triggerApplicationHooks('onContextMenusClick', { e, tab });
});

chrome.tabs.onUpdated.addListener((...opt) => {
  triggerApplicationHooks('onTabUpdate', opt);
});

chrome.tabs.onCreated.addListener((...opt) => {
  triggerApplicationHooks('onTabCreate', opt);
});

chrome.tabs.onRemoved.addListener((...opt) => {
  triggerApplicationHooks('onTabRemove', opt);
});

chrome.tabs.onMoved.addListener((...opt) => {
  triggerApplicationHooks('onTabMove', opt);
});

chrome.tabs.onReplaced.addListener((...opt) => {
  triggerApplicationHooks('onTabReplaced', opt);
});

const { add } = useAlarm();

add('refresh-token', { periodInMinutes: 60 * 24 });
