var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var routes = require('./routes');

global.__baseDir = path.resolve(__dirname, '..') + '/';

var app = express();

app.locals.pretty = true;

app.use(express.static(path.join(__dirname, '../public')));
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
    res.sendFile(path.join(__baseDir + '/public/views/404.html'))
});

module.exports = app;
