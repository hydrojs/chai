/**
 * External dependencies.
 */

var chai = global.chai || require('chai');

/**
 * Chai.js plugin.
 *
 * Options:
 *
 *    - styles: array/string  should, expect, assert
 *    - stack:  boolean       include stack
 *    - diff:   boolean       show diff
 *
 * @param {Object} hydro
 * @api public
 */

module.exports = function(hydro) {
  var opts = hydro.get('chai') || {};
  var styles = !Array.isArray(opts.styles) ? [opts.styles] : opts.styles;

  for (var i = 0, len = styles.length; i < len; i++) {
    switch (styles[i]) {
      case 'expect':
        hydro.set('globals', 'expect', chai.expect);
        break;
      case 'should':
        hydro.set('globals', 'should', chai.should());
        break;
      case 'assert':
        hydro.set('globals', 'assert', chai.assert);
        break;
    }
  }

  if (opts.hasOwnProperty('stack')) {
    chai.Assertion.includeStack = opts.stack;
  }

  if (opts.hasOwnProperty('diff')) {
    chai.Assertion.showDiff = opts.diff;
  }
};
