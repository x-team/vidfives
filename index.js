var ecstatic = require('ecstatic');
var http = require('http');
var path = require('path');
var url = require('url');
var Router = require('http-hash-router');

var config = {
  host: process.env.HOST,
  port: process.env.PORT || 8000,

  slackToken: process.env.SLACK_TOKEN,

  uploadsDir: path.join(__dirname, 'user-data'),
  distDir: path.join(__dirname, 'dist')
};

['host', 'slackToken'].forEach(function (key) {
  if (!config[key]) {
    throw new Error('Missing env config: ' + key);
  }
});

var router = new Router();
var serveStaticFiles = ecstatic({
  root: path.join(__dirname, 'dist')
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

require('./routes/home')(router, config);
require('./routes/upload')(router, config);
require('./routes/play')(router, config);
require('./routes/send')(router, config);

server.listen(config.port);
console.log('Ready on http://localhost:%d', config.port);
