var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var cuid = require('cuid');
var processVideo = require('../lib/process-video');

var allowedFileTypes = ['.wav', '.webm'];

module.exports = function (router, appConfig) {
  router.set('/upload', {
    POST: function (req, res) {
      var form = new formidable.IncomingForm();
      var id = cuid();

      form.onPart = function(part) {
        // formidable can handle any non-file parts
        if(!part.filename) {
          return form.handlePart(part);
        }

        var ext = '.' + part.name;
        if (allowedFileTypes.indexOf(ext) === -1) {
          res.statusCode = 500;
          return res.end('invalid file type');
        }

        var targetFilename = id + ext;

        // TODO: validate file data
        // ...

        var out = fs.createWriteStream(path.join(appConfig.uploadsDir, targetFilename), { flags: 'w+' });
        out.on('error', function (err) {
          console.error('error writing upload', {
            err: err,
            part: part
          });
        });

        part.pipe(out);
      };

      form.parse(req, function (err) {
        if (err) {
          console.error('error parsing form', {
            err: err
          });
          res.writeHead(500, {'content-type': 'text/plain'});
          res.end('error');
          return;
        }

        processVideo({
          dir: appConfig.uploadsDir,
          id: id
        }, function (err2) {
          // TOOD: work out best way to handle this error
          if (err2) {
            console.error(err2);
          }

          res.writeHead(200, {'content-type': 'application/json'});
          res.end(JSON.stringify({ id: id }));
        });
      });

      req.on('error', function (err) {
        console.error('request error', {
          err: err
        });
        res.end();
      });

      req.on('aborted', function () {
        res.end();
      });
    }
  });
};
