import { CookieStorage, FetchClient } from './services';
import SDK from '../core';

export default class extends SDK {

  constructor() {
    super(...arguments);

    this.client = new FetchClient();
    this.storage = new CookieStorage(this.options.storageName);
  }

}
