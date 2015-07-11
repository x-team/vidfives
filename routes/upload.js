var formidable = require('formidable');
var fs = require('fs');
var url = require('url');
var path = require('path');

function sanitizeFilename (filename) {
  // strip out any characters outside the whitelist
  return filename.replace(/[^\.a-zA-Z0-9_\,\~\-]+/g, '');
}

var allowedFileTypes = ['.wav', '.webm'];

module.exports = function (router) {
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

        var uploadsDir = path.join(__dirname, '..', 'user-data');
        var targetFilename = sanitizeFilename(query.filename);
        var targetPath = [targetFilename].join('-');


        // TODO: validate filename and other file data
        // ...

        var out = fs.createWriteStream(path.join(uploadsDir, targetPath), { flags: 'a+' });
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
