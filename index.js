/**
 * External dependencies.
 */

var root = this;

var chai = typeof root['chai'] === 'undefined'
  ? require('chai')
  : root['chai'];

/**
 * Chai.js plugin.
 *
 * Options:
 *
 *    - styles: array/string  should, expect, assert
 *    - stack:  boolean       include stack
 *    - diff:   boolean       show diff
 *    - plugins array         list of chai.js plugins
 *
 * @param {Object} hydro
 * @param {Object} util
 * @api public
 */

module.exports = function(hydro, util) {
  var opts = hydro.get('chai') || {};
  var styles = util.toArray(opts.styles);
  var plugin = null;
  opts.plugins = opts.plugins || [];

  util.forEach(styles, function(style) {
    switch (style) {
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
  });

  if (opts.hasOwnProperty('stack')) {
    chai.Assertion.includeStack = opts.stack;
  }

  if (opts.hasOwnProperty('diff')) {
    chai.Assertion.showDiff = opts.diff;
  }

  for (var i = 0, len = opts.plugins.length; i < len; i++) {
    plugin = typeof opts.plugins[i] === 'string'
      ? require(opts.plugins[i])
      : opts.plugins[i];

    chai.use(plugin);
  }
};
