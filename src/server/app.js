// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var httplogger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var mongoose = require('mongoose');
var config = require('../_config');
var winston = require('winston');
var logger = new (winston.Logger) ({
  transports: [
    new (winston.transports.Console) ({level: 'error'}),
    new (winston.transports.File) ({
      filename: 'server.log',
      level: 'debug'
    })
  ]
});


// *** routes *** //
var routes = require('./routes/index.js');
var studentRoutes = require('./routes/students.js');
var userRoutes = require('./routes/users');


// *** express instance *** //
var app = express();


// *** config Mongoose *** //
var environment = process.env.NODE_ENV || 'development';
var mongoURI = config.mongoURI.development;
mongoose.connect(mongoURI, function(err, res) {
  if (err) {
    logger.error('Error connecting to the databaase: ' + err)
  } else {
    logger.info('Connected to database: ' + config.mongoURI.development)
  }
});


// *** view engine *** //
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');


// *** static directory *** //
app.set('views', path.join(__dirname, 'views'));


// *** config middleware *** //
if (process.env.NODE_ENV !== 'test') {
  app.use(httplogger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));


// *** main routes *** //
app.use('/', routes);
app.use('/students', studentRoutes);
app.use('/auth', userRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
