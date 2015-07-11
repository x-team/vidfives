var formidable = require('formidable');
var fs = require('fs');
var url = require('url');
var path = require('path');

function sanitizeFilename (filename) {
  // strip out any characters outside the whitelist
  return filename.replace(/[^\.a-zA-Z0-9_\,\~\-]+/g, '');
}

var allowedFileTypes = ['.wav', '.webm'];

module.exports = function (router, appConfig) {
  router.set('/upload', {
    POST: function (req, res) {
      var query = url.parse(req.url, true).query;
      var ext = path.extname(query.filename);
      if (allowedFileTypes.indexOf(ext) === -1) {
        res.writeHead(500);
        return res.end('invalid file type');
      }

      var form = new formidable.IncomingForm();
      form.onPart = function(part) {
        // formidable can handle any non-file parts
        if(!part.filename) {
          return form.handlePart(part);
        }

        var targetFilename = sanitizeFilename(query.filename);
        var targetPath = [targetFilename].join('-');

        // TODO: validate filename and other file data
        // ...

        // need to write in "a+" mode because large files will arrive in chunks
        var out = fs.createWriteStream(path.join(appConfig.uploadsDir, targetPath), { flags: 'a+' });
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

        res.writeHead(200, {'content-type': 'text/plain'});
        res.end('ok');
      });

      req.on('error', function (err) {
        console.error('request error', {
          err: err
        });
      });

      req.on('aborted', function () {
        res.end();
      });
    }
  });
};
