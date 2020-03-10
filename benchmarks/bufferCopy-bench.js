const Benchtable = require('benchtable');
const suite = new Benchtable;

const buffer = Buffer.allocUnsafe(64);
const base = '12345€';

suite
  .addFunction('manual copy', (src, srcLength) => {
    for (let i = 0; i < srcLength; i++) {
      buffer[i] = src[i];
    }
  })
  .addFunction('buffer.copy', (src, srcLength) => {
    src.copy(buffer, 0, 0, srcLength)
  })

  .addInput('8', [ Buffer.from(base), 8 ])
  .addInput('16', [ Buffer.from(base.repeat(2)), 16 ])
  .addInput('32', [ Buffer.from(base.repeat(4)), 32 ])
  .addInput('64', [ Buffer.from(base.repeat(8)), 64 ])

  .on('complete', function () {
    console.log(this.table.toString());
  })
  .run({ async: true });
