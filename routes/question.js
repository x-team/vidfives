var fs = require('fs');
var h = require('hyperscript');
var path = require('path');

function renderTemplate (info) {
  return require('../src/page-tpl')([
    h('.container.question', [
      h('header', [
        h('h1', 'Hey ' + info.recipient.name + '! ' + info.sender.name + ' would like to ask you:'),
        h('h3', info.question)
      ]),
      h('.senderResponse', [
        h('h5', 'Ryan\'s response'),
        h('video', {
          src: '/questionvids/' + info.id + '.webm',
          controls: true
        })
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
    h('script', 'window.config = ' + JSON.stringify(info) + ';'),
    h('script', { src: '/js/RecordRTC.min.js' }),
    h('script', { src: '/main-question.js?v=1' })
  ]);
}

function handleError (res, err) {
  res.writeHead(err.statusCode || 500);
  res.end(err.message || 'error');
}

function handleInfo (res, info) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(renderTemplate(info).outerHTML);
}

function fetchInstance (id, cb) {
  var filename = path.join(__dirname, '..', 'instances', id + '.json');
  fs.readFile(filename, function (err, raw) {
    if (err) {
      err.statusCode = 404;
      err.message = 'Not found';
      return cb(err);
    }

    var info;
    try {
      info = JSON.parse(raw);
    }
    catch (e) {
      err = new Error('Invalid json');
      return cb(err);
    }

    info.id = id;
    return cb(null, info);
  })
}

module.exports = function (router) {
  router.set('/question/:id', {
    GET: function (req, res, opts) {
      var id = opts.params.id;
      fetchInstance(id, function (err, info) {
        if (err) { return handleError(res, err); }

        handleInfo(res, info, id);
      })
    }
  });
};
