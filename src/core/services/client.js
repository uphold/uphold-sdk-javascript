import { name, version } from '../../../package.json';

export default class Client {
  constructor() {
    this.defaultHeaders = { 'user-agent': `${name}/${version}` };
  }
}
