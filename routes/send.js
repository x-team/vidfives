var Slack = require('slack-node');

var slackToken = 'xoxp-2177850873-2178116371-3426216827-4f2eb0';
var slack = new Slack(slackToken);

module.exports = function (router) {
  router.set('/send/:username/:id', {
    POST: function (req, res, opts) {
      var targetName = opts.params.username;
      var id = opts.params.id;

      var text = 'hello there, someone sent you a /vidfive! https://video-fives.x-team.com/play/' + id;
      var slackOpts = {
        'icon_url': 'https://lh4.googleusercontent.com/ssjamux3TvI9LgaXlq7btGhiwfmKjINo99EFVwy2mlZ7HvEJfPHvBq16qSOBWro7Fkg_zA=w1392-h1632',
        text: text,
        channel: '@' + targetName,
        username: 'vidfives-bot'
      };

      slack.api('chat.postMessage', slackOpts, function (err) {
        if (err) {
          res.statusCode = 500;
          return res.end('error');
        }

        res.end('ok');
      });
    }
  });
};
