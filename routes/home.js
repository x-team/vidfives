var h = require('hyperscript');
var tpl = require('../src/page-tpl')([
  h('.container', [
    h('header', [
      h('h1', '/vidfive'),
      h('h5', 'Send a more personal high-five')
    ]),
    h('#root'),
    h('footer', [
      h('h6', [
        'Created with ',
        h('span.fa.fa-heart-o'),
        ' by ',
        h('a', { href: 'http://x-team.com' }, 'X-Team')
      ])
    ])
  ]),
  h('script', { src: '/js/RecordRTC.min.js' }),
  h('script', { src: '/main-home.js?v=2' })
]);

module.exports = function (router) {
  router.set('/', {
    GET: function (req, res) {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(tpl.outerHTML);
    }
  });
};
