import { LocalStorageKey } from "models/models";

interface DataWithExpiry<T> {
  value: T;
  expiry: number;
}

export const setWithExpiry = <T>(
  key: LocalStorageKey,
  value: T,
  ttl: number
) => {
  const item: DataWithExpiry<T> = {
    value: value,
    expiry: new Date().getTime() + ttl,
  };
  saveLocalStorage(key, JSON.stringify(item));
};

export const getWithExpiry = <T>(key: LocalStorageKey): T | null => {
  const item = getLocalStorage<DataWithExpiry<T>>(key);
  if (!item) {
    return null;
  }
  const isExpired = new Date().getTime() > item.expiry;

  if (isExpired) {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
      return null;
    }
  }

  return item.value;
};

export const getLocalStorage = <T>(key: LocalStorageKey): T | null => {
  if (typeof window !== "undefined") {
    const dataInLocalstorage = localStorage.getItem(key);
    try {
      return dataInLocalstorage ? JSON.parse(dataInLocalstorage) : null;
    } catch {
      return dataInLocalstorage as unknown as T;
    }
  }
};

export const saveLocalStorage = (key: LocalStorageKey, data: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, data);
  }
};
