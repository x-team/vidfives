'use strict';

var h = require('hyperscript');

module.exports = function (contentElems) {
  var fontElem = h('link', {
    href: '//fonts.googleapis.com/css?family=Open+Sans:300italic,400,600,700,300',
    rel: 'stylesheet',
    type: 'text/css'
  });

  var fontAwesomeElem = h('link', {
    href: '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css',
    rel: 'stylesheet',
    type: 'text/css'
  });

  return h('html', [
    h('head', {}, [
      h('meta', { charset: 'UTF-8' }),
      h('title', '/vidfives'),
      h('meta', { name: 'viewport', content: 'width=device-width' }),
      fontElem,
      fontAwesomeElem,
      h('link', { href: '/style.css', rel: 'stylesheet', type: 'text/css' }),
      h('link', { href: '/dialog.css', rel: 'stylesheet', type: 'text/css' }),
      h('link', { href: '/dialog-sandra.css', rel: 'stylesheet', type: 'text/css' }),
      h('script', { src: '/js/modernizr.custom.js' })
    ]),
    h('body', {}, [
      h('#root', contentElems || []),
      h('script', { src: '/main.js' })
    ])
  ]);
};
