const proxy = require('http-proxy-middleware');
const request = require('request');

module.exports = function(app) { 
  app.use(proxy('/api', 
    { target: 'http://localhost:4000/' }
  ));
  app.use('*', (req, res, next) => {
    request(`http://localhost:4000/api/exists${req.baseUrl}`, (err, _res, body) => {
      if(!err) {
        if (body === 'true') {
          res.redirect(`http://localhost:4000${req.baseUrl}`);
        } else {
          // No tiny url, go next.
          next();
        }
      } else {
        next();
      }
    })
  })
}
