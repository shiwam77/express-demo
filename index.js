const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser').json();
const compression = require('compression');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
const globalErrorHandler = require('./controller/errorController');
const AppError = require('../express-demo/utils/appError');
const dotenv = require('dotenv');
dotenv.config({path: '../express-demo/config.env'});
const authController = require('../express-demo/controller/authController');
const userController = require('../express-demo/controller/userController');
const yearController = require('../express-demo/controller/yearController');
const classController = require('../express-demo/controller/classController');
const subjectController = require('../express-demo/controller/subjectController');
const studentController = require('../express-demo/controller/studentController');
//const subRoutes = require('../express-demo/routes/subjectRoutes');
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
    );

     mongoose.connect(DB,
      {
        useNewUrlParser : true,
        useCreateIndex : true,
        useFindAndModify:true,
        useUnifiedTopology:true
      }).then(con => {
        console.log("database connected successfull");
      });










      app.enable('trust proxy');

     // app.set('view engine', 'pug');
     // app.set('views', path.join(__dirname, 'views'));
      
      // 1) GLOBAL MIDDLEWARES
      // Implement CORS
      app.use(cors());
      // Access-Control-Allow-Origin *
      // api.natours.com, front-end natours.com
      // app.use(cors({
      //   origin: 'https://www.natours.com'
      // }))
      
      app.options('*', cors());
      // app.options('/api/v1/tours/:id', cors());
      
      // Serving static files
    //  app.use(express.static(path.join(__dirname, 'public')));
      
      // Set security HTTP headers
      app.use(helmet());
      
      // Development logging
      if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
      }
      
      // Limit requests from same API
      // const limiter = rateLimit({
      //   max: 100,
      //   windowMs: 60 * 60 * 1000,
      //   message: 'Too many requests from this IP, please try again in an hour!'
      // });
      // app.use('/api', limiter);
      
      // Stripe webhook, BEFORE body-parser, because stripe needs the body as stream
      // app.post(
      //   '/webhook-checkout',
      //   bodyParser.raw({ type: 'application/json' }),
      //   bookingController.webhookCheckout
      // );
      
      // Body parser, reading data from body into req.body
      app.use(express.json({ limit: '10kb' }));
      app.use(express.urlencoded({ extended: true, limit: '100mb' }));
      app.use(cookieParser());
      
      // Data sanitization against NoSQL query injection
      app.use(mongoSanitize());
      
      // Data sanitization against XSS
      app.use(xss());
      
      // Prevent parameter pollution
      // app.use(
      //   hpp({
      //     whitelist: [
      //       'duration',
      //       'ratingsQuantity',
      //       'ratingsAverage',
      //       'maxGroupSize',
      //       'difficulty',
      //       'price'
      //     ]
      //   })
      // );
      
      app.use(compression());
      
      // Test middleware
      app.use((req, res, next) => {
        req.requestTime = new Date().toISOString();
        // console.log(req.cookies);
        next();
      });
      






/////////////////////////User route //////////////////////////// 
app.post('/auth/v1/signup', authController.signup);
app.post('/auth/v1/login',authController.login);
app.get('/auth/v1/logout', authController.logout);

app.post('/auth/v1/forgotPassword', authController.forgotPassword);
app.patch('/auth/v1/resetPassword',authController.resetPassword);

app.get('/getAllUsers',authController.protect,authController.restrictTo('user'),userController.getAllUsers);
 ///////////////////////////////////////////////


////////////Year Route//////////////


app.get('/:Id/getAllYears',authController.protect,authController.restrictTo('admin,user,superAdmin'),yearController.getAllYears);
app.post('/createYear',authController.protect,authController.restrictTo('user,superAdmin'),yearController.createYear);
app.patch('/:Id/updateYear',authController.protect,authController.restrictTo('user,superAdmin'),yearController.updateYear);
app.delete('/:Id/deleteYear',authController.protect,authController.restrictTo('user,superAdmin'),yearController.deleteYear);


/////////////////////////////////


//////////Class Route
app.get('/:Id/getAllClasses',authController.protect,authController.restrictTo('admin,user,superAdmin'),classController.getAllClass);
app.post('/createClass',authController.protect,authController.restrictTo('user,superAdmin'),classController.createClass);
app.patch('/:Id/updateClass',authController.protect,authController.restrictTo('user,superAdmin'),classController.updateClass);
app.delete('/:Id/deleteClass',authController.protect,authController.restrictTo('user,superAdmin'),classController.deleteClass);

//////////////////

///Subject Route /////
//subRoutes.subjectRoutes();
app.get('/:Id/getAllSubjects',authController.protect,authController.restrictTo('user'),subjectController.getAllSubject);
app.post('/createSubject',authController.protect,authController.restrictTo('user'),subjectController.createSubject);
app.patch('/:Id/updateSubject',subjectController.updateSubject);
app.delete('/:Id/deleteSubject',subjectController.deleteSubject);

////////////////


///////Students Route //////


app.get('/:Id/getAllStudents',authController.protect,authController.restrictTo('user'),studentController.getAllStudent);
app.post('/createStudent',authController.protect,authController.restrictTo('user'),studentController.createStudent);
app.patch('/:Id/updateStudent',studentController.updateStudent);
app.delete('/:Id/deleteStudent',studentController.deleteStudent);

///////////

app.all('*',(req,res,next) => {
 
next(new AppError(`can't find ${req.originalUrl} on this server!`,404));

});

app.use(globalErrorHandler);
app.use(authController.protect);

const port = process.env.PORT || 3000 ;
app.listen(port,()=> console.log('Listening on port ' + port));