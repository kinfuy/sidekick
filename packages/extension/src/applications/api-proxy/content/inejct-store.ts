import { computed, ref } from 'vue';
import { injectPostMessage } from '@utils';
import { Message } from '@core/message';
import type { ApiRecord, ProxyRule } from '../store';

const store = ref({
  isCatch: false,
  effectiveRules: [] as ProxyRule[],
  apiRecord: [] as ApiRecord[],
});

// 节流
const throttle = (fn: () => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
};

export const useInjectStore = () => {
  const isCatch = computed(() => store.value.isCatch);
  const effectiveRules = computed(() => store.value.effectiveRules);
  const apiRecord = computed(() => store.value.apiRecord);

  const throttleSyncRecord = throttle(() => {
    injectPostMessage({
      from: Message.Form.INJECT_MESSAGE,
      to: Message.Form.CONTENT_MESSAGE,
      code: 'onCustomAction',
      data: {
        key: 'api_records',
        data: {
          records: JSON.parse(JSON.stringify(apiRecord.value)),
        },
      },
    });
  }, 1000);

  const setIsCatch = (value: boolean) => {
    store.value.isCatch = value;
  };

  const setEffectiveRules = (value: ProxyRule[]) => {
    store.value.effectiveRules = value;
  };

  const updateRecord = (
    record: Partial<ApiRecord> & { url: string; method: string },
  ) => {
    const id = `${record.method}:${record.url}`;
    const index = store.value.apiRecord.findIndex((record) => record.id === id);
    if (index !== -1) {
      const oldRecord = store.value.apiRecord[index];
      const newRecord = {
        ...oldRecord,
        request: record.request
          ? { ...oldRecord.request, ...record.request }
          : oldRecord.request,
        response: record.response
          ? { ...oldRecord.response, ...record.response }
          : oldRecord.response,
      };

      Object.keys(record).forEach((key) => {
        if (key !== 'request' && key !== 'response') {
          (newRecord as any)[key] = (record as any)[key];
        }
      });
      store.value.apiRecord[index] = newRecord;
    } else {
      store.value.apiRecord.push({
        id,
        status: record.status || 200,
        timestamp: record.timestamp || Date.now(),
        request: {
          headers: record.request?.headers,
          body: record.request?.body,
          stream: record.request?.stream,
        },
        response: {
          headers: record.response?.headers,
          body: record.response?.body,
          stream: record.response?.stream,
        },
        ...record,
      });
    }
    throttleSyncRecord();
  };

  const isMock = computed(() => {
    return store.value.effectiveRules.length > 0;
  });

  const isProxy = computed(() => {
    return store.value.isCatch || isMock.value;
  });

  const getRule = (
    url: string,
    type: 'requestHeader' | 'requestBody' | 'responseHeader' | 'responseBody',
  ) => {
    const rules = store.value.effectiveRules.filter((rule) => {
      if (rule.match.matchType === 'contains') {
        return url.includes(rule.match.value);
      }
      if (rule.match.matchType === 'equals') {
        return url === rule.match.value;
      }
      if (rule.match.matchType === 'regex') {
        return new RegExp(rule.match.value).test(url);
      }
      return false;
    });
    const matchRule = rules.sort((a, b) => b.priority - a.priority)[0];
    if (matchRule) {
      switch (type) {
        case 'requestHeader':
          return matchRule.request?.headers;
        case 'requestBody':
          return matchRule.request?.body;
        case 'responseHeader':
          return matchRule.response?.headers;
        case 'responseBody':
          return matchRule.response?.body;
      }
    }
    return null;
  };

  const clearRecord = (): void => {
    store.value.apiRecord = [];
    throttleSyncRecord();
  };

  return {
    apiRecord,
    isCatch,
    setIsCatch,
    effectiveRules,
    setEffectiveRules,
    updateRecord,
    isMock,
    isProxy,
    getRule,
    store,
    clearRecord,
  };
};
