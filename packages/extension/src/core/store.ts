import { storage } from '@utils';
import { ref, toRaw } from 'vue';

interface StoreInstance<T> {
  store: T;
  version: number;
  update_key: string;
}

const { get, set } = storage;

export class StorageKit<K> {
  private static instances = new Map<string, any>();

  private version = ref(0);
  private update_key = ref('NOT_INIT');
  public storeRaw = ref({} as K);

  private _key: string;

  private defaultValue: K;

  private constructor(key: string, defaultValue: K) {
    this.defaultValue = defaultValue;
    this._key = `StorageKit_${key}`;
    this.init();
  }

  get inited() {
    return this.update_key.value !== 'NOT_INIT';
  }

  public static getInstance<K>(key: string, defaultValue: K) {
    if (!this.instances || !this.instances.has(key)) {
      this.instances.set(key, new StorageKit(key, defaultValue));
    }
    return this.instances.get(key) as StorageKit<K>;
  }

  public static async clearStorage(key: string) {
    await storage.remove(`StorageKit_${key}`);
  }

  syncStore(changes: any, namespace: string) {
    if (namespace === 'local' && changes[this._key]) {
      this.sync();
    }
  }

  async save(value?: K) {
    this.update_key.value = this._key + Date.now().toString();
    const raw = {
      store: value ?? toRaw(this.storeRaw.value),
      version: toRaw(this.version.value),
      update_key: toRaw(this.update_key.value),
    };
    await set(this._key, JSON.stringify(raw));
    await this.sync();
  }

  async sync() {
    get<StoreInstance<K>>(this._key).then((res) => {
      if (res && JSON.stringify(res) !== '{}') {
        if (res.update_key !== this.update_key.value) {
          if (this.update_key.value === res.update_key) return;
          this.storeRaw.value = (res.store as any) ?? this.defaultValue;
          this.version.value = res.version ?? 1;
          this.update_key.value =
            res.update_key ?? this._key + Date.now().toString();
        }
      } else {
        this.storeRaw.value = this.defaultValue as any;
        this.version.value = 1;
        this.update_key.value = this._key + Date.now().toString();
        this.save();
      }
    });
  }

  private init() {
    chrome.storage.onChanged.addListener(this.syncStore.bind(this));
    this.sync();
  }

  purge() {
    chrome.storage.onChanged.removeListener(this.syncStore.bind(this));
  }

  get store() {
    if (this.inited) {
      return this.storeRaw.value ?? this.defaultValue;
    }
    return this.defaultValue;
  }

  setStore(data: K) {
    this.storeRaw.value = data as any;
    this.save();
  }

  clear() {
    this.storeRaw.value = this.defaultValue as any;
    this.save();
  }

  /**
   * 获取内存使用
   * @param key
   * @returns
   */
  static getStorageSize(key: string) {
    return chrome.storage.local.getBytesInUse(`StorageKit_${key}`);
  }
}
