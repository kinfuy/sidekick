import { storage } from '@utils';
import { computed, ref, toRaw } from 'vue';

const STORE_KEY = 'linkGoStore';

interface LinkRule {
  type: 'string' | 'regex';
  value: string;
}
export interface LinkGoStoreInstance {
  linkRules: LinkRule[];
}

const store = ref<LinkGoStoreInstance>({
  linkRules: [
    {
      type: 'string',
      value: 'target',
    },
    {
      type: 'string',
      value: 'url',
    },
    {
      type: 'regex',
      value: '/transfer?(?<target>.+)/', // https://blog.51cto.com/
    },
  ],
});
export const useLinkGoStore = () => {
  const { get, set } = storage;
  const save = () => {
    set(STORE_KEY, JSON.stringify(toRaw(store.value)));
  };
  const sync = async () => {
    let _store: LinkGoStoreInstance = {
      linkRules: [],
    };
    const devAccount = await get<LinkGoStoreInstance>(STORE_KEY);
    if (devAccount && JSON.stringify(devAccount) !== '{}') {
      _store = devAccount;
    }
    store.value = _store;
  };

  sync();

  const addRule = async (rule: LinkRule) => {
    const isexist = store.value.linkRules.find(
      (r) => r.type === rule.type && r.value === rule.value,
    );
    if (isexist) return;
    store.value.linkRules.push(rule);
    save();
  };

  const setRules = async (rules: LinkRule[]) => {
    store.value.linkRules = rules;
    save();
  };

  const rules = computed(() => {
    return store.value.linkRules;
  });

  const parseUrl = (url: string, filed: LinkRule) => {
    if (filed.type === 'string') {
      const urlObject = new URL(url);
      const urlParamRes = urlObject.searchParams.get(filed.value);
      return urlParamRes;
    }
    if (filed.type) {
      const match = url.match(filed.type);
      if (match?.groups && match.groups.target) return match?.groups.target;
    }
    return undefined;
  };

  return {
    addRule,
    setRules,
    rules,
    parseUrl,
  };
};
