const debug = require('debug')('app:startup');

const express = require('express');
const fs = require('fs');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressMongoDb = require('express-mongo-db');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

const auth = require('./auth');

const index = require('./routes/index');
const db = require('./routes/db');
const upload = require('./routes/upload');

const dbApi = require('./routes/db-api');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressMongoDb(process.env.DB_URI));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({ url: process.env.DB_URI }),
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  // always make req.user available to the template
  res.locals.user = req.user;
  next();
});

app.use('/api/db', dbApi);

// react routing (production)
var reactBase = path.resolve(__dirname, '../web/build')
if (!fs.existsSync(reactBase)) {
  throw 'missing build dir; to fix: run `npm run build` in web dir'
}
app.use('/static', express.static(path.join(reactBase, 'static')));
// app.use(express.static(reactBase));
var indexFile = path.join(reactBase, 'index.html')
app.use(function(req, res, next) {
  res.sendFile(indexFile, function(err) {
    next(err);
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err);

  // render error json
  const status = err.status || 500;
  json = {
    'error': status
  }
  if (req.app.get('env') === 'development') {
    json.message = err.message;
  }

  res.status(status);
  res.json(json);
});

debug(`app.js loaded`);

module.exports = app;
