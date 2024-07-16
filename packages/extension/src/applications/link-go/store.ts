import { StorageKit } from '@core/store';
import { computed } from 'vue';

const STORE_KEY = 'LinkGo';

export interface LinkRule {
  type: 'string' | 'regex';
  value: string;
  description?: string;
}
export interface LinkGoStoreInstance {
  linkRules: LinkRule[];
}

const defaultStore = (): LinkGoStoreInstance => {
  return {
    linkRules: [
      {
        type: 'string',
        value: 'target',
        description:
          'http://xxx.cn?target=https://devtester.kinfuy.cn => https://devtester.kinfuy.cn',
      },
      {
        type: 'string',
        value: 'url',
        description:
          'https://xxx.cn?url=https://devtester.kinfuy.cn => https://devtester.kinfuy.cn',
      },
      {
        type: 'regex',
        value: 'transfer?(?<target>.+)', // https://blog.51cto.com/
        description:
          'https://www.xxx.com/transfer?https://devtester.kinfuy.cn => https://devtester.kinfuy.cn',
      },
    ],
  };
};

export const useLinkGoStore = () => {
  const storageKit = StorageKit.getInstance<LinkGoStoreInstance>(
    STORE_KEY,
    defaultStore(),
  );
  storageKit.clear();

  const addRule = async (rule: LinkRule) => {
    const isexist = storageKit.store.linkRules.find(
      (r) => r.type === rule.type && r.value === rule.value,
    );
    if (isexist) return false;
    storageKit.storeRaw.value.linkRules.push(JSON.parse(JSON.stringify(rule)));
    storageKit.save();
    return true;
  };

  const setRules = async (rules: LinkRule[]) => {
    storageKit.storeRaw.value.linkRules = rules;
    storageKit.save();
  };

  const removeRule = async (rule: LinkRule) => {
    storageKit.storeRaw.value.linkRules = storageKit.store.linkRules.filter(
      (r) => !(r.type === rule.type && r.value === rule.value),
    );
    storageKit.save();
  };

  const rules = computed(() => {
    return storageKit.store.linkRules;
  });

  const parseUrl = (url: string, filed: LinkRule) => {
    if (filed.type === 'string') {
      const urlObject = new URL(url);
      const urlParamRes = urlObject.searchParams.get(filed.value);
      return urlParamRes;
    }
    if (filed.type) {
      try {
        const reg = new RegExp(filed.value);
        const match = url.match(reg);
        if (match?.groups && match.groups.target) {
          return match?.groups.target.replace(/^\?/, '');
        }
      } catch (error) {
        return undefined;
      }
    }
    return undefined;
  };

  const inited = computed(() => {
    return storageKit.inited;
  });

  return {
    addRule,
    setRules,
    rules,
    parseUrl,
    inited,
    removeRule,
  };
};
