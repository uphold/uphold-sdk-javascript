import { Client } from '../../../src/core';
import { name, version } from '../../../package.json';

describe('Client', () => {
  describe('constructor()', () => {
    it('should set `defaultHeaders` property', () => {
      expect(new Client().defaultHeaders).toEqual({ 'user-agent': `${name}/${version}` });
    });
  });
});
