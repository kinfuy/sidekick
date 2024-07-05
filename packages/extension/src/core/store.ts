import { storage } from '@utils';
import { ref, toRaw } from 'vue';

interface StoreInstance<T> {
  store: T;
  version: number;
  update_key: string;
}

const { get, set } = storage;

export class StorageKit<K> {
  private static instance: any;

  private version = ref(0);
  private update_key = ref('NOT_INIT');
  private storeRaw = ref({} as K);

  private _key: string;

  private defaultValue: K;

  private constructor(key: string, defaultValue: K) {
    this.defaultValue = defaultValue;
    this._key = `STORAGE_KIT_${key}`;
    this.init();
  }

  get inited() {
    return this.update_key.value !== 'NOT_INIT';
  }

  public static getInstance<K>(key: string, defaultValue: K) {
    if (!StorageKit.instance) {
      StorageKit.instance = new StorageKit(key, defaultValue);
    }
    if (StorageKit.instance._key !== `STORAGE_KIT_${key}`) {
      StorageKit.instance = new StorageKit(key, defaultValue);
    }

    return StorageKit.instance as StorageKit<K>;
  }

  syncStore(changes: any, namespace: string) {
    if (namespace === 'local' && changes[this._key]) {
      this.sync();
    }
  }

  save() {
    this.update_key.value = this._key + Date.now().toString();
    const raw = {
      store: toRaw(this.storeRaw.value),
      version: toRaw(this.version.value),
      update_key: toRaw(this.update_key.value),
    };
    console.log('save', this.update_key.value, raw);
    set(this._key, JSON.stringify(raw)).finally(() => {
      this.sync();
    });
  }

  sync() {
    get<StoreInstance<K>>(this._key).then((res) => {
      if (res && JSON.stringify(res) !== '{}') {
        if (res.update_key !== this.update_key.value) {
          if (this.update_key.value === res.update_key) return;
          this.storeRaw.value = (res.store as any) || this.defaultValue;
          this.version.value = res.version || 1;
          this.update_key.value =
            res.update_key || this._key + Date.now().toString();
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
    chrome.storage.onChanged.addListener(this.syncStore);
    this.sync();
  }

  purge() {
    chrome.storage.onChanged.removeListener(this.syncStore);
  }

  get store() {
    if (this.update_key.value !== 'NOT_INIT') {
      return this.storeRaw.value || this.defaultValue;
    }
    return this.defaultValue;
  }
}
