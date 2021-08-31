/**
 * @fileoverview Test util/helpers.
 */

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

  describe('stdQuote()', () => {
    const allQuotes = [
      ['“', 'U+201c'],
      ['”', 'U+201d'],
      ['«', 'U+00AB'],
      ['»', 'U+00BB'],
      ['„', 'U+201E'],
      ['‟', 'U+201F'],
      ['❝', 'U+275D'],
      ['❞', 'U+275E'],
      ['〝', 'U+301D'],
      ['〞', 'U+301E'],
      ['〟', 'U+301F'],
      ['＂', 'U+FF02'],
    ];

    allQuotes.forEach(([altQuote, utfCode]) => {
      test(`Will properly normalize for quote ${altQuote} with UTF Code: ${utfCode}`, () => {
        const str = `A string ${altQuote}with an alt quote${altQuote}`;
        const normalizedStr = helpers.stdQuote(str);
        expect(normalizedStr).toEqual('A string "with an alt quote"');
      });
    });
  });

  describe('indexArrayToObject', () => {
    test('Should properly index an array', () => {
      const testAr = [
        { id: 1, name: 'thanos' },
        { id: 2, name: 'watchit' },
      ];
      const indexedObj = helpers.indexArrayToObject(testAr, 'name');

      expect(indexedObj).toBeObject();
      expect(indexedObj).toContainAllKeys(['thanos', 'watchit']);
      expect(indexedObj.thanos).toContainAllKeys(['id', 'name']);
      expect(indexedObj.thanos.id).toEqual(1);
      expect(indexedObj.thanos.name).toEqual('thanos');
    });
  });
  describe('indexArrayToObjectAr', () => {
    test('Should properly index an array', () => {
      const testAr = [
        { id: 1, name: 'thanos' },
        { id: 2, name: 'watchit' },
        { id: 3, name: 'watchit' },
      ];
      const indexedObj = helpers.indexArrayToObjectAr(testAr, 'name');

      expect(indexedObj).toBeObject();
      expect(indexedObj).toContainAllKeys(['thanos', 'watchit']);
      expect(indexedObj.thanos).toBeArray();
      expect(indexedObj.thanos).toHaveLength(1);
      expect(indexedObj.thanos[0]).toContainAllKeys(['id', 'name']);
      expect(indexedObj.thanos[0].id).toEqual(1);
      expect(indexedObj.thanos[0].name).toEqual('thanos');

      expect(indexedObj.watchit).toBeArray();
      expect(indexedObj.watchit).toHaveLength(2);
      expect(indexedObj.watchit[0]).toContainAllKeys(['id', 'name']);
      expect(indexedObj.watchit[0].id).toEqual(2);
      expect(indexedObj.watchit[0].name).toEqual('watchit');
      expect(indexedObj.watchit[1].id).toEqual(3);
      expect(indexedObj.watchit[1].name).toEqual('watchit');
    });
  });
});
