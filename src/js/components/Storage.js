export default class Storage {
  constructor(storage) {
    this.storage = storage;
  }

  saveValueToStorage(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getStorageItem(key) {
    return JSON.parse(this.storage.getItem(key));
  }

  removeStorageItem(key) {
    this.storage.removeItem(key);
  }
}
