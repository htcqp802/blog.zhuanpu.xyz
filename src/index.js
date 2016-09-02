var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('../config');
var app = express();
var dispatch = require('./dispatch');


// view engine setup
app.set('views',config.dist.views);
app.engine('.html', require('ejs').__express);  
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(config.dist.static));

dispatch(app);
app.use(function(req,res,next){
  console.log(req.path);
  if(res.viewPath){
    res.render(res.viewPath)
  }else{
    res.render(req.path.split('/')[1]);
  }
next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error/index', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error/index', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
