/**
 * External dependencies.
 */

var loa = require('loa');

/**
 * Root.
 */

var root = typeof window === 'undefined' ? global : window;

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
  var chai = loa('chai');
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
        var should = chai.Should();
        if (!root.should) hydro.set('globals', 'should', should);
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
    chai.use(loa(opts.plugins[i]));
  }
};
