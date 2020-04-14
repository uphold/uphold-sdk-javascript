import { Client } from '../../../src/core';

describe('Client', () => {
  describe('constructor()', () => {
    it('should set `defaultHeaders` property', () => {
      expect(new Client().defaultHeaders).toEqual({});
    });
  });
});
