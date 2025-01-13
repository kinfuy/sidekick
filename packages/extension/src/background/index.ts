import { useAlarmManger } from '@core/alarm-manage';
import { triggerApplicationHooks } from '../core/application';
import { createtab, getChromeUrl } from '../utils';
chrome.runtime.onInstalled.addListener(() => {
  createtab(getChromeUrl('setting.html'));
  triggerApplicationHooks('onInstalled');
});

// 禁用 action button 打开侧边栏
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false });

triggerApplicationHooks('onInit');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let limitApp;
  if (request.code === 'onActiveChange' && request.data?.name) {
    limitApp = [request.data?.name];
  }
  if (request.code === 'onOpenSidePanel' && sender.tab) {
    chrome.sidePanel.open({ tabId: sender.tab.id });
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

const { add } = useAlarmManger();

add('refresh-token', { periodInMinutes: 60 * 24 });

chrome.contextMenus.create({
  id: 'openSidePanel',
  title: 'Mock',
  contexts: ['all'],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openSidePanel' && tab) {
    chrome.sidePanel.setOptions({
      tabId: tab.id,
      path: 'sidepanel.html',
      enabled: true,
    });
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});
