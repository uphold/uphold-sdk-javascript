export default class CacheStorage {
  constructor(cache = {}) {
    this.cache = cache;
  }

  getItem(key) {
    const cachedItem = this.cache[key];

    return cachedItem ? Promise.resolve(cachedItem) : Promise.reject(new Error('Item not found'));
  }

  removeItem(key) {
    delete this.cache[key];

    return Promise.resolve();
  }

  setItem(key, value) {
    this.cache[key] = value;

    return Promise.resolve();
  }
}
