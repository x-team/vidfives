'use strict';

var babelify = require('babelify');
var cssModulesify = require('css-modulesify');

module.exports = {
  entry: './src/main-home.js',
  outfile: './dist/main-home.js',
  verbose: true,

  watch: !!process.env.WATCH,
  minify: !!process.env.MINIFY,

  setup: function (b) {
    b.transform(babelify);
    b.plugin(cssModulesify, {
      output: './dist/main-home.css'
    });
  }
};
