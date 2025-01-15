import { StorageKit } from '@core/store';
import { computed } from 'vue';

export interface ResponseRule {
  headers?: Record<string, string>;
  body?: any;
  stream?: any;
  status?: number;
}

export interface RequestRule {
  headers?: Record<string, string>;
  body?: any;
  stream?: any;
}

export type MatchType = 'contains' | 'equals' | 'regex';

export interface MatchRule {
  matchType: MatchType;
  value: string;
}

export interface RedirectRule {
  url: string;
}

export interface ProxyRule {
  id: string;
  priority: number;
  url?: MatchRule;
  match: MatchRule;
  redirect?: RedirectRule;
  response?: ResponseRule;
  request?: RequestRule;
}

export interface ApiRecord {
  id: string; // method + url
  method: string;
  url: string;
  status: number;
  timestamp: number;
  request: {
    headers?: Record<string, string>;
    body?: any;
    stream?: any;
  };
  response: {
    headers?: Record<string, string>;
    body?: any;
    stream?: any;
  };
}

export interface ApiProxyStore {
  isCatch: boolean;
  catchRecords: ApiRecord[];
  rules: ProxyRule[];
  version: string;
}

const STORE_KEY = 'ApiProxy';

export const useApiProxyStore = () => {
  const storageKit = StorageKit.getInstance<ApiProxyStore>(STORE_KEY, {
    isCatch: false,
    catchRecords: [],
    rules: [],
    version: '1.0.0',
  });

  const rules = computed(() => storageKit.store.rules ?? []);

  const getMatchUrlRules = (url: string) => {
    return rules.value?.filter((rule) => {
      if (rule.match.matchType === 'contains') {
        return rule.match.value.includes(url);
      } else if (rule.match.matchType === 'equals') {
        return rule.match.value === url;
      } else if (rule.match.matchType === 'regex') {
        return new RegExp(rule.match.value).test(url);
      }
      return false;
    });
  };

  const catchRecords = computed(() => storageKit.store.catchRecords || []);

  const setCatchRecords = (records: ApiRecord[]) => {
    storageKit.store.catchRecords = records;
    storageKit.save();
  };

  const isCatch = computed(() => storageKit.store.isCatch);

  const setIsCatch = (isCatch: boolean) => {
    storageKit.store.isCatch = isCatch;
    storageKit.save();
  };

  return {
    rules,
    catchRecords,
    getMatchUrlRules,
    setCatchRecords,
    isCatch,
    setIsCatch,
  };
};
