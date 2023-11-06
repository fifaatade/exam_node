var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authenticationRouter = require('./routes/authentification');
var todoRouter= require('./routes/todo');
var authenticateToken= require('./middleware/auth')

var app = express();

require('./config/database')//config mongodb
//send in tbe DB
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

todoRouter.use(authenticateToken);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin',"*")
  res.header('Access-Control-Allow-Headers',"*")
  res.header('Access-Control-Allow-Methods',"*")

  next()
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/authentification', authenticationRouter);
app.use('/todo',authenticateToken, todoRouter);

module.exports = app;
