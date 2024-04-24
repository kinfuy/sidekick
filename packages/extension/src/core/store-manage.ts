import { getStoreKey, injectPostMessage, setStore } from '@utils';
export const useStoreProxy = (isInject = false) => {
  if (isInject) {
    return {
      setStore: (store: object) => {
        injectPostMessage({
          code: 'set-store',
          from: 'baichuan_inject',
          data: store,
        });
      },
      getStoreKey,
    };
  }
  return {
    setStore,
    getStoreKey,
  };
};
