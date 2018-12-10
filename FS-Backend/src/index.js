import 'idempotent-babel-polyfill';
import env from 'dotenv';

const envfile =
  process.env.NODE_ENV === 'production' ? '.prod.env' : '.dev.env';
env.config({
  path: `${__dirname}/environments/${envfile}`
});


import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import i18n from 'i18n';
import passport from 'passport';
import User from './models/user';
import Session from 'express-session';
import flash from 'connect-flash';
import path from 'path';
import multer from 'multer';

mongoose.Promise = global.Promise;
mongoose
  .connect(
    process.env.MONGO_URL + '/' + process.env.DB_NAME, {
      useNewUrlParser: true
    }
  )
  .catch(err => console.log(err));
const app = express();
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(Session({
  secret: 'secret'
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/file', express.static(path.join(__dirname, '../uploads')));
console.log(path.join(__dirname, '../uploads'));
app.use(passport.initialize());
app.use(passport.session());

i18n.configure({
  locales: ['en', 'zh'],
  directory: `${__dirname}/locales`,
  defaultLocale: 'en'
});
app.use(i18n.init);
app.use(function (req, res, next) {
  console.log(req.body);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,Content-type, Authorization'
  );
  next();
});


passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  User.findById(id, function (err, user) {
    cb(err, user);
  });
});

app.options('*', cors());

require('./routes/user')(app);
require('./routes/category')(app);
require('./routes/coupon')(app);
require('./routes/module')(app);
require('./routes/subscription-plans')(app);
require('./routes/region-management')(app);
require('./routes/vat-management')(app);
require('./routes/product')(app);
require('./routes/company')(app);
require('./routes/restful')(app);
require('./routes/filter')(app);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.png');
  }
});

var upload = multer({
  storage: storage
});
require('./functions/redis').connectToRedis();
app.post('/image', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.status(200).json(`http://40.71.47.14:5000/file/${req.file.filename}`);
});
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public') + '/index.html');
});
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
require('./passport-configuration');

// Error handler
app.use(function (err, req, res, next) {
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res
    .status(err.status || 500)
    .json({
      status: false,
      error: err,
      code: err.status || 500
    })
    .end();

  next();
});

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});