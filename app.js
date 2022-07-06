var createError = require('http-errors');
var express = require('express');
// var session = require('express-session');
var path = require('path');
// var multer = require('multer');
// var nodemailer = require('nodemailer');
// var crypto = require('crypto');
// var validator = require('express-validator');
// var sweetalert2 = require('sweetalert2');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var http = require('http');
var logger = require('morgan');
var db = require('./models/db_controller')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const dotenv = require("dotenv")
dotenv.config()
var signupRouter = require('./controllers/signup')

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
