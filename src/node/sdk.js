import { CacheStorage, RequestClient } from './services';
import SDK from '../core';

export default class extends SDK {

  constructor() {
    super(...arguments);

    this.client = new RequestClient();
    this.storage = new CacheStorage();
  }

}
