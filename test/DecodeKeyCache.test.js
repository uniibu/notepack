'use strict';

const expect = require('chai').expect;
const DecodeKeyCache = require('../lib/DecodeKeyCache');

describe('DecodeKeyCache', () => {
  it('should get/set values', () => {
    const cache = new DecodeKeyCache();
    cache.set(Buffer.from([1, 1]), 0, 2, '11');
    cache.set(Buffer.from([1, 2]), 0, 2, '12');
    cache.set(Buffer.from([1, 2, 3]), 0, 3, '123');
    cache.set(Buffer.from([1, 2, 3, 4]), 1, 2, '23');

    expect(cache.get(Buffer.from([1, 1]), 0, 2)).to.equal('11');
    expect(cache.get(Buffer.from([1, 2, 3, 4]), 0, 2)).to.equal('12');
    expect(cache.get(Buffer.from([0, 1, 2, 3, 4]), 2, 2)).to.equal('23');
    expect(cache.get(Buffer.from([1, 3]), 0, 1)).to.equal(false);
    expect(cache.get(null, null, 17)).to.equal(false);
  });

  it('should respect maxLength limit', () => {
    const cache = new DecodeKeyCache({ maxLength: 3 });
    cache.set(Buffer.from([1]), 0, 1, '1');
    cache.set(Buffer.from([1, 2]), 0, 2, '12');
    cache.set(Buffer.from([1, 2, 3]), 0, 3, '123');
    cache.set(Buffer.from([1, 2, 3, 4]), 0, 4, '1234');

    expect(cache.size).to.equal(3);
    expect(cache.get(Buffer.from([1, 2, 3, 4]), 0, 4)).to.equal(false);
  });

  it('should respect maxSize limit', () => {
    const cache = new DecodeKeyCache({ maxSize: 2 });
    cache.set(Buffer.from([1]), 0, 1, '1');
    cache.set(Buffer.from([1, 2]), 0, 2, '12');
    cache.set(Buffer.from([1, 2, 3]), 0, 3, '123');
    cache.set(Buffer.from([1, 2, 3, 4]), 0, 4, '1234');

    expect(cache.size).to.equal(2);
    expect(cache.get(Buffer.from([1, 2, 3]), 0, 3)).to.equal(false);
  });

});

