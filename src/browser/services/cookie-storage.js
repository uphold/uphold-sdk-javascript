export default class CookieStorage {

  constructor(storageName = '_token') {
    this.cache = {};
    this.storageName = storageName;
  }

  getItem(key) {
    if (this.cache[key]) {
      return Promise.resolve(this.cache[key]);
    }

    const data = this._getCookie();

    if (!data[key]) {
      return Promise.reject();
    }

    this.cache[key] = data[key];

    return Promise.resolve(data[key]);
  }

  removeItem(key) {
    const data = this._getCookie();

    if (!data[key]) {
      return Promise.resolve();
    }

    delete this.cache[key];
    delete data[key];

    this._setCookie(data);

    return Promise.resolve();
  }

  setItem(key, value) {
    const data = this._getCookie();

    delete this.cache[key];

    data[key] = value;

    this._setCookie(data);

    return Promise.resolve();
  }

  _getCookie() {
    const data = new RegExp(`(?:^|; )${encodeURIComponent(this.storageName)}=([^;]*)`).exec(document.cookie);

    return data ? JSON.parse(decodeURIComponent(data[1])) : {};
  }

  _setCookie(data) {
    document.cookie = `${this.storageName}=${encodeURIComponent(JSON.stringify(data))};path=/`;
  }

}
