import { useAlarmManger } from '@core/alarm-manage';
import { triggerApplicationHooks } from '../core/application';
import { chromeAddListenerMessage } from '../utils';

chrome.runtime.onInstalled.addListener(() => {
  triggerApplicationHooks('onInstalled');
});

triggerApplicationHooks('onInit');

chromeAddListenerMessage(async (message) => {
  let limitApp;
  if (message.code === 'onActiveChange' && message.data?.name) {
    limitApp = [message.data?.name];
  }
  triggerApplicationHooks(message.code, message.data, limitApp);
});

chrome.alarms.onAlarm.addListener((opt) => {
  triggerApplicationHooks('onAlarms', opt);
});

chrome.contextMenus.onClicked.addListener((e, tab) => {
  triggerApplicationHooks('onContextMenusClick', { e, tab });
});

chrome.tabs.onUpdated.addListener((...opt) => {
  triggerApplicationHooks('onTabUpdate', opt);
});

const { add } = useAlarmManger();

add('refresh-token', { periodInMinutes: 60 });
