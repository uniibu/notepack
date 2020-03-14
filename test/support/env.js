process.env.NODE_ENV = 'test';

const chai = require('chai');

// Chai chokes when diffing very large arrays
chai.config.showDiff = false;

function repeat (str, times) {
  return new Array(times + 1).join(str);
}

String.prototype.repeat = function (times) {
  return repeat(this, times);
};
