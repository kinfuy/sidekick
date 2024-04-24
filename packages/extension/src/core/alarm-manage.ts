import { ref } from 'vue';

const store = ref();
export const useAlarmManger = () => {
  const add = (name: string, alarmInfo: chrome.alarms.AlarmCreateInfo) => {
    return chrome.alarms.create(name, alarmInfo);
  };

  const find = () => {};
  const deleteAlarm = () => {};
  const update = () => {};
  return {
    store,
    add,
    find,
    deleteAlarm,
    update,
  };
};
