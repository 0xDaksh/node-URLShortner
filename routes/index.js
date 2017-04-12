var express = require('express'),
    app = express.Router(),
    config = require('../config'),
    short = require('shortid');

var Url = require('../models/Url.js');
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
function isUrl(str) {
    var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
    var url = new RegExp(urlRegex, 'i');
    return str.length < 2083 && url.test(str);
}
app.post('/create', (req, res) => {
    if(!req.body.url) {
      res.json({
        error: 'not a valid url'
      });
    } else if(isUrl(req.body.url) !== true) {
      res.json({
        error: 'not a valid url'
      });
    } else {
      var id = Math.random().toString(36).substr(2, 5);
      var newUrl = new Url({
        id: id,
        to: req.body.url
      }).save((err) => {
        if(!err) {
          res.json({
              url: config.website + '/' + id
          });
        } else {
          res.json({
            error: err
          })
        }
      });
    }
});
app.get('/:id', (req, res) => {
  Url.findOne({id: req.params.id}, (err, url) => {
    if(!url) {
      res.redirect('/');
    } else {
      res.redirect(`${url.to}`);
    }
  });
});

module.exports = app;
