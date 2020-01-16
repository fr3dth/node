'use strict';

const common = require('../common.js');

const bench = common.createBenchmark(main, {
  type: ['ascii', 'mixed', 'emojiseq', 'fullwidth'],
  n: [10e4]
}, {
  flags: ['--expose-internals']
});

function main({ n, type }) {
  // Default value for testing purposes.
  type = type || 'ascii';
  const { getStringWidth } = require('internal/readline/utils');

  const str = ({
    ascii: 'foobar'.repeat(100),
    mixed: 'foo'.repeat(100) + '😀' + 'bar'.repeat(100),
    emojiseq: '👨‍👨‍👧‍👦👨‍👩‍👦‍👦👨‍👩‍👧‍👧👩‍👩‍👧‍👦'.repeat(10),
    fullwidth: '你好'.repeat(150)
  })[type];

  bench.start();
  for (let j = 0; j < n; j += 1)
    getStringWidth(str);
  bench.end(n);
}
