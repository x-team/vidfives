var async = require('async');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var cuid = require('cuid');
var processVideo = require('../lib/process-video');

var extByType = {
  'audio/wav': 'wav',
  'video/webm': 'webm'
};

module.exports = function (router, appConfig) {
  router.set('/upload', {
    POST: function (req, res) {
      var form = new formidable.IncomingForm();
      var id = cuid();

      console.log('[%s] upload started', id);

      form.on('error', function (err) {
        console.error('form error', {
          err: err
        });
      });

      form.parse(req, function (err, fields, files) {
        if (err) {
          console.error('error parsing form', {
            err: err
          });
          res.writeHead(500, {'content-type': 'text/plain'});
          return res.end('error');
        }
      });

      form.on('end', function (fields, files) {
        var tasks = this.openedFiles.map(function (f) {
          return function (next) {
            var tmp = f.path;
            var name = f.name;
            var ext = extByType[f.type];
            if (!ext) {
              return next(new Error('Invalid type: %d', f.type));
            }

            var targetFilename = id + '.' + ext;
            var dest = path.join(appConfig.uploadsDir, targetFilename);

            // move the uploaded file to our uploads dir
            fs.rename(tmp, dest, next);
          };
        });

        tasks.push(function (next) {
          console.log('[%s] processing started', id);

          processVideo({
            dir: appConfig.uploadsDir,
            id: id
          }, next);
        });

        async.series(tasks, function (err, results) {
          if (err) {
            console.error('[%s] error', id, err);
            res.statusCode = 500;
            return res.end('error');
          }

          console.log('[%s] processing completed', id);
          res.writeHead(200, {'content-type': 'application/json'});
          res.end(JSON.stringify({ id: id }));
        });
      });
    }
  });
};
