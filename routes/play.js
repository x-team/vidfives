var fs = require('fs');
var path = require('path');
var ecstatic = require('ecstatic');

var serveMedia = ecstatic({
  root: path.join(__dirname, '..', 'user-data')
});

var tpl = fs.readFileSync(__dirname + '/../dist/play.html', 'utf8');

module.exports = function (router) {
  router.set('/play/:id', {
    GET: function (req, res, opts, cb) {
      var id = opts.params.id;
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(tpl.replace('{{ id }}', JSON.stringify(id)));
    }
  });

  router.set('/video/:id', {
    GET: function (req, res, opts, cb) {
      var id = opts.params.id;
      req.url = '/' +  id + '.webm';
      return serveMedia(req, res);
    }
  });

  router.set('/audio/:id', {
    GET: function (req, res, opts, cb) {
      var id = opts.params.id;
      req.url = '/' + id + '.wav';
      return serveMedia(req, res);
    }
  });
};
