/**
 * Test config.
 *
 * @param {Object} hydro
 * @api public
 */

module.exports = function(hydro) {
  var chai = require('./index');

  hydro.set({
    plugins: [chai],
    chai: {
      styles: ['expect', 'assert', 'should'],
      diff: true,
      stack: true
    },
    attach: global,
    proxies: {
      test: 'addTest'
    },
    suite: 'hydro-chai',
    formatter: 'hydro-simple',
    globals: {
      sassert: require('simple-assert')
    },
    tests: [
      'test/*.js'
    ]
  });
};
