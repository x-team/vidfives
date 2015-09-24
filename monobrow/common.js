'use strict';

var babelify = require('babelify');
var cssModulesify = require('css-modulesify');
var path = require('path');

var rootDir = path.dirname(__dirname);

module.exports = function (name) {
  return {
    entry: path.join(rootDir, 'src', 'main-' + name + '.js'),
    outfile: path.join(rootDir, 'dist', 'main-' + name + '.js'),
    verbose: true,

    watch: !!process.env.WATCH,
    minify: !!process.env.MINIFY,

    setup: function (b) {
      b.transform(babelify);
      b.plugin(cssModulesify, {
        output: path.join(rootDir, 'dist', 'main-' + name + '.css')
      });
    }
  };
};
