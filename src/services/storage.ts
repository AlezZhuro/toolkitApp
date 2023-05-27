import {STORAGE_KEY} from '@/constants';
import {StorageType, StorageKey} from '@/models';


export const storage = {
  set<Type>(type: StorageType, key: StorageKey, value: Type) {
    try {
      const values = JSON.parse(window[type].getItem(STORAGE_KEY) ?? '{}') as Record<string, unknown>;
      values[key] = value;
      window[type].setItem(STORAGE_KEY, JSON.stringify(values));
    } catch {
      return;
    }
  },
  get<Type>(type: StorageType, key: StorageKey, defaultValue: Type): Type {
    try {
      const values = JSON.parse(window[type].getItem(STORAGE_KEY) ?? '{}') as Record<string, unknown>;
      return key in values ? (values[key] as Type) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  clear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      return;
    }
  },
};

export type StorageEntityType = typeof storage;
