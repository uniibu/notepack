# notepack

[![Build Status](https://travis-ci.org/darrachequesne/notepack.svg?branch=master)](https://travis-ci.org/darrachequesne/notepack)
[![Coverage Status](https://coveralls.io/repos/github/darrachequesne/notepack/badge.svg?branch=master)](https://coveralls.io/github/darrachequesne/notepack?branch=master)

A fast [Node.js](http://nodejs.org) implementation of the latest [MessagePack](http://msgpack.org) [spec](https://github.com/msgpack/msgpack/blob/master/spec.md).

## Notes

* This implementation is not backwards compatible with those that use the older spec. It is recommended that this library is only used in isolated systems.
* `undefined` is encoded as `fixext 1 [0, 0]`, i.e. `<Buffer d4 00 00>`
* `Date` objects are encoded as `fixext 8 [0, ms]`, e.g. `new Date('2000-06-13T00:00:00.000Z')` => `<Buffer d7 00 00 00 00 df b7 62 9c 00>`
* `ArrayBuffer` are encoded as `ext 8/16/32 [0, data]`, e.g. `Uint8Array.of(1, 2, 3, 4)` => `<Buffer c7 04 00 01 02 03 04>`

## Install

```
npm install notepack.io
```

## Usage

```js
var notepack = require('notepack.io');

var encoded = notepack.encode({ foo: 'bar'}); // <Buffer 81 a3 66 6f 6f a3 62 61 72>
var decoded = notepack.decode(encoded); // { foo: 'bar' }
```

## Browser

A browser version of notepack is also available (2.0 kB minified/gzipped)

```html
<script src="https://unpkg.com/notepack.io@2.2.0/dist/notepack.min.js"></script>
<script>
  console.log(notepack.decode(notepack.encode([1, '2', new Date()])));
  // [1, "2", Thu Dec 08 2016 00:00:01 GMT+0100 (CET)]
</script>
```

## Performance

Performance is currently comparable to msgpack-node (which presumably needs optimizing and suffers from JS-native overhead) and is significantly faster than other implementations. Several micro-optimizations are used to improve the performance of short string and Buffer operations.

The `./benchmarks/run` output on my machine is:

```
$ node -v
v6.9.1
$ ./benchmarks/run
Encoding (this will take a while):
+----------------------------+-------------------+-----------------+----------------+---------------+
|                            │ tiny              │ small           │ medium         │ large         |
+----------------------------+-------------------+-----------------+----------------+---------------+
| notepack                   │ 2,298,552 ops/sec │ 459,310 ops/sec │ 33,049 ops/sec │ 188 ops/sec   |
+----------------------------+-------------------+-----------------+----------------+---------------+
| msgpack-js                 │ 138,198 ops/sec   │ 90,052 ops/sec  │ 8,850 ops/sec  │ 106 ops/sec   |
+----------------------------+-------------------+-----------------+----------------+---------------+
| msgpack-lite               │ 507,929 ops/sec   │ 169,012 ops/sec │ 17,823 ops/sec │ 215 ops/sec   |
+----------------------------+-------------------+-----------------+----------------+---------------+
| JSON.stringify (to Buffer) │ 1,076,485 ops/sec │ 275,717 ops/sec │ 14,762 ops/sec │ 25.50 ops/sec |
+----------------------------+-------------------+-----------------+----------------+---------------+
Decoding (this will take a while):
+--------------------------+-------------------+-----------------+----------------+---------------+
|                          │ tiny              │ small           │ medium         │ large         |
+--------------------------+-------------------+-----------------+----------------+---------------+
| notepack                 │ 1,518,126 ops/sec │ 333,322 ops/sec │ 26,928 ops/sec │ 220 ops/sec   |
+--------------------------+-------------------+-----------------+----------------+---------------+
| msgpack-js               │ 1,158,749 ops/sec │ 264,792 ops/sec │ 20,272 ops/sec │ 197 ops/sec   |
+--------------------------+-------------------+-----------------+----------------+---------------+
| msgpack-lite             │ 544,397 ops/sec   │ 110,076 ops/sec │ 9,598 ops/sec  │ 153 ops/sec   |
+--------------------------+-------------------+-----------------+----------------+---------------+
| JSON.parse (from Buffer) │ 1,170,084 ops/sec │ 382,815 ops/sec │ 23,544 ops/sec │ 41.33 ops/sec |
+--------------------------+-------------------+-----------------+----------------+---------------+
* Note that JSON is provided as an indicative comparison only
```

## License

MIT
