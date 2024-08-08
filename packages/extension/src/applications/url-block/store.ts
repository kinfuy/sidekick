import { StorageKit } from '@core/store';
import { computed } from 'vue';
import type { XOR } from '@/types/util.type';
const STORE_KEY = 'UrlBlock';

export interface UrlMatch {
  type: 'string' | 'regex';
  value: string | string[];
}

export type Engine = 'sogou' | 'google' | '360' | 'baidu' | 'bing';

export interface CssSelectNode {
  selector: string;
  path: string;
}
export interface AttributeNode {
  selector: string;
  attribute: string;
}

export type TargetNode = XOR<CssSelectNode, AttributeNode>;
export interface EngineQuery {
  target: TargetNode;
  container: string;
}

export interface BlockUrl extends UrlMatch {
  id: string;
  title: string;
  enable: boolean;
}
export interface UrlBlockStore {
  engines: {
    engine: Engine;
    url: UrlMatch;
    query: EngineQuery;
    delay?: number;
  }[];
  blackList: BlockUrl[];
}

const defaultStore = (): UrlBlockStore => {
  return {
    engines: [
      {
        engine: 'google',
        url: {
          type: 'string',
          value: 'google.com',
        },
        query: {
          target: {
            selector: 'cite',
            path: 'firstChild.nodeValue',
          },
          container: '.MjjYud',
        },
      },
      {
        engine: 'baidu',
        url: {
          type: 'string',
          value: 'baidu.com',
        },
        delay: 2000,
        query: {
          target: {
            selector: '.result.c-container',
            attribute: 'mu',
          },
          container: '.result.c-container',
        },
      },
      {
        engine: 'bing',
        url: {
          type: 'string',
          value: 'bing.com',
        },
        query: {
          target: {
            selector: 'cite',
            path: 'firstChild.nodeValue',
          },
          container: '.b_algo',
        },
      },
      {
        engine: 'sogou',
        url: {
          type: 'string',
          value: 'sogou.com',
        },
        query: {
          target: {
            selector: 'div.citeurl>span:nth-last-child(2)',
            path: 'firstChild.nodeValue',
          },
          container: '.vrwrap',
        },
      },
      {
        engine: '360',
        url: {
          type: 'string',
          value: 'www.so.com',
        },
        query: {
          target: {
            selector: '.g-linkinfo-a',
            path: 'firstChild.nodeValue',
          },
          container: '.res-list',
        },
      },
    ],
    blackList: [
      {
        id: '1',
        title: 'CSDN',
        type: 'string',
        value: ['blog.csdn.net', 'wenku.csdn.net'],
        enable: true,
      },
      {
        id: '2',
        title: '腾讯云',
        type: 'string',
        value: 'cloud.tencent.com',
        enable: true,
      },
      {
        id: '3',
        title: '阿里云',
        type: 'string',
        value: ['www.aliyun.com', 'developer.aliyun.com'],
        enable: true,
      },
    ],
  };
};
export const useUrlBlockStore = () => {
  const storageKit = StorageKit.getInstance<UrlBlockStore>(
    STORE_KEY,
    defaultStore(),
  );

  const blackList = computed(() => {
    return storageKit.store.blackList;
  });

  const enableBlackList = computed(() => {
    return storageKit.store.blackList.filter((b) => b.enable);
  });

  const engines = computed(() => {
    return storageKit.store.engines;
  });

  const getEnfineConfig = (url: string) => {
    for (const engine of storageKit.store.engines) {
      if (engine.url.type === 'string') {
        if (Array.isArray(engine.url.value)) {
          if (engine.url.value.includes(url)) {
            return engine;
          }
        } else if (url.includes(engine.url.value)) {
          return engine;
        }
      }
      if (engine.url.type === 'regex') {
        if (Array.isArray(engine.url.value)) {
          return engine.url.value.some((v) => url.match(v))
            ? engine
            : undefined;
        } else {
          return url.match(engine.url.value) ? engine : undefined;
        }
      }
    }
  };

  const inited = computed(() => {
    return storageKit.inited;
  });

  const setBlock = async (id: string, enable: boolean) => {
    await storageKit.sync();
    while (!storageKit.inited) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    storageKit.storeRaw.value.blackList =
      storageKit.storeRaw.value.blackList.map((b) => {
        if (b.id === id) {
          b.enable = enable;
        }
        return b;
      });
    storageKit.save();
  };

  const update = async (item: BlockUrl) => {
    while (!storageKit.inited) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    if (storageKit.storeRaw.value.blackList.some((b) => b.id === item.id)) {
      storageKit.storeRaw.value.blackList =
        storageKit.storeRaw.value.blackList.map((b) => {
          if (b.id === item.id) {
            b = item;
          }
          return b;
        });
    } else {
      storageKit.storeRaw.value.blackList.push(item);
    }
    storageKit.save();
  };

  return {
    blackList,
    enableBlackList,
    engines,
    inited,
    getEnfineConfig,
    setBlock,
    update,
  };
};
