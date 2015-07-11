var fs = require('fs');
var path = require('path');
var ecstatic = require('ecstatic');

module.exports = function (router, appConfig) {

  var serveMedia = ecstatic({
    root: appConfig.uploadsDir
  });

  var tpl = fs.readFileSync(path.join(appConfig.distDir, 'play.html'), 'utf8');

  router.set('/play/:id', {
    GET: function (req, res, opts) {
      var id = opts.params.id;
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(tpl.replace('{{ id }}', JSON.stringify(id)));
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
