'use strict';

var h = require('hyperscript');

function stylesheet (href) {
  return h('link', {
    href: href,
    rel: 'stylesheet',
    type: 'text/css'
  })
}

function script (src) {
  return h('script', { src: src });
}

module.exports = function (contentElems) {
  return h('html', [
    h('head', {}, [
      h('meta', { charset: 'UTF-8' }),
      h('title', '/vidfive'),
      h('meta', { name: 'viewport', content: 'width=device-width' }),

      stylesheet('//fonts.googleapis.com/css?family=Open+Sans:300italic,400,600,700,300'),
      stylesheet('//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'),
      stylesheet('/style.css'),
      stylesheet('/main-home.css'),
      script('/js/modernizr.custom.js')
    ]),
    h('body', contentElems || [])
  ]);
};
