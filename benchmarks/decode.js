var notepack = require('../');
var msgpackJs = require('msgpack-js');
var data = require('./data');

var Benchtable = require('benchtable');

var suite = new Benchtable;

suite
.addFunction('notepack', function (m, js, node, json) {
  notepack.decode(m);
})
.addFunction('msgpack-js', function (m, js, node, json) {
  msgpackJs.decode(js);
})
// Note: JSON encodes buffers as arrays
.addFunction('JSON.parse (from Buffer)', function (m, js, node, json) {
  JSON.parse(json.toString());
})

.addInput('tiny', [notepack.encode(data.tiny), msgpackJs.encode(data.tiny), new Buffer(JSON.stringify(data.tiny))])
.addInput('small', [notepack.encode(data.small), msgpackJs.encode(data.small), new Buffer(JSON.stringify(data.small))])
.addInput('medium', [notepack.encode(data.medium), msgpackJs.encode(data.medium), new Buffer(JSON.stringify(data.medium))])
.addInput('large', [notepack.encode(data.large), msgpackJs.encode(data.large), new Buffer(JSON.stringify(data.large))])

.on('complete', function () {
  console.log(this.table.toString());
})
.run({ async: true });
