var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var md5=require('md5-node');

var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var touristRouter = require('./routes/tourist');
var tripRouter = require('./routes/trip');
var themeRouter = require('./routes/theme');
var playRouter = require('./routes/play');
var cafeRouter = require('./routes/cafe');
var introRouter = require('./routes/intro');
var showRouter = require('./routes/show');
var ticketRouter = require('./routes/ticket');
var hotelRouter = require('./routes/hotel');
var houseRouter = require('./routes/house');
var foodRouter = require('./routes/food');
var server_categoryRouter = require('./routes/server_category');
var serverRouter = require('./routes/server');
var questionRouter = require('./routes/question');
var opertimeRouter = require('./routes/opertime');
var orderRouter = require('./routes/order');
var searchRouter = require('./routes/search');

var app = express();

//加载CORS模块
const cors = require('cors');

//使用CORS中间件
app.use(cors({
	origin:['http://localhost:8080','http://127.0.0.1:8080']
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/tourist', touristRouter);
app.use('/trip', tripRouter);
app.use('/theme', themeRouter);
app.use('/play', playRouter);
app.use('/cafe', cafeRouter);
app.use('/intro', introRouter);
app.use('/show', showRouter);
app.use('/ticket', ticketRouter);
app.use('/hotel', hotelRouter);
app.use('/house', houseRouter);
app.use('/food', foodRouter);
app.use('/server_category', server_categoryRouter);
app.use('/server', serverRouter);
app.use('/question', questionRouter);
app.use('/opertime', opertimeRouter);
app.use('/order', orderRouter);
app.use('/search', searchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
