var tpl = require('../src/page-tpl')();

module.exports = function (router, appConfig) {
  router.set('/', {
    GET: function (req, res, opts) {
      var id = opts.params.id;
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(tpl.outerHTML);
    }
  });
};
