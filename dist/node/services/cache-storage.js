'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class CacheStorage {
  constructor() {
    let cache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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
exports.default = CacheStorage;