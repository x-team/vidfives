var async = require('async');
var exec = require('child_process').exec;
var ffmpeg = require('ffmpeg-static');
var fs = require('fs');
var path = require('path');
var format = require('util').format;

var ffmpegPath = ffmpeg.path;

module.exports = function (opts, cb) {
  var basePath = path.join(opts.dir, opts.id);
  var audioPath = basePath + '.wav';
  var videoPath = basePath + '.webm';
  var mergedPath = basePath + '.merged.webm';
  var mp4Path = basePath + '.mp4';

  var tasks = [];

  tasks.push(function createMergedVideo (next) {
    exec(format(
      '%s -i %s -i %s -map 0:0 -map 1:0 %s',
      ffmpegPath,
      audioPath,
      videoPath,
      mergedPath
    ), next);
  });

  tasks.push(function assertMergedVideoExists (next) {
    fs.stat(mergedPath, function (err, stats) {
      if (err) { return next(err); }

      return next();
    });
  });

  tasks.push(function convertVideo (next) {
    exec(format(
      'ffmpeg -i %s -codec:v libx264 -profile:v baseline -vsync 2 -level 30 -b:v 500k -bufsize 1000k -threads 0 -codec:a libfaac -b:a 128k %s',
      mergedPath,
      mp4Path
    ), next);
  });

  tasks.push(function assertConvertedVideoExists (next) {
    fs.stat(mp4Path, function (err, stats) {
      if (err) { return next(err); }

      return next();
    });
  });

  async.series(tasks, function (err, res) {
    if (err) { return cb(err); }

    return cb(null, {
      merged: mergedPath,
      mp4: mp4Path
    });
  });
};
