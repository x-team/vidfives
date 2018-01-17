'use strict';

var babelify = require('babelify');
var cssModulesify = require('css-modulesify');
var path = require('path');

module.exports = function (name) {
  return {
    entry: path.join('src', 'main-' + name + '.js'),
    outFile: path.join('dist', 'main-' + name + '.js'),
    verbose: true,

    watch: !!process.env.WATCH,
    minify: !!process.env.MINIFY,

    setup: function (b) {
      b.transform(babelify);
      b.plugin(cssModulesify, {
        output: path.join('dist', 'main-' + name + '.css')
      });
    }
  };
};
