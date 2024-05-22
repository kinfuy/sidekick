import { storage } from '@utils';
import { ref, toRaw } from 'vue';

const STORE_KEY = 'alarmManager';

export interface AlarmInfo {
  name: string;
  alarmInfo: chrome.alarms.AlarmCreateInfo;
}

export interface AlarmInfoStoreInstance {
  alarms: AlarmInfo[];
  enabled: boolean;
}

const store = ref<AlarmInfoStoreInstance>({
  enabled: false,
  alarms: [],
});

export const useAlarmManger = () => {
  const { get, set } = storage;

  const save = () => {
    set(STORE_KEY, JSON.stringify(toRaw(store.value)));
  };

  const sync = async () => {
    let _store: AlarmInfoStoreInstance = {
      alarms: [],
      enabled: false,
    };
    const alarm = await get<AlarmInfoStoreInstance>(STORE_KEY);
    if (alarm && JSON.stringify(alarm) !== '{}') {
      _store = alarm;
    }
    store.value = _store;

    if (store.value.enabled) {
      store.value.alarms.forEach(async (a) => {
        const alarm = await chrome.alarms.get(a.name);
        if (!alarm) {
          await chrome.alarms.create(a.name, a.alarmInfo);
          store.value.enabled = true;
          save();
        }
      });
    }
  };

  const add = (name: string, alarmInfo: chrome.alarms.AlarmCreateInfo) => {
    store.value.alarms.push({ name, alarmInfo });
    save();
    return chrome.alarms.create(name, alarmInfo);
  };

  const find = () => {};
  const deleteAlarm = () => {};
  const update = () => {};

  sync();

  return {
    store,
    add,
    find,
    deleteAlarm,
    update,
  };
};
