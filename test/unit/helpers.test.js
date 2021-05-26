/**
 * @fileoverview Test util/helpers.
 */

// const testLib = require('../lib/test.lib');
const helpers = require('../../app/utils/helpers');

describe('UNIT Helpers', () => {
  describe('splitString()', () => {
    test('Should return a single item', () => {
      const str = 'one two';
      const ret = helpers.splitString(str);

      expect(ret).toHaveLength(1);
      expect(ret[0]).toEqual(str);
    });
    test('Should return two items', () => {
      const str = 'one two';
      const ret = helpers.splitString(str, 4);

      expect(ret).toHaveLength(2);
      expect(ret[0]).toEqual('one ');
      expect(ret[1]).toEqual('two');
    });
  });
});
