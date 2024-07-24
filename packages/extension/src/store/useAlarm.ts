import { StorageKit } from '@core/store';
const STORE_KEY = 'AppAlarm';

export interface AlarmInfo {
  name: string;
  alarmInfo: chrome.alarms.AlarmCreateInfo;
}

export interface AlarmStore {
  alarms: AlarmInfo[];
  enabled: boolean;
}

const defaultStore = (): AlarmStore => {
  return { alarms: [], enabled: false };
};

export const useAlarm = () => {
  const storageKit = StorageKit.getInstance<AlarmStore>(
    STORE_KEY,
    defaultStore(),
  );

  const add = (name: string, alarmInfo: chrome.alarms.AlarmCreateInfo) => {
    storageKit.storeRaw.value.alarms.push({ name, alarmInfo });
    storageKit.save();
    return chrome.alarms.create(name, alarmInfo);
  };

  const remove = (name: string) => {
    storageKit.storeRaw.value.alarms = storageKit.store.alarms?.filter(
      (n) => n.name !== name,
    );
    storageKit.save();
    return chrome.alarms.clear(name);
  };

  return {
    add,
    remove,
  };
};
