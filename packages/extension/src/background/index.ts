import { useAlarmManger } from '@core/alarm-manage';
import { triggerApplicationHooks } from '../core/application';
import { chromeAddListenerMessage, createtab, getChromeUrl } from '../utils';
chrome.runtime.onInstalled.addListener(() => {
  createtab(getChromeUrl('setting.html'));
  triggerApplicationHooks('onInstalled');
});

triggerApplicationHooks('onInit');

chromeAddListenerMessage(async (message, sender) => {
  let limitApp;
  if (message.code === 'onActiveChange' && message.data?.name) {
    limitApp = [message.data?.name];
  }
  triggerApplicationHooks(message.code, message.data, limitApp, sender);
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
