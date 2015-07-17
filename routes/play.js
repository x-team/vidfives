var ecstatic = require('ecstatic');

var h = require('hyperscript');

function createTpl (id) {
  return require('../src/page-tpl')([
    h('.container', [
      h('header', [
        h('h1', 'You\'ve received a /vidfive'),
        h('h5', 'Your day just got better.')
      ]),

      h('video.thevideo', { controls: true, poster: '/images/poster.jpg' }, [
        h('source', {
          width: 320,
          height: 240,
          src: '/mp4/' + id
        })
      ]),

      h('h6', [
        h('strong', 'Your turn: '),
        'Send someone else a /vidfive and make their day.'
      ]),

      h('a._controls__button', { href: '/' }, 'Send a /vidfive'),

      h('footer', [
        h('h6', [
          'Created with ',
          h('span.fa.fa-heart-o'),
          ' by ',
          h('a', { href: 'http://x-team.com' }, 'X-Team')
        ])
      ])
    ])
  ]);
}

module.exports = function (router, appConfig) {

  var serveMedia = ecstatic({
    root: appConfig.uploadsDir
  });

  router.set('/play/:id', {
    GET: function (req, res, opts) {
      var id = opts.params.id;
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(createTpl(id).outerHTML);
    }
  });

  router.set('/mp4/:id', {
    GET: function (req, res, opts) {
      var id = opts.params.id;
      req.url = '/' + id + '.mp4';
      return serveMedia(req, res);
    }
  });

  router.set('/webm/:id', {
    GET: function (req, res, opts) {
      var id = opts.params.id;
      req.url = '/' + id + '.merged.webm';
      return serveMedia(req, res);
    }
  });

  router.set('/video/:id', {
    GET: function (req, res, opts) {
      var id = opts.params.id;
      req.url = '/' + id + '.webm';
      return serveMedia(req, res);
    }
  });

  router.set('/audio/:id', {
    GET: function (req, res, opts) {
      var id = opts.params.id;
      req.url = '/' + id + '.wav';
      return serveMedia(req, res);
    }
  });
};
