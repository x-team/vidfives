var ecstatic = require('ecstatic');
var http = require('http');
var url = require('url');
var Router = require('http-hash-router');
var handleUpload = require('./lib/handle-upload');

var port = process.env.PORT || 8000;

var router = new Router();
var serveStaticFiles = ecstatic({
  root: __dirname + '/static'
});

var server = http.createServer(function (req, res) {
  router(req, res, {}, onError);

  function onError (err) {
    if (err && err.statusCode === 404) {
      return serveStaticFiles(req, res);
    }

    if (!err) {
      err = new Error('unknown error');
    }

    res.statusCode = err.statusCode || 500;
    res.end(err.message);
  }
});

require('./routes/upload')(router);
require('./routes/play')(router);
require('./routes/send')(router);

server.listen(port);
