var exec = require('child_process').exec;
var ffmpeg = require('ffmpeg-static');
var path = require('path');
var format = require('util').format;

var ffmpegPath = ffmpeg.path;

module.exports = function (opts, cb) {
  var basePath = path.join(opts.dir, opts.id);
  var audioPath = basePath + '.wav';
  var videoPath = basePath + '.webm';
  var mergedPath = basePath + '.merged.webm';
  var mp4Path = basePath + '.mp4';

  // merge
  exec(format(
    '%s -i %s -i %s -map 0:0 -map 1:0 %s',
    ffmpegPath,
    audioPath,
    videoPath,
    mergedPath
  ), function (err/*, stdout, stderr*/) {
    if (err) { return cb(err); }

    // convert
    exec(format(
      'ffmpeg -i %s -codec:v libx264 -profile:v baseline -vsync 2 -level 30 -b:v 500k -bufsize 1000k -threads 0 -codec:a libfaac -b:a 128k %s',
      mergedPath,
      mp4Path
    ), function (err2/*, stdout, stderr*/) {
      if (err2) { return cb(err2); }

      return cb(null, {
        merged: mergedPath,
        mp4: mp4Path
      });
    });
  });
};
