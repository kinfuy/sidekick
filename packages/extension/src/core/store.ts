import { storage } from '@utils';
import {  ref, toRaw } from 'vue';

interface StoreInstance<T> {
  store: T;
  version: number;
  update_key: string;
}

const { get, set } = storage;

export class StorageKit<K> {
  private _store = ref({
    store: {} as K,
    version: 0,
    update_key: 'NOT_INIT',
  });

  private store_key: string;

  private defaultValue: K;

  constructor(key: string, defaultValue: K) {
    this.defaultValue = defaultValue;
    this.store_key = 'STORAGE_KIT_' + key;
    this.init();
  }

  syncStore(changes: any, namespace: string) {
    if (namespace === 'local' && changes[this.store_key]) {
      this.sync();
    }
  }

  sync() {
    get<StoreInstance<K>>(this.store_key).then((res) => {
      if (res && JSON.stringify(res) !== '{}') {
        if (res.update_key !== this._store.value.update_key) {
          this._store.value.store = res.store as any;
          this._store.value.version = res.version;
          this._store.value.update_key = res.update_key;
        }
      } else {
        this._store.value.store = this.defaultValue as any;
        this._store.value.version = 1;
        this._store.value.update_key = this.store_key + Date.now().toString();
        set(this.store_key, JSON.stringify(this._store.value));
      }
    });
  }

  save() {
    this._store.value.update_key = this.store_key + Date.now().toString();
    set(this.store_key, JSON.stringify(toRaw(this._store)));
  }

  private init() {
    chrome.storage.onChanged.addListener(this.syncStore);
    this.sync();
  }

  purge() {
    chrome.storage.onChanged.removeListener(this.syncStore);
  }

  get store() {
    if(this._store.value?.update_key!=='NOT_INIT'){
      return this._store.value.store
    }
    return this.defaultValue
  }
}
