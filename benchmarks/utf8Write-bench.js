const Benchtable = require('benchtable');
const suite = new Benchtable;

function utf8Write(arr, offset, str) {
  let c = 0;
  for (let i = 0, l = str.length; i < l; i++) {
    c = str.charCodeAt(i);
    if (c < 0x80) {
      arr[offset++] = c;
    } else if (c < 0x800) {
      arr[offset++] = 0xc0 | (c >> 6);
      arr[offset++] = 0x80 | (c & 0x3f);
    } else if (c < 0xd800 || c >= 0xe000) {
      arr[offset++] = 0xe0 | (c >> 12);
      arr[offset++] = 0x80 | (c >> 6) & 0x3f;
      arr[offset++] = 0x80 | (c & 0x3f);
    } else {
      i++;
      c = 0x10000 + (((c & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
      arr[offset++] = 0xf0 | (c >> 18);
      arr[offset++] = 0x80 | (c >> 12) & 0x3f;
      arr[offset++] = 0x80 | (c >> 6) & 0x3f;
      arr[offset++] = 0x80 | (c & 0x3f);
    }
  }
}

const buffer = Buffer.allocUnsafe(64);
const base = '12345€';

suite
  .addFunction('utf8Write', (str) => {
    utf8Write(buffer, 0, str);
  })
  .addFunction('buffer.write', (str, len) => {
    buffer.write(str, 0, len, 'utf8');
  })

  .addInput('8', [ base, 8 ])
  .addInput('16', [ base.repeat(2), 16 ])
  .addInput('32', [ base.repeat(4), 32 ])
  .addInput('64', [ base.repeat(8), 64 ])

  .on('complete', function () {
    console.log(this.table.toString());
  })
  .run({ async: true });
