const Benchtable = require('benchtable');
const suite = new Benchtable;

function utf8Length(str) {
  let c = 0, length = 0;
  for (let i = 0, l = str.length; i < l; i++) {
    c = str.charCodeAt(i);
    if (c < 0x80) {
      length += 1;
    } else if (c < 0x800) {
      length += 2;
    } else if (c < 0xd800 || c >= 0xe000) {
      length += 3;
    } else {
      i++;
      length += 4;
    }
  }
  return length;
}

const base = '12345€';

suite
  .addFunction('utf8Length', (str) => {
    utf8Length(str);
  })
  .addFunction('buffer.byteLength', (str) => {
    Buffer.byteLength(str);
  })

  .addInput('8', [ base ])
  .addInput('16', [ base.repeat(2) ])
  .addInput('32', [ base.repeat(4) ])
  .addInput('64', [ base.repeat(8) ])

  .on('complete', function () {
    console.log(this.table.toString());
  })
  .run({ async: true });
